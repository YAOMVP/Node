const express = require("express");
const https = require("node:https");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true })); //app.use(express.urlencoded({ extended: true})); Body-Parser is now included in Express.

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    console.log("Post received");
    // console.log(req.body);
    console.log(req.body.cityName);
    const query = `${req.body.cityName}`;

    const url = `https://api.weatherapi.com/v1/current.json?key=f5122e86b67d46a1b12132731221708&q=${query}&aqi=yes`;

    https.get(url, (response) => {
        console.log(response.statusCode);
        console.log("headers:", response.headers);

        response.on("data", (data) => {
            process.stdout.write(data);
            console.log(data);
            const weatherData = JSON.parse(data);
            console.log(weatherData);

            const location = weatherData.location.tz_id;

            const temp = weatherData.current.temp_c;

            const text = weatherData.current.condition.text;

            const iconCode = weatherData.current.condition.icon;

            console.log(`The location is: ${location} ,and the temperature is: ${temp} degree Celcius.`);
            console.log(iconCode);

            res.write(`<h1>The location is: ${location} </h1>`);
            res.write(`<h2>The temperature is: ${temp} degree Celcius.</h2>`);
            res.write(`<h3>The weather is currently: ${text} outside.</h3>`);
            res.write(`<img src = ${iconCode}>`);
            res.send();

        });
    })
})


app.listen(port, () => {
    console.log("The server has started on port 3000!");
});