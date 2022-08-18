import React from 'react';
import { Stack, Typography, Box } from "@mui/material";

const ArtistsVignette = ({ artist }) => {
    return (
        <Stack direction="row" sx={{ boxShadow: "2px 0 5px black", height: "12vh", width: "20vw", borderRadius: "1vh", cursor: "pointer" }}>
            <img src={artist.imageUrl} alt={artist.name} />
            <Typography>{artist.name}</Typography>
        </Stack>
    )
};

export default ArtistsVignette;