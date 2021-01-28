package com.techtonic.BoredGamerz.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import com.techtonic.BoredGamerz.ServerUtil.ConsoleUtil;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;

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

Details: Handles the transfer of data from an http request to a
         database model for the user table
 */

public class UserDataTransferObject {

    private UUID id;

    private String auth0Id;

    private String salt;

    public UserDataTransferObject(){}

    @Autowired
    public UserDataTransferObject(
            @JsonProperty("auth0Id") String auth0Id,
            @JsonProperty("id") UUID id){
        this.auth0Id = auth0Id;
        this.id = id;
    }

    public boolean isValid(){

        if( auth0Id == null || auth0Id.trim() == "") return false;

        return true;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id){

        this.id = id;
    }

    public String getAuth0Id() {
        return auth0Id;
    }

    public void setAuth0Id(String auth0Id) {
        this.auth0Id = auth0Id;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    @Override
    public String toString() {
        return ConsoleUtil.JsonString(this);
    }
}
