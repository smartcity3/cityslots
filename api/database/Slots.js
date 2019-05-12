//const db = require('../dbconnection'); //reference of dbconnection.js
const slots = [{ID:1, name: "Εκκλησία", lat: 37.983837, lon: 23.668459 },
            {ID:2, name: "Φούρνος", lat: 37.983967, lon: 23.668046 },
            {ID:3, name: "3ο Δημοτικό", lat: 37.983684, lon: 23.668459 }];

function getAvailableSlots() {
    return slots;
}

function getSlotByID(id) {
    answer = {};
    for(let i in slots) {
        if(slots[i].ID == id) {
            answer = slots[i];
            break;
        } 
    }
    return answer;
}

module.exports = {
    getAvailableSlots: getAvailableSlots
};