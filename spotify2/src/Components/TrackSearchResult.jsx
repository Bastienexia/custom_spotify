import React from "react";
import { Stack, Typography, Box } from "@mui/material";

const TrackSearchResult = ({ track, playTrack, height, width }) => {
  function handleClick() {
    playTrack(track);
  }

  if (!track) {
    return null;
  } else {
    return (
      <div>
        <Box
          onClick={handleClick}
          sx={{
            boxShadow: "2px 0 5px black",
            width: width || "20vw",
            borderRadius: "1vh",
            background: "rgba(255, 255, 255, .2)",
            color: "white",
            textDecorationLine: "none",
            padding: 2,
          }}
        >
          <Stack
            direction="row"
            sx={{ height: height || "12vh", cursor: "pointer" }}
            spacing={2}
          >
            <img
              src={track.albumUrl}
              alt="album"
              style={{ marginLeft: "0.5vw", borderRadius: "20%" }}
            />
            <Stack spacing={2}>
              <Typography sx={{ textDecoration: "none" }}>
                {track.title}
              </Typography>
              <Typography>{track?.artist}</Typography>
            </Stack>
          </Stack>
        </Box>
        <br />
      </div>
    );
  }
};

export default TrackSearchResult;
