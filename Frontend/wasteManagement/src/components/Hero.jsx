import React from "react";
import { useNavigate } from "react-router-dom"; 
import { Box, Typography, Button } from "@mui/material";

const Hero = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboard"); // Redirect to dashboard if token exists
        } else {
            navigate("/login"); // Redirect to login if no token
        }
    };

    return (
        <Box
            sx={{
                backgroundImage: "url('/images/bg.jpg')",
                height: "90vh",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                color: "white",
            }}
        >
            <Box>
                <Typography variant="h3">Waste Management Made Easy</Typography>
                <Typography variant="h6">
                    Report waste issues, track progress, and improve your surroundings.
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    sx={{ mt: 2 }} 
                    onClick={handleGetStarted} // Call function on button click
                >
                    Get Started
                </Button>
            </Box>
        </Box>
    );
};

export default Hero;
