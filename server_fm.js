//Forever start
const forever = require('forever-monitor');
let child = new (forever.Monitor)('server.js', {
    max: 3,
    silent: true,
    args: []
  });

child.on('watch:restart', function(info) {
    console.error('Restarting script because ' + info.file + ' changed');
});
 
child.on('restart', function() {
    console.error('Forever restarting script for ' + child.times + ' time');
});
 
child.on('exit', function () {
  console.log('server.js has exited after 3 restarts');
});
 
child.start();

console.log("Hola");