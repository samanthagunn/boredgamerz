package com.techtonic.BoredGamerz.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import com.techtonic.BoredGamerz.serverUtil.ConsoleUtil;

import org.springframework.beans.factory.annotation.Autowired;

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

Details: Handles the transfer of data from an http request to a database
         model for the user game meetings join table
 */

public class UserToGameMeetingDataTransferObject {

    private String id;
    private UUID userId;
    private UUID gameMeetingId;

    public UserToGameMeetingDataTransferObject(){}

    @Autowired
    public UserToGameMeetingDataTransferObject(@JsonProperty("userId") UUID userId,
                                               @JsonProperty("gameMeetingId") UUID gameMeetingId){
        this.userId = userId;
        this.gameMeetingId = gameMeetingId;
        id = "" + gameMeetingId + userId;
    }

    public boolean isValid(){

        if( id == null ||
                userId == null ||
                gameMeetingId == null ) return false;

        return true;
    }

    public UUID getUser() {
        return userId;
    }

    public void setUser(UUID userId) {
        this.userId = userId;

        if(gameMeetingId != null){

            id = gameMeetingId.toString() + userId.toString();
        }
    }

    public UUID getGameMeeting() {
        return gameMeetingId;
    }

    public void setGameMeeting(UUID gameMeetingId) {
        this.gameMeetingId = gameMeetingId;

        if(userId != null){

            id = gameMeetingId.toString() + userId.toString();
        }
    }

    public String getId() {
        return id;
    }

    @Override
    public String toString() {
        return ConsoleUtil.JsonString(this);
    }
}
