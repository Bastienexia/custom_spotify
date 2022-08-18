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

const Main = ({ code }) => {
    const accessToken = useAuth(code);
    const [playingTrack, setPlayingTrack] = useState();
    const [search, setSearch] = useState('');
    const [page, setPage] = useState("Accueil");

    localStorage.setItem('accessToken', accessToken);

    useEffect(() => {
        if (!accessToken) return;

        localStorage.setItem('accessToken', accessToken);
    }, [accessToken]);

    const spotifyApi = new SpotifyWebApi({
        clientId: "fefb2085586f4e7ab7ac04aaa2568ced",
    });

    function changePage(page) {
        setPage(page);
    }

    function playTrack(track) {
        setPlayingTrack(track);
    }

    function funcSetSearch(text) {
        setSearch(text);
    }

    return (
        <div>
            <Box sx={{ marginTop: "0vh", color: "white" }}>
                <SideMenu token={accessToken} spotifyApi={spotifyApi} setPage={changePage} resetSearch={funcSetSearch} />
                <Box sx={{ marginBottom: "10vh" }}>
                    <Box sx={{ marginLeft: "16vw", height: "100%", background: "linear-Gradient(to bottom right, #9400D3, purple)", width: "82.5vw", marginTop: "-1vh" }}>
                        <br />
                        <Search setSearch={funcSetSearch} search={search} />
                        <br />
                        {search ? <SearchResult token={accessToken} spotifyApi={spotifyApi} search={search} playTrack={playTrack} /> :
                            page === "Accueil" || !page ? <Accueil accessToken={accessToken} playTrack={playTrack} spotifyApi={spotifyApi} /> :
                                page === "Albums" ? <AlbumPage token={accessToken} spotifyApi={spotifyApi} playTrack={playTrack} /> :
                                    page === "Playlists" ? <PlaylistPage accessToken={accessToken} spotifyApi={spotifyApi} playTrack={playTrack} /> :
                                        page === "Artists" ? <ArtistsPage accessToken={accessToken} spotifyApi={spotifyApi} playTrack={playTrack} /> :
                                            page === "Lyrics" ? <PlaylistTracks accessToken={accessToken} spotifyApi={spotifyApi} playTrack={playTrack} /> : <Accueil accessToken={accessToken} playTrack={playTrack} spotifyApi={spotifyApi} />
                        }
                        <br />
                        <br />
                        <br />
                    </Box>
                </Box>
                <Box sx={{ position: "fixed", width: "100%", bottom: "0", left: "0", boxShadow: "0 -4px 20px black" }}>
                    <Player accessToken={accessToken} trackUri={playingTrack} />
                </Box>
            </Box>
        </div>
    )
}

export default Main;