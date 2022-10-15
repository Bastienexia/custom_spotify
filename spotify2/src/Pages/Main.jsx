import React, { useEffect } from "react";
import { useState } from "react";
import useAuth from "../useLogic/useAuth";
import Accueil from "../Pages/Accueil";
import { Box } from "@mui/material";
import Player from "../Components/Player";
import SpotifyWebApi from "spotify-web-api-node";
import SideMenu from "../Components/SideMenu";
import ArtistsPage from "./ArtistsPage";
import PersonalArtistPage from "./PersonalArtistPage";
import Search from "../Components/Search";
import SearchResult from "../Components/SearchResult";
import AlbumPage from "./AlbumPage";
import PlaylistPage from "./PlaylistPage";
import PlaylistTracks from "./PlaylistTracks";
import { Routes, Route } from "react-router-dom";
import AlbumTracks from "./AlbumTracks";
import { Scrollbars } from "react-custom-scrollbars-2";

const Main = ({ code }) => {
  const accessToken = useAuth(code);
  const [playingTrack, setPlayingTrack] = useState();
  const [search, setSearch] = useState("");

  localStorage.setItem("accessToken", accessToken);

  useEffect(() => {
    if (!accessToken) return;

    localStorage.setItem("accessToken", accessToken);
  }, [accessToken]);

  const spotifyApi = new SpotifyWebApi({
    clientId: "fefb2085586f4e7ab7ac04aaa2568ced",
  });

  function playTrack(track) {
    setPlayingTrack(track);
  }

  function funcSetSearch(text) {
    setSearch(text);
  }

  return (
    <div>
      <Box
        sx={{
          marginTop: "0vh",
          color: "white",
          minHeight: "100vh",
          background:
            "linear-gradient(to top left, #ff00cc 0%, rgba(105,5,144,1) 80%)",
          overflow: "hidden",
        }}
      >
        <SideMenu
          token={accessToken}
          spotifyApi={spotifyApi}
          resetSearch={funcSetSearch}
        />
        <Box>
          <Box
            sx={{
              marginLeft: "16vw",
              height: "100%",
              width: "auto",
              marginTop: "-1vh",
            }}
          >
            <br />
            <Search setSearch={funcSetSearch} search={search} />
            <br />
            <Scrollbars style={{ width: "83vw", height: "81vh" }}>
              <Routes>
                <Route
                  path={"/"}
                  element={
                    <Accueil
                      accessToken={accessToken}
                      playTrack={playTrack}
                      spotifyApi={spotifyApi}
                    />
                  }
                />
                <Route
                  path="/Albums"
                  element={
                    <AlbumPage
                      accessToken={accessToken}
                      playTrack={playTrack}
                      spotifyApi={spotifyApi}
                    />
                  }
                />
                <Route
                  path="/Playlists"
                  element={
                    <PlaylistPage
                      accessToken={accessToken}
                      playTrack={playTrack}
                      spotifyApi={spotifyApi}
                    />
                  }
                />
                <Route
                  path="/Artists"
                  element={
                    <ArtistsPage
                      accessToken={accessToken}
                      playTrack={playTrack}
                      spotifyApi={spotifyApi}
                    />
                  }
                />
                <Route
                  path="/Album/:id"
                  element={
                    <AlbumTracks
                      accessToken={accessToken}
                      playTrack={playTrack}
                      spotifyApi={spotifyApi}
                    />
                  }
                />
                <Route
                  path="/Playlist/:id"
                  element={
                    <PlaylistTracks
                      accessToken={accessToken}
                      playTrack={playTrack}
                      spotifyApi={spotifyApi}
                    />
                  }
                />
                <Route
                  path="/Artist/:id"
                  element={
                    <PersonalArtistPage
                      accessToken={accessToken}
                      playTrack={playTrack}
                      spotifyApi={spotifyApi}
                    />
                  }
                />
                <Route
                  path="/search/:textsearch"
                  element={
                    <SearchResult
                      accessToken={accessToken}
                      playTrack={playTrack}
                      spotifyApi={spotifyApi}
                    />
                  }
                />
              </Routes>

              <br />
              <br />
              <br />
            </Scrollbars>
          </Box>
        </Box>
        <Box
          sx={{
            position: "fixed",
            width: "100%",
            bottom: "0",
            left: "0",
            boxShadow: "0 -4px 20px black",
          }}
        >
          <Player accessToken={accessToken} trackUri={playingTrack} />
        </Box>
      </Box>
    </div>
  );
};

export default Main;
