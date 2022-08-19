import React from "react";
import { useState, useEffect } from "react";
import { Box, Typography, Stack, Button, Grid, IconButton } from "@mui/material";
import TrackSearchResult from "../Components/TrackSearchResult";
import AlbumVignette from "../Components/AlbumVignette";
import AlbumTracks from "./AlbumTracks";


const PersonalArtistPage = ({ artist, spotifyApi, playTrack }) => {
    const [artistInfo, setArtistInfo] = useState();
    const [artistTopTracks, setArtistTopTracks] = useState();
    const [artistAlbums, setArtistAlbums] = useState();
    const [activeAlbum, setActiveAlbum] = useState();
    const accessToken = window.localStorage.getItem("accessToken");

    useEffect(() => {
        if (!accessToken) return;

        spotifyApi.setAccessToken(accessToken);

        spotifyApi.getArtist(artist.id).then(res => {
            const smallestArtistImage = res?.body?.images.reduce((smallest, image) => {
                if (image.height < smallest.height) {
                    return image;
                } else {
                    return smallest;
                }
            }, res?.body?.images[0]);

            setArtistInfo({
                name: res?.body?.name,
                followers: res?.body?.followers?.total,
                image: smallestArtistImage.url
            })
        });

        spotifyApi.getArtistTopTracks(artist.id, "FR").then(res => {
            let tempArtistTopTracks = res?.body?.tracks;
            setArtistTopTracks(
                tempArtistTopTracks.map((track) => {
                    const smallestTopTracksImage = track.album.images.reduce((smallest, image) => {
                        if (image.height < smallest.height) {
                            return image;
                        } else {
                            return smallest;
                        }
                    }, track.album.images[0]);

                    return {
                        title: track.name,
                        albumUrl: smallestTopTracksImage.url,
                        artist: artist?.name,
                        uri: track.uri
                    }
                })
            )
        });

        spotifyApi.getArtistAlbums(artist.id, { limit: 50 }).then(res => {
            setArtistAlbums(
                res?.body?.items.map((album) => {
                    const smallestAlbumImage = album.images.reduce((smallest, image) => {
                        if (image.height > smallest.height) {
                            return image;
                        } else {
                            return smallest;
                        }
                    }, album.images[0]);

                    return {
                        name: album.name,
                        image: smallestAlbumImage.url,
                        totalTracks: album.total_tracks,
                        artist: album?.artists[0]?.name,
                        id: album.id
                    }
                })
            )
        });
    }, [accessToken]);

    if (!activeAlbum) {
        return (
            <div>
                <Box sx={{ marginLeft: "6vw" }}>
                    <Stack direction="row" spacing={4} alignItems="center">
                        <img src={artistInfo?.image} alt={artistInfo?.name} style={{ borderRadius: "50%" }} />
                        <Box>
                            <Typography variant="h4">{artistInfo?.name}</Typography>
                            <Typography variant="h6">{artistInfo?.followers}</Typography>
                        </Box>
                    </Stack>
                    <Box sx={{ width: "80%" }}>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <Typography variant="h5">Top tracks</Typography>
                        </Box>
                        <br />
                        {artistTopTracks?.map((track, i = 0) => {
                            i++;
                            if (i < 6) {
                                return (
                                    <TrackSearchResult height="8vh" width="100%" track={track} key={track.uri} playTrack={playTrack} />
                                )
                            } else {
                                return;
                            }
                        })}
                    </Box>
                    <Box>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <Typography variant="h5">Albums</Typography>
                        </Box>
                        <Grid container sx={{ width: "100%", marginTop: "5vh" }} justifyContent="center" spacing={3}>
                            {artistAlbums?.map((album) => (
                                <Grid item xs={4} key={album?.id} onClick={() => setActiveAlbum(album)} >
                                    <AlbumVignette album={album} key={album.id} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Box>
            </div >
        )
    } else {
        return <AlbumTracks album={activeAlbum} spotifyApi={spotifyApi} playTrack={playTrack} />
    }
};

export default PersonalArtistPage;