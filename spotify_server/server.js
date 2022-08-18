const express = require("express");
const spotifyWebApi = require("spotify-web-api-node");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/login", (req, res) => {
  const code = req.body?.code;

  if (!code) {
    return res.status(400).json({ error: "Code is required" });
  }

  const spotifyApi = new spotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: "fefb2085586f4e7ab7ac04aaa2568ced",
    clientSecret: "c90338e7b5f040efa5dec376ad28c958",
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((error) => {
      //res.sendStatus(400).json(error);
    });
});

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new spotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: "fefb2085586f4e7ab7ac04aaa2568ced",
    clientSecret: "c90338e7b5f040efa5dec376ad28c958",
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      console.log("The access token has been refreshed !");
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(3001);
