import React, { useState, useEffect } from "react";
import { Typography, Grid, Stack, Box, Button, TextField } from "@mui/material";
import TrackSearchResult from "./TrackSearchResult";

const AddTracksPlaylist = ({ spotifyApi, playlist }) => {
    const accessToken = localStorage.getItem("accessToken");
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        if (!search) {
            setSearchResults([]);
            return;
        }
        if (!accessToken) return;

        spotifyApi.setAccessToken(accessToken);

        spotifyApi.searchTracks(search, { limit: 12 }).then((res) => {
            setSearchResults(
                res?.body?.tracks?.items?.map((track) => {
                    const bestImage = track.album.images.reduce(
                        (smallest, image) => {
                            if (image.height > smallest.height) {
                                return image;
                            } else {
                                return smallest;
                            }
                        },
                        track.album.images[0]
                    );

                    return {
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: bestImage.url,
                    };
                })
            )
        })
    }, [search, accessToken]);

    return (
        <div>
            <br />
            <Box sx={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "center" }}>
                <TextField sx={{ width: "30%", backgroundColor: "white" }} label="Search for a track/artist" variant="filled" id="search-field" value={search} onChange={(e) => setSearch(e.target.value)} />
            </Box>
            <br />
            <Grid container justifyContent="center" sx={{ width: "100%" }}>
                {searchResults?.map((track) => (
                    <Grid item xs={4} key={track.uri}>
                        <TrackSearchResult key={track.uri} track={track} height="7vh" />
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default AddTracksPlaylist;