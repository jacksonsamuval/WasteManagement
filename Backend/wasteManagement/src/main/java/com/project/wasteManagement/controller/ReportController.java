package com.project.wasteManagement.controller;

import com.project.wasteManagement.dto.ReportDTO;
import com.project.wasteManagement.dto.UpdateReport;
import com.project.wasteManagement.model.Report;
import com.project.wasteManagement.model.Status;
import com.project.wasteManagement.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/report")
@CrossOrigin(origins = "http://localhost:5173")
public class ReportController {

    @Autowired
    private ReportService reportService;


    @GetMapping("/getReport")
    public ResponseEntity<?> getAllReport()
    {
        return reportService.getReport();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getImageById(@PathVariable Integer id)
    {
        return reportService.getImage(id);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Integer id)
    {
        return reportService.deleteById(id);
    }

//    @PostMapping("/update")
//    public ResponseEntity<?> updateReport(@RequestBody UpdateReport updateReport)
//    {
//        return reportService.updateReport(updateReport);
//    }

    @PostMapping("/updateStatus/{id}/{status}")
    public ResponseEntity<?> updateStatus(@PathVariable Integer id, @PathVariable Status status)
    {
        return reportService.updateStatus(id,status);
    }
}
