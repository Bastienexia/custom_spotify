import React, { useEffect } from "react";
import { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

const SideMenu = ({ token, spotifyApi, setPage, resetSearch }) => {
  const [userInfo, setUserInfo] = useState();
  const menu = ["Accueil", "Albums", "Playlists", "Artists"];

  useEffect(() => {
    if (!token) return;
    spotifyApi.setAccessToken(token);

    spotifyApi.getMe().then((res) => {
      let tempuser = res?.body;
      setUserInfo({
        name: tempuser?.display_name,
        image: tempuser?.images[0]?.url,
      });
    });
  }, [spotifyApi, token]);

  return (
    <div>
      <Box
        sx={{
          width: "17vw",
          background: "#2F3136",
          position: "fixed",
          top: "0",
          left: "0",
          height: "100vh",
          boxShadow: "2px -1vh 20px black",
        }}
      >
        <Stack direction="column" spacing={2} alignItems="center">
          <Stack
            direction="row"
            sx={{ height: "15vh" }}
            alignItems="center"
            spacing={2}
          >
            <img
              style={{
                maxWidth: "10vh",
                maxHeight: "10vh",
                borderRadius: "50%",
              }}
              src={userInfo?.image}
              alt="You"
            />
            <Typography variant="h6">{userInfo?.name}</Typography>
          </Stack>
          <Box
            sx={{ backgroundColor: "black", height: "0.1vh", width: "90%" }}
          ></Box>
          <List>
            {menu?.map((menuItem) => (
              <Link
                to={"/" + (menuItem === "Accueil" ? "" : menuItem)}
                key={menuItem}
              >
                <ListItem
                  key={menuItem}
                  onClick={() => {
                    resetSearch("");
                  }}
                >
                  <ListItemButton sx={{ padding: "2vh 5vw 2vh" }}>
                    <ListItemText sx={{ color: "white" }} primary={menuItem} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        </Stack>
      </Box>
    </div>
  );
};

export default SideMenu;
