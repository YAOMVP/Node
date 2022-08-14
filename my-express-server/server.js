const response = require("express");
const express = require("express");
const app = express();
const port = 3000;
// app.listen(3000, function() {
//     console.log("server has started on port 3000");
// })
app.get("/", (req, res) => {
    res.send("<h1>Hello Olivia!!!</h1>");
})

app.get("/contact", (req, res) => {
    res.send("<h2>Contact me at:oliviachen797@gmail.com</h2>")
})


app.get("/about", (req, res) => {
    res.send("<h3>Tell:0466 752 999</h3>");
})

app.get("/hobbies", (req, res) => {
    res.send("<h4>I love playing instruments!!!!!!!</h4>")
})


app.listen(port, () => {
    console.log("server has started on port 3000");
})