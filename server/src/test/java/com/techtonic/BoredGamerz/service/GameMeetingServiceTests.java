package com.techtonic.BoredGamerz.service;

import com.techtonic.BoredGamerz.dto.GameMeetingDataTransferObject;
import com.techtonic.BoredGamerz.dto.UserDataTransferObject;
import com.techtonic.BoredGamerz.model.EntityTestHelper;
import com.techtonic.BoredGamerz.model.GameMeeting;
import com.techtonic.BoredGamerz.model.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;


@SpringBootTest
class GameMeetingServiceTests {

    @Test
    void addDeleteGameTest(@Autowired UserService userService,
                     @Autowired GameMeetingService gmService,
                     @Autowired UserToGameMeetingService utgmService){

        EntityTestHelper eth = new EntityTestHelper();

        //Create new user to be host of test game
        UserDataTransferObject user1DTO = eth.randomUser();

        //Adds the user
        userService.add(user1DTO);

        //Selects this user by email address(We don't have their ID yet)
        Optional optional1 = userService.getByHashId(user1DTO.getEmail());
        User user1 = (User)optional1.get();

        //User1DTO now has an ID
        user1DTO.setId(user1.getId());

        // Create gameDTO with user1 as host
        GameMeetingDataTransferObject gameDTO = eth.randomGameMeeting(user1);

        //add the game
        gmService.add(gameDTO,utgmService,userService);

        //Create iterable of all games hosted by user1
        Iterable<GameMeeting> gameMeetingList = gmService.getAllByHostId(user1.getId());

        int counter = 0;

        //Iterate through gameMeetingList
        for (GameMeeting gm : gameMeetingList){
            counter++;
            System.out.println(gm);
            Assertions.assertEquals(gmService.delete(gm.getId(),utgmService),1);
        }

        Assertions.assertNotEquals(counter,0);
        userService.delete(user1.getId(),gmService,utgmService);
    }

    @Test
    void deleteHostDeletesGame(@Autowired UserService userService,
                           @Autowired GameMeetingService gmService,
                           @Autowired UserToGameMeetingService utgmService){

        EntityTestHelper eth = new EntityTestHelper();

        //Create new user to be host of test game
        UserDataTransferObject user1DTO = eth.randomUser();

        //Adds the user
        userService.add(user1DTO);

        //Selects this user by email address(We don't have their ID yet)
        Optional optional1 = userService.getByHashId(user1DTO.getEmail());
        User user1 = (User)optional1.get();

        //User1DTO now has an ID
        user1DTO.setId(user1.getId());

        // Create gameDTO with user1 as host
        GameMeetingDataTransferObject gameDTO1 = eth.randomGameMeeting(user1);
        GameMeetingDataTransferObject gameDTO2 = eth.randomGameMeeting(user1);
        GameMeetingDataTransferObject gameDTO3 = eth.randomGameMeeting(user1);

        //add the game
        gmService.add(gameDTO1,utgmService,userService);
        gmService.add(gameDTO2,utgmService,userService);
        gmService.add(gameDTO3,utgmService,userService);

        Assertions.assertEquals(userService.delete(user1.getId(),gmService,utgmService),1);

        //Create iterable of all games hosted by user1
        Iterable<GameMeeting> gameMeetingList = gmService.getAllByHostId(user1.getId());

        int counter = 0;

        //Iterate through gameMeetingList
        for (GameMeeting gm : gameMeetingList){
            counter++;
        }

        Assertions.assertEquals(counter,0);

    }

}
