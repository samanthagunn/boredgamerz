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
                           //Autowire means the function needs to make the arguments for me
                           @Autowired GameMeetingService gmService,
                           @Autowired UserToGameMeetingService utgmService) {
        EntityTestHelper eth = new EntityTestHelper();

        UserDataTransferObject user1DTO = eth.randomUser();
        UserDataTransferObject user2DTO = eth.randomUser();
        UserDataTransferObject user3DTO = eth.randomUser();

        userService.add(user1DTO);
        userService.add(user2DTO);
        userService.add(user3DTO);

        Optional optional1 = userService.getByHashId(user1DTO.getEmail());
        Optional optional2 = userService.getByHashId(user2DTO.getEmail());
        Optional optional3 = userService.getByHashId(user3DTO.getEmail());

        User user1 = (User)optional1.get();
        User user2 = (User)optional2.get();
        User user3 = (User)optional3.get();

        String user1String = user1.toString();
        String user2String = user2.toString();
        String user3String = user3.toString();

        user1DTO.setId(user1.getId());
        user2DTO.setId(user2.getId());
        user3DTO.setId(user3.getId());

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

    @Test
    void userUpdateTest(@Autowired UserService userService,
                           @Autowired GameMeetingService gmService,
                           @Autowired UserToGameMeetingService utgmService) {
        EntityTestHelper eth = new EntityTestHelper();

        UserDataTransferObject userDTO = eth.randomUser();
        UserDataTransferObject userUpdate = eth.randomUser();

        userService.add(userDTO);

        Optional optional1 = userService.getByHashId(userDTO.getEmail());

        User user = (User)optional1.get();
        userUpdate.setId(user.getId());
        User userOverwrite = new User (userUpdate);

        userService.update(userUpdate);

        Assertions.assertEquals(userService.getById(userUpdate.getId()).get().toString(), userOverwrite.toString());

        Assertions.assertEquals(userService.delete(userUpdate.getId(), gmService, utgmService), 1);

    }
}
