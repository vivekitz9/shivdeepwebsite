import React, { useEffect, useState } from "react";
import { baseURL } from "../assets/BaseUrl";
import axios from "axios";
import { Box, Typography, Paper, CircularProgress } from "@mui/material";

const GETAPI = `${baseURL}api/v1/termCondition`;

const TermsConditions = () => {
  const [termsConditions, setTermsConditions] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(GETAPI);
      if (response) {
        const data = response?.data?.data?.[0];
        if (data) {
          setTermsConditions(data.content || "");
        }
      }
    } catch (err) {
      console.log(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Paper
      sx={{
        padding: 3,
        maxWidth: "95%",
        width: "100%",
        borderRadius: 2,
        boxShadow: "none",
        // textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom textAlign="center">
        Terms & Conditions
      </Typography>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight={200}
        >
          <CircularProgress />
        </Box>
      ) : (
        // <Box sx={{ display: "flex"}}>
          <Typography variant="body1">
            <div dangerouslySetInnerHTML={{ __html: termsConditions }}></div>
          </Typography>
        // </Box>
      )}
    </Paper>
  );
};

export default TermsConditions;
