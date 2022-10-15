import React, { useState, useEffect } from "react";
import TrackSearchResult from "../Components/TrackSearchResult";
import { Stack, Box, Typography, Grid, IconButton } from "@mui/material";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import { useParams } from "react-router-dom";

const AlbumTracks = ({ spotifyApi, playTrack }) => {
  const [tracks1, setTracks1] = useState([]);
  const [randomTracks, setRandomTracks] = useState([]);
  const accessToken = window.localStorage.getItem("accessToken");
  const albumId = useParams("id")?.id;
  const [album, setAlbum] = useState();

  useEffect(() => {
    if (!accessToken) return;
    if (!albumId) return;
    spotifyApi.setAccessToken(accessToken);
    console.log(albumId);

    spotifyApi.getAlbum(albumId).then((res) => {
      console.log(res?.body);
      setAlbum(res?.body);
    });
  }, [accessToken, albumId, spotifyApi]);

  useEffect(() => {
    if (!album) return;
    if (!accessToken) return;

    spotifyApi.setAccessToken(accessToken);
    spotifyApi.getAlbumTracks(albumId).then((res) => {
      let temp = res?.body;
      setTracks1(
        temp?.items.map((track) => {
          return {
            title: track?.name,
            uri: track?.uri,
            albumUrl: album?.images[0]?.url,
            artist: track?.artists[0]?.name,
          };
        })
      );
    });
  });

  useEffect(() => {
    if (!randomTracks) return;

    playTrack(randomTracks);
  }, [playTrack, randomTracks]);

  function playAll() {
    playTrack(tracks1);
  }

  function playAllRandom() {
    setRandomTracks([...tracks1].sort((a, b) => 0.5 - Math.random()));
  }

  return (
    <div>
      <Box sx={{ marginLeft: "6vw" }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={4}
          sx={{ height: "25vh", width: "90%" }}
        >
          <Stack direction="row" alignItems="center" spacing={4}>
            <img
              src={album?.images[0]?.url}
              alt={album?.name}
              style={{ borderRadius: "10%", height: "25vh" }}
            />
            <Stack>
              <Typography variant="h4">{album?.name}</Typography>
              <Typography variant="h6">{album?.artists[0]?.name}</Typography>
              <Typography variant="h8">{album?.total_tracks}</Typography>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={2}>
            <IconButton
              sx={{ backgroundColor: "#5D0085", color: "white" }}
              onClick={() => playAll()}
            >
              <PlaylistPlayIcon fontSize="large" />
            </IconButton>
            <IconButton
              sx={{ backgroundColor: "#5D0085", color: "white" }}
              onClick={() => playAllRandom()}
            >
              <ShuffleIcon fontSize="large" />
            </IconButton>
          </Stack>
        </Stack>
        <br />
        <Box
          sx={{ backgroundColor: "black", height: "0.1vh", width: "90%" }}
        ></Box>
        <Grid
          container
          sx={{ width: "100%", marginTop: "5vh", flexGrow: 1 }}
          justifyContent="center"
        >
          {tracks1?.map((track) => {
            if (!track) {
              return null;
            } else {
              return (
                <Grid item xs={4} key={track.uri}>
                  <TrackSearchResult
                    track={track}
                    key={track.uri}
                    playTrack={playTrack}
                  />
                </Grid>
              );
            }
          })}
        </Grid>
      </Box>
    </div>
  );
};

export default AlbumTracks;
