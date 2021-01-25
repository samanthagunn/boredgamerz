package com.techtonic.BoredGamerz.model;

import com.techtonic.BoredGamerz.dao.GameMeetingDataAccessObject;
import com.techtonic.BoredGamerz.dto.GameMeetingDataTransferObject;
import com.techtonic.BoredGamerz.dto.UserDataTransferObject;

import java.util.Date;
import java.util.UUID;

public class EntityTestHelper {

    String[] names = new String[]{
            "Grant",
            "Mark",
            "Michael",
            "Steve",
            "Richards",
            "Sam",
            "Jessica",
            "Adam",
            "Tom",
            "Carol",
            "Hank",
            "Melissa",
            "Sarah",
            "Emily",
            "Jenny",
            "Harvey",
            "Ian",
            "Herb",
            "Brown",
            "Donald",
            "Robert",
            "Nick",
            "Charles",
            "Willy"};

    String[] countries = new String[]{
            "USA",
            "India",
            "France",
            "Russia",
            "Japan",
            "Mexico",
            "Canada",
            "Italy",
            "The Moon",
            "Wakanda",
            "Oz",
            "Middle Earth"
    };

    String[] games = new String[]{
            "DND",
            "Checkers",
            "Chess",
            "PathFinder",
            "Sorry",
            "Magic",
            "Munchkins",
            "Cards Against Humanity",
            "Battleship",
            "Risk",
            "Twister",
            "Life"
    };

    String[] addresses = new String[]{
            "Somewhere over the rainbow",
            "Down the road and to the left",
            "Into the sunset",
            "The 7/11",
            "Any target",
            "An empty parking lot",
            "On a boat",
            "The Oval Office"
    };

    String[] categories = new String[]{
            "Adventure",
            "RPG",
            "Comedy",
            "Action",
            "Survival",
            "LARP"
    };

    public String getRandomString(String[] stringList){

        int index = (int)(Math.random() * stringList.length);

        return stringList[index];
    }

    public String generateEmail(String firstName, String lastName){

        return firstName + "." + lastName + "@techtonic.com";
    }

    public UserDataTransferObject randomUser(){

        UserDataTransferObject user = new UserDataTransferObject();

        user.setFirstName(getRandomString(names));
        user.setLastName(getRandomString(names));
        user.setEmail(generateEmail(user.getFirstName(), user.getLastName()));
        user.setCountry(getRandomString(countries));
        user.setUsername(user.getFirstName() + UUID.randomUUID());

        return user;
    }

    public GameMeetingDataTransferObject randomGameMeeting(User host){

        GameMeetingDataTransferObject gm = new GameMeetingDataTransferObject();

        gm.setAvailableSeats((int)((Math.random() * 16) + 1));
        gm.setHost(host.getId());
        gm.setDate(new Date(System.currentTimeMillis() + 1000000000));
        gm.setGameName(getRandomString(games));
        gm.setTitle(gm.getGameName());
        gm.setDescription(gm.getGameName());
        gm.setAddress(getRandomString(addresses));
        gm.setCategory(getRandomString(categories));

        return gm;
    }
}
