package com.project.wasteManagement.service;

import com.project.wasteManagement.dto.ReportDTO;
import com.project.wasteManagement.dto.UpdateReport;
import com.project.wasteManagement.model.Report;
import com.project.wasteManagement.model.Status;
import com.project.wasteManagement.model.User;
import com.project.wasteManagement.repo.ReportRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ReportService {

    @Autowired
    private UserService userService;

    @Autowired
    private ReportRepo reportRepo;

    public User getCurrentUser()
    {
        return userService.getCurrentUser();
    }


    public ResponseEntity<?> getReport() {
        User user = getCurrentUser();
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User is not authenticated");
        }

        List<Report> report = reportRepo.findByUser(user);
        return ResponseEntity.ok(report);
    }

    public ResponseEntity<?> getImage(Integer id) {
        Report report = reportRepo.findById(id).orElseThrow(()-> new RuntimeException("Not Found"));
        byte[] image = report.getImage();
        return ResponseEntity.ok().contentType(MediaType.valueOf(report.getImageType()))
                .body(image);

    }

//    public ResponseEntity<?> updateReport(UpdateReport updateReport) {
//        User user = getCurrentUser();
//        if (user == null) {
//            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User is not authenticated");
//        }
//        Report report = new Report();
//        report.setUser(user);
//        report.setStatus(updateReport.getStatus());
//        report.setDescription(updateReport.getDescription());
//        report.setLatitude(updateReport.getLatitude());
//        report.setLongitude(updateReport.getLongitude());
//        report.setImageUrl(updateReport.getImageUrl());
//        reportRepo.save(report);
//
//        return ResponseEntity.ok(report);
//    }

    public ResponseEntity<?> updateStatus(Integer id,Status status) {
        User user = getCurrentUser();
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User is not authenticated");
        }
        Report report = reportRepo.findById(id).orElseThrow(()-> new RuntimeException("Not Found"));
        report.setStatus(status);
        reportRepo.save(report);
        return ResponseEntity.ok("Success");
    }

    public ResponseEntity<?> save(String description, Double latitude, Double longitude, MultipartFile image) {
        UserService userService1 = new UserService();

        try {

            byte[] imageBytes = image.getBytes();

            Report report = new Report();
            report.setDescription(description);
            report.setLatitude(latitude);
            report.setUser(userService1.getCurrentUser());
            report.setLongitude(longitude);
            report.setImage(imageBytes);
            report.setImageType(image.getContentType());
            report.setCreatedAt(new Date());

            reportRepo.save(report);

            return new ResponseEntity<>(report,HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error uploading the image. Please try again.",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> deleteById(Integer id) {
        User user = getCurrentUser();
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User is not authenticated");
        }
        Report report = reportRepo.findById(id).orElseThrow(()-> new RuntimeException("Not Found"));
        reportRepo.deleteById(report.getId());
        return new ResponseEntity<>("Successfully Deleted",HttpStatus.OK);
    }
}
