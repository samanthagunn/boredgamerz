package com.techtonic.BoredGamerz.api;

import com.techtonic.BoredGamerz.model.UserToGameMeetingJoin;
import com.techtonic.BoredGamerz.sendGrid.MailController;
import com.techtonic.BoredGamerz.serverUtil.Exceptions.*;
import com.techtonic.BoredGamerz.serverUtil.IdTokenDecoder;
import com.techtonic.BoredGamerz.dto.GameMeetingDataTransferObject;
import com.techtonic.BoredGamerz.model.GameMeeting;
import com.techtonic.BoredGamerz.model.User;
import com.techtonic.BoredGamerz.service.GameMeetingService;
import com.techtonic.BoredGamerz.service.UserService;
import com.techtonic.BoredGamerz.service.UserToGameMeetingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

/*
Created:
in progress

Authors:
Grant Fields
Christian Glassiognon
Mark Thompson
Samantha Hatfield

(c) Copyright by Company:
Techtonic

Details: Handles http requests related to creating, finding, or deleting game meetings
 */

@RequestMapping("bored-gamerz/api/game-meeting")
@RestController
public class GameMeetingController {

    private final MailController MAIL_CONTROLLER;
    private final GameMeetingService GM_SERVICE;
    private final UserToGameMeetingService UTGM_SERVICE;
    private final UserService USER_SERVICE;

    @Autowired
    public GameMeetingController(UserService USER_SERVICE,
                                 UserToGameMeetingService UTGM_SERVICE,
                                 GameMeetingService GM_SERVICE,
                                 MailController MAIL_CONTROLLER){

        this.USER_SERVICE = USER_SERVICE;
        this.UTGM_SERVICE = UTGM_SERVICE;
        this.GM_SERVICE = GM_SERVICE;
        this.MAIL_CONTROLLER = MAIL_CONTROLLER;
    }

    @PostMapping
    public int add(@RequestBody GameMeetingDataTransferObject gm, @RequestHeader HttpHeaders headers){

        IdTokenDecoder token = new IdTokenDecoder(headers);

        String id = token.decode("sub");

        User user = USER_SERVICE.getByAuthId(id).get();

        MAIL_CONTROLLER.sendEmailWithSendGrid("Greetings Game Connoisseur,\n\n Your meeting is hosted and waiting for gamers!", "Game Hosting", id);

        gm.setHost(user.getId());

        if(GM_SERVICE.add(gm, UTGM_SERVICE, USER_SERVICE) == 0) throw new SQLSaveFail();

        return 201;
    }

    @GetMapping
    public Iterable<GameMeeting> getAll(@RequestHeader HttpHeaders headers){

        IdTokenDecoder token = new IdTokenDecoder(headers);

        String id = token.decode("sub");

        User user = USER_SERVICE.getByAuthId(id).get();

        return GM_SERVICE.getAll();
    }

    @GetMapping(path = "/{UUID}")
    public Optional<GameMeeting> getByGameMeetingId(@PathVariable("UUID") UUID gameMeetingId){

        Optional<GameMeeting> output = GM_SERVICE.getById(gameMeetingId);

        if(output.isEmpty()) throw new NoSuchElementException();

        return output;
    }

    @GetMapping(path = "/me")
    public Iterable<GameMeeting> getAllByHostId(@RequestHeader HttpHeaders headers){

        IdTokenDecoder token = new IdTokenDecoder(headers);

        String id = token.decode("sub");

        User host = USER_SERVICE.getByAuthId(id).get();

        return GM_SERVICE.getAllByHostId(host.getId());
    }

    @DeleteMapping(path = "/{UUID}")
    public int deleteByGameMeetingId(@PathVariable("UUID") UUID gameMeetingId){

        String id = GM_SERVICE.getById(gameMeetingId).get().getHost().getAuth0Id();

        MAIL_CONTROLLER.sendEmailWithSendGrid("Greetings Game Connoisseur,\n\n Your meeting is hosted and waiting for gamers!", "Game Hosting", id);

        Iterable<UserToGameMeetingJoin> list = UTGM_SERVICE.getAllByGameMeetingId(gameMeetingId);

        for(UserToGameMeetingJoin joins: list){

            String userId = joins.getUser().getAuth0Id();

            if(!userId.equals(id))
                MAIL_CONTROLLER.sendEmailWithSendGrid("Greetings Game Connoisseur,\n\n A game meeting you joined is no longer being hosted", "Game cancellation", userId);
        }

        if(GM_SERVICE.delete(gameMeetingId, UTGM_SERVICE) == 0) throw new SQLDeleteFail();

        return 200;
    }

    @PutMapping
    public int updateGameMeeting(@RequestBody GameMeetingDataTransferObject gameMeeting){

        if(gameMeeting.getAvailableSeats() !=
                GM_SERVICE.getById(gameMeeting.getId()).get().getAvailableSeats())
            throw new IllegalArgumentException();

        String id = GM_SERVICE.getById(gameMeeting.getId()).get().getHost().getAuth0Id();

        MAIL_CONTROLLER.sendEmailWithSendGrid("Greetings Game Connoisseur,\n\n Your meeting has been updated and is waiting for gamers!", "Game Hosting", id);

        return GM_SERVICE.update(gameMeeting);
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<String> handle(NoSuchElementException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("The entity does not exist");
    }

    @ExceptionHandler(GameMeetingDateException.class)
    public ResponseEntity<String> handle(GameMeetingDateException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("The date has already expired");
    }

    @ExceptionHandler(MaxGamesException.class)
    public ResponseEntity<String> handle(MaxGamesException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User is already hosting max amount of games");
    }

    @ExceptionHandler(BlankBodyException.class)
    public ResponseEntity<String> handle(BlankBodyException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Body did not contain required attributes");
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handle(IllegalArgumentException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Can't change number of seats in a game meeting");
    }

    @ExceptionHandler(SQLSaveFail.class)
    public ResponseEntity<String> handle(SQLSaveFail e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Body did not save to sql database");
    }

    @ExceptionHandler(SQLDeleteFail.class)
    public ResponseEntity<String> handle(SQLDeleteFail e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Entity could not be deleted");
    }
}
