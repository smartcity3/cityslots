//const db = require('../dbconnection'); //reference of dbconnection.js
const slots = [{ID:1, name: "Εκκλησία", initial:'13:10', time:'15 λεπτά', lat: 37.983837, lon: 23.668459, available: true},
            {ID:2, name: "Φούρνος", initial:'13:20', time:'20 λεπτά', lat: 37.983967, lon: 23.668046, available: true },
            {ID:3, name: "3ο Δημοτικό", initial:'8:00', time:'5 λεπτά', lat: 37.983684, lon: 23.668459, available: true }];

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
    getAvailableSlots: getAvailableSlots,
    getSlotByID: getSlotByID
};