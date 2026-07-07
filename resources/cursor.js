document.addEventListener('mousemove', (e) => {
  const cursor = document.getElementById('custom-cursor');
  cursor.style.left = `${e.pageX}px`;
  cursor.style.top = `${e.pageY}px`;
});

const clickableElements = document.querySelectorAll('.clickable');

clickableElements.forEach(element => {
  element.addEventListener('mouseenter', () => {
      const cursor = document.getElementById('custom-cursor');
      if (cursor.classList.contains('win95-cursor')) return;
      cursor.style.transform = 'scale(2)'; // Adjust scale factor as needed
  });

  element.addEventListener('mouseleave', () => {
      const cursor = document.getElementById('custom-cursor');
      if (cursor.classList.contains('win95-cursor')) return;
      cursor.style.transform = 'scale(1)'; // Restore to original size
  });
});

// Over the Vibes CRT screen the cursor becomes an old Windows arrow
// (see #custom-cursor.win95-cursor in style.css).
const crtScreen = document.getElementById('crtScreen');

if (crtScreen) {
  crtScreen.addEventListener('mouseenter', () => {
      const cursor = document.getElementById('custom-cursor');
      cursor.classList.add('win95-cursor');
      cursor.style.transform = ''; // the class anchors the arrow tip itself
  });

  crtScreen.addEventListener('mouseleave', () => {
      const cursor = document.getElementById('custom-cursor');
      cursor.classList.remove('win95-cursor');
      cursor.style.transform = '';
  });
}
