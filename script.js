const canvas = document.getElementById('clockCanvas');
const ctx = canvas.getContext('2d');
let blurAmount = 0;

function drawClock() {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours() % 12;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    
    // Draw clock face
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.beginPath();
    ctx.arc(0, 0, 180, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.lineWidth = 10;
    ctx.strokeStyle = 'black';
    ctx.stroke();
    
    // Draw numbers
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (let num = 1; num <= 12; num++) {
        const angle = (num * Math.PI) / 6;
        ctx.rotate(angle);
        ctx.translate(0, -150);
        ctx.rotate(-angle);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(angle);
        ctx.translate(0, 150);
        ctx.rotate(-angle);
    }
    
    // Draw hour hand
    ctx.save();
    const hourAngle = ((hours + minutes / 60) * Math.PI) / 6;
    ctx.rotate(hourAngle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -100);
    ctx.lineWidth = 8;
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.restore();
    
    // Draw minute hand
    ctx.save();
    const minuteAngle = ((minutes + seconds / 60) * Math.PI) / 30;
    ctx.rotate(minuteAngle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -140);
    ctx.lineWidth = 6;
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.restore();
    
    // Draw second hand
    ctx.save();
    const secondAngle = (seconds * Math.PI) / 30;
    ctx.rotate(secondAngle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -160);
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'orange';
    ctx.stroke();
    ctx.restore();
    
    ctx.restore();
    
    // Apply blur every second
    if (blurAmount < 10) {
        blurAmount += 0.1;
    } else {
        blurAmount = 0;
    }
    canvas.style.filter = `blur(${blurAmount}px)`;

    // Refresh the clock every minute
    if (seconds === 59) {
        setTimeout(() => {
            blurAmount = 0;
            window.location.reload();
        }, 1000);
    }
}

setInterval(drawClock, 1000);
