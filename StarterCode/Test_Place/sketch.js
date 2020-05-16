var bgColor;

function setup() {
    canvas = createCanvas(200, 200);
    bgcolor = color(200);
    createButton("go go go go");
};

function mousePressed() {
    bgColor = color(random(255));
}

function draw () {
    background(bgColor);
    fill(255, 0, 175);
    rect(100, 100, 50, 50);
}