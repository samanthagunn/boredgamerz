package com.techtonic.BoredGamerz.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import com.techtonic.BoredGamerz.ServerUtil.ConsoleUtil;

import com.techtonic.BoredGamerz.model.GameMeeting;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;
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
         model for the game meeting table
 */

public class GameMeetingDataTransferObject {

    private UUID id = UUID.randomUUID();
    private UUID hostId;

    private Integer availableSeats;

    private Date date;

    private String title;
    private String description;
    private String gameName;
    private String category;
    private String address;

    public GameMeetingDataTransferObject(){}

    @Autowired
    public GameMeetingDataTransferObject(
            @JsonProperty("id") UUID id,
            @JsonProperty("availableSeats") Integer availableSeats,
            @JsonProperty("date") Date date,
            @JsonProperty("title") String title,
            @JsonProperty("description") String description,
            @JsonProperty("gameName") String gameName,
            @JsonProperty("category") String category,
            @JsonProperty("address") String address,
            @JsonProperty("hostId") UUID hostId){
        if(id != null)
            this.id = id;
        this.availableSeats = availableSeats;
        this.date = date;
        this.title = title;
        this.description = description;
        this.gameName = gameName;
        this.category = category;
        this.address = address;
        this.hostId = hostId;
    }

    public GameMeetingDataTransferObject(GameMeeting gm){
        this.id = gm.getId();
        this.availableSeats = gm.getAvailableSeats();
        this.date = gm.getDate();
        this.title = gm.getTitle();
        this.description = gm.getDescription();
        this.gameName = gm.getGameName();
        this.category = gm.getCategory();
        this.address = gm.getAddress();
        this.hostId = gm.getHost().getId();
    }

    public boolean isValid(){

        return(
                availableSeats != null &&
                date != null &&
                date.getTime() > System.currentTimeMillis() &&
                title != null &&
                description != null &&
                gameName != null &&
                category != null &&
                address != null
        );
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id){
        this.id = id;
    }

    public UUID getHost() {
        return hostId;
    }

    public void setHost(UUID hostId) {
        this.hostId = hostId;
    }

    public Integer getAvailableSeats() {
        return availableSeats;
    }

    public void setAvailableSeats(Integer availableSeats) {
        this.availableSeats = availableSeats;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getGameName() {
        return gameName;
    }

    public void setGameName(String gameName) {
        this.gameName = gameName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Override
    public String toString() {
        return ConsoleUtil.JsonString(this);
    }
}

