import React from "react";
import { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import ArtistsVignette from "../Components/ArtistsVignette";
import { Link } from "react-router-dom";

const ArtistsPage = ({ playTrack, spotifyApi }) => {
  const [artistsList, setArtistsList] = useState();
  const [activeArtist, setActiveArtist] = useState();
  const accessToken = window.localStorage.getItem("accessToken");

  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.setAccessToken(accessToken);

    spotifyApi.getFollowedArtists({ limit: 50 }).then((res) => {
      let tempArtists = res?.body?.artists?.items;
      setArtistsList(
        tempArtists.map((artist) => {
          const smallestArtistImage = artist.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) {
                return image;
              } else {
                return smallest;
              }
            },
            artist.images[0]
          );

          return {
            id: artist.id,
            name: artist.name,
            uri: artist.uri,
            imageUrl: smallestArtistImage.url,
          };
        })
      );
    });
  }, [accessToken, spotifyApi]);

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h4">Artists</Typography>
      </Box>
      <Grid
        container
        justifyContent="center"
        sx={{ marginTop: "5vh" }}
        spacing={3}
      >
        {artistsList?.map((artist) => (
          <Grid item key={artist.uri}>
            <Link to={"/Artist/" + artist?.id}>
              <ArtistsVignette artist={artist} key={artist.uri} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ArtistsPage;
