package com.techtonic.BoredGamerz.sendGrid;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import com.techtonic.BoredGamerz.auth0.Auth0Users;
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

        JSONObject response = new Auth0Users(issuer, clientId, clientSecret).getUserInfo(userId);

        SendGrid sendGrid = new SendGrid(key);

        String ourEmail = "gamemaster@boredgamerz.com";

        System.out.println(response.toString());

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

        return 500;
    }
}