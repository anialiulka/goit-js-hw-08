import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const time = function (data) {
  let timeWatched = data;
  localStorage.setItem('videoplayer-current-time', JSON.stringify(timeWatched));
};

const throttledTime = throttle(time, 1000);

player.on('timeupdate', throttledTime);

delayedStart();

function delayedStart() {
  if (!JSON.parse(localStorage.getItem('videoplayer-current-time'))) {
    return;
  } else {
    const newStartTime = JSON.parse(
      localStorage.getItem('videoplayer-current-time')
    );
    player.setCurrentTime(newStartTime.seconds);
  }
}
