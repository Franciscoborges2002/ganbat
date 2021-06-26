import "reflect-metadata";
import express from "express";

import { router } from "./routes";

import "./database";

const PORT = 3000;//Easly change the port of all server
const app = express();

app.use(express.json());
app.use(router);




app.listen(PORT, () => {
    console.log("Server is running in port " + PORT);
});