package com.project.wasteManagement.controller;

import com.project.wasteManagement.dto.LoginDto;
import com.project.wasteManagement.dto.ReportDTO;
import com.project.wasteManagement.model.Report;
import com.project.wasteManagement.model.User;
import com.project.wasteManagement.repo.ReportRepo;
import com.project.wasteManagement.service.ReportService;
import com.project.wasteManagement.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private ReportService reportService;

    @Autowired
    private ReportRepo reportRepo;

    @PostMapping("/report")
    public ResponseEntity<?> saveReport(@RequestParam("description") String description,
                                        @RequestParam("latitude") Double latitude,
                                        @RequestParam("longitude") Double longitude,
                                        @RequestParam("image") MultipartFile image,
                                        HttpServletRequest request)
    {
        if (description == null || description.isEmpty() || latitude == null || longitude == null || image.isEmpty()) {
            return new ResponseEntity<>("All fields are required!",HttpStatus.BAD_REQUEST);
        }
        return reportService.save(description,latitude,longitude,image);
    }

    @GetMapping
    public String greet()
    {
        return "Hii, How are you!";
    }

    @PostMapping("register")
    public ResponseEntity<?> addUser(@RequestBody User user)
    {
        return userService.addUser(user);
    }

    @GetMapping("getCurrentUser")
    public User getUser()
    {
        return userService.getCurrentUser();
    }

    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto)
    {
        return userService.login(loginDto);
    }

    @PostMapping("uploadProfilePicture")
    public ResponseEntity<?> profilePicture(@RequestPart MultipartFile file) throws IOException {
        return userService.uploadPicture(file);
    }
    //admin
    @GetMapping("/getAllUser")
    public ResponseEntity<?> getAllUser()
    {
        return userService.getAllUser();
    }
}
