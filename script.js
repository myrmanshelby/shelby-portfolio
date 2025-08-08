// TYPEWRITER

const textSpan = document.getElementById('text');
let currentJob = [];
let i = 0;
let j = 0;
let isDeleting = false;
let isEnd = false;

const jobs = [
    'software engineer',
    'ux fanatic',
    'data-driven decision maker',
    'product-focused engineer',
    'ocean enthusiast'
];

function doTypewriter() {
    isEnd = false;
    if (i < jobs.length) {
        if (!isDeleting && j <= jobs[i].length) {
            currentJob.push(jobs[i][j]);
            j++;
            textSpan.innerHTML = currentJob.join('');
        }

        if (isDeleting && j <= jobs[i].length) {
            currentJob.pop();
            j--;
            textSpan.innerHTML = currentJob.join('');
        }

        if (j === jobs[i].length) {
            isEnd = true;
            isDeleting = true;
        }

        if (isDeleting && j === 0) {
            currentJob = [];
            isDeleting = false;
            i++;
            if (i === jobs.length) i = 0;
        }
    }

    const spedUp = Math.random() * 125;
    const normalSpeed = Math.random() * 300;
    const time = isEnd ? 2000 : isDeleting ? spedUp : normalSpeed;
    setTimeout(doTypewriter, time);
}

doTypewriter();

// MOUSE TRAIL 

const trails = document.querySelectorAll(".trail")
const smoothPointer = {
    x: window.innerWidth/2,
    y: window.innerHeight/2,
}
let totalPointsArray = []
let start = 20
for (const trail of trails) {
    totalPointsArray.push(start)
    start-=2
}

window.addEventListener("mousemove", (event) => {
    gsap.to(smoothPointer, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.5,
        ease: "power2.out",
    })
})

function updatePath() {
    const time = performance.now() / 300; // controls wave speed

    trails.forEach((path, index) => {
        let points = path.points || [];
        points.unshift({ ...smoothPointer });

        while (points.length > totalPointsArray[index]) {
            points.pop();
        }
        path.points = points;

        if (points.length > 1) {
            // Apply sine-wave offset for wavy feel
            const wavyPoints = points.map((p, i) => {
                const waveAmp = 6 + index; // amplitude increases per trail
                const offsetX = Math.sin(time + i * 0.4 + index) * waveAmp;
                const offsetY = Math.cos(time + i * 0.3 + index) * (waveAmp * 0.5);
                return { x: p.x + offsetX, y: p.y + offsetY };
            });

            // Draw smooth Bézier curve
            let d = `M ${wavyPoints[0].x} ${wavyPoints[0].y}`;
            for (let i = 1; i < wavyPoints.length - 2; i++) {
                const xc = (wavyPoints[i].x + wavyPoints[i + 1].x) / 2;
                const yc = (wavyPoints[i].y + wavyPoints[i + 1].y) / 2;
                d += ` Q ${wavyPoints[i].x} ${wavyPoints[i].y}, ${xc} ${yc}`;
            }
            const last = wavyPoints[wavyPoints.length - 1];
            d += ` T ${last.x} ${last.y}`;

            path.setAttribute("d", d);

            // Fade out trail as it stretches
            const opacity = Math.max(0.1, 1 - points.length / (totalPointsArray[index] * 1.2));
            path.setAttribute("stroke-opacity", opacity);
        }
    });

    requestAnimationFrame(updatePath);
}

updatePath()

function spawnBubble(x, y) {
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    document.body.appendChild(bubble);
    bubble.style.left = x + "px";
    bubble.style.top = y + "px";
    gsap.to(bubble, { y: -50, opacity: 0, duration: 2, onComplete: () => bubble.remove() });
}
window.addEventListener("mousemove", e => {
    if (Math.random() < 0.2) spawnBubble(e.clientX, e.clientY);
});