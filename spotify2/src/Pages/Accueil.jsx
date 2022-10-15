import React from "react";
import { useState, useEffect } from "react";
import { Stack, Typography, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import TrackSearchResult from "../Components/TrackSearchResult";
import PersonalArtistPage from "./PersonalArtistPage";
import { Link } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars-2";

const Accueil = ({ accessToken, playTrack, spotifyApi }) => {
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [activeArtist, setActiveArtist] = useState();

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
            id: track.id,
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
  }, [accessToken, spotifyApi]);

  if (!activeArtist) {
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
              <Link to={"/Artist/" + track?.id} key={track.uri}>
                <TrackSearchResult track={track} key={track.uri} />
              </Link>
            ))}
          </Stack>
        </Stack>
      </div>
    );
  } else {
    return (
      <div>
        <IconButton
          sx={{ backgroundColor: "#5D0085", color: "white", marginLeft: "5vw" }}
          onClick={() => setActiveArtist()}
        >
          <ArrowBackIosNewIcon fontSize="large" />
        </IconButton>
        <br />
        <br />
        <PersonalArtistPage
          artist={activeArtist}
          spotifyApi={spotifyApi}
          playTrack={playTrack}
        />
      </div>
    );
  }
};

export default Accueil;
