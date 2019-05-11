const express = require('express');
const router = express.Router();
const security = require('../security');
const database = require('../database');
const socket = require('../socket');
//const boom = require('boom');


router.use(security.Authentication.tokenCheckerMiddleware);

router.get('/available/', function(req, res, next) {
    res.send(database.Slots.getAvailableSlots());
});

router.get('/giveAway/', function(req, res, next) {
    socket.SocketIO.broadcastMessage("message");
    res.send({newSlot:{name: "Slot2", lat: 37.983810, lon: 23.668479 }, currency1: 5});
});

router.get('/moreTime/', function(req, res, next) {
    res.send({extraTime: 15});
});

module.exports = router;