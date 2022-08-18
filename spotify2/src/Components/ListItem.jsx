import React from "react";
import { Box, Typography, Stack } from "@mui/material";

const ListItem = (item) => {
  return (
    <div>
      <Box>
        <Stack
          direction="row"
          sx={{ height: "8vh", cursor: "pointer" }}
          spacing={2}
        >
          <img src={item?.track?.album?.images[0]} alt="track" />
          <Stack spacing={2}>
            <Typography>{item?.track?.name}</Typography>
            <Typography>{item?.track?.artists[0]?.name}</Typography>
          </Stack>
        </Stack>
      </Box>
    </div>
  );
};

export default ListItem;
