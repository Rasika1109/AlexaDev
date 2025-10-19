// Populate year
document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  alert("Form submitted! (Static form)");
  e.target.reset();
});

// Dark mode toggle
const themeBtn = document.getElementById('themeToggle');
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// Bouncing Balls Background
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
const colors = ['#4dabf7','#1e90ff','#3b82f6','#60a5fa'];
const balls = [];

let oldWidth, oldHeight;

// Ball class
class Ball {
  constructor() {
    this.radius = Math.random() * 15 + 5;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;

    if(this.x + this.radius > canvas.width || this.x - this.radius < 0) this.vx *= -1;
    if(this.y + this.radius > canvas.height || this.y - this.radius < 0) this.vy *= -1;

    this.draw();
  }
}

// Resize canvas and scale balls proportionally
function resizeCanvas() {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;

  // Scale existing balls
  if(oldWidth && oldHeight){
    balls.forEach(ball => {
      ball.x = (ball.x / oldWidth) * newWidth;
      ball.y = (ball.y / oldHeight) * newHeight;
    });
  }

  canvas.width = newWidth;
  canvas.height = newHeight;

  oldWidth = newWidth;
  oldHeight = newHeight;
}

// Initial canvas size
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Create balls
for(let i = 0; i < 50; i++) balls.push(new Ball());

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  balls.forEach(ball => ball.update());
  requestAnimationFrame(animate);
}

animate();
