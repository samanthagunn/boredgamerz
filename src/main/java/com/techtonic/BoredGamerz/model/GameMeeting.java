package com.techtonic.BoredGamerz.model;

import com.techtonic.BoredGamerz.ServerUtil.ConsoleUtil;
import com.techtonic.BoredGamerz.dto.GameMeetingDataTransferObject;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import java.util.Date;
import java.util.UUID;

/*
Created: in progress
Authors: Grant Fields
(c) Copyright by Company: Techtonic
Details: Define a game meeting model to be stored in the game meeting table
 */

@Entity
@Table(name = "game_meetings", uniqueConstraints=@UniqueConstraint(columnNames={"id"}))
public class GameMeeting {

    @Id
    @Column(name = "id", columnDefinition = "BINARY(16)")
    private UUID id = UUID.randomUUID();

    @OneToOne
    @NotNull
    private User host;

    @Min(0)
    @Max(16)
    @Column(name = "availableSeats")
    private Integer availableSeats;

    @NotNull
    @Column(name = "date")
    private Date date;

    @NotBlank
    @Column(name = "title")
    private String title;

    @NotBlank
    @Column(name = "description", columnDefinition="LONGTEXT")
    private String description;

    @NotBlank
    @Column(name = "gameName")
    private String gameName;

    @NotBlank
    @Column(name = "category")
    private String category;

    @NotBlank
    @Column(name = "address")
    private String address;

    public GameMeeting(){}

    public GameMeeting(GameMeetingDataTransferObject gameMeeting){
        this.availableSeats = gameMeeting.getAvailableSeats();
        this.date = gameMeeting.getDate();
        this.title = gameMeeting.getTitle();
        this.description = gameMeeting.getDescription();
        this.gameName = gameMeeting.getGameName();
        this.category = gameMeeting.getCategory();
        this.address = gameMeeting.getAddress();
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public User getHost() {
        return host;
    }

    public void setHost(User host) {
        this.host = host;
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

