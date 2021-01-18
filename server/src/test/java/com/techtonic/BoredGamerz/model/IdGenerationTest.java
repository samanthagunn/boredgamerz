package com.techtonic.BoredGamerz.model;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import org.springframework.boot.test.context.SpringBootTest;

import static com.techtonic.BoredGamerz.ServerUtil.ConsoleUtil.*;

@SpringBootTest
class IdGenerationTest {

    @Test
    void idTest() {

        //Testing to see if the id is generated correctly for all 3 objects
        User user = new User();

        GameMeeting gm = new GameMeeting();
        gm.setHost(user);

        UserToGameMeetingJoin utgmj = new UserToGameMeetingJoin(user, gm);

        System.out.println(purple("User UUID: " + user.getId()));
        System.out.println(purple("GameMeeting UUID: " + gm.getId()));
        System.out.println(purple("Join Table Composite ID: " + utgmj.getId()));

        Assertions.assertNotNull(user.getId());
        Assertions.assertNotNull(gm.getId());
        Assertions.assertNotNull(utgmj.getId());
        Assertions.assertEquals(utgmj.getId(), "" + gm.getId() + user.getId());
    }
}