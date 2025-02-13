import React from "react";
import { Box, Button, Typography, Container } from "@mui/material";

const CTA = () => {
    return (
        <Container>
            <Box textAlign="center" py={5} sx={{ background: "#2E7D32", color: "white", borderRadius: "8px", mt: 8 }}>
                <Typography variant="h4">Ready to Make a Difference?</Typography>
                <Typography variant="body1" mt={2}>
                    Report waste issues today and help keep your city clean.
                </Typography>
                {/* <Button variant="contained" sx={{ mt: 2, background: "white", color: "#2E7D32" }}>
                    Submit a Complaint
                </Button> */}
            </Box>
        </Container>
    );
};

export default CTA;
