package com.techtonic.BoredGamerz.service;

import com.techtonic.BoredGamerz.dto.UserDataTransferObject;
import com.techtonic.BoredGamerz.model.EntityTestHelper;
import com.techtonic.BoredGamerz.model.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

@SpringBootTest
class UserServiceTests {

    @Test
    void addDeleteUserTest(@Autowired UserService userService,
                           //Autowired means the function needs to make the arguments for me
                           @Autowired GameMeetingService gmService,
                           @Autowired UserToGameMeetingService utgmService) {
        EntityTestHelper eth = new EntityTestHelper();

        UserDataTransferObject user1DTO = eth.randomUser();
        UserDataTransferObject user2DTO = eth.randomUser();
        UserDataTransferObject user3DTO = eth.randomUser();

        user1DTO.setId(userService.add(user1DTO));
        user2DTO.setId(userService.add(user2DTO));
        user3DTO.setId(userService.add(user3DTO));

        Optional optional1 = userService.getById(user1DTO.getId());
        Optional optional2 = userService.getById(user2DTO.getId());
        Optional optional3 = userService.getById(user3DTO.getId());

        User user1 = (User)optional1.get();
        User user2 = (User)optional2.get();
        User user3 = (User)optional3.get();

        String user1String = user1.toString();
        String user2String = user2.toString();
        String user3String = user3.toString();

        Assertions.assertEquals(user1String,new User(user1DTO).toString());
        Assertions.assertEquals(user2String,new User(user2DTO).toString());
        Assertions.assertEquals(user3String,new User(user3DTO).toString());


        System.out.println("User1: \n" + userService.getById(user1.getId()).get());
        System.out.println("User2: \n" + userService.getById(user2.getId()).get());
        System.out.println("User3: \n" + userService.getById(user3.getId()).get());

        Assertions.assertEquals(userService.delete(user1.getId(), gmService, utgmService), 1);
        Assertions.assertEquals(userService.delete(user2.getId(), gmService, utgmService), 1);
        Assertions.assertEquals(userService.delete(user3.getId(), gmService, utgmService), 1);
    }
}
