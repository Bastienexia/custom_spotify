import React from "react";
import { useState, useEffect } from "react";
import { Box, Typography, Stack, Grid } from "@mui/material";
import TrackSearchResult from "../Components/TrackSearchResult";
import AlbumVignette from "../Components/AlbumVignette";
import { Link, useParams } from "react-router-dom";

const PersonalArtistPage = ({ spotifyApi, playTrack }) => {
  const [artistInfo, setArtistInfo] = useState();
  const [artistTopTracks, setArtistTopTracks] = useState();
  const [artistAlbums, setArtistAlbums] = useState();
  const accessToken = window.localStorage.getItem("accessToken");
  const artistId = useParams("id")?.id;

  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.setAccessToken(accessToken);

    spotifyApi.getArtist(artistId).then((res) => {
      const smallestArtistImage = res?.body?.images.reduce(
        (smallest, image) => {
          if (image.height < smallest.height) {
            return image;
          } else {
            return smallest;
          }
        },
        res?.body?.images[0]
      );

      setArtistInfo({
        name: res?.body?.name,
        followers: res?.body?.followers?.total,
        image: smallestArtistImage.url,
      });
    });

    spotifyApi.getArtistTopTracks(artistId, "FR").then((res) => {
      let tempArtistTopTracks = res?.body?.tracks;
      setArtistTopTracks(
        tempArtistTopTracks.map((track) => {
          const smallestTopTracksImage = track.album.images.reduce(
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
            title: track.name,
            albumUrl: smallestTopTracksImage.url,
            artist: artistInfo?.name,
            uri: track.uri,
          };
        })
      );
    });

    spotifyApi.getArtistAlbums(artistId, { limit: 50 }).then((res) => {
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
            id: album.id,
          };
        })
      );
    });
  }, [accessToken, artistId, artistInfo, spotifyApi]);

  return (
    <div>
      <Box sx={{ marginLeft: "6vw" }}>
        <Stack direction="row" spacing={4} alignItems="center">
          <img
            src={artistInfo?.image}
            alt={artistInfo?.name}
            style={{ borderRadius: "10%" }}
          />
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
                <TrackSearchResult
                  height="8vh"
                  width="70vw"
                  track={track}
                  key={track.uri}
                  playTrack={playTrack}
                />
              );
            } else {
              return null;
            }
          })}
        </Box>
        <Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h5">Albums</Typography>
          </Box>
          <Grid
            container
            sx={{ width: "100%", marginTop: "5vh" }}
            justifyContent="center"
            spacing={3}
          >
            {artistAlbums?.map((album) => (
              <Grid item xs={4} key={album?.id}>
                <Link to={"/Album/" + album?.id}>
                  <AlbumVignette album={album} key={album.id} />
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default PersonalArtistPage;
