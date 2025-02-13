import React from "react";
import { Container, Grid, Typography, Box, Button } from "@mui/material";
import aboutImage from "/images/about-trash.jpg";
import aiImage from "/images/ai-trash.webp"

const About = () => {
    return (
        <Container sx={{ py: 8 }}>
            {/* First Container - Text Left, Image Right */}
            <Grid container spacing={4} alignItems="center">
                {/* Left Side - Text Content */}
                <Grid item xs={12} md={6}>
                    <Box>
                        <Box sx={{ mb: 4, bgcolor: "#f0f0f0", width: 250, borderRadius: 2, textAlign: "center" }} >
                            <Typography fontSize="20px" fontWeight="bold">Introducing Track Trash</Typography>
                        </Box>
                        <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }} gutterBottom>
                            Reduce Waste,<br /> Save Environment
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Track Trash allows users to report waste issues and track their cleanup in real-time.
                            Our AI-driven insights help prioritize complaints for immediate action, ensuring cleaner communities.
                        </Typography>
                        <Typography variant="body1" mt={3} color="text.secondary" fontWeight="bold">
                            Track your waste, make an impact.
                        </Typography>
                        <Button variant="contained" color="primary" sx={{ mt: 5, pt: 1, paddingBottom: 1 }}>Learn More</Button>
                    </Box>
                </Grid>

                {/* Right Side - Image */}
                <Grid item xs={12} md={6}>
                    <Box display="flex" justifyContent="center">
                        <img
                            src={aboutImage}
                            alt="About Track Trash"
                            style={{ width: "70%", maxWidth: "500px", borderRadius: "10px", boxShadow: "5px 5px 15px rgba(0,0,0,0.2)" }}
                        />
                    </Box>
                </Grid>
            </Grid>
            <Box sx={{ height: "1px", backgroundColor: "#ddd", my: 4 }} />
            {/* Second Container - Text Right, Image Left */}
            <Grid container spacing={4} alignItems="center" mt={2}>
                {/* Left Side - Image */}
                <Grid item xs={12} md={6}>
                    <Box display="flex" justifyContent="left">
                        <img
                            src={aiImage}  // Use a different image or the same one if needed
                            alt="About Track Trash"
                            style={{ width: "70%", maxWidth: "500px", borderRadius: "10px", boxShadow: "5px 5px 15px rgba(0,0,0,0.2)" }}
                        />
                    </Box>
                </Grid>

                {/* Right Side - Text Content */}
                <Grid item xs={12} md={6}>
                    <Box >
                        <Box sx={{ mb: 4, bgcolor: "#f0f0f0", width: 180, borderRadius: 2, textAlign: "center" }} >
                            <Typography fontSize="20px" fontWeight="bold">AI Optimization</Typography>
                        </Box>
                        <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }} gutterBottom>
                            Ask AI,<br />Complete Faster
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Waste management doesn't have to be complex.
                            With Track Trash, leverage AI-driven technology to optimize waste tracking, improve efficiency, reduce costs, and drive sustainability.
                        </Typography>
                        <Typography variant="body1" mt={3} color="text.secondary" fontWeight="bold">
                            AI makes it easier
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            <Box sx={{ height: "1px", backgroundColor: "#ddd", my: 4 }} />
        </Container>

    );
};

export default About;
