/*
 * Resource module.
 *
 * nr of carriers needed:
 * You need 10 energy each tick, so:
 * nr_carriers = (2 * miner_yield * distance) / load
 */
var _ = require('lodash');
var C = require('constants');
var sources = Memory.resources;

module.exports = function() {
    var source_ids = _.sortBy(sources, function(n) {
        return n.distance;
    });
    console.log(source_ids);
    source_ids.forEach( function(source) {
        console.log(source);
        console.log(source.distance);
    });
};

// initialize the Resources memory.
// should be per room, is global now.
module.exports.init = function(room) {
    var new_sources = room.find(Game.SOURCES);
    var spawn = room.find(Game.MY_SPAWNS)[0];

    for (var source_name in new_sources) {
        var path = spawn.pos.findPathTo(new_sources[source_name]);
        var distance = 0;
        path.forEach(function(step) {
            var look = room.lookAt(step.x, step.y);
            look.forEach(function(object) {
                if (object.type == 'terrain') {
                    if (object.terrain == 'swamp') {
                        distance += 5;
                    }
                    else {
                        distance += 1;
                    }
                }
            });
        });
        Memory.resources[new_sources[source_name].id] = {
            'distance' : distance,
            'miners' : [],
            'carriers' : []
        };
    }
}

module.exports.creep_needed = function(source_id) {
};

// returns either false or the number of [work] parts that are needed.
function miner_needed(source_id) {
    var source = Memory.resources[source_id];
    var nr_work = 0;
    source.miners.forEach(function(creep) {
        Game.creeps[creep].body.forEach(function(body_part) {
            if (body_part == Game.WORK) {
                nr_work++;
            }
        });
    });
    // should be calculated, now hardcoded.
    var miner_max = 5;
    var miner_needed = miner_max - nr_work;

    if (miner_needed > 0) {
        return miner_needed;
    }
    return false;
}
module.exports.miner_needed = miner_needed;

// returns either false or the number of [carry&move] parts that are needed.
module.exports.carrier_needed = function(source_id) {
    var source = Memory.resources[source_id];
    var nr_carry = 0;
    source.carriers.forEach(function(creep) {
        Game.creeps[creep].body.forEach(function(body_part) {
            if (body_part == Game.CARRY) {
                nr_carry++;
            }
        });
    });
    // should be calculated, now hardcoded.
    var miner_yield = 10;
    carrier_needed = ((2 * miner_yield * source.distance) / 50) - nr_carry;

    if (carrier_needed > 0) {
        return carrier_needed;
    }
    return false;
};

/*
// commands all creeps associated with this resource
module.exports.command_creeps = function() {
    sources.forEach( function(source) {
        source.miners.forEach( function(creep) {
            miner(creep);
        });
        source.carriers.forEach( function(creep) {
            carrier(creep);
        });
    });
};
*/
