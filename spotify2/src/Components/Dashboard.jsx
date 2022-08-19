import React from "react";
import { useState, useEffect } from "react";
import useAuth from "../useLogic/useAuth";
import { TextField, Button, Box } from "@mui/material";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "./TrackSearchResult";
import Player from "./Player";

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();

  const spotifyApi = new SpotifyWebApi({
    clientId: "fefb2085586f4e7ab7ac04aaa2568ced",
    limit: "40",
    accessToken,
  });

  function playTrack(track) {
    setPlayingTrack(track);
  }

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let temp;
    spotifyApi
      .searchTracks(search)
      .then((res) => {
        temp = res?.body?.tracks?.items;
        setSearchResults(
          temp.map((track) => {
            const smallestAlbumImage = track.album.images.reduce(
              (smallest, image) => {
                if (image.height < smallest.height) {
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
              albumUrl: smallestAlbumImage.url,
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search, accessToken]);

  return (
    <div>
      <Box sx={{ width: "80%" }}>
        <TextField
          label="Search for a song"
          variant="outlined"
          id="search-field"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="contained">Search</Button>
      </Box>
      <Box>
        {searchResults?.map((track) => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            playTrack={playTrack}
          />
        ))}
      </Box>
      <Box sx={{ position: "fixed", width: "100%", bottom: "0" }}>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </Box>
    </div>
  );
};

export default Dashboard;
