package com.techtonic.BoredGamerz.api;

import com.techtonic.BoredGamerz.model.GameMeeting;
import com.techtonic.BoredGamerz.model.UserToGameMeetingJoin;
import com.techtonic.BoredGamerz.sendGrid.MailController;
import com.techtonic.BoredGamerz.serverUtil.Exceptions.BlankBodyException;
import com.techtonic.BoredGamerz.serverUtil.Exceptions.UnauthorizedException;
import com.techtonic.BoredGamerz.serverUtil.IdTokenDecoder;
import com.techtonic.BoredGamerz.serverUtil.Exceptions.SQLDeleteFail;
import com.techtonic.BoredGamerz.serverUtil.Exceptions.SQLSaveFail;
import com.techtonic.BoredGamerz.dto.UserDataTransferObject;
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

Details: Handles http requests related to creating, finding, or deleting users
 */

@RequestMapping("bored-gamerz/api/user")
@RestController
public class UserController {

    private final MailController MAIL_CONTROLLER;

    //First we create variables to reference our 3 related services
    private final UserService USER_SERVICE;
    private final UserToGameMeetingService UTGM_SERVICE;
    private final GameMeetingService GM_SERVICE;

    //Autowired tells spring that it should create the Services for us, so we
    //don't need to populate these controller classes
    @Autowired
    public UserController(UserService USER_SERVICE,
                          UserToGameMeetingService UTGM_SERVICE,
                          GameMeetingService GM_SERVICE,
                          MailController MAIL_CONTROLLER){

        this.USER_SERVICE = USER_SERVICE;
        this.UTGM_SERVICE = UTGM_SERVICE;
        this.GM_SERVICE = GM_SERVICE;
        this.MAIL_CONTROLLER = MAIL_CONTROLLER;

        }

    //these mapping annotations will direct the clients request
    //one that does not specify a path will just follow the
    //request mapping annotation from the top
    //ie. GET http://localhost:8080/bored-gamerz/api/user
    @GetMapping
    public Iterable<User> getAll(@RequestHeader HttpHeaders headers){

        IdTokenDecoder token = new IdTokenDecoder(headers);

        String id = token.decode("sub");

        String perms = token.decode("permissions");

        if(!perms.contains("read:allUsers")) throw new UnauthorizedException();

        return USER_SERVICE.getAll();
    }

    //ie. GET http://localhost:8080/bored-gamerz/api/user/me
    @GetMapping(path = "/me")
    public Optional<User> getById(@RequestHeader HttpHeaders headers){

        IdTokenDecoder token = new IdTokenDecoder(headers);

        String id = token.decode("sub");

        return USER_SERVICE.getByAuthId(id);
    }

    //ie. DELETE http://localhost:8080/bored-gamerz/api/user/me
    @DeleteMapping(path = "/me")
    public int deleteUser(@RequestHeader HttpHeaders headers){

        IdTokenDecoder token = new IdTokenDecoder(headers);

        String id = token.decode("sub");

        MAIL_CONTROLLER.sendEmailWithSendGrid("Greetings ex-Game Connoisseur,\n\nYour account has been successfully deleted", "Account Deletion", id);

        User user = USER_SERVICE.getByAuthId(id).get();

        Iterable<GameMeeting> list = GM_SERVICE.getAllByHostId(user.getId());

        for(GameMeeting gm: list){

            Iterable<UserToGameMeetingJoin> userList = UTGM_SERVICE.getAllByGameMeetingId(gm.getId());

            for(UserToGameMeetingJoin joins: userList){

                String userId = joins.getUser().getAuth0Id();

                if(!userId.equals(id))
                    MAIL_CONTROLLER.sendEmailWithSendGrid("Greetings Game Connoisseur,\n\nA game you joined was deleted", "Meeting Deletion", userId);
            }
        }

        if(USER_SERVICE.delete(user.getId(), GM_SERVICE, UTGM_SERVICE) == 0) throw new SQLDeleteFail();

        return 200;
    }

    @DeleteMapping(path = "/{auth0Id}")
    public int deleteUser(@RequestHeader HttpHeaders headers, String auth0Id) {

        IdTokenDecoder token = new IdTokenDecoder(headers);

        String id = token.decode("sub");

        String perms = token.decode("permissions");

        if(!perms.contains("delete:users")) throw new UnauthorizedException();

        User user = USER_SERVICE.getByAuthId(id).get();

        if(USER_SERVICE.delete(user.getId(), GM_SERVICE, UTGM_SERVICE) == 0) throw new SQLDeleteFail();

        return 200;
    }

    //ie. ADD http://localhost:8080/bored-gamerz/api/user
    @PostMapping
    public int addUser(@RequestHeader HttpHeaders headers){

        IdTokenDecoder token = new IdTokenDecoder(headers);

        String id = token.decode("sub");

        UserDataTransferObject user = new UserDataTransferObject();

        user.setAuth0Id(id);

        if(USER_SERVICE.existsByAuth0Id(id) || USER_SERVICE.add(user) != null) return 201;

        throw new SQLSaveFail();
    }

    //Exception handlers tell the server how to respond to certain
    //exceptions and return a status code to the client
    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<String> handle(NoSuchElementException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("The entity does not exist");
    }

    @ExceptionHandler(BlankBodyException.class)
    public ResponseEntity<String> handle(BlankBodyException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Body did not contain required attributes");
    }

    @ExceptionHandler(SQLSaveFail.class)
    public ResponseEntity<String> handle(SQLSaveFail e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Body did not save to sql database");
    }

    @ExceptionHandler(SQLDeleteFail.class)
    public ResponseEntity<String> handle(SQLDeleteFail e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Entity could not be deleted");
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<String> handle(UnauthorizedException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You are not authorized to read all users");
    }
}
