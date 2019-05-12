package ubi.core.citychallenge3.integrations;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.gson.GsonAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(exclude = {GsonAutoConfiguration.class})
@ComponentScan("ubi.core")
@EnableJpaRepositories("ubi")
public class IntegrationsApplication {

    public static void main(String[] args){
        SpringApplication.run(IntegrationsApplication.class);
    }
}
