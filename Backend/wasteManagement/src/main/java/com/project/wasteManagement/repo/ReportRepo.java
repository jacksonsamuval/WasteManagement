package com.project.wasteManagement.repo;

import com.project.wasteManagement.model.Report;
import com.project.wasteManagement.model.Status;
import com.project.wasteManagement.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepo extends JpaRepository<Report,Integer> {
    List<Report> findByUser(User user);
    List<Report> findByStatusAndUser(Status status, User user);

    List<Report> findByStatus(Status status);
}
