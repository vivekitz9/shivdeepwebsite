import React, { useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Button,
  Box,
  Avatar,
} from "@mui/material";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { baseURL } from "../assets/BaseUrl";
import axios from "axios";

const POSTAPI = `${baseURL}api/v1/contactus`;

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    description: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
        const response = await axios.post(POSTAPI, formData);
        if (response) {
        
          
        }
      } catch (err) {
        console.log(err.response?.data?.message);
      } finally {
      }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 2,
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#f5f5f5",
          textAlign: "center",
        }}
      >
        {/* Contact Icon */}
        <Avatar sx={{ bgcolor: "#84764F", mx: "auto", mb: 2 }}>
          <ContactMailIcon fontSize="large" />
        </Avatar>

        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Contact Us
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Mobile Number"
            type="tel"
            variant="outlined"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Description"
            multiline
            rows={6}
            variant="outlined"
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            required
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: "#84764F",
              color: "white",
              "&:hover": { backgroundColor: "#6c5a3e" },
            }}
            disabled={
              !formData.name.trim() ||
              !formData.mobile.trim() ||
              !formData.description.trim()
            }
          >
            SUBMIT
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ContactUs;
