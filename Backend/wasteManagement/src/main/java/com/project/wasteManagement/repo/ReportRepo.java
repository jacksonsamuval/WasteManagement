package com.project.wasteManagement.repo;

import com.project.wasteManagement.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepo extends JpaRepository<Report,Integer> {
}
