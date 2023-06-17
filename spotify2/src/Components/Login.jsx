import React from "react";
import { Button, Box, Typography, Stack } from "@mui/material";
import ContactlessIcon from "@mui/icons-material/Contactless";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing%20playlist-read-collaborative%20playlist-read-private%20playlist-modify-public%20playlist-modify-private%20user-top-read%20user-follow-read`;

const Login = () => {
  return (
    <div>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#36393F",
        }}
      >
        <Button
          href={AUTH_URL}
          variant="contained"
          sx={{ backgroundColor: "Green", width: "20%", height: "5%" }}
        >
          <Stack direction="row" spacing={2}>
            <ContactlessIcon
              sx={{ color: "white", transform: "rotate(-70deg)" }}
              fontSize="large"
            />
            <Typography variant="h6">Login with spotify</Typography>
          </Stack>
        </Button>
      </Box>
    </div>
  );
};

export default Login;
