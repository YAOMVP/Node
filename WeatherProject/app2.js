const express = require("express");
const app = express();
const port = 3000;
const https = require("https");

app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});


app.post("/", (req, res) => {
    console.log("Post request received");
    console.log(req.body.cityName);

    const city = req.body.cityName;
    const url = `https:api.weatherapi.com/v1/current.json?key=f5122e86b67d46a1b12132731221708&q=${city}t&aqi=yes`;

    https.get(url, (response) => { //地址的话要填写第三方的地址！！！！！
        console.log(response.statusCode); //200
        // console.log(response);

        response.on("data", (d) => {
            const weatherProject = JSON.parse(d);
            const location = weatherProject.location.tz_id
            const localTime = weatherProject.location.localtime;
            const temperature = weatherProject.current.temp_c;
            const icon = weatherProject.current.condition.icon;
            console.log(weatherProject);

            res.write(`<h1>The location is: ${location}.</h1>`);
            res.write(`<h2>Time is: ${localTime}.</h2>`);
            res.write(`<h3>The temperature is: ${temperature} outside.</h3>`);
            res.write(`<img src= ${icon}>`);

            res.send();
        });
    });
});

app.listen(port, () => {
    console.log("The server has started on port 3000!");
});