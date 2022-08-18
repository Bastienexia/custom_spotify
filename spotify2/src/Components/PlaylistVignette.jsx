import React from "react";
import { Stack, Typography } from "@mui/material";

const PlaylistVignette = ({ playlist }) => {
    return (
        <div>
            <Stack direction="row" onClick={() => console.log(playlist)} sx={{ height: "10vh", width: "20vw", boxShadow: "2px 0 5px black", borderRadius: "1vh", cursor: "pointer" }} spacing={2}>
                <img src={playlist.image} alt={playlist.name} />
                <Stack spacing={1}>
                    <Typography>{playlist.name}</Typography>
                    <Typography>{playlist.owner}</Typography>
                    <Typography>Total tracks: {playlist.totalTracks}</Typography>
                </Stack>
            </Stack>
        </div>
    )
};

export default PlaylistVignette;