const express = require("express");
const https = require("https");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    const url = "https://api.weatherapi.com/v1/current.json?key=f5122e86b67d46a1b12132731221708&q=Hobart&aqi=yes";

    https.get(url, (response) => {
        console.log(response);
    })

    res.send("The server is up and running!");
});


app.listen(port, () => {
    console.log("The server has started on port 3000!");
});