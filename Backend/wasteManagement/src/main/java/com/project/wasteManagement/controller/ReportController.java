package com.project.wasteManagement.controller;

import com.project.wasteManagement.dto.ReportDTO;
import com.project.wasteManagement.dto.UpdateReport;
import com.project.wasteManagement.model.Report;
import com.project.wasteManagement.model.Status;
import com.project.wasteManagement.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/report")
@CrossOrigin(origins = "http://localhost:5173")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @PostMapping("/add")
    public ResponseEntity<?> saveReport(@RequestBody ReportDTO reportDTO)
    {
        return reportService.save(reportDTO);
    }

    @GetMapping("/getReport")
    public ResponseEntity<?> getAllReport()
    {
        return reportService.getReport();
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateReport(@RequestBody UpdateReport updateReport)
    {
        return reportService.updateReport(updateReport);
    }

    @PostMapping("/updateStatus/{id}/{status}")
    public ResponseEntity<?> updateStatus(@PathVariable Integer id, @PathVariable Status status)
    {
        return reportService.updateStatus(id,status);
    }
}
