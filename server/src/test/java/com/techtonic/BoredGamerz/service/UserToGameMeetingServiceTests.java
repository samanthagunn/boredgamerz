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
        userHostDTO.setId(userService.add(userHostDTO));
        userPlayerDTO.setId(userService.add(userPlayerDTO));

        //Selects the users by email address(We don't have their ID yet)
        Optional optionalHost = userService.getById(userHostDTO.getId());
        Optional optionalPlayer = userService.getById(userPlayerDTO.getId());

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

        Assertions.assertEquals(utgmService.existsByUserId(userPlayer.getId()),false);

        userService.delete(userHost.getId(),gmService,utgmService);
    }

    @Test
    void unjoinUserOnHostDelete(@Autowired UserService userService,
                                @Autowired GameMeetingService gmService,
                                @Autowired UserToGameMeetingService utgmService){
        EntityTestHelper eth = new EntityTestHelper();

        //Create Random Users
        UserDataTransferObject userHostDTO = eth.randomUser();
        UserDataTransferObject userHost2DTO = eth.randomUser();
        UserDataTransferObject userPlayerDTO = eth.randomUser();

        //Add new users
        userHostDTO.setId(userService.add(userHostDTO));
        userHost2DTO.setId(userService.add(userHost2DTO));
        userPlayerDTO.setId(userService.add(userPlayerDTO));

        Optional optionalHost = userService.getById(userHostDTO.getId());
        Optional optionalHost2 = userService.getById(userHost2DTO.getId());
        Optional optionalPlayer = userService.getById(userPlayerDTO.getId());

        //Go get users from DB
        User userHost = (User)optionalHost.get();
        User userHost2 = (User)optionalHost2.get();
        User userPlayer = (User)optionalPlayer.get();

        // Create gameDTOs with userHost as host
        GameMeetingDataTransferObject gameDTO1 = eth.randomGameMeeting(userHost);
        GameMeetingDataTransferObject gameDTO2 = eth.randomGameMeeting(userHost);
        GameMeetingDataTransferObject gameDTO3 = eth.randomGameMeeting(userHost);

        // Game for host2
        GameMeetingDataTransferObject gameDTO4 = eth.randomGameMeeting(userHost2);

        //Add Games
        gmService.add(gameDTO1,utgmService,userService);
        gmService.add(gameDTO2,utgmService,userService);
        gmService.add(gameDTO3,utgmService,userService);
        gmService.add(gameDTO4,utgmService,userService);

        //Create iterable of all games hosted by userHost
        Iterable<GameMeeting> gameMeetingList = gmService.getAllByHostId(userHost.getId());
        int counter =0;

        //Add player model to games belonging to host1
        UserToGameMeetingDataTransferObject guestDTO1[]= new UserToGameMeetingDataTransferObject[3];

        //Iterate through gameMeetingList
        for (GameMeeting gm : gameMeetingList){
            guestDTO1[counter] = new UserToGameMeetingDataTransferObject(userPlayer.getId(),gm.getId());
            utgmService.add(guestDTO1[counter],gmService,userService);
            counter++;
        }

        //Adds player to game belonging to host2
        Iterable<GameMeeting> gameMeetingList2 = gmService.getAllByHostId(userHost2.getId());

        //Iterate through gameMeetingList
        for (GameMeeting gm : gameMeetingList2){
            utgmService.add(new UserToGameMeetingDataTransferObject( userPlayer.getId(),gm.getId()),
                    gmService,
                    userService);
        }

        // Checks if player is in any games
        Assertions.assertEquals(utgmService.existsByUserId(userPlayer.getId()),true);

        // Deletes Host1 which will delete his 3 games
        userService.delete(userHost.getId(),gmService,utgmService);

        //Checks if player is in game hosted by host1
        Assertions.assertEquals(utgmService.existsByUserIdAndGameMeetingHostId(userPlayer.getId(),userHost.getId()),false);

        //confirms player was not deleted from host2's game
        Assertions.assertEquals(utgmService.existsByUserIdAndGameMeetingHostId(userPlayer.getId(),userHost2.getId()),true);

        //deletes host2(their game) and player
        userService.delete(userPlayer.getId(),gmService,utgmService);
        userService.delete(userHost2.getId(),gmService,utgmService);
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
        userHostDTO.setId(userService.add(userHostDTO));
        userPlayerDTO.setId(userService.add(userPlayerDTO));

        //Selects the users by id
        Optional optionalHost = userService.getById(userHostDTO.getId());
        Optional optionalPlayer = userService.getById(userPlayerDTO.getId());

        //Go get users from database
        User userHost = (User)optionalHost.get();
        User userPlayer = (User)optionalPlayer.get();

        // Create gameDTOs with userHost as host
        GameMeetingDataTransferObject gameDTO = eth.randomGameMeeting(userHost);

        //Add Games
        gmService.add(gameDTO,utgmService,userService);

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

        Assertions.assertEquals(utgmService.existsByUserId(userPlayer.getId()),false);
        Assertions.assertEquals(utgmService.existsByUserId(userHost.getId()),false);

        userService.delete(userHost.getId(),gmService,utgmService);
        userService.delete(userPlayer.getId(),gmService,utgmService);
    }
}
