const express = require("express");
const app = express();
const port = 3000;
const mailchimp = require("mailchimp-marketing");

app.use(express.static("public")); //Clients downloads as they are from the server, by using Express
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => { //Sending the signup.html file to the browser as soon as a request is made on localhost:3000
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => { //As soon as the signIn button is pressed execute this


    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const Email = req.body.Email;
    const list_id = "a86daa2e92";
    console.log(FirstName, LastName, Email);

    //Creating an object with the users data
    const run = async() => {
        const response = await mailchimp.lists.batchListMembers("list_id", {
            members: [{
                    email_address: Email,
                    status: "subscirbed",
                },
                merge_fields = {
                    Fname: "FirstName",
                    Lname: "LastName"
                }
            ]
        })
    }
});

mailchimp.setConfig({
    apiKey: "8f15eeaa777e00552a9e3ff66fcd96f7-us11",
    server: "us11"
});


app.listen(port, () => {
    console.log("Server has started on port 3000!");
});

// API Key:  8f15eeaa777e00552a9e3ff66fcd96f7-us11  id:  a86daa2e92  serve: us11