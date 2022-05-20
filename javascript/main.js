(function() {
    var $slides = document.querySelectorAll('.slide');
    var $controls = document.querySelectorAll('.slider__control');
    var numOfSlides = $slides.length;
    var slidingAT = 1300; // sync this with scss variable
    var slidingBlocked = false;
  
    [].slice.call($slides).forEach(function($el, index) {
      var i = index + 1;
      $el.classList.add('slide-' + i);
      $el.dataset.slide = i;
    });
  
    [].slice.call($controls).forEach(function($el) {
      $el.addEventListener('click', controlClickHandler);
    });
  
    function controlClickHandler() {
      if (slidingBlocked) return;
      slidingBlocked = true;
  
      var $control = this;
      var isRight = $control.classList.contains('m--right');
      var $curActive = document.querySelector('.slide.s--active');
      var index = +$curActive.dataset.slide;
      (isRight) ? index++ : index--;
      if (index < 1) index = numOfSlides;
      if (index > numOfSlides) index = 1;
      var $newActive = document.querySelector('.slide-' + index);
  
      $control.classList.add('a--rotation');
      $curActive.classList.remove('s--active', 's--active-prev');
      document.querySelector('.slide.s--prev').classList.remove('s--prev');
      
      $newActive.classList.add('s--active');
      if (!isRight) $newActive.classList.add('s--active-prev');
      
  
      var prevIndex = index - 1;
      if (prevIndex < 1) prevIndex = numOfSlides;
  
      document.querySelector('.slide-' + prevIndex).classList.add('s--prev');
  
      setTimeout(function() {
        $control.classList.remove('a--rotation');
        slidingBlocked = false;
      }, slidingAT*0.75);
    };
  }());


// Navbar

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach((link) =>
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);



// Video
window.addEventListener('load', videoScroll);
window.addEventListener('scroll', videoScroll);

function videoScroll() {

  if ( document.querySelectorAll('video[autoplay]').length > 0) {
    var windowHeight = window.innerHeight,
        videoEl = document.querySelectorAll('video[autoplay]');

    for (var i = 0; i < videoEl.length; i++) {

      var thisVideoEl = videoEl[i],
          videoHeight = thisVideoEl.clientHeight,
          videoClientRect = thisVideoEl.getBoundingClientRect().top;

      if ( videoClientRect <= ( (windowHeight) - (videoHeight*.5) ) && videoClientRect >= ( 0 - ( videoHeight*.5 ) ) ) {
        thisVideoEl.play();
      } else {
        thisVideoEl.pause();
      }

    }
  }

}

// Video Section
let video, playPauseBtn, stopBtn, slider, loopBtn;
video = document.querySelector(".video");
playPauseBtn = document.querySelector(".playPauseBtn");
stopBtn = document.querySelector(".stop");
slider = document.querySelector(".slider");
loopBtn = document.querySelector(".loop");
expandBtn = document.querySelector(".expand");
timer = document.querySelector(".timer");

function updateIcon() {
  if (video.paused) {
    playPauseBtn.innerHTML = "<i class='fas fa-play'></i>";
    playPauseBtn.style.color = "#30ff30";
  } else {
    playPauseBtn.innerHTML = "<i class='fas fa-pause'></i>";
    playPauseBtn.style.color = "#f4f4f4";
  }
}
function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}
function stopVideo() {
  video.currentTime = 0;
  setSliderAndTimer();
  video.pause();
}

function setSliderAndTimer() {
  //get minutes
  let minutes = Math.floor(video.currentTime / 60);
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  //get seconds
  let seconds = Math.floor(video.currentTime % 60);
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  timer.textContent = `${minutes}:${seconds}`;
  slider.value = (video.currentTime / video.duration) * 100;
  if (video.currentTime == video.duration) {
    slider.value = 0;
    stopVideo();
  }
}
function seeked() {
  video.currentTime = (slider.value / 100) * video.duration;
}
function changeLoopStatus() {
  if (loopBtn.classList.contains("loop-off")) {
    loopBtn.classList.remove("loop-off");
    loopBtn.classList.add("loop-on");
    video.loop = true;
  } else {
    loopBtn.classList.remove("loop-on");
    loopBtn.classList.add("loop-off");
    video.loop = false;
  }
}
function openFullscreen() {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.mozRequestFullScreen) {
    /* Firefox */
    video.mozRequestFullScreen();
  } else if (video.webkitRequestFullscreen) {
    /* Chrome, Safari & Opera */
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) {
    /* IE/Edge */
    video.msRequestFullscreen();
  }
}

//event listeners
playPauseBtn.addEventListener("click", toggleVideoStatus);
video.addEventListener("play", updateIcon);
video.addEventListener("pause", updateIcon);
stopBtn.addEventListener("click", stopVideo);
video.addEventListener("timeupdate", setSliderAndTimer);
slider.addEventListener("input", seeked);
loopBtn.addEventListener("click", changeLoopStatus);
expandBtn.addEventListener("click", openFullscreen);