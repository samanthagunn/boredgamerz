package com.techtonic.BoredGamerz.api;

import com.techtonic.BoredGamerz.ServerUtil.Exceptions.BlankBodyException;
import com.techtonic.BoredGamerz.ServerUtil.Exceptions.SQLDeleteFail;
import com.techtonic.BoredGamerz.ServerUtil.Exceptions.SQLSaveFail;
import com.techtonic.BoredGamerz.dto.UserDataTransferObject;
import com.techtonic.BoredGamerz.model.User;
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

    //First we create variables to reference our 3 related services
    private final UserService USER_SERVICE;
    private final UserToGameMeetingService UTGM_SERVICE;
    private final GameMeetingService GM_SERVICE;

    //Autowired tells spring that it should create the Services for us, so we
    //don't need to populate these controller classes
    @Autowired
    public UserController(UserService USER_SERVICE,
                          UserToGameMeetingService UTGM_SERVICE,
                          GameMeetingService GM_SERVICE){

        this.USER_SERVICE = USER_SERVICE;
        this.UTGM_SERVICE = UTGM_SERVICE;
        this.GM_SERVICE = GM_SERVICE;
    }

    //these mapping annotations will direct the clients request
    //one that does not specify a path will just follow the
    //request mapping annotation from the top
    //ie. GET http://localhost:8080/bored-gamerz/api/user
    @GetMapping
    public Iterable<User> getAll(){

        return USER_SERVICE.getAll();
    }

    //this one defines an additional path and identifies it as a variable
    //by using the {}
    //ie. GET http://localhost:8080/bored-gamerz/api/user/{email}
    //this method searches users by email
    @GetMapping(path = "/{email}")
    public Optional<User> getByEmail(@PathVariable("email") String email){

        //get User object wrapped inside of an optional
        Optional<User> output = USER_SERVICE.getByHashId(email);

        //if the optional is null then we know that the user doesnt exist and we should
        //return a 404 error
        if(output == null) throw new NoSuchElementException();

        return output;
    }

    //ie. GET http://localhost:8080/bored-gamerz/api/user/id/{UUID}
    @GetMapping(path = "/id/{UUID}")
    public Optional<User> getById(@PathVariable("UUID") UUID uuid){

        return USER_SERVICE.getById(uuid);
    }

    //ie. DELETE http://localhost:8080/bored-gamerz/api/user/id/{UUID}
    @DeleteMapping(path = "/id/{UUID}")
    public int deleteUserByUUID(@PathVariable("UUID") UUID uuid){

        if(USER_SERVICE.delete(uuid, GM_SERVICE, UTGM_SERVICE) == 0) throw new SQLDeleteFail();

        return 200;
    }

    //ie. PUT http://localhost:8080/bored-gamerz/api/user
    //this method expects the user being sent in to already have a UUID
    //if they do we update the user
    @PutMapping
    public int updateUser(@RequestBody UserDataTransferObject user){

        if(USER_SERVICE.update(user) == 0) throw new SQLSaveFail();

        return 200;
    }

    //ie. ADD http://localhost:8080/bored-gamerz/api/user
    //this method is the same as the post except the user does not need a UUID
    @PostMapping
    public int addUser(@RequestBody UserDataTransferObject user){

        if(USER_SERVICE.add(user) == 0) throw new SQLSaveFail();

        return 201;
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
}
