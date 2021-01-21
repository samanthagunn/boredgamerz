package com.techtonic.BoredGamerz.dao;

import com.techtonic.BoredGamerz.model.GameMeeting;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

/*
Created: in progress
Authors: Grant Fields
(c) Copyright by Company: Techtonic
Details: Interacts with DB to complete CRUD operations for the game meeting table
 */

@Repository("mySqlGameMeeting")
public interface GameMeetingDataAccessObject extends JpaRepository<GameMeeting, UUID> {

    Iterable<GameMeeting> findAllByHostId(UUID hostId);

    boolean existsByHostId(UUID hostId);
}
