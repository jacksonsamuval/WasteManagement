import React from "react";
import { Container, Box, Typography } from "@mui/material";

const Testimonials = () => {
    return (
        <Container>
            <Box textAlign="center" py={5}>
                <Typography variant="h4">What Our Users Say</Typography>
                <Typography variant="body1" mt={2}>
                    “Track Trash has helped our community keep the streets clean effortlessly.” - John Doe
                </Typography>
            </Box>
        </Container>
    );
};

export default Testimonials;
