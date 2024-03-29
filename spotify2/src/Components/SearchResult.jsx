import React from "react";
import { useState, useEffect } from "react";
import TrackSearchResult from "./TrackSearchResult";
import { Stack, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";

const SearchResult = ({ spotifyApi, playTrack }) => {
  const token = localStorage.getItem("accessToken");
  const search = useParams()?.textsearch;
  const [searchResults, setSearchResults] = useState([]);
  const [activeArtist, setActiveArtist] = useState();
  const [searchArtists, setSearchArtists] = useState([]);

  useEffect(() => {
    if (!search) return;
    if (!token) return;
    spotifyApi.setAccessToken(token);

    spotifyApi.searchTracks(search).then((res) => {
      setSearchResults(
        res?.body?.tracks?.items?.map((track) => {
          const bestImage = track.album.images.reduce((smallest, image) => {
            if (image.height > smallest.height) {
              return image;
            } else {
              return smallest;
            }
          }, track.album.images[0]);

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: bestImage.url,
          };
        })
      );
    });
  }, [search, token, spotifyApi]);

  useEffect(() => {
    if (!search) return;
    if (!token) return;
    spotifyApi.setAccessToken(token);

    spotifyApi.searchArtists(search).then((res) => {
      setSearchArtists(
        res?.body?.artists?.items?.map((artist) => {
          const bestArtistImage = artist.images.reduce((best, image) => {
            if (best.height > image.height) {
              return best;
            } else {
              return image;
            }
          }, artist.images[0]);

          return {
            title: artist.name,
            uri: artist.uri,
            albumUrl: bestArtistImage.url,
            artist: artist?.followers?.total,
            id: artist?.id,
          };
        })
      );
    });
  }, [search, token, spotifyApi]);

  return (
    <div>
      <Stack direction="row" sx={{ width: "100%" }}>
        <Stack alignItems="center" sx={{ width: "100%" }}>
          <Typography variant="h4">Tracks</Typography>
          <br />
          {searchResults?.map((track) => (
            <TrackSearchResult
              track={track}
              key={track.uri}
              playTrack={playTrack}
            />
          ))}
        </Stack>
        <Stack alignItems="center" sx={{ width: "100%" }}>
          <Typography variant="h4">Artists</Typography>
          <br />
          {searchArtists?.map((artist) => (
            <Link to={"/Artist/" + artist?.id} key={artist?.id}>
              <TrackSearchResult
                key={artist.id}
                track={artist}
                playTrack={setActiveArtist}
              />
            </Link>
          ))}
        </Stack>
      </Stack>
    </div>
  );
};

export default SearchResult;
