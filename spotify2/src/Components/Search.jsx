import React from "react";
import { useState } from "react";
import { Box, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Search = ({ search, setSearch }) => {
  const navigate = useNavigate();

  function searchFunction(textSeach) {
    setSearch(textSeach);
    if (textSeach) {
      navigate("/search/" + textSeach);
    } else {
      navigate("/");
    }
  }

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <TextField
          sx={{
            width: "30%",
            backgroundColor: "rgba( 255, 255, 255, .3)",
            borderRadius: "20px",
          }}
          label="Search for a track/artist"
          id="search-field"
          value={search}
          onChange={(e) => searchFunction(e.target.value)}
        />
      </Box>
    </div>
  );
};

export default Search;
