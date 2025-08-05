const textSpan = document.getElementById('text');
let currentJob = [];
let i = 0;
let j = 0;
let isDeleting = false;
let isEnd = false;

const jobs = [
    'software engineer',
    'full-stack developer',
    'hci researcher',
    'product-focused engineer',
    'ux enthusiast'
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