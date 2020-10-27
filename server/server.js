const express = require("express")
const request = require("request")
const app = express()
app.use(express.json())
const { models, connectDb } = require("../utils/db")

const { checkJwt } = require("./utils/auth");

require("dotenv").config()

app.get("/status", checkJwt, (req, res) => {
  res.send("All fine here!")
})

app.get("/get-token", (req, res) => {
  request({
    method: "POST",
    url: "https://dev-signup.eu.auth0.com/oauth/token",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    form: {
      grant_type: "client_credentials",
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: "https://catchphrase.app"
    }
  }, function (error, response, body) {
    if (error) {
      res.status(400);
      res.send(error);
    }
    res.send(body);
  })
})



app.get("/user", (req, res, next) => {
  const { _raw, _json, ...userProfile } = req.user;
  res.send("user", {
    title: "Profile",
    userProfile: userProfile
  });
});

app.get("/users", async (req, res) => {
  return await models.User.find({}, (err, users) => {
    if (err) {
      res.status(400)
      console.log(err)
      res.send(err)
    }
    res.send(users)
  })
})

app.post("/users", async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "You need to send a user object." })
  }
  return await models.User.create(req.body, (err, user) => {
    if (err) {
      return res.status(400).send(err)
    }
    return res.send(user)
  })
})

app.get("/users/:username", async (req, res) => {
  return await models.User.find({ username: req.params.username }, (err, user) => {
    if (err) {
      res.status(400)
      console.log(err)
      res.send(err)
    }
    res.send(user)
  })
})

connectDb().then(async () => {
  app.listen(8080,
    () => console.log("server started"))
})