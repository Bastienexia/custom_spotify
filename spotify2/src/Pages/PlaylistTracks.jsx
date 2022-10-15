import React, { useState, useEffect } from "react";
import TrackSearchResult from "../Components/TrackSearchResult";
import { Stack, Box, Typography, Grid, IconButton } from "@mui/material";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import AddIcon from "@mui/icons-material/Add";
import AddTracksPlaylist from "../Components/AddTracksPlaylist";
import { useParams } from "react-router-dom";

const PlaylistTracks = ({ spotifyApi, playTrack }) => {
  const [tracks1, setTracks1] = useState([]);
  const [tracks2, setTracks2] = useState([]);
  const [tracks3, setTracks3] = useState([]);
  const [tracks4, setTracks4] = useState([]);
  const [totalTracks, setTotalTracks] = useState();
  const [randomTracks, setRandomTracks] = useState([]);
  const [add, setAdd] = useState(false);
  const accessToken = window.localStorage.getItem("accessToken");
  const playlistId = useParams("id")?.id;
  const [playlist, setPlaylist] = useState();

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.getPlaylist(playlistId).then((res) => {
      setPlaylist(res?.body);
      setTotalTracks(res?.body?.tracks?.total);
    });
  }, [accessToken, playlistId, spotifyApi]);

  useEffect(() => {
    if (!accessToken) return;
    if (!playlist) return;
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.getPlaylistTracks(playlistId).then((res) => {
      let temp = res?.body;
      setTracks1(
        temp?.items
          .filter((track) => {
            if (track?.is_local === true) {
              return false;
            } else {
              return true;
            }
          })
          .map((track) => {
            const bestImage = track?.track?.album?.images.reduce(
              (best, image) => {
                if (best.height > image.height) {
                  return best;
                } else {
                  return image;
                }
              },
              track?.track?.album?.images[0]
            );
            let trackName = track?.track?.name;
            if (trackName.length > 20) {
              trackName = trackName.replace(trackName.substr(17), "...");
            }

            return {
              title: trackName,
              uri: track?.track?.uri,
              albumUrl: bestImage?.url,
              artist: track?.track?.artists[0]?.name,
            };
          })
      );
    });
  }, [accessToken, playlist, playlistId, spotifyApi]);

  useEffect(() => {
    if (!accessToken) return;
    if (totalTracks < 100) return;
    if (totalTracks > 100) {
      spotifyApi.setAccessToken(accessToken);
      spotifyApi.getPlaylistTracks(playlistId, { offset: 100 }).then((res) => {
        let temp = res?.body;
        setTracks2(
          temp?.items
            .filter((track) => {
              if (track?.is_local === true) {
                return false;
              } else {
                return true;
              }
            })
            .map((track) => {
              const bestImage = track?.track?.album?.images.reduce(
                (best, image) => {
                  if (best.height > image.height) {
                    return best;
                  } else {
                    return image;
                  }
                },
                track?.track?.album?.images[0]
              );
              let trackName = track?.track?.name;
              if (trackName.length > 20) {
                trackName = trackName.replace(trackName.substr(17), "...");
              }

              return {
                title: trackName,
                uri: track?.track?.uri,
                albumUrl: bestImage?.url,
                artist: track?.track?.artists[0]?.name,
              };
            })
        );
      });
    }

    if (totalTracks > 200) {
      spotifyApi.getPlaylistTracks(playlistId, { offset: 200 }).then((res) => {
        let temp = res?.body;
        setTracks3(
          temp?.items
            .filter((track) => {
              if (track?.is_local === true) {
                return false;
              } else {
                return true;
              }
            })
            .map((track) => {
              const bestImage = track?.track?.album?.images.reduce(
                (best, image) => {
                  if (best.height > image.height) {
                    return best;
                  } else {
                    return image;
                  }
                },
                track?.track?.album?.images[0]
              );
              let trackName = track?.track?.name;
              if (trackName.length > 20) {
                trackName = trackName.replace(trackName.substr(17), "...");
              }

              return {
                title: trackName,
                uri: track?.track?.uri,
                albumUrl: bestImage?.url,
                artist: track?.track?.artists[0]?.name,
              };
            })
        );
      });
    }

    if (totalTracks > 300) {
      spotifyApi.getPlaylistTracks(playlistId, { offset: 300 }).then((res) => {
        let temp = res?.body;
        setTracks4(
          temp?.items
            .filter((track) => {
              if (track?.is_local === true) {
                return false;
              } else {
                return true;
              }
            })
            .map((track) => {
              const bestImage = track?.track?.album?.images.reduce(
                (best, image) => {
                  if (best.height > image.height) {
                    return best;
                  } else {
                    return image;
                  }
                },
                track?.track?.album?.images[0]
              );
              let trackName = track?.track?.name;
              if (trackName.length > 20) {
                trackName = trackName.replace(trackName.substr(17), "...");
              }

              return {
                title: trackName,
                uri: track?.track?.uri,
                albumUrl: bestImage?.url,
                artist: track?.track?.artists[0]?.name,
              };
            })
        );
      });
    }
  }, [accessToken, playlistId, spotifyApi, totalTracks]);

  useEffect(() => {
    if (!randomTracks) return;

    playTrack(randomTracks);
  }, [playTrack, randomTracks]);

  function playAll() {
    playTrack(tracks1);
  }

  function playAllRandom() {
    setRandomTracks(
      [...tracks1, ...tracks2].sort((a, b) => 0.5 - Math.random())
    );
  }

  function addButton() {
    if (!add) {
      setAdd(true);
    } else {
      setAdd(false);
    }
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
              src={playlist?.images[0]?.url}
              alt={playlist?.name}
              style={{ borderRadius: "10%", height: "25vh" }}
            />
            <Stack>
              <Typography variant="h4">{playlist?.name}</Typography>
              <Typography variant="h6">
                {playlist?.owner?.display_name}
              </Typography>
              <Typography variant="h8">{playlist?.totalTracks}</Typography>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={2}>
            <IconButton
              sx={{ backgroundColor: "#5D0085", color: "white" }}
              onClick={() => addButton()}
            >
              <AddIcon fontSize="large" />
            </IconButton>
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
        {add ? (
          <div>
            <AddTracksPlaylist spotifyApi={spotifyApi} />
            <Box
              sx={{ backgroundColor: "black", height: "0.1vh", width: "90%" }}
            ></Box>
          </div>
        ) : (
          <></>
        )}
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
          {tracks2?.map((track) => {
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
          {tracks3?.map((track) => {
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
          {tracks4?.map((track) => {
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

export default PlaylistTracks;
