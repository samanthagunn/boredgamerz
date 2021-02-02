/*
Created:
in progress

Authors:
Grant Fields
Christian Glassiognon
Mark Thompson
Samantha Hatfield

(c) Copyright by Company:
Techtonic
 */

package com.techtonic.BoredGamerz;

import com.sendgrid.SendGrid;
import com.techtonic.BoredGamerz.sendGrid.MailController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
@SpringBootApplication
public class BoredGamerzApplication {

	public static void main(String[] args) {

		SpringApplication.run(BoredGamerzApplication.class, args);
	}
}