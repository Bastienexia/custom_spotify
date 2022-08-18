import React from "react";
import { useState, useEffect } from "react";
import { Box, Typography, Stack, Grid } from "@mui/material";
import AlbumVignette from "../Components/AlbumVignette";
import AlbumTracks from "./AlbumTracks";

const AlbumPage = ({ spotifyApi, playTrack }) => {
    const [albums, setAlbums] = useState([]);
    const [albums2, setAlbums2] = useState([]);
    const [albums3, setAlbums3] = useState([]);
    const [albums4, setAlbums4] = useState([]);
    const [activeAlbum, setActiveAlbum] = useState();
    const [totalAlbum, setTotalAlbum] = useState();
    const token = window.localStorage.getItem("accessToken");

    useEffect(() => {
        if (!token) return;

        spotifyApi.setAccessToken(token);

        spotifyApi.getMySavedAlbums({ limit: 50 }).then((res) => {
            setTotalAlbum(res?.body?.total);
            let temp = res?.body?.items;
            setAlbums(
                temp?.map((album) => {
                    const bestAlbumImage = album.album.images.reduce((best, image) => {
                        if (image.height > best.height) {
                            return image;
                        } else {
                            return best;
                        }
                    }, album.album.images[0]);

                    return {
                        artist: album?.album?.artists[0]?.name,
                        name: album?.album?.name,
                        image: bestAlbumImage?.url,
                        totalTracks: album?.album?.total_tracks,
                        id: album?.album?.id
                    }
                })
            )
        })
    }, [token]);

    useEffect(() => {
        if (!token) return;
        if (totalAlbum < 51) return;

        if (totalAlbum > 50) {
            spotifyApi.getMySavedAlbums({ limit: 50, offset: 50 }).then((res) => {
                let temp = res?.body?.items;
                setAlbums2(
                    temp?.map((album) => {
                        const bestAlbumImage = album.album.images.reduce((best, image) => {
                            if (image.height > best.height) {
                                return image;
                            } else {
                                return best;
                            }
                        }, album.album.images[0]);

                        return {
                            artist: album?.album?.artists[0]?.name,
                            name: album?.album?.name,
                            image: bestAlbumImage?.url,
                            totalTracks: album?.album?.total_tracks,
                            id: album?.album?.id
                        }
                    })
                )
            })
        }

        spotifyApi.getMySavedAlbums({ limit: 50, offset: 100 }).then((res) => {
            let temp = res?.body?.items;
            setAlbums3(
                temp?.map((album) => {
                    const bestAlbumImage = album.album.images.reduce((best, image) => {
                        if (image.height > best.height) {
                            return image;
                        } else {
                            return best;
                        }
                    }, album.album.images[0]);

                    return {
                        artist: album?.album?.artists[0]?.name,
                        name: album?.album?.name,
                        image: bestAlbumImage?.url,
                        totalTracks: album?.album?.total_tracks,
                        id: album?.album?.id
                    }
                })
            )
        })

        spotifyApi.getMySavedAlbums({ limit: 50, offset: 150 }).then((res) => {
            let temp = res?.body?.items;
            setAlbums4(
                temp?.map((album) => {
                    const bestAlbumImage = album.album.images.reduce((best, image) => {
                        if (image.height > best.height) {
                            return image;
                        } else {
                            return best;
                        }
                    }, album.album.images[0]);

                    return {
                        artist: album?.album?.artists[0]?.name,
                        name: album?.album?.name,
                        image: bestAlbumImage?.url,
                        totalTracks: album?.album?.total_tracks,
                        id: album?.album?.id
                    }
                })
            )
        })
    }, [totalAlbum])

    if (!activeAlbum) {
        return (
            <div>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
                    <Typography variant="h4">My saved albums</Typography>
                </Box>
                <Grid container justifyContent="center" spacing={3} sx={{ marginTop: "5vh" }}>
                    {albums?.map((album) => (
                        <Grid item key={album.id} onClick={() => setActiveAlbum(album)}>
                            <AlbumVignette album={album} key={album.id} />
                        </Grid>
                    ))}
                    {albums2?.map((album) => (
                        <Grid item key={album.id} onClick={() => setActiveAlbum(album)}>
                            <AlbumVignette album={album} key={album.id} />
                        </Grid>
                    ))}
                    {albums3?.map((album) => (
                        <Grid item key={album.id} onClick={() => setActiveAlbum(album)}>
                            <AlbumVignette album={album} key={album.id} />
                        </Grid>
                    ))}
                    {albums4?.map((album) => (
                        <Grid item key={album.id} onClick={() => setActiveAlbum(album)}>
                            <AlbumVignette album={album} key={album.id} />
                        </Grid>
                    ))}
                </Grid>
            </div>)
    } else {
        return <AlbumTracks album={activeAlbum} spotifyApi={spotifyApi} playTrack={playTrack} />
    }
};

export default AlbumPage;