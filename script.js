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

// Bubbles

const bubbleColors = [
    "#D9E8ED", // soft sea foam
    "#A6CCE1", // aqua
    "#FDE8D2", // sand
    "#FAD6D6", // coral blush
    "#FFF9E8", // shell
    "#CFF5E7", // mint sea glass
];

setInterval(() => {
    const x = Math.random() * window.innerWidth;
    const y = window.innerHeight - 20;
    spawnBubble(x, y);
}, 600);

window.addEventListener("mousemove", (event) => {
    const count = Math.floor(Math.random() * 2) + 1;
    for (let i = 0; i < count; i++) {
        const offsetX = (Math.random() - 0.5) * 30;
        const offsetY = (Math.random() - 0.5) * 20;
        spawnBubble(event.clientX + offsetX, event.clientY + offsetY);
    }
});


function spawnBubble(x, y) {
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    document.body.appendChild(bubble);

    // Randomize bubble styles
    const size = Math.random() * 12 + 6;
    const color = bubbleColors[Math.floor(Math.random() * bubbleColors.length)];
    const blur = Math.random() < 0.3 ? "2px" : "0";

    Object.assign(bubble.style, {
        left: `${x}px`,
        top: `${y}px`,
        width: `${size}px`,
        height: `${size}px`,
        background: color,
        filter: `blur(${blur})`,
    });

    // Float upward
    gsap.to(bubble, {
        y: -80 - Math.random() * 40,
        x: (Math.random() - 0.5) * 60,
        opacity: 0,
        duration: 2.5 + Math.random(),
        ease: "power1.out",
        onComplete: () => bubble.remove()
    });
}