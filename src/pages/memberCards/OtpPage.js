import React, { useState, useRef } from "react";
import { Container, Typography, Box, TextField, Button } from "@mui/material";
import { baseURL } from "../../assets/BaseUrl";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const VERIFYOTP = `${baseURL}api/v1/verifyOtp`;

const OTPPage = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const navigate = useNavigate();

  const location = useLocation();
  const formData = location.state;
  const sessionId = formData.sessionId;

  const handleChange = (index, event) => {
    const value = event.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input field if a number is entered
      if (value && index < 3) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const enteredOtp = otp.join("");
    console.log("OTP Submitted:", enteredOtp);
    // Perform OTP verification logic here

    if (enteredOtp && sessionId) {
      const newFormData = new FormData();
      newFormData.append("sessionId", sessionId);
      newFormData.append("otp", enteredOtp);

      try {
        const response = await axios.post(VERIFYOTP, newFormData, {
          headers: { "Content-Type": "application/json" },
        });

        if (response.status === 200) {
          localStorage.setItem("sessionId", "");
          navigate("/card", {
            state: formData,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 4,
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#f5f5f5",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", mb: 1, color: "#84764F" }}
        >
          VERIFICATION
        </Typography>

        <Typography variant="body1" sx={{ mb: 3, color: "#84764F" }}>
          Enter a 4-digit number that was sent to your registered mobile number.
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}
          >
            {otp.map((digit, index) => (
              <TextField
                key={index}
                inputRef={inputRefs[index]}
                value={digit}
                onChange={(event) => handleChange(index, event)}
                onKeyDown={(event) => handleKeyDown(index, event)}
                type="text"
                variant="outlined"
                inputProps={{
                  maxLength: 1,
                  style: {
                    textAlign: "center",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    color: "#84764F",
                  },
                }}
                sx={{
                  width: "55px",
                  height: "55px",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#84764F",
                      borderWidth: "2px",
                    },
                    "&:hover fieldset": { borderColor: "#84764F" },
                    "&.Mui-focused fieldset": { borderColor: "#84764F" },
                  },
                }}
              />
            ))}
          </Box>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#84764F",
              color: "white",
              fontWeight: "bold",
              marginTop: 4,
            }}
            disabled={otp.some((digit) => digit === "")}
          >
            VERIFY OTP
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default OTPPage;
