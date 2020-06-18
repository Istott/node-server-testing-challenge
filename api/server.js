const express = require("express");

const Family = require("../family/familyModel.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    res.status(200).json({ api: "up up and away" });
});

server.get("/family", (req, res) => {
    Family.getAll()
        .then(family => {
            res.status(200).json(family);
        })
        .catch(error => {
            res.status(500).json(error.message);
        });
});

server.post("/family", (req, res) => {
    Family.insert(req.body)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            res.status(500).json(error.message);
        });
});

module.exports = server;