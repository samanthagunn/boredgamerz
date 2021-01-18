package com.techtonic.BoredGamerz.model;

import com.techtonic.BoredGamerz.ServerUtil.ConsoleUtil;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class JsonStylePrintTest {

    @Test
    void printTest() {

        //There is no failing parameter fo this test,
        //the tester must check the JSON output themselves

        EntityTestHelper eth = new EntityTestHelper();
        User user = eth.randomUser();
        GameMeeting gm = eth.randomGameMeeting(user);
        UserToGameMeetingJoin utgmj = new UserToGameMeetingJoin(user, gm);

        System.out.println(ConsoleUtil.purple("User Print:"));
        System.out.println(user);
        System.out.println(ConsoleUtil.purple("Game Print:"));
        System.out.println(gm);
        System.out.println(ConsoleUtil.purple("User To Game Join Print:"));
        System.out.println(utgmj);
    }
}