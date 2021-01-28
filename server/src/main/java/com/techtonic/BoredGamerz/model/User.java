package com.techtonic.BoredGamerz.model;

import com.techtonic.BoredGamerz.dto.UserDataTransferObject;
import com.techtonic.BoredGamerz.ServerUtil.ConsoleUtil;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
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

Details: Define a game meeting model to be stored in the user table
 */

@Entity
@Table(name = "users", uniqueConstraints=@UniqueConstraint(columnNames={"id"}))
public class User {

    @Id
    @Column(name = "id", columnDefinition = "BINARY(16)")
    private UUID id = UUID.randomUUID();

    private String auth0Id;

    private String salt;

    public User(){}

    public User(UserDataTransferObject user){
        this.id = user.getId();
        this.auth0Id = user.getAuth0Id();
        this.salt = user.getSalt();
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
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
