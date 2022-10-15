import React from "react";
import { Stack, Typography, Box } from "@mui/material";

const AlbumVignette = ({ album }) => {
  return (
    <div>
      <Box>
        <Stack
          direction="row"
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
            style={{ borderRadius: "20%", height: "12vh" }}
            src={album.image}
            alt={album.name}
          />
          <Stack spacing={2}>
            <Typography>{album.name}</Typography>
            <Typography>{album.totalTracks}</Typography>
          </Stack>
        </Stack>
      </Box>
    </div>
  );
};

export default AlbumVignette;
