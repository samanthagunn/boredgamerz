package com.techtonic.BoredGamerz.model;

import com.techtonic.BoredGamerz.ServerUtil.ConsoleUtil;

import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotBlank;

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

Details: Define a game meeting model to be stored in the user game meeting join table
 */

@Entity
@Table(name = "usersToGameMeetingJoin", uniqueConstraints=@UniqueConstraint(columnNames={"id"}))
public class UserToGameMeetingJoin {

    @Id
    private String id;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne
    @JoinColumn(name = "gameMeetingId")
    private GameMeeting gameMeeting;

    public UserToGameMeetingJoin(){}

    @Autowired
    public UserToGameMeetingJoin(User user, GameMeeting gameMeeting){
        this.user = user;
        this.gameMeeting = gameMeeting;
        this.id = gameMeeting.getId().toString() + user.getId().toString();
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;

        if(gameMeeting != null){

            id = gameMeeting.getId().toString() + user.getId().toString();
        }
    }

    public GameMeeting getGameMeeting() {
        return gameMeeting;
    }

    public void setGameMeeting(GameMeeting gameMeeting) {
        this.gameMeeting = gameMeeting;

        if(user != null){

            id = gameMeeting.getId().toString() + user.getId().toString();
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
