package com.project.wasteManagement.repo;

import com.project.wasteManagement.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User,Integer> {
    User findByUsername(String username);

    User findByEmail(String email);

    User findByMobileNo(String mobileNo);
}
