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
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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

    public ResponseEntity<?> getAllUser() {
        return new ResponseEntity<>(userRepo.findAll(),HttpStatus.OK);
    }

    public ResponseEntity<?> login(LoginDto loginDto) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword()));
        User user = userRepo.findByUsername(loginDto.getUsername());
        ProfilePicture image = profilePictureRepo.findByUser(user);
        AuthResponseDto authResponseDto = new AuthResponseDto(jwtService.generateToken(loginDto.getUsername()),loginDto.getUsername(),user.getRole(),image);
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
        ProfilePicture picture = profilePictureRepo.findByUser(user);
        if (picture == null)
        {
            ProfilePicture profilePicture = new ProfilePicture();
            profilePicture.setUser(user);
            profilePicture.setImage(file.getBytes());
            profilePicture.setCreatedAt(new Date());
            profilePicture.setImageType(file.getContentType());
            profilePictureRepo.save(profilePicture);
            return new ResponseEntity<>(profilePicture,HttpStatus.OK);
        } else {
            picture.setImageType(file.getContentType());
            picture.setImage(file.getBytes());
            picture.setCreatedAt(new Date());
            profilePictureRepo.save(picture);
            return new ResponseEntity<>(picture,HttpStatus.OK);
        }

    }

    public ResponseEntity<?> getProfilePicture() {
        User user = getCurrentUser();
        ProfilePicture profilePicture = profilePictureRepo.findByUser(user);
        if (profilePicture==null)
        {
            return new ResponseEntity<>("Not Found",HttpStatus.NOT_FOUND);
        }
        else {
            byte[] image = profilePicture.getImage();
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(profilePicture.getImageType()))
                    .body(image);
        }
    }

    @Transactional
    public ResponseEntity<?> addUser(String name, String username, String email, String password, String mobileNo, MultipartFile file) {
        try {

            User userDuplicate = userRepo.findByUsername(username);
            User emailDuplicate = userRepo.findByEmail(email);
            User mobileNoDuplicate = userRepo.findByMobileNo(mobileNo);

            if (userDuplicate != null) {
                return new ResponseEntity<>("Username already exists", HttpStatus.CONFLICT);
            } else if (emailDuplicate != null) {
                return new ResponseEntity<>("Email already exists", HttpStatus.CONFLICT);
            } else if (mobileNoDuplicate != null) {
                return new ResponseEntity<>("Mobile number already exists", HttpStatus.CONFLICT);
            } else {
                User user = new User();
                user.setEmail(email);
                user.setUsername(username);
                user.setName(name);
                user.setMobileNo(mobileNo);

                user.setPassword(encoder.encode(password));
                userRepo.save(user);

                if (file != null && !file.isEmpty()) {
                    ProfilePicture profilePicture = new ProfilePicture();
                    profilePicture.setUser(user);
                    profilePicture.setCreatedAt(new Date());
                    profilePicture.setImageType(file.getContentType());
                    profilePicture.setImage(file.getBytes());

                    profilePictureRepo.save(profilePicture);

                    return new ResponseEntity<>(profilePicture, HttpStatus.OK);
                } else {
                    return new ResponseEntity<>("User registered successfully, but no profile picture provided.", HttpStatus.OK);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Server Error. Please try again.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
