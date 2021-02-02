package com.techtonic.BoredGamerz.sendGrid;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import com.techtonic.BoredGamerz.serverUtil.AccessTokenGetter;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class MailController {

    @Value("${spring.sendgrid.key}")
    private String key;

    @Value("${auth0.audience}")
    private String audience;

    @Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri}")
    private String issuer;

    @Value("${spring.security.oauth2.resourceserver.jwt.clientId}")
    private String clientId;

    @Value("${spring.security.oauth2.resourceserver.jwt.clientSecret}")
    private String clientSecret;

    public int sendEmailWithSendGrid(String message, String sub, String userId) {

        try {

            JSONObject responseToken = AccessTokenGetter.getToken(audience, issuer, clientId, clientSecret);

            JSONObject response = new JSONObject(
                    Unirest.get(issuer + "/api/v2/users/" + userId)
                    .header("authorization", "Bearer " + responseToken.getString("access_token"))
                    .asString().getBody()
            );

            SendGrid sendGrid = new SendGrid(key);

            String ourEmail = "gamemaster@boredgamerz.com";

            Email from = new Email(ourEmail);
            Email to = new Email(response.getString("email"));
            Content content = new Content("text/html",  message);

            Mail mail = new Mail(from, sub, to, content);

            mail.setReplyTo(new Email(ourEmail));

            Request request = new Request();
            Response resp = null;

            try {
                request.setMethod(Method.POST);
                request.setEndpoint("mail/send");
                request.setBody(mail.build());

                resp = sendGrid.api(request);

                return resp.getStatusCode();
            } catch (IOException e) {
                e.printStackTrace();
            }
        } catch (UnirestException e) {
            e.printStackTrace();
        }

        return 500;
    }
}