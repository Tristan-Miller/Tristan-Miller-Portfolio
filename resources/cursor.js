document.addEventListener('mousemove', (e) => {
  const cursor = document.getElementById('custom-cursor');
  cursor.style.left = `${e.pageX}px`;
  cursor.style.top = `${e.pageY}px`;
});

const clickableElements = document.querySelectorAll('.clickable');

clickableElements.forEach(element => {
  element.addEventListener('mouseenter', () => {
      const cursor = document.getElementById('custom-cursor');
      cursor.style.transform = 'scale(2)'; // Adjust scale factor as needed
  });

  element.addEventListener('mouseleave', () => {
      const cursor = document.getElementById('custom-cursor');
      cursor.style.transform = 'scale(1)'; // Restore to original size
  });
});



  