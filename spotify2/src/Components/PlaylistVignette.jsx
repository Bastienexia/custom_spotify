import React from "react";
import { Stack, Typography } from "@mui/material";

const PlaylistVignette = ({ playlist }) => {
  return (
    <div>
      <Stack
        direction="row"
        onClick={() => console.log(playlist)}
        sx={{
          width: "20vw",
          boxShadow: "2px 0 5px black",
          borderRadius: "1vh",
          cursor: "pointer",
          background: "rgba( 255, 255, 255, .2)",
          padding: 2,
        }}
        spacing={2}
      >
        <img
          style={{ height: "12vh", borderRadius: "20%" }}
          src={playlist.image}
          alt={playlist.name}
        />
        <Stack spacing={1}>
          <Typography>{playlist.name}</Typography>
          <Typography>{playlist.owner}</Typography>
          <Typography>Total tracks: {playlist.totalTracks}</Typography>
        </Stack>
      </Stack>
    </div>
  );
};

export default PlaylistVignette;
