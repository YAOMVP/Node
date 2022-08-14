const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello Olivia")
})


app.listen(port, () => {
    console.log("The server has started on port 3000!");
});