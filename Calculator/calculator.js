const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", (req, res) => {
    let num1 = Number(req.body.num1);
    let num2 = Number(req.body.num2);
    let result = num1 + num2;
    console.log(result);
    res.send(`The result of the calculation is: ${result}`);
})

app.listen(port, () => {
    console.log("The server has started on port 3000!");
});