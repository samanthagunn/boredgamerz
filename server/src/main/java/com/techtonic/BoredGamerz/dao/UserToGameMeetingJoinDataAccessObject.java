package com.techtonic.BoredGamerz.dao;

import com.techtonic.BoredGamerz.model.UserToGameMeetingJoin;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

/*
Created: in progress
Authors: Grant Fields
(c) Copyright by Company: Techtonic
Details: Interacts with DB to complete CRUD operations for the user game meeting join table
 */

@Repository("mySqlUserGameJoin")
public interface UserToGameMeetingJoinDataAccessObject
        extends JpaRepository<UserToGameMeetingJoin, String> {

    Iterable<UserToGameMeetingJoin> findAllByUserId(UUID userId);

    Iterable<UserToGameMeetingJoin> findAllByGameMeetingId(UUID gameMeetingId);

    void deleteAllByGameMeetingId(UUID gameMeetingId);

    void deleteAllByUserId(UUID userId);

    void deleteAllByGameMeetingHostId(UUID hostId);

    boolean existsByUserIdAndGameMeetingHostId(UUID userId, UUID hostId);

    boolean existsByGameMeetingId(UUID gameMeetingId);

    boolean existsByUserId(UUID userId);
}
