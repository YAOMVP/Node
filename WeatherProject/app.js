const express = require("express");
const { log } = require("node:console");
const https = require("node:https");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    const url = "https://api.weatherapi.com/v1/current.json?key=f5122e86b67d46a1b12132731221708&q=Hobart&aqi=yes";

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

});


app.listen(port, () => {
    console.log("The server has started on port 3000!");
});