window.HELP_IMPROVE_VIDEOJS = false;


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 2,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    // bulmaSlider.attach();

})


$(document).ready(function() {
  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function() {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");

  });

  var options = {
    slidesToScroll: 1,
    slidesToShow: 1,
    loop: true,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 3000,
  }

  // Initialize all div with carousel class
  var carousels = bulmaCarousel.attach('.carousel-compare', options);

  // Loop on each carousel initialized
  for(var i = 0; i < carousels.length; i++) {
    // Add listener to  event
    carousels[i].on('before:show', state => {
      console.log(state);
    });
  }

  // Access to bulmaCarousel instance of an element
  var element = document.querySelector('#my-element');
  if (element && element.bulmaCarousel) {
    // bulmaCarousel instance is available as element.bulmaCarousel
    element.bulmaCarousel.on('before-show', function(state) {
      console.log(state);
    });
  }

  /*var player = document.getElementById('interpolation-video');
  player.addEventListener('loadedmetadata', function() {
    $('#interpolation-slider').on('input', function(event) {
      console.log(this.value, player.duration);
      player.currentTime = player.duration / 100 * this.value;
    })
  }, false);*/

})


$(window).on("load", function(){
  // Reset gifs once everything is loaded to synchronize playback.
  $('.preload').attr('src', function(i, a){
      $(this).attr('src','').removeClass('preload').attr('src', a);
  });


  const position = { x: 0, y: 0 }
  const positionShape = { x: 0, y: 0 }
  const box = $('.hyper-space');
  const boxShape = $('.hyper-space-shape');

  const cursor = $('.hyper-space-cursor');
  const cursorShape = $('.hyper-space-cursor-shape');
  interact('.hyper-space-cursor').draggable({
    listeners: {
      start (event) {
        console.log(event.type, event.target)
      },
      move (event) {
        position.x += event.dx
        position.y += event.dy

        event.target.style.transform =
          `translate(${position.x}px, ${position.y}px)`

        let childPos = cursor.offset();
        let parentPos = box.offset();
        let childSize = cursor.outerWidth();
        let point = {
            x: (childPos.left - parentPos.left),
            y: (childPos.top - parentPos.top)
        };
        point = {
          x: (point.x) / (box.innerWidth() - childSize),
          y: (point.y) / (box.innerHeight() - childSize)
        }
        updateHyperGrid(point);
      },
    },
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent'
      })
    ]
  });
  interact('.hyper-space-cursor-shape').draggable({
    listeners: {
      start (event) {
        console.log(event.type, event.target)
      },
      move (event) {
        positionShape.x += event.dx
        positionShape.y += event.dy

        event.target.style.transform =
          `translate(${positionShape.x}px, ${positionShape.y}px)`

        let childPos = cursorShape.offset();
        let parentPos = boxShape.offset();
        let childSize = cursorShape.outerWidth();
        let point = {
            x: (childPos.left - parentPos.left),
            y: (childPos.top - parentPos.top)
        };
        point = {
          x: (point.x) / (boxShape.innerWidth() - childSize),
          y: (point.y) / (boxShape.innerHeight() - childSize)
        }
        updateHyperGridShape(point);
      },
    },
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent'
      })
    ]
  });

});

Number.prototype.clamp = function(min, max) {
return Math.min(Math.max(this, min), max);
};


function updateHyperGrid(point) {
const n = 20 - 1;
let top = Math.round(n * point.y.clamp(0, 1)) * 100;
let left = Math.round(n * point.x.clamp(0, 1)) * 100;
$('.hyper-grid-rgb > img').css('left', -left + '%');
$('.hyper-grid-rgb > img').css('top', -top + '%');
}

function updateHyperGridShape(point) {
const n = 20 - 1;
let top = Math.round(n * point.y.clamp(0, 1)) * 100;
let left = Math.round(n * point.x.clamp(0, 1)) * 100;
$('.hyper-grid-rgb-shape > img').css('left', -left + '%');
$('.hyper-grid-rgb-shape > img').css('top', -top + '%');
}
