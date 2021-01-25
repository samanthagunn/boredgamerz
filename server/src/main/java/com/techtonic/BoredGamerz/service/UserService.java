package com.techtonic.BoredGamerz.service;

import com.techtonic.BoredGamerz.ServerUtil.Exceptions.BlankBodyException;
import com.techtonic.BoredGamerz.dao.UserDataAccessObject;
import com.techtonic.BoredGamerz.dto.UserDataTransferObject;
import com.techtonic.BoredGamerz.model.User;

import com.techtonic.BoredGamerz.model.UserToGameMeetingJoin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
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

Details: Handles the process of taking an http request and converting that to
         a DB action for the user table
 */

@Service
public class UserService {

    private final UserDataAccessObject USER_DAO;

    @Autowired
    public UserService(@Qualifier("mySqlUser") UserDataAccessObject USER_DAO){

        this.USER_DAO = USER_DAO;
    }

    public int add(UserDataTransferObject user){

        if(!user.isValid()) throw new BlankBodyException();

        //make sure there's no collisions
        while(USER_DAO.existsById(user.getId())){

            user.setId(UUID.randomUUID());
        }

        User tempUser = new User(user);

        USER_DAO.save(tempUser);

        if(USER_DAO.existsById(tempUser.getId())) return 1;

        return 0;
    }
    @Transactional
    public int delete(UUID userId,
                      GameMeetingService gmService,
                      UserToGameMeetingService utgmService){

        //when a user is deleted we want to delete any games they're hosting
        //then we remove them from any meetings they're in
        //then finally we delete the user

        Iterable<UserToGameMeetingJoin> seatList = utgmService.getAllByUserId(userId);

        utgmService.deleteAllByGameMeetingHostId(userId);
        utgmService.deleteAllByUserId(userId);
        gmService.deleteAllByHostId(userId);
        USER_DAO.deleteById(userId);

        return 1; //USER_DAO.existsById(userId) ? 0 : 1;
    }

    public int update(UserDataTransferObject user){

        if(!user.isValid()) throw new BlankBodyException();

        //make sure the user has a UUID, if they do ask the DB to update
        //if they don't then we return a 0 as the request has failed
        if(user.getId() != null){

            USER_DAO.save(new User(user));
            return 1;
        }

        return 0;
    }

    public Iterable<User> getAll(){

        return USER_DAO.findAll();
    }

    public Optional<User> getById(UUID uuid){

        return USER_DAO.findById(uuid);
    }

    public Optional<User> getByHashId(String email){

        Iterable<User> list = USER_DAO.findByEmailId(email.hashCode());
        Optional<User> output = null;

        //Search for a list of emails with a specific hashcode, then search that smaller
        //list for a matching email
        for (User user : list) {
            if(email.equals(user.getEmail())) output = Optional.of(user);
        }

        if(output == null) throw new NullPointerException("Email not found");

        return output;
    }
}