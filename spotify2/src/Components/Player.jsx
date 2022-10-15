import React from "react";
import { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

const Player = ({ accessToken, trackUri }) => {
  const [play, setPlay] = useState(false);
  const [trackList, setTrackList] = useState([]);

  useEffect(() => {
    if (!trackUri) return;

    if (!trackUri[0]) {
      if (!trackUri.uri) return;
      setTrackList(trackUri?.uri);
    } else {
      console.log("tableau");
      setTrackList(
        trackUri?.map((track) => {
          return track?.uri;
        })
      );
    }
  }, [trackUri]);

  useEffect(() => {
    if (!trackList) return;

    setPlay(true);
  }, [trackList]);

  if (!accessToken) return null;

  return (
    <SpotifyPlayer
      play={play}
      styles={{
        height: "10vh",
        bgColor: "#5D0085",
        color: "white",
        sliderColor: "#A52E7E",
        trackArtistColor: "white",
        trackNameColor: "white",
        sliderHandleColor: "#c65d89",
      }}
      callback={(state) => {
        if (!state.isPlaying) {
          setPlay(false);
        }
      }}
      token={accessToken}
      showSaveIcon
      name="Spotify 2.0"
      uris={trackList ? trackList : []}
    />
  );
};

export default Player;
