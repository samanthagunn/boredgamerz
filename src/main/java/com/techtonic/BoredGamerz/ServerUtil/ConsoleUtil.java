package com.techtonic.BoredGamerz.ServerUtil;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/*
Created: 01/11/2021
Authors: Grant Fields
(c) Copyright by Company: Techtonic
Details: Tools to assist application testing
*/

public class ConsoleUtil {

    public static final String ANSI_RESET = "\u001B[0m";

    public static final String ANSI_BLACK = "\u001B[30m";
    public static final String ANSI_RED = "\u001B[31m";
    public static final String ANSI_GREEN = "\u001B[32m";
    public static final String ANSI_YELLOW = "\u001B[33m";
    public static final String ANSI_BLUE = "\u001B[34m";
    public static final String ANSI_PURPLE = "\u001B[35m";
    public static final String ANSI_CYAN = "\u001B[36m";
    public static final String ANSI_WHITE = "\u001B[37m";

    public static String black(String out){

        return (ANSI_BLACK + out + ANSI_RESET);
    }

    public static String red(String out){

        return (ANSI_RED + out + ANSI_RESET);
    }

    public static String green(String out){

        return (ANSI_GREEN + out + ANSI_RESET);
    }

    public static String yellow(String out){

        return (ANSI_YELLOW + out + ANSI_RESET);
    }

    public static String blue(String out){

        return (ANSI_BLUE + out + ANSI_RESET);
    }

    public static String purple(String out){

        return (ANSI_PURPLE + out + ANSI_RESET);
    }

    public static String cyan(String out){

        return (ANSI_CYAN + out + ANSI_RESET);
    }

    public static String white(String out){

        return (ANSI_WHITE + out + ANSI_RESET);
    }

    public static String JsonString(Object obj){

        Gson gsonPretty = new GsonBuilder().setPrettyPrinting().create();

        String[] list = gsonPretty.toJson(obj).split("\n");

        String out = "";

        for(String line: list){

            line = green(line) + "\n";
            out += line;
        }

        return out;
    }
}
