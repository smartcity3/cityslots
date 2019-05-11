//const db = require('../dbconnection'); //reference of dbconnection.js
 
function getAvailableSlots() {
    var slots = [{name: "Slot1", lat: 37.983837, lon: 23.668459 },
                {name: "Slot2", lat: 37.983810, lon: 23.668479 },
                {name: "Slot3", lat: 37.983684, lon: 23.668459 }];
    return slots;
}

module.exports = {
    getAvailableSlots: getAvailableSlots
};