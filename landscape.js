/*fullScreen();
ScreenOrientation.lock('landscape-primary');

function fullScreen() {
  // Kind of painful, but this is how it works for now
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen();
  } else if (document.documentElement.webkitRequestFullscreen) {
    document.documentElement.webkitRequestFullscreen();
  } else if (document.documentElement.msRequestFullscreen) {
    document.documentElement.msRequestFullscreen();
  }
}*/

var current_mode = screen.orientation;

// type
console.log(current_mode.type)

// angle
console.log(current_mode.angle)

if(document.documentElement.requestFullscreen)
		console.log("Hola");

screen.orientation.lock("landscape-primary")
.then(function() {
  alert('Locked');
})
.catch(function(error) {
  alert(error);
});