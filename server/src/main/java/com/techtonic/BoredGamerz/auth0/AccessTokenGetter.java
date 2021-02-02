package com.techtonic.BoredGamerz.auth0;

import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.json.JSONObject;

import java.util.Base64;

public class AccessTokenGetter {

    private static JSONObject token = null;

    public static JSONObject getToken(String issuer, String clientId, String clientSecret){

        String audience = issuer + "api/v2/";

        System.out.println(token);

        if(token == null){

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
        else{

            String checkExp = token.getString("access_token");

            checkExp = checkExp.substring(checkExp.indexOf('.') + 1);

            checkExp = checkExp.substring(0, checkExp.indexOf('.'));

            byte[] decodedBytes = Base64.getDecoder().decode(checkExp);
            String body = new String(decodedBytes);

            JSONObject json = new JSONObject(body);

            if(json.getLong("exp") <= System.currentTimeMillis()){

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
        }

        return token;
    }
}
