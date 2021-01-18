package com.techtonic.BoredGamerz;

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