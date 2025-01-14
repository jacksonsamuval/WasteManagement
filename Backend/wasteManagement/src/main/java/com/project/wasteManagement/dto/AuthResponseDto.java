package com.project.wasteManagement.dto;

import com.project.wasteManagement.model.ProfilePicture;
import com.project.wasteManagement.repo.ProfilePictureRepo;

public class AuthResponseDto {
    private String token;
    private String username;
    private String role;

    private ProfilePicture image;

    public ProfilePicture getImage() {
        return image;
    }

    public void setImage(ProfilePicture image) {
        this.image = image;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public AuthResponseDto(String token, String username, String role, ProfilePicture image) {
        this.token = token;
        this.username = username;
        this.role = role;
        this.image = image;
    }
}
