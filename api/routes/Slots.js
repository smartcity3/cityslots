const express = require('express');
const router = express.Router();
const security = require('../security');
const database = require('../database');
const socket = require('../socket');
//const boom = require('boom'); Error Handling

router.use(security.Authentication.tokenCheckerMiddleware);

router.get('/available/', function(req, res, next) {
    res.send(database.Slots.getAvailableSlots());
});

router.get('/bookSlot/:ID', function(req, res, next) {
    var slot = database.Slots.getSlotByID(req.params.ID);
    socket.SocketIO.broadcastMessage("broadcast", {event:"hideSlot", ID: slot.ID});
    res.send({slot : slot, currency1: -5});
});

router.get('/giveAway/', function(req, res, next) {
    socket.SocketIO.broadcastMessage("broadcast", {event:"giveAway", oldID: 1, newID: 2});
    res.send({giveAwaySlotID: 1, newSlot: {ID:2, name: "Φούρνος", initial:'13:20', time:'20 λεπτά', lat: 37.983967, lon: 23.668046, available: true }, currency3: 5});
});

router.get('/bradcastGiveAway/', function(req, res, next) {
    socket.SocketIO.broadcastMessage("broadcast", {event:"giveAwayRequest", slotToGiveAway: "Εκκλησία", slotToGet: "Φούρνος"});
    res.send();
});

router.get('/moreTime/', function(req, res, next) {
    res.send({extraTime: 15});
});

module.exports = router;