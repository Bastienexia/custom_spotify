import React from "react";
import { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import PlaylistVignette from "../Components/PlaylistVignette";
import PlaylistTracks from "./PlaylistTracks";

const PlaylistPage = ({ spotifyApi, playTrack }) => {
    const [playlists, setPlaylists] = useState([]);
    const [activePlaylist, setActivePlaylist] = useState();

    const accessToken = window.localStorage.getItem("accessToken")
    useEffect(() => {
        if (!accessToken) return;

        spotifyApi.setAccessToken(accessToken);

        spotifyApi.getUserPlaylists({ limit: 50 }).then((res) => {
            let temp = res?.body?.items;
            setPlaylists(
                temp?.map((playlist) => {
                    const bestPlaylistImage = playlist.images.reduce((best, image) => {
                        if (best.height > image.height) {
                            return best;
                        } else {
                            return image;
                        }
                    }, playlist.images[0]);

                    return {
                        name: playlist.name,
                        image: bestPlaylistImage.url,
                        id: playlist.id,
                        owner: playlist?.owner?.display_name,
                        totalTracks: playlist?.tracks?.total,
                    }
                })
            )
        });
    }, [accessToken]);

    if (!activePlaylist) {
        return (
            <div>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Typography variant="h4">My playlists</Typography>
                </Box>
                <Grid container justifyContent="center" spacing={3} sx={{ marginTop: "5vh" }}>
                    {playlists?.map((playlist) => (
                        <Grid item key={playlist.id} onClick={() => setActivePlaylist(playlist)}>
                            <PlaylistVignette playlist={playlist} key={playlist?.id} accessToken={accessToken} spotifyApi={spotifyApi} playTrack={playTrack} />
                        </Grid>
                    ))}
                </Grid>

            </div>
        )
    } else {
        return <PlaylistTracks spotifyApi={spotifyApi} playTrack={playTrack} playlist={activePlaylist} />
    }
};

export default PlaylistPage;