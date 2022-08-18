import React from "react";
import { Stack, Typography, Box } from "@mui/material";

const AlbumVignette = ({ album }) => {
    return (
        <div>
            <Box>
                <Stack direction="row" sx={{ height: "10vh", width: "20vw", boxShadow: "2px 0 5px black", borderRadius: "1vh", cursor: "pointer" }} spacing={2}>
                    <img src={album.image} alt={album.name} />
                    <Stack spacing={2}>
                        <Typography>{album.name}</Typography>
                        <Typography>{album.totalTracks}</Typography>
                    </Stack>
                </Stack>
            </Box>
        </div>
    )
};

export default AlbumVignette;