package com.project.wasteManagement.controller;

import com.project.wasteManagement.dto.LoginDto;
import com.project.wasteManagement.dto.ReportDTO;
import com.project.wasteManagement.model.User;
import com.project.wasteManagement.service.ReportService;
import com.project.wasteManagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private ReportService reportService;

    @PostMapping("/report")
    public ResponseEntity<?> saveReport(@RequestBody ReportDTO reportDTO)
    {
        return reportService.save(reportDTO);
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
    //admin
    @GetMapping("/getAllUser")
    public ResponseEntity<?> getAllUser()
    {
        return userService.getAllUser();
    }
}
