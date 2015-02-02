/*
 * Main module.
 */
var C = require('constants');
var Resources = require('resources');

// Init is still on a game start basis, but should be on a per room basis.
// meaning: whenever a new room is found, initialize the room.
if (!Memory.init) {
    Memory.init = true;
    Memory.resources = {};
    Memory.max_parts = 5;

    for (var index in Game.rooms) {
        Resources.init(Game.rooms[index]);
    }
}

Resources();

for (var source_id in Memory.resources) {
    console.log(source_id);
    console.log(Resources.miner_needed(source_id));
}
