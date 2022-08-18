import React from "react";
import { useState, useEffect } from "react";
import useAuth from "../useLogic/useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import { Button, Box, Stack, Typography } from "@mui/material";
import TrackSearchResult from "../Components/TrackSearchResult";
import Player from "../Components/Player";

const Accueil = ({ accessToken, playTrack, spotifyApi }) => {
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);

    spotifyApi.getMyTopArtists().then((res) => {
      let temp1 = res?.body?.items;
      setTopArtists(
        temp1.map((track) => {
          const smallestAlbumImage = track.images.reduce((smallest, image) => {
            if (image.height < smallest.height) {
              return image;
            } else {
              return smallest;
            }
          }, track.images[0]);

          return {
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
            artist: track.followers.total,
          };
        })
      );
    });

    spotifyApi.getMyTopTracks().then((res) => {
      let temp = res?.body?.items;
      setTopTracks(
        temp.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
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
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });
  }, [accessToken]);

  function test() {
    console.log(topArtists);
  }
  return (
    <div>
      <Stack direction="row" sx={{ width: "100%" }}>
        <Stack sx={{ width: "100%" }} alignItems="center">
          <Typography variant="h4">Top tracks</Typography>
          <br />
          {topTracks?.map((track) => (
            <TrackSearchResult
              track={track}
              key={track.uri}
              playTrack={playTrack}
            />
          ))}
        </Stack>
        <Stack sx={{ width: "100%" }} alignItems="center">
          <Typography variant="h4">Top artists</Typography>
          <br />
          {topArtists?.map((track) => (
            <TrackSearchResult
              track={track}
              key={track.uri}
              playTrack={playTrack}
            />
          ))}
        </Stack>
      </Stack>

    </div>
  );
};

export default Accueil;
