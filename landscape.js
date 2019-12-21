var current_mode = screen.orientation;
let botonRotar = document.querySelector(".botonRotar");

// type
console.log(current_mode.type)

// angle
console.log(current_mode.angle)

fullScreen();
botonRotar.addEventListener('click', function() {
  screen.orientation.lock("landscape-primary");
});

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
}

