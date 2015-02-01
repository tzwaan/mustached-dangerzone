/*
 * Resource module.
 *
 * nr of carriers needed:
 * You need 10 energy each tick, so:
 * carriers = (2 * miner_yield * distance) / load
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
        console.log(source.distance);
    });
}

module.exports.creep_needed = function(source_id) {
}
