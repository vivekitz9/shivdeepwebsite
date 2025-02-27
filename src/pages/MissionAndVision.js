import React, { useEffect, useState } from "react";
import { baseURL } from "../assets/BaseUrl";
import axios from "axios";
import { Box, Typography, Paper, CircularProgress } from "@mui/material";

const GETAPI = `${baseURL}api/v1/mission`;

const MissionAndVision = () => {
  const [missionAndVision, setMissionAndVision] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(GETAPI);
      console.log("Response : ", response);
      if (response) {
        const data = response?.data?.data?.[0];
        console.log("Data  :  ", data);
        if (data) {
          setMissionAndVision(data.content || "");
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
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom textAlign="center">
        Our Mission & Vision
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
        <Box sx={{ maxHeight: 400, overflowY: "auto", padding: 1 }}>
          <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            {missionAndVision}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default MissionAndVision;
