package com.techtonic.BoredGamerz.api;

import com.techtonic.BoredGamerz.ServerUtil.Exceptions.*;
import com.techtonic.BoredGamerz.dto.GameMeetingDataTransferObject;
import com.techtonic.BoredGamerz.model.GameMeeting;
import com.techtonic.BoredGamerz.service.GameMeetingService;
import com.techtonic.BoredGamerz.service.UserService;
import com.techtonic.BoredGamerz.service.UserToGameMeetingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

/*
Created: in progress
Authors: Grant Fields
(c) Copyright by Company: Techtonic
Details: Handles http requests related to creating, finding, or deleting game meetings
 */

@RequestMapping("bored-gamerz/api/game-meeting")
@RestController
public class GameMeetingController {

    private final GameMeetingService GM_SERVICE;
    private final UserToGameMeetingService UTGM_SERVICE;
    private final UserService USER_SERVICE;

    @Autowired
    public GameMeetingController(GameMeetingService GM_SERVICE,
                          UserToGameMeetingService UTGM_SERVICE,
                                 UserService USER_SERVICE){

        this.GM_SERVICE = GM_SERVICE;
        this.UTGM_SERVICE = UTGM_SERVICE;
        this.USER_SERVICE = USER_SERVICE;
    }

    @PostMapping
    public int add(@RequestBody GameMeetingDataTransferObject gm){

        if(GM_SERVICE.add(gm, UTGM_SERVICE, USER_SERVICE) == 0) throw new SQLSaveFail();

        return 201;
    }

    @GetMapping
    public Iterable<GameMeeting> getAll(){

        return GM_SERVICE.getAll();
    }

    @GetMapping(path = "/{UUID}")
    public Optional<GameMeeting> getByGameMeetingId(@PathVariable("UUID") UUID gameMeetingId){

        Optional<GameMeeting> output = GM_SERVICE.getById(gameMeetingId);

        if(output.isEmpty()) throw new NoSuchElementException();

        return output;
    }

    @GetMapping(path = "/host/{UUID}")
    public Iterable<GameMeeting> getAllByHostId(@PathVariable("UUID") UUID hostId){

        return GM_SERVICE.getAllByHostId(hostId);
    }

    @DeleteMapping(path = "/{UUID}")
    public int deleteAllByGameMeetingId(@PathVariable("UUID") UUID gameMeetingId){

        if(GM_SERVICE.delete(gameMeetingId, UTGM_SERVICE) == 0) throw new SQLDeleteFail();

        return 200;
    }

    @PutMapping
    public int updateGameMeeting(@RequestBody GameMeetingDataTransferObject gameMeeting){

        if(gameMeeting.getAvailableSeats() !=
                GM_SERVICE.getById(gameMeeting.getId()).get().getAvailableSeats())
            throw new IllegalArgumentException();

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
