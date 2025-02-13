import React from "react";
import { Grid, Box, Typography, Container } from "@mui/material";

const services = [
    { title: "Track Trash", description: "Upload photos and report trash issues instantly.", image: "/images/bin.png" },
    { title: "Track Progress", description: "Check the status of reported waste and cleanup progress.", image: "/images/tracking.png" },
    { title: "AI Insights", description: "Our AI provides user support and helps organizing them.", image: "images/ai.png" },
    { title: "Prioritize Cleaning", description: "Determines which complaints need immediate attention.", image: "/images/CLEANING.png" }
];

const Services = () => {
    return (
        <Container>
            {/* Services Section Header */}
            <Box textAlign="center" py={0}>
                <Typography variant="h4">What We Do?</Typography>
            </Box>

            {/* Services Main Container */}
            <Container>
                <Grid container spacing={4}>
                    {services.map((service, index) => (
                        <Grid item xs={12} md={6} lg={3} key={index}>
                            {/* Individual Service Container */}
                            <Box textAlign="center" p={3}>
                                <img src={service.image} alt={service.title} width="100%" style={{ marginBottom: 2 }} />
                                <Typography variant="h6" mt={2} fontWeight="bold">{service.title}</Typography>
                                <Typography variant="body2" mt={3}>{service.description}</Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Container>
    );
};

export default Services;
