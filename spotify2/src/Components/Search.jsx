import React from "react";
import { useState, useEffect } from "react";
import { Box, TextField } from "@mui/material";

const Search = ({ setSearch, search }) => {
    return (
        <div>
            <Box sx={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "center" }}>
                <TextField sx={{ width: "30%", backgroundColor: "white" }} label="Search for a track/artist" variant="filled" id="search-field" value={search} onChange={(e) => setSearch(e.target.value)} />
            </Box>
        </div>
    )
};

export default Search;