package com.project.wasteManagement.config;

import com.project.wasteManagement.model.User;
import com.project.wasteManagement.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminAccountCreator implements ApplicationRunner {

    @Autowired
    private UserRepo userRepo;

    private final BCryptPasswordEncoder encoder= new BCryptPasswordEncoder(12);
    @Override
    public void run(ApplicationArguments args) throws Exception {
        String adminEmail = "admin@gmail.com";
        String adminPassword = "admin123";
        if (userRepo.findByEmail(adminEmail)==null)
        {
            User admin = new User();
            admin.setUsername("admin");
            admin.setName("Administrator");
            admin.setEmail(adminEmail);
            admin.setMobileNo("7795011089");
            admin.setRole("ADMIN");
            admin.setPassword(encoder.encode(adminPassword));
            userRepo.save(admin);
            System.out.println("Default admin account created with email: " + adminEmail);
        } else {
            System.out.println("Admin account already exists.");
        }
    }
}
