package com.project.wasteManagement.service;

import com.project.wasteManagement.dto.ReportDTO;
import com.project.wasteManagement.dto.UpdateReport;
import com.project.wasteManagement.model.Report;
import com.project.wasteManagement.model.Status;
import com.project.wasteManagement.model.User;
import com.project.wasteManagement.repo.ReportRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

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

    public ResponseEntity<?> save(ReportDTO reportDTO) {
        User user = getCurrentUser();

        Report report = new Report();
        report.setDescription(reportDTO.getDescription());
        report.setImageUrl(reportDTO.getImageUrl());
        report.setLatitude(reportDTO.getLatitude());
        report.setLongitude(reportDTO.getLongitude());
        report.setUser(user);

        reportRepo.save(report);
        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    public ResponseEntity<?> getReport() {
        User user = getCurrentUser();
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User is not authenticated");
        }

        List<Report> report = reportRepo.findByUser(user);

        return ResponseEntity.ok(report);
    }

    public ResponseEntity<?> updateReport(UpdateReport updateReport) {
        User user = getCurrentUser();
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User is not authenticated");
        }
        Report report = new Report();
        report.setUser(user);
        report.setStatus(updateReport.getStatus());
        report.setDescription(updateReport.getDescription());
        report.setLatitude(updateReport.getLatitude());
        report.setLongitude(updateReport.getLongitude());
        report.setImageUrl(updateReport.getImageUrl());
        reportRepo.save(report);

        return ResponseEntity.ok(report);
    }

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
}
