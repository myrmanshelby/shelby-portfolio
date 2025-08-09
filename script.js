// TYPEWRITER

const textSpan = document.getElementById('text');
let currentJob = [];
let i = 0;
let j = 0;
let isDeleting = false;
let isEnd = false;

const jobs = [
    'software engineer',
    'ux enthusiast',
    'data-driven decision maker',
    'product-focused engineer',
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
    "#4CC6BC", // sea foam
    "#4490B9", // aqua
    "#FFF3E5", // sand
    "#F8CEEC", // coral blush
    "#FDEDDA", // shell
    "#CFECDB", // mint sea glass
    "#94C1D6",
    "#C6DDEB"
];

setInterval(() => {
    const x = Math.random() * window.innerWidth + window.scrollX;
    const y = window.innerHeight + window.scrollY - 20;
    spawnBubble(x, y);
}, 300);

window.addEventListener("mousemove", (event) => {
    const count = Math.floor(Math.random() * 2) + 1;
    for (let i = 0; i < count; i++) {
        const offsetX = (Math.random() - 0.5) * 30;
        const offsetY = (Math.random() - 0.5) * 20;
        spawnBubble(event.pageX + offsetX, event.pageY + offsetY);
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

const timeline = document.querySelector('.timeline');
const boxes = Array.from(document.querySelectorAll('.timeline .text-box'));

function clamp(n, min, max) { return Math.max(min, Math.min(n, max)); }

function updateLineProgress() {
  if (!timeline) return;

  const rect = timeline.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;

  const extraAfter = 150;
  const progress = clamp((vh - rect.top) / (rect.height + extraAfter), 0, 1);

  timeline.style.setProperty('--line-progress', `${progress * 100}%`);

  const lineBottomWithinTimeline = progress * rect.height;

  const hysteresis = 24;

  boxes.forEach((box) => {
    const b = box.getBoundingClientRect();
    const boxTopWithinTimeline = b.top - rect.top;

    const triggerY = boxTopWithinTimeline + b.height * 0.5;

    if (lineBottomWithinTimeline >= triggerY + hysteresis) {
      box.classList.add('revealed');
    } else if (lineBottomWithinTimeline <= triggerY - hysteresis) {
      box.classList.remove('revealed');
    }
  });
}

updateLineProgress();
window.addEventListener('scroll', updateLineProgress, { passive: true });
window.addEventListener('resize', updateLineProgress);