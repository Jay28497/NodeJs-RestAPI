const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("GET METHOD")
})

app.post("/", (req, res) => {
    res.send("POST METHOD")
})

app.listen("8000", () => {
    // res.send("Hello Swagger..")
    console.log("Server started");
});