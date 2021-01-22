package com.techtonic.BoredGamerz.dao;

import com.techtonic.BoredGamerz.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

/*
Created: in progress
Authors: Grant Fields
(c) Copyright by Company: Techtonic
Details: Interacts with DB to complete CRUD operations for the User table
 */

@Repository("mySqlUser")
public interface UserDataAccessObject extends JpaRepository<User, UUID> {

    //JPARepository instantiates all of these by default
    //https://docs.spring.io/spring-data/jpa/docs/current/api/org/springframework/data/jpa/repository/JpaRepository.html

    //Useful for building your own server queries:
    //https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.repositories
    Iterable<User> findByEmailId(int EmailId);

    Optional<User> findById(UUID id);
}
