const canvas = document.getElementById('screen');
const ctx = canvas.getContext('2d');

// Load the tumbleweed image
const headImg = new Image();
headImg.src = 'img/head1'; // Placeholder URL

let x = 100, y = 100;
let vx = 5;          // Horizontal speed
let vy = 0;          // Vertical speed
let gravity = 0.25;  // Pulls the weed down
let bounce = -1;   // Energy kept after bounce (70%)
let rotation = 0;    // Current angle
let rotSpeed = 0.1;  // How fast it spins

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Apply Physics
    vy += gravity; // Gravity increases downward velocity
    x += vx;
    y += vy;

    // 2. Ground Collision
    if (y + 100 > canvas.height) {
        y = canvas.height - 100; // Snap to floor
        vy *= bounce;            // Reverse and slow down
        vx *= 0.99;              // Add a little air friction
    }

    // 3. Wall Collision
    if (x + 100 > canvas.width || x < 0) {
        vx *= -1;
    }

    // 4. Update Rotation based on horizontal speed
    rotation += (vx * 0.02); 

    // 5. Draw the Image with Rotation
    ctx.save(); // Save the coordinate system
    ctx.translate(x + 50, y + 50); // Move origin to center of weed
    ctx.rotate(rotation);          // Spin it
    ctx.drawImage(headImg, -50, -50, 100, 100); // Draw centered
    ctx.restore(); // Reset coordinate system

    requestAnimationFrame(animate);
}

headImg.onload = animate;