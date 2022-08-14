const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/bmiCalculator.html");
})

app.post("/", (req, res) => {
    let weight = parseFloat(req.body.weight);
    let height = parseFloat(req.body.height);
    let result = (weight / Math.pow(height, 2)).toFixed(2);
    console.log(result);
    res.send(`Your BMI IS: ${result}`);
})


app.listen(port, () => {
    console.log("The server has started on the port");
});