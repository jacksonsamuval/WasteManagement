package com.project.wasteManagement.service;

import com.project.wasteManagement.dto.AuthResponseDto;
import com.project.wasteManagement.dto.LoginDto;
import com.project.wasteManagement.jwt.JwtService;
import com.project.wasteManagement.model.ProfilePicture;
import com.project.wasteManagement.model.User;
import com.project.wasteManagement.repo.ProfilePictureRepo;
import com.project.wasteManagement.repo.UserRepo;
import com.project.wasteManagement.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private ProfilePictureRepo profilePictureRepo;

    @Autowired
    private AuthenticationManager authenticationManager;
    private BCryptPasswordEncoder encoder= new BCryptPasswordEncoder(12);

    public ResponseEntity<?> addUser(User user) {
        try{
            User userDuplicate = userRepo.findByUsername(user.getUsername());
            User emailDuplicate = userRepo.findByEmail(user.getEmail());
            User mobileNoDuplicate = userRepo.findByMobileNo(user.getMobileNo());

            if (userDuplicate!=null) {
                return new ResponseEntity<>("Username Exists", HttpStatus.CONFLICT);
            } else if (emailDuplicate!=null) {
                return new ResponseEntity<>("Email Exists", HttpStatus.CONFLICT);
            } else if (mobileNoDuplicate!=null){
                return new ResponseEntity<>("Mobile Number Exists", HttpStatus.CONFLICT);
            } else {
                user.setPassword(encoder.encode(user.getPassword()));
                userRepo.save(user);
                return new ResponseEntity<>("Success", HttpStatus.OK);
            }

        } catch (Exception e){
            return new ResponseEntity<>("Server Error",HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<?> getAllUser() {
        return new ResponseEntity<>(userRepo.findAll(),HttpStatus.OK);
    }

    public ResponseEntity<?> login(LoginDto loginDto) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword()));
        User user = userRepo.findByUsername(loginDto.getUsername());
        AuthResponseDto authResponseDto = new AuthResponseDto(jwtService.generateToken(loginDto.getUsername()),loginDto.getUsername(),user.getRole());
        if (authentication.isAuthenticated())
        {
            return new ResponseEntity<>(authResponseDto,HttpStatus.OK);
        }else {
            return new ResponseEntity<>("Failed",HttpStatus.FORBIDDEN);
        }
    }

    public User getCurrentUser() {
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userPrincipal.getUser();
    }

    public ResponseEntity<?> uploadPicture(MultipartFile file) throws IOException {
        User user = getCurrentUser();
        ProfilePicture profilePicture = new ProfilePicture();
        profilePicture.setUser(user);
        profilePicture.setImage(file.getBytes());
        profilePicture.setCreatedAt(new Date());
        profilePicture.setImageType(file.getContentType());
        profilePictureRepo.save(profilePicture);
        return new ResponseEntity<>(profilePicture,HttpStatus.OK);
    }
}
