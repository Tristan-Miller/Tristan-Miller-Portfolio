 function goBack() {
    fadeToBlack.style.visibility = 'visible';
    fadeToBlack.style.opacity = 1;
    setTimeout(function () {
      window.location.href = 'index.html';
    }, 300);
  }


  document.addEventListener("DOMContentLoaded", function() {
    var projectName = document.querySelector(".projectName");
    var scrollContainer = document.getElementById("projectOneContainer");
  
    scrollContainer.addEventListener("scroll", function() {
      // Calculate the scroll position within the scroll container
      var scrollPosition = scrollContainer.scrollTop;
  
      // Set the opacity based on the scroll position
      projectName.style.opacity = 1 - scrollPosition / 100; // You can adjust the divisor for a smoother or faster effect
    });
  });
  
  