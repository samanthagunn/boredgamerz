package com.techtonic.BoredGamerz.serverUtil;

import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.json.JSONObject;

public class AccessTokenGetter {

    private static JSONObject token = null;

    public static JSONObject getToken(String audience, String issuer, String clientId, String clientSecret){

        audience = issuer + "api/v2/";

        if(token == null || token.getLong("exp") <= System.currentTimeMillis()){

            try {
                 token = new JSONObject( Unirest.post(issuer + "oauth/token")
                        .header("content-type", "application/x-www-form-urlencoded")
                        .body("grant_type=" + "client_credentials" + "&client_id=" + clientId + "&client_secret=" + clientSecret + "&audience=" + audience)
                        .asString().getBody()
                );

            } catch (UnirestException e) {
                e.printStackTrace();
            }
        }

        return token;
    }
}
