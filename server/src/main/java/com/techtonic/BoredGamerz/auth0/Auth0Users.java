package com.techtonic.BoredGamerz.auth0;

import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.json.JSONObject;

public class Auth0Users {

    String issuer;
    String clientId;
    String clientSecret;

    public Auth0Users(String issuer, String clientId, String clientSecret){

        this.issuer = issuer;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }

    public JSONObject getUserInfo(String userId){

        JSONObject responseToken = AccessTokenGetter.getToken(issuer, clientId, clientSecret);

        try {
            JSONObject response = new JSONObject(
                    Unirest.get(issuer + "/api/v2/users/" + userId)
                            .header("authorization", "Bearer " + responseToken.getString("access_token"))
                            .asString().getBody()
            );

            return response;
        } catch (UnirestException e) {
            e.printStackTrace();
        }

        return null;
    }
}
