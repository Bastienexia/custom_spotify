import React from "react";
import { useState, useEffect } from "react";
import TrackSearchResult from "./TrackSearchResult";
import { Box, Grid } from "@mui/material";

const SearchResult = ({ token, spotifyApi, search, playTrack }) => {
    const [searchResults, setSearchResults] = useState([]);


    useEffect(() => {
        if (!search) return;
        if (!token) return;
        spotifyApi.setAccessToken(token);

        spotifyApi.searchTracks(search).then((res) => {
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
    }, [search, token]);

    return (
        <div>
            <Grid container justifyContent="center" spacing={3} sx={{ marginTop: "5vh" }}>
                {searchResults?.map((track) => (
                    <Grid item key={track.uri}>
                        <TrackSearchResult track={track} key={track.uri} playTrack={playTrack} />
                    </Grid>
                ))}
            </Grid>
        </div>
    )
};

export default SearchResult;