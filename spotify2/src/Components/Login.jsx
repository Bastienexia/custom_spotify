import React from "react";
import { Button, Box, Typography, Stack } from "@mui/material";
import ContactlessIcon from "@mui/icons-material/Contactless";
const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=fefb2085586f4e7ab7ac04aaa2568ced&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing%20playlist-read-collaborative%20playlist-read-private%20playlist-modify-public%20playlist-modify-private%20user-top-read%20user-follow-read";

const Login = () => {
  return (
    <div>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-Gradient(to bottom right, #9400D3, purple)",
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
