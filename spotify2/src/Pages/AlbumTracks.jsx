import React, { useState, useEffect } from "react";
import TrackSearchResult from "../Components/TrackSearchResult";
import { Stack, Box, Typography, Grid, Divider, IconButton } from "@mui/material";
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import ShuffleIcon from '@mui/icons-material/Shuffle';

const AlbumTracks = ({ album, spotifyApi, playTrack }) => {
    const [tracks1, setTracks1] = useState([]);
    const [randomTracks, setRandomTracks] = useState([]);
    const accessToken = window.localStorage.getItem("accessToken");

    useEffect(() => {
        if (!accessToken) return;
        if (!album) return;
        spotifyApi.setAccessToken(accessToken);

        spotifyApi.getAlbumTracks(album.id).then((res) => {
            console.log(res)
            let temp = res?.body;
            setTracks1(
                temp?.items.map((track) => {
                    const bestImage = track?.track?.album?.images.reduce((best, image) => {
                        if (best.height > image.height) {
                            return best;
                        } else {
                            return image;
                        }
                    }, track?.album?.images[0]);

                    return {
                        title: track?.name,
                        uri: track?.uri,
                        albumUrl: album?.image,
                        artist: track?.artists[0]?.name,
                    }
                })
            )
        });

    }, [accessToken]);

    useEffect(() => {
        if (!randomTracks) return;

        playTrack(randomTracks);
    }, [randomTracks]);

    function playAll() {
        playTrack(tracks1);
    }

    function playAllRandom() {
        setRandomTracks([...tracks1].sort((a, b) => 0.5 - Math.random()));
    }

    return (
        <div>
            <Box sx={{ marginLeft: "6vw" }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between"
                    spacing={4} sx={{ height: "25vh", width: "90%" }}>
                    <Stack direction="row" alignItems="center" spacing={4}>
                        <img src={album?.image} alt={album?.name} style={{ borderRadius: "50%", height: "25vh" }} />
                        <Stack>
                            <Typography variant="h4">{album?.name}</Typography>
                            <Typography variant="h6">{album?.artist}</Typography>
                            <Typography variant="h8">{album?.totalTracks}</Typography>
                        </Stack>
                    </Stack>
                    <Stack direction="row" spacing={2} >
                        <IconButton sx={{ backgroundColor: "#5D0085", color: "white" }} onClick={() => playAll()}><PlaylistPlayIcon fontSize="large" /></IconButton>
                        <IconButton sx={{ backgroundColor: "#5D0085", color: "white" }} onClick={() => playAllRandom()}><ShuffleIcon fontSize="large" /></IconButton>
                    </Stack>
                </Stack>
                <br />
                <Box sx={{ backgroundColor: "black", height: "0.1vh", width: "90%" }}></Box>
                <Grid container sx={{ width: "100%", marginTop: "5vh", flexGrow: 1 }} justifyContent="center">
                    {tracks1?.map((track) => {
                        if (!track) {
                            return null;
                        } else {
                            return (
                                <Grid item xs={4} key={track.uri}>
                                    <TrackSearchResult track={track} key={track.uri} playTrack={playTrack} />
                                </Grid>
                            );
                        }
                    })}
                </Grid>
            </Box>
        </div>
    )
};

export default AlbumTracks;