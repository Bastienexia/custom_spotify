import React from "react";
import { Button, Box } from "@mui/material";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=fefb2085586f4e7ab7ac04aaa2568ced&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing%20playlist-read-collaborative%20playlist-read-private%20playlist-modify-public%20playlist-modify-private%20user-top-read%20user-follow-read";

const Login = () => {
  return (
    <div>
      <Box sx={{ marginTop: "-1vh", marginBottom: "-1vh", marginLeft: "-1vw", width: "100.7vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-Gradient(to bottom right, #9400D3, purple)" }}>
        <Button
          href={AUTH_URL}
          variant="contained"
          sx={{ backgroundColor: "Green" }}
        >
          Login with spotify
        </Button>
      </Box>
    </div>
  );
};

export default Login;
