/* 
 * Module used to command the miners.
 */
var C = require('constants');

module.exports = function (creep){
	var target = Memory.resources[creep.memory.source_id].pos;
	
	var source = Game.lookAt(target);
	Game.getUsedCpu(function (cpu){
		console.log('cpu used during lookat ' + cpu);
	});

	var source = creep.room.find(Game.SOURCES, f
	
	Game.getUsedCpu(function (cpu){
		console.log('cpu used during find' + cpu);
	});
}
