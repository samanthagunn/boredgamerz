package com.techtonic.BoredGamerz.service;

import com.techtonic.BoredGamerz.ServerUtil.Exceptions.BlankBodyException;
import com.techtonic.BoredGamerz.ServerUtil.Exceptions.GameMeetingDateException;
import com.techtonic.BoredGamerz.ServerUtil.Exceptions.MaxGamesException;
import com.techtonic.BoredGamerz.dao.GameMeetingDataAccessObject;
import com.techtonic.BoredGamerz.dao.UserToGameMeetingJoinDataAccessObject;
import com.techtonic.BoredGamerz.dto.GameMeetingDataTransferObject;
import com.techtonic.BoredGamerz.dto.UserToGameMeetingDataTransferObject;
import com.techtonic.BoredGamerz.model.GameMeeting;

import com.techtonic.BoredGamerz.model.User;
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

Details: Handles the process of taking an http request and converting that to a DB action for
         the game meeting table
 */

@Service
public class GameMeetingService {

    private final GameMeetingDataAccessObject GM_DAO;
    private final UserToGameMeetingJoinDataAccessObject UTGMJ_DOA;

    @Autowired
    public GameMeetingService(@Qualifier("mySqlGameMeeting") GameMeetingDataAccessObject GM_DAO,
                              @Qualifier("mySqlUserGameJoin") UserToGameMeetingJoinDataAccessObject UTGMJ_DOA){
        this.GM_DAO = GM_DAO;
        this.UTGMJ_DOA = UTGMJ_DOA;
    }

    public int add(GameMeetingDataTransferObject gm,
                   UserToGameMeetingService utgmService,
                   UserService userService){

        User host;
        GameMeeting gameMeeting;

        if(gm.getHost() == null) throw new BlankBodyException();

        if(GM_DAO.countByHostId(gm.getHost()) >= 8) throw new MaxGamesException();

        host = userService.getById(gm.getHost()).get();

        if(host == null) throw new BlankBodyException();

        gameMeeting = new GameMeeting(gm);
        gameMeeting.setHost(host);

        if(!gm.isValid()) {
            if(gm.getDate().getTime() < System.currentTimeMillis()){
                throw new GameMeetingDateException();
            }
            else{
                throw new BlankBodyException();
            }
        }

        GM_DAO.save(gameMeeting);

        if(GM_DAO.existsById(gameMeeting.getId())){

            if(utgmService.add(
                    new UserToGameMeetingDataTransferObject(gm.getHost(), gameMeeting.getId()),
                    this,
                    userService) == 1){

                return 1;
            }
        }

        return 0;
    }

    public int delete(UUID gameMeetingId, UserToGameMeetingService utgmService){

        utgmService.deleteAllByGameMeetingId(gameMeetingId);
        GM_DAO.deleteById(gameMeetingId);

        return GM_DAO.existsById(gameMeetingId) ? 0 : 1;
    }

    public int deleteAllByHostId(UUID hostId){

        GM_DAO.deleteAllByHostId(hostId);

        return 1;
    }

    //Currently not safe to use
    public int update(GameMeetingDataTransferObject gm){
        if(gm.getId() != null){

            GameMeeting gameMeeting = GM_DAO.findById(gm.getId()).get();
            GameMeeting gameMeetingUpdate = new GameMeeting(gm);

            gameMeetingUpdate.setHost(gameMeeting.getHost());

            if(gameMeetingUpdate.getDate().getTime() < System.currentTimeMillis() ||
                !(gameMeeting.getGameName().equals(gameMeetingUpdate.getGameName())))
                return 0;

            GM_DAO.save(gameMeetingUpdate);

            return 1;
        }
        else{
            return 0;
        }
    }

    public Iterable<GameMeeting> getAll(){
        return GM_DAO.findAll();
    }

    public Iterable<GameMeeting> getAllByHostId(UUID hostId){
        return GM_DAO.findAllByHostId(hostId);
    }

    public Optional<GameMeeting> getById(UUID UUID){
        return GM_DAO.findById(UUID);
    }
}
