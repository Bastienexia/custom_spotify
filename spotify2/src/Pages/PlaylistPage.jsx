import React from "react";
import { useState, useEffect } from "react";
import { Box, Grid, Typography, IconButton } from "@mui/material";
import PlaylistVignette from "../Components/PlaylistVignette";
import PlaylistTracks from "./PlaylistTracks";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Link } from "react-router-dom";

const PlaylistPage = ({ spotifyApi, playTrack }) => {
  const [playlists, setPlaylists] = useState([]);
  const [activePlaylist, setActivePlaylist] = useState();

  const accessToken = window.localStorage.getItem("accessToken");
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
          let playlistName = playlist.name;
          if (playlistName.length > 20) {
            playlistName = playlistName.replace(playlistName.substr(17), "...");
          }

          return {
            name: playlistName,
            image: bestPlaylistImage?.url,
            id: playlist.id,
            owner: playlist?.owner?.display_name,
            totalTracks: playlist?.tracks?.total,
          };
        })
      );
    });
  }, [accessToken, spotifyApi]);

  if (!activePlaylist) {
    return (
      <div>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h4">My playlists</Typography>
        </Box>
        <Grid
          container
          justifyContent="center"
          spacing={3}
          sx={{ marginTop: "5vh" }}
        >
          {playlists?.map((playlist) => (
            <Grid item key={playlist.id}>
              <Link to={"/Playlist/" + playlist?.id}>
                <PlaylistVignette
                  playlist={playlist}
                  key={playlist?.id}
                  accessToken={accessToken}
                  spotifyApi={spotifyApi}
                  playTrack={playTrack}
                />
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  } else {
    return (
      <div>
        <IconButton
          sx={{ backgroundColor: "#5D0085", color: "white", marginLeft: "5vw" }}
          onClick={() => setActivePlaylist()}
        >
          <ArrowBackIosNewIcon fontSize="large" />
        </IconButton>
        <br />
        <br />
        <PlaylistTracks
          spotifyApi={spotifyApi}
          playTrack={playTrack}
          playlist={activePlaylist}
        />
      </div>
    );
  }
};

export default PlaylistPage;
