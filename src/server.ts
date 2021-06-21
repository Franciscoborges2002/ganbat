import express from "express";

const PORT = 3000;//Easly change the port of all server
const app = express();

app.listen(PORT, () => {
    console.log("Server is running in port " + PORT);
});