import React from "react";
import { Button } from "@mui/material";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=fefb2085586f4e7ab7ac04aaa2568ced&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing%20playlist-read-collaborative%20playlist-read-private%20playlist-modify-public%20playlist-modify-private%20user-top-read%20user-follow-read";

const Login = () => {
  return (
    <div>
      <Button
        href={AUTH_URL}
        variant="contained"
        sx={{ backgroundColor: "Green" }}
      >
        Login with spotify
      </Button>
    </div>
  );
};

export default Login;
