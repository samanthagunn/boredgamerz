package com.techtonic.BoredGamerz.api;

import com.techtonic.BoredGamerz.ServerUtil.Exceptions.*;
import com.techtonic.BoredGamerz.ServerUtil.IdTokenDecoder;
import com.techtonic.BoredGamerz.dto.UserToGameMeetingDataTransferObject;
import com.techtonic.BoredGamerz.model.User;
import com.techtonic.BoredGamerz.model.UserToGameMeetingJoin;
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

Details: handles http requests when joining, unjoining, or listing users from a meeting
 */

@RequestMapping("bored-gamerz/api/user-to-game-meeting")
@RestController
public class UserToGameMeetingController {

    private final UserService USER_SERVICE;
    private final UserToGameMeetingService UTGM_SERVICE;
    private final GameMeetingService GM_SERVICE;

    @Autowired
    public UserToGameMeetingController(UserService USER_SERVICE,
                          UserToGameMeetingService UTGM_SERVICE,
                          GameMeetingService GM_SERVICE){

        this.USER_SERVICE = USER_SERVICE;
        this.UTGM_SERVICE = UTGM_SERVICE;
        this.GM_SERVICE = GM_SERVICE;
    }

    @PostMapping
    public int joinUserToMeeting(@RequestBody UserToGameMeetingDataTransferObject join,
                                 @RequestHeader HttpHeaders headers){

        IdTokenDecoder token = new IdTokenDecoder(headers);

        String id = token.decode("sub");

        User user = USER_SERVICE.getByAuthId(id).get();

        join.setUser(user.getId());

        if(UTGM_SERVICE.add(join, GM_SERVICE, USER_SERVICE) == 0) throw new SQLSaveFail();

        return 201;
    }

    @GetMapping
    public Iterable<UserToGameMeetingJoin> getAll(@RequestHeader HttpHeaders headers){

        IdTokenDecoder token = new IdTokenDecoder(headers);

        String id = token.decode("sub");

        User user = USER_SERVICE.getByAuthId(id).get();

        return UTGM_SERVICE.getAll();
    }

    @GetMapping(path = "/{gameId}")
    public Optional<UserToGameMeetingJoin> getById(@PathVariable("gameId") String gameId,
                                                   @RequestHeader HttpHeaders headers){

        IdTokenDecoder token = new IdTokenDecoder(headers);

        String id = token.decode("sub");

        User user = USER_SERVICE.getByAuthId(id).get();

        Optional<UserToGameMeetingJoin> output = UTGM_SERVICE.getByCompositeId(gameId);

        if(output == null) throw new NoSuchElementException();

        return output;
    }

    @GetMapping(path = "/me")
    public Iterable<UserToGameMeetingJoin> getByUserId(@RequestHeader HttpHeaders headers){

        IdTokenDecoder token = new IdTokenDecoder(headers);

        String id = token.decode("sub");

        User user = USER_SERVICE.getByAuthId(id).get();

        return UTGM_SERVICE.getAllByUserId(user.getId());
    }

    @GetMapping(path = "/game-meeting-id/{UUID}")
    public Iterable<UserToGameMeetingJoin> getByGameMeetingId(@PathVariable("UUID") UUID id){

        return UTGM_SERVICE.getAllByGameMeetingId(id);
    }

    @DeleteMapping(path = "/unjoin")
    public int deleteAllByGameMeetingId(@RequestBody UserToGameMeetingDataTransferObject unjoin,
                                        @RequestHeader HttpHeaders headers){

        IdTokenDecoder token = new IdTokenDecoder(headers);

        String id = token.decode("sub");

        User user = USER_SERVICE.getByAuthId(id).get();

        unjoin.setUser(user.getId());

        if(UTGM_SERVICE.delete(unjoin, GM_SERVICE) == 0) throw new SQLDeleteFail();

        return 200;
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<String> handle(NoSuchElementException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("The entity does not exist");
    }

    @ExceptionHandler(BlankBodyException.class)
    public ResponseEntity<String> handle(BlankBodyException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Body did not contain required attributes");
    }

    @ExceptionHandler(AlreadyJoinedException.class)
    public ResponseEntity<String> handle(AlreadyJoinedException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User has already joined this game");
    }

    @ExceptionHandler(GameFullException.class)
    public ResponseEntity<String> handle(GameFullException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Game has no available seats");
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
