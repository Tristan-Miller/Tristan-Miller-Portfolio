// Click-to-toggle audio on videos marked data-sound.
// They still autoplay muted (browsers demand it); a click unmutes,
// and unmuting one mutes the others so two never talk over each other.
document.addEventListener('DOMContentLoaded', () => {
  const videos = Array.from(document.querySelectorAll('video[data-sound]'));
  if (!videos.length) return;

  videos.forEach(video => {
    video.muted = true;

    const badge = document.createElement('button');
    badge.type = 'button';
    badge.className = 'soundToggle';
    badge.setAttribute('aria-label', 'Unmute video');
    badge.textContent = 'Sound off';

    const paint = () => {
      badge.textContent = video.muted ? 'Sound off' : 'Sound on';
      badge.setAttribute('aria-label', video.muted ? 'Unmute video' : 'Mute video');
      badge.classList.toggle('isOn', !video.muted);
    };

    const toggle = () => {
      const unmuting = video.muted;
      if (unmuting) {
        videos.forEach(other => {
          if (other !== video) other.muted = true;
        });
        video.volume = 1;
        // Autoplay may have been blocked outright; a click is a user gesture.
        if (video.paused) video.play().catch(() => {});
      }
      video.muted = !unmuting;
    };

    video.classList.add('clickable', 'hasSound');
    video.addEventListener('click', toggle);
    badge.addEventListener('click', event => {
      event.stopPropagation();
      toggle();
    });
    video.addEventListener('volumechange', paint);

    // The badge pins to the video itself, not the caption below it.
    const holder = document.createElement('div');
    holder.className = 'videoHolder';
    video.parentNode.insertBefore(holder, video);
    holder.appendChild(video);
    holder.appendChild(badge);
    paint();
  });
});
