package com.techtonic.BoredGamerz.service;

import com.techtonic.BoredGamerz.dto.GameMeetingDataTransferObject;
import com.techtonic.BoredGamerz.dto.UserDataTransferObject;
import com.techtonic.BoredGamerz.dto.UserToGameMeetingDataTransferObject;
import com.techtonic.BoredGamerz.model.EntityTestHelper;
import com.techtonic.BoredGamerz.model.GameMeeting;
import com.techtonic.BoredGamerz.model.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

@SpringBootTest
class UserToGameMeetingServiceTests {

    @Test
    void unjoinUserOnDelete(@Autowired UserService userService,
                            @Autowired GameMeetingService gmService,
                            @Autowired UserToGameMeetingService utgmService){

        EntityTestHelper eth = new EntityTestHelper();

        //Create Random Users
        UserDataTransferObject userHostDTO = eth.randomUser();
        UserDataTransferObject userPlayerDTO = eth.randomUser();

        //Add new users
        userService.add(userHostDTO);
        userService.add(userPlayerDTO);

        //Selects the users by email address(We don't have their ID yet)
        Optional optionalHost = userService.getByHashId(userHostDTO.getEmail());
        Optional optionalPlayer = userService.getByHashId(userPlayerDTO.getEmail());

        //Go get users new ID
        User userHost = (User)optionalHost.get();
        User userPlayer = (User)optionalPlayer.get();

        //Give userID to DTO
        userHostDTO.setId(userHost.getId());
        userPlayerDTO.setId(userPlayer.getId());

        // Create gameDTOs with userHost as host
        GameMeetingDataTransferObject gameDTO1 = eth.randomGameMeeting(userHost);
        GameMeetingDataTransferObject gameDTO2 = eth.randomGameMeeting(userHost);
        GameMeetingDataTransferObject gameDTO3 = eth.randomGameMeeting(userHost);

        //Add Games
        gmService.add(gameDTO1,utgmService,userService);
        gmService.add(gameDTO2,utgmService,userService);
        gmService.add(gameDTO3,utgmService,userService);

        //Create iterable of all games hosted by userHost
        Iterable<GameMeeting> gameMeetingList = gmService.getAllByHostId(userHost.getId());

        int counter =0;

        UserToGameMeetingDataTransferObject guestDTO1[]= new UserToGameMeetingDataTransferObject[3];
        //Iterate through gameMeetingList
        for (GameMeeting gm : gameMeetingList){
            guestDTO1[counter] = new UserToGameMeetingDataTransferObject(userPlayer.getId(),gm.getId());
            utgmService.add(guestDTO1[counter],gmService,userService);
            counter++;
        }

        userService.delete(userPlayer.getId(),gmService,utgmService);

        Assertions.assertNotEquals(utgmService.existsByUserId(userPlayer.getId()),true);

    }

    @Test
    void unjoinUserOnHostDelete(@Autowired UserService userService,
                            @Autowired GameMeetingService gmService,
                            @Autowired UserToGameMeetingService utgmService){

        EntityTestHelper eth = new EntityTestHelper();

        //Create Random Users
        UserDataTransferObject userHostDTO = eth.randomUser();
        UserDataTransferObject userPlayerDTO = eth.randomUser();

        //Add new users
        userService.add(userHostDTO);
        userService.add(userPlayerDTO);

        //Selects the users by email address(We don't have their ID yet)
        Optional optionalHost = userService.getByHashId(userHostDTO.getEmail());
        Optional optionalPlayer = userService.getByHashId(userPlayerDTO.getEmail());

        //Go get users new ID
        User userHost = (User)optionalHost.get();
        User userPlayer = (User)optionalPlayer.get();

        //Give userID to DTO
        userHostDTO.setId(userHost.getId());
        userPlayerDTO.setId(userPlayer.getId());

        // Create gameDTOs with userHost as host
        GameMeetingDataTransferObject gameDTO1 = eth.randomGameMeeting(userHost);
        GameMeetingDataTransferObject gameDTO2 = eth.randomGameMeeting(userHost);
        GameMeetingDataTransferObject gameDTO3 = eth.randomGameMeeting(userHost);

        //Add Games
        gmService.add(gameDTO1,utgmService,userService);
        gmService.add(gameDTO2,utgmService,userService);
        gmService.add(gameDTO3,utgmService,userService);

        //Create iterable of all games hosted by userHost
        Iterable<GameMeeting> gameMeetingList = gmService.getAllByHostId(userHost.getId());

        int counter =0;

        UserToGameMeetingDataTransferObject guestDTO1[]= new UserToGameMeetingDataTransferObject[3];
        //Iterate through gameMeetingList
        for (GameMeeting gm : gameMeetingList){
            guestDTO1[counter] = new UserToGameMeetingDataTransferObject(userPlayer.getId(),gm.getId());
            utgmService.add(guestDTO1[counter],gmService,userService);
            counter++;
        }

        Assertions.assertNotEquals(utgmService.existsByUserId(userPlayer.getId()),false);

        userService.delete(userHost.getId(),gmService,utgmService);

        Assertions.assertNotEquals(utgmService.existsByUserId(userPlayer.getId()),true);

        userService.delete(userPlayer.getId(),gmService,utgmService);

    }

    @Test
    void deleteGameUnjoinsUsers(@Autowired UserService userService,
                            @Autowired GameMeetingService gmService,
                            @Autowired UserToGameMeetingService utgmService){

        EntityTestHelper eth = new EntityTestHelper();

        //Create Random Users
        UserDataTransferObject userHostDTO = eth.randomUser();
        UserDataTransferObject userPlayerDTO = eth.randomUser();

        //Add new users
        userService.add(userHostDTO);
        userService.add(userPlayerDTO);

        //Selects the users by email address(We don't have their ID yet)
        Optional optionalHost = userService.getByHashId(userHostDTO.getEmail());
        Optional optionalPlayer = userService.getByHashId(userPlayerDTO.getEmail());

        //Go get users new ID
        User userHost = (User)optionalHost.get();
        User userPlayer = (User)optionalPlayer.get();

        //Give userID to DTO
        userHostDTO.setId(userHost.getId());
        userPlayerDTO.setId(userPlayer.getId());

        // Create gameDTOs with userHost as host
        GameMeetingDataTransferObject gameDTO1 = eth.randomGameMeeting(userHost);
        GameMeetingDataTransferObject gameDTO2 = eth.randomGameMeeting(userHost);
        GameMeetingDataTransferObject gameDTO3 = eth.randomGameMeeting(userHost);

        //Add Games
        gmService.add(gameDTO1,utgmService,userService);

        //Create iterable of all games hosted by userHost
        Iterable<GameMeeting> gameMeetingList = gmService.getAllByHostId(userHost.getId());

        int counter =0;

        //Iterate through gameMeetingList
        for (GameMeeting gm : gameMeetingList){
            UserToGameMeetingDataTransferObject guestDTO1 =
                    new UserToGameMeetingDataTransferObject(userPlayer.getId(),gm.getId());
            utgmService.add(guestDTO1, gmService, userService);
            gmService.delete(gm.getId(), utgmService);
            counter++;
        }

        Assertions.assertNotEquals(utgmService.existsByUserId(userPlayer.getId()),true);
        Assertions.assertNotEquals(utgmService.existsByUserId(userHost.getId()),true);

        userService.delete(userHost.getId(),gmService,utgmService);
        userService.delete(userPlayer.getId(),gmService,utgmService);
    }
}
