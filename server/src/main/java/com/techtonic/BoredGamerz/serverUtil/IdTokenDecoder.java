package com.techtonic.BoredGamerz.serverUtil;

import com.auth0.jwt.impl.JWTParser;
import org.springframework.http.HttpHeaders;

import java.util.Base64;

public class IdTokenDecoder {

    String authorization;
    String header;
    String body;

    public IdTokenDecoder(HttpHeaders headers){

        authorization = headers.get("Authorization").get(0);
        authorization = authorization.substring(authorization.indexOf("Bearer ") + "Bearer ".length());
        header = authorization.substring(0, authorization.indexOf("."));
        body = authorization.substring(authorization.indexOf(".") + 1);
        body = body.substring(0, body.indexOf("."));

        byte[] decodedBytes = Base64.getDecoder().decode(header);
        header = new String(decodedBytes);

        decodedBytes = Base64.getDecoder().decode(body);
        body = new String(decodedBytes);

        System.out.println(header);
        System.out.println(body);
    }

    public String decode(String find){

        return new JWTParser().parsePayload(body).getClaim(find).asString();
    }
}
