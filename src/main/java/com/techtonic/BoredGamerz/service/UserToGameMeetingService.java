package com.techtonic.BoredGamerz.service;

import com.techtonic.BoredGamerz.ServerUtil.Exceptions.BlankBodyException;
import com.techtonic.BoredGamerz.dao.UserToGameMeetingJoinDataAccessObject;
import com.techtonic.BoredGamerz.dto.UserToGameMeetingDataTransferObject;
import com.techtonic.BoredGamerz.model.GameMeeting;
import com.techtonic.BoredGamerz.model.User;
import com.techtonic.BoredGamerz.model.UserToGameMeetingJoin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

/*
Created: in progress
Authors: Grant Fields
(c) Copyright by Company: Techtonic
Details: Handles the process of taking an http request and converting that to a
         DB action for the user game meeting join table
 */

@Service
public class UserToGameMeetingService {

    private final UserToGameMeetingJoinDataAccessObject UTGMJ_DAO;

    @Autowired
    public UserToGameMeetingService(@Qualifier("mySqlUserGameJoin")
                                                UserToGameMeetingJoinDataAccessObject UTGMJ_DAO){
        this.UTGMJ_DAO = UTGMJ_DAO;
    }

    public int add(UserToGameMeetingDataTransferObject utgmj,
                   GameMeetingService gmService,
                   UserService userService){

        User user;
        GameMeeting gm;

        if(!utgmj.isValid()) throw new BlankBodyException();

        user = userService.getById(utgmj.getUser()).get();
        gm = gmService.getById(utgmj.getGameMeeting()).get();

        if(user == null || gm == null) throw new BlankBodyException();

        //Check if a game has available seats, if it does remove a seat and add the user
        if(gm.getAvailableSeats() > 0) {
            gm.setAvailableSeats(gm.getAvailableSeats() - 1);

            UTGMJ_DAO.save(new UserToGameMeetingJoin(user, gm));

            return 1;
        }

        return 0;
    }

    public int delete(UserToGameMeetingDataTransferObject utgmj,
                      GameMeetingService gmService){

        //When we unjoin a user we want to add their seat back to the available seats
        GameMeeting gm = gmService.getById(utgmj.getGameMeeting()).get();
        gm.setAvailableSeats(gm.getAvailableSeats() + 1);

        gmService.update(gm);
        UTGMJ_DAO.deleteById(utgmj.getId());

        return UTGMJ_DAO.existsById(utgmj.getId()) ? 0 : 1;
    }

    public int deleteAllByGameMeetingId(UUID gameMeetingId){
        UTGMJ_DAO.deleteAllByGameMeetingId(gameMeetingId);

        return UTGMJ_DAO.existsByGameMeetingId(gameMeetingId) ? 0 : 1;
    }

    public int deleteAllByUserId(UUID userId){
        UTGMJ_DAO.deleteAllByUserId(userId);

        return UTGMJ_DAO.existsByGameMeetingId(userId) ? 0 : 1;
    }

    public Iterable<UserToGameMeetingJoin> getAllByUserId(UUID userId){

        return UTGMJ_DAO.findAllByUserId(userId);
    }

    public Iterable<UserToGameMeetingJoin> getAllByGameMeetingId(UUID gameMeetingId){

        return UTGMJ_DAO.findAllByGameMeetingId(gameMeetingId);
    }

    public Iterable<UserToGameMeetingJoin> getAll(){
        return UTGMJ_DAO.findAll();
    }

    public Optional<UserToGameMeetingJoin> getByCompositeId(String compositeId){
        return UTGMJ_DAO.findById(compositeId);
    }
}
