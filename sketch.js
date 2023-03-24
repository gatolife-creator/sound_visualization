/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
let songs;

let fft;

const visualizerSize = 300;
const maxVolume = 90;

let volume;
const effectSize = [];

let sign = true;

function preload() {
  songs = [
    loadSound('assets/Inukshuk - Future Past.mp4'),
    loadSound('assets/ElectroLight The Rift.mp3'),
    loadSound('assets/TheFatRat - Electrified.mp3'),
    loadSound('assets/TheFatRat Elegy Jackpot EP Track 4.mp3'),
    loadSound('assets/MitiS - Innocent Discretion.mp4'),
  ];
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  textAlign(CENTER);

  fft = new p5.FFT(0.2, 64 * 4);
  volume = new p5.Amplitude(0.9);
}

function draw() {
  background(0);
  const spectrum = fft.analyze();
  const vol = volume.getLevel();
  const maxSize = 100;
  const size = map(vol, 0, 1, 0, maxSize);

  translate(width / 2, height / 2);
  for (let i = 0; i < spectrum.length; i++) {
    const amp = spectrum[i];
    const angle = map(i, 0, spectrum.length, 0, 360);
    const r = map(amp, 0, 500, 0, maxVolume);
    const x = (visualizerSize - r) * cos(angle);
    const y = (visualizerSize - r) * sin(angle);
    const x2 = visualizerSize * cos(angle);
    const y2 = visualizerSize * sin(angle);
    const x3 = (visualizerSize + r) * cos(angle);
    const y3 = (visualizerSize + r) * sin(angle);
    stroke(255, 0, 125);
    strokeWeight(2);
    line(x, y, x2, y2);
    line(x2, y2, x3, y3);
  }
  if (size > maxSize / 2) {
    effectSize.push(15);
  }
  for (let i = 0; i < effectSize.length; i++) {
    effectSize[i] += 50;
    noFill();
    strokeWeight(3);
    stroke(125, 125, 125, 50);
    circle(0, 0, effectSize[i]);
    if (effectSize[i] > width) {
      effectSize.shift();
    }
  }

  if (sign) {
    fill('white');
    textSize(24);
    text('1~6いずれかのキーを押してください', 0, 0);
  }
}

function keyPressed() {
  sign = false;
  switch (keyCode) {
    case 49:
      for (let i = 0; i < songs.length; i++) {
        songs[i].pause();
      }
      songs[0].loop();
      break;
    case 50:
      for (let i = 0; i < songs.length; i++) {
        songs[i].pause();
      }
      songs[1].loop();
      break;
    case 51:
      for (let i = 0; i < songs.length; i++) {
        songs[i].pause();
      }
      songs[2].loop();
      break;
    case 52:
      for (let i = 0; i < songs.length; i++) {
        songs[i].pause();
      }
      songs[3].loop();
      break;
    case 53:
      for (let i = 0; i < songs.length; i++) {
        songs[i].pause();
      }
      songs[4].loop();
      break;
    case 54:
      for (let i = 0; i < songs.length; i++) {
        songs[i].pause();
      }
      songs[5].loop();
      break;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
