var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

function Circle(x, y, r, dx, dy)
{
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, 30, 0, Math.PI * 2, false); 
        c.strokeStyle = 'turquoise';
        c.fillStyle = 'turquoise';
        c.fill();
        c.stroke();
    }

    this.update = function() {
        if (this.x > innerWidth - 30 || this.x - 30 < 0) {
            this.dx = -this.dx;
        }
        if (this.y > innerHeight - 30 || this.y - 30 < 0) {
            this.dy = -this.dy;
        }
        if (this.x + 30 > recx && this.x + 30 <recx + recWidth && recy <= this.y && this.y <= (recy + recHeight)) {
            this.dx = -this.dx;
            this.x = 1017
            score++;
            this.dx -= 0.075;
            if (this.dy > 0) {this.dy += 0.075}
            else {this.dy -= 0.075;}
        }
        this.x += this.dx;
        this.y += this.dy;
    }
    this.draw();
}

var recy = 400;
var recx = 1050;
var recHeight = 150;
var recWidth = 25;
var speed = 0;
var direction = 0;
var score = 0;
var highscore = 0;
var fillertext;

window.addEventListener('keydown', function(event) {
    if (event.key == 'w') {
        direction = -0.425;
    } 
    else if (event.key == 's') {
        direction = 0.425;
    }
})

window.addEventListener('keyup', function(event){
    direction = 0; 
})


function play() {
    var circle = new Circle(Math.random() * (canvas.width / 5) + 33, Math.random() * (canvas.height / 5) + 33, 30, 7, 7);
    function animate() {
        speed += direction;
        if(direction == 0){
            if(speed < 0) speed += 0.1; 
            else speed -= 0.1; 
        }
        if (speed > 0) {
            if (recy + recHeight < canvas.height) {recy += speed;}
            else {speed = 0;}
        }
        if (speed < 0) {
            if (recy > 0) {recy += speed;}
            else {speed = 0;}
        }
        if (circle.x >= innerWidth - 30) {
            c.fillStyle = 'rgba(0, 0, 0, 0.45)'
            highscore = Math.max(highscore, score);
            score = 0;
            c.fillRect(0, 0, canvas.width, canvas.height)
            c.fillStyle = 'red';
            c.font = "35px Sans";
            c.fillText('Click Anywhere to Restart', 450, 300, 400);
            window.addEventListener('click', function() {
                if (circle.x >= innerWidth - 30) { 
                    circle.x = 200;
                    play();
                }
            })
        }
        else {
            requestAnimationFrame(animate);
            c.fillStyle = 'red'; 
            c.font = "25px Sans";
			c.fillText('Score : ' + score, 50, 50, 400);
            c.fillText('High Score : ' + highscore, 50, 80, 400);
            c.fillStyle = 'rgba(0, 0, 0, 0.45)'
            c.fillRect(0, 0, canvas.width, canvas.height);
            circle.draw();
            circle.update();
            c.fillStyle = "BurlyWood";
            c.fillRect(recx, recy, recWidth, recHeight);
        }
    }

    animate();
}

play();

