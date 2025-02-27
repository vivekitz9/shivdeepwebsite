import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Button,
  Box,
  Avatar,
  IconButton,
  Autocomplete,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../assets/BaseUrl";
import axios from "axios";

const SENDOPT = `${baseURL}api/v1/sendOtpUnAuth`;
const GETDISTRICT = `${baseURL}api/v1/districts`;

const MemberForm = () => {
  const [districts, setDistricts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    dob: "",
    district: "",
    imge: null, // Store Base64 encoded image
  });

  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image upload (convert to Base64 and store in state)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          imge: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (formData.mobile) {
      const newFormData = new FormData();
      newFormData.append("mobile", formData.mobile);

      try {
        const response = await axios.post(SENDOPT, newFormData, {
          headers: { "Content-Type": "application/json" },
        });

        if (response.status === 200) {
          const sessionId = response.data.data.Details;
          navigate("/otp", {
            state: { ...formData, sessionId },
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchDistrict = async () => {
    try {
      const response = await axios.get(GETDISTRICT);

      if (response.status === 200) {
        // console.log(response.data.data);
        setDistricts(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDistrict();
  }, []);

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
          backgroundSize: "cover",
        }}
      >
        {/* Avatar Section */}
        <Box sx={{ position: "relative", display: "inline-block", mb: 1 }}>
          <Avatar
            src={formData.imge}
            sx={{
              width: 100,
              height: 100,
              mx: "auto",
              backgroundColor: "#84764F",
            }}
          />
          <IconButton
            color="primary"
            component="label"
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              backgroundColor: "#84764F",
              color: "white",
              "&:hover": { backgroundColor: "#84764F" },
            }}
          >
            <EditIcon />
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
              required
            />
          </IconButton>
        </Box>

        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          MEMBER
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
            sx={{
              "& label.Mui-focused": { color: "#84764F" }, // Label color when focused
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#84764F" }, // Default border color
                "&:hover fieldset": { borderColor: "#84764F" }, // Border color on hover
                "&.Mui-focused fieldset": { borderColor: "#84764F" }, // Border color when focused
              },
              "& .MuiInputBase-input": {
                color: "#84764F", // Text color inside input
              },
            }}
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
            sx={{
              "& label.Mui-focused": { color: "#84764F" }, // Label color when focused
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#84764F" }, // Default border color
                "&:hover fieldset": { borderColor: "#84764F" }, // Border color on hover
                "&.Mui-focused fieldset": { borderColor: "#84764F" }, // Border color when focused
              },
              "& .MuiInputBase-input": {
                color: "#84764F", // Text color inside input
              },
            }}
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
            sx={{
              "& label.Mui-focused": { color: "#84764F" }, // Label color when focused
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#84764F" }, // Default border color
                "&:hover fieldset": { borderColor: "#84764F" }, // Border color on hover
                "&.Mui-focused fieldset": { borderColor: "#84764F" }, // Border color when focused
              },
              "& .MuiInputBase-input": {
                color: "#84764F", // Text color inside input
              },
            }}
          />
          <TextField
            fullWidth
            label="Date of Birth"
            type="date"
            variant="outlined"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
            sx={{
              "& label.Mui-focused": { color: "#84764F" }, // Label color when focused
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#84764F" }, // Default border color
                "&:hover fieldset": { borderColor: "#84764F" }, // Border color on hover
                "&.Mui-focused fieldset": { borderColor: "#84764F" }, // Border color when focused
              },
              "& .MuiInputBase-input": {
                color: "#84764F", // Text color inside input
              },
            }}
          />
          {/* <TextField fullWidth label="District" /> */}
          <Autocomplete
            options={districts}
            getOptionLabel={(option) => option.district} // Show district names in dropdown
            value={
              districts.find((d) => d.district === formData.district) || null
            } // Ensure it retains the selected value
            onChange={(event, newValue) =>
              setFormData({
                ...formData,
                district: newValue ? newValue.district : "", // Store selected district
              })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select District"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                sx={{
                  "& label.Mui-focused": { color: "#84764F" }, // Label color when focused
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#84764F" }, // Default border color
                    "&:hover fieldset": { borderColor: "#84764F" }, // Border color on hover
                    "&.Mui-focused fieldset": { borderColor: "#84764F" }, // Border color when focused
                  },
                  "& .MuiInputBase-input": {
                    color: "#84764F", // Text color inside input
                  },
                }}
              />
            )}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: "#84764F",
              color: "white",
            }}
            disabled={
              !formData.name.trim() ||
              !formData.mobile.trim() ||
              !formData.dob ||
              !formData.imge ||
              !formData.district
            }
          >
            SUBMIT
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default MemberForm;
