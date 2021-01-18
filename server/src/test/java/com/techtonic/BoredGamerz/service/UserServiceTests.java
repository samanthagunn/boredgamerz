package com.techtonic.BoredGamerz.service;

import com.techtonic.BoredGamerz.dto.UserDataTransferObject;
import com.techtonic.BoredGamerz.model.EntityTestHelper;
import com.techtonic.BoredGamerz.model.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class UserServiceTests {

    @Test
    void addDeleteUserTest(@Autowired UserService userService,
                           @Autowired GameMeetingService gmService,
                           @Autowired UserToGameMeetingService utgmService) {
        EntityTestHelper eth = new EntityTestHelper();

        UserDataTransferObject user1 = eth.randomUser();
        UserDataTransferObject user2 = eth.randomUser();
        UserDataTransferObject user3 = eth.randomUser();

        userService.add(user1);
        userService.add(user2);
        userService.add(user3);

        Assertions.assertEquals(
                userService.getById(user1.getId()).get().toString(),
                user1.toString());
        Assertions.assertEquals(
                userService.getById(user2.getId()).get().toString(),
                user2.toString());
        Assertions.assertEquals(
                userService.getById(user3.getId()).get().toString(),
                user3.toString());

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

        UserDataTransferObject user = eth.randomUser();
        UserDataTransferObject userOverwrite = eth.randomUser();
            userOverwrite.setId(user.getId());

        userService.add(user);

        System.out.println("User(pulled from DB): \n" + userService.getById(user.getId()).get());
        System.out.println("Overwritten User: \n" + userOverwrite);

        userService.update(userOverwrite);

        User updatedUser = userService.getById(user.getId()).get();

        System.out.println("Updated User: \n" + updatedUser);

        Assertions.assertEquals(updatedUser.toString(), userOverwrite.toString());

        userService.delete(user.getId(), gmService, utgmService);
    }
}