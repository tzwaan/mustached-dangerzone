if (!Memory.init) {
    Memory.init = true;
    Memory.resources = {};
    Memory.total_parts = 5;

    for (var room_name in Game.rooms) {
        var room = Game.rooms[room_name];
        var sources = room.find(Game.SOURCES);
        var spawn = room.find(Game.MY_SPAWNS)[0];

        for (var source_name in sources) {
            var path = spawn.pos.findPathTo(sources[source_name]);
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
            Memory.resources[sources[source_name].id] = {
                'distance_to_spawn' : distance
            };
        }
    }
}
