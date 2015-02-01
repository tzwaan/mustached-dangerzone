/*
 * Main module.
 */
var C = require('constants');
var Resources = require('resources');

// Init is still on a game start basis, but should be on a per room basis.
// whenever a new room is found, initialize the room.
if (!Memory.init) {
    Memory.init = true;
    Memory.resources = {};
    Memory.max_parts = 5;

    Game.rooms.forEach(Resources.init);
}

Resources();
