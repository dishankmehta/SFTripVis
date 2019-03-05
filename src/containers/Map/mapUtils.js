import React from 'react';

export const infoContent = [
  <li><b>Zoom:</b> you can use mouse scroll or your tuchpad or double click an area</li>,
  <li><b>Drag/Pan:</b> Click on the map, and withholding the click move the mouse or touchpad</li>,
  <li><b>Rotate:</b> Hold Shift key, Click on the map, and withholding the click move the mouse</li>,
  <li><b>Trip Details:</b> Hover over any line for details</li>
];

export function getColor(d) {
  return d >= 0 && d < 7.262688196999163  ? [102, 189, 99] :
         d >= 7.262688196999163 && d < 12.386426106684633  ? [217, 239, 139] :
         d >= 12.386426106684633 && d < 18.788916944935362  ?  [254, 224, 139] :
         d >= 18.788916944935362 && d < 25.728893591988328  ? [244, 109, 67] :
         d >= 25.728893591988328 && d <= 34.747030231995446  ? [168, 0, 0]:[67,146,241];;
}

function pad(num) {
  return ("0"+num).slice(-2);
}

export function parseDiffernece(seconds) {
  let mins = Math.floor(seconds/60);
  seconds = seconds % 60;
  let hours = Math.floor(mins/60);
  mins = mins % 60;
  return `${pad(hours)}:${pad(mins)}:${pad(seconds)}`;
}
