package com.project.wasteManagement.service;

import com.project.wasteManagement.model.Report;
import com.project.wasteManagement.repo.ReportRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ReportService {

    @Autowired
    private ReportRepo reportRepo;
    public ResponseEntity<?> save(Report report) {
        reportRepo.save(report);
        return new ResponseEntity<>("Success", HttpStatus.OK);
    }
}
