package com.techtonic.BoredGamerz.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import com.techtonic.BoredGamerz.ServerUtil.ConsoleUtil;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;

/*
Created: in progress
Authors: Grant Fields
(c) Copyright by Company: Techtonic
Details: Handles the transfer of data from an http request to a
         database model for the user table
 */

public class UserDataTransferObject {

    private UUID id;

    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String country;

    public UserDataTransferObject(){}

    @Autowired
    public UserDataTransferObject(
                @JsonProperty("userId") UUID id,
                @JsonProperty("email") String email,
                @JsonProperty("firstName") String firstName,
                @JsonProperty("lastName") String lastName,
                @JsonProperty("country") String country,
                @JsonProperty("username") String username){
        this.id = id;
        this.email = email;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.country = country;
    }

    public boolean isValid(){

        if( username == null ||
                email == null ||
                firstName == null ||
                lastName == null ||
                country == null ) return false;

        return true;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id){

        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    @Override
    public String toString() {
        return ConsoleUtil.JsonString(this);
    }
}
