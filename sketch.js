let songs;

let fft;

let visualizer_size = 300;
let max_volume = 90;

let volume;
let effects_size = [];

let radio;

let sign = true;

function preload() {
    songs = [loadSound("assets/Inukshuk - Future Past.mp4"),
        loadSound("assets/ElectroLight The Rift.mp3"),
        loadSound("assets/TheFatRat - Electrified.mp3"),
        loadSound("assets/TheFatRat Elegy Jackpot EP Track 4.mp3"),
        loadSound("assets/MitiS - Innocent Discretion.mp4"),
        loadSound("assets/howl - rush.mp3")
    ];
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    textAlign(CENTER);

    fft = new p5.FFT(0.2, 64 * 4);
    volume = new p5.Amplitude(0.9);
    rSlider = createSlider(0, 255, 255);
    rSlider.position(20, 40);
    rSlider.style('width', '80px');
    rSlider.style("background", "rgb(255,0,125)");
    gSlider = createSlider(0, 255, 0);
    gSlider.position(20, 60);
    gSlider.style('width', '80px');
    gSlider.style("background", "rgb(125,255,0)");
    bSlider = createSlider(0, 255, 125);
    bSlider.position(20, 80);
    bSlider.style('width', '80px');
    bSlider.style("background", "rgb(0,125,255)");

    // radio = createRadio();
    // radio.option(0, 'OMFG Hello');
    // radio.option(1, 'ElectroLight The Rift');
    // radio.option(2, 'TheFatRat - Electrified');
    // radio.option(3, "TheFatRat Elegy");
    // radio.option(4, "MitiS - Innocent Discretion");
    // radio.option(5, "howl - rush");
    // radio.style("color", "white");
}

function draw() {
    background(0);
    let spectrum = fft.analyze();
    let vol = volume.getLevel();
    let max_size = 100;
    let size = map(vol, 0, 1, 0, max_size);

    translate(width / 2, height / 2);
    for (let i = 0; i < spectrum.length; i++) {
        let amp = spectrum[i];
        let angle = map(i, 0, spectrum.length, 0, 360);
        let r = map(amp, 0, 500, 0, max_volume);
        let x = (visualizer_size - r) * cos(angle);
        let y = (visualizer_size - r) * sin(angle);
        let x2 = visualizer_size * cos(angle);
        let y2 = visualizer_size * sin(angle);
        let x3 = (visualizer_size + r) * cos(angle);
        let y3 = (visualizer_size + r) * sin(angle);
        stroke(rSlider.value(), gSlider.value(), bSlider.value());
        strokeWeight(2);
        line(x, y, x2, y2);
        line(x2, y2, x3, y3);
    }
    if (size > max_size / 2) {
        effects_size.push(15);
    }
    for (let i = 0; i < effects_size.length; i++) {
        effects_size[i] += 50;
        noFill();
        strokeWeight(3);
        stroke(125, 125, 125, 50);
        circle(0, 0, effects_size[i]);
        if (effects_size[i] > width) {
            effects_size.shift();
        }
    }

    if (sign) {
        fill("white");
        textSize(24);
        text("1~6いずれかのキーを押してください", 0, 0);
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