let links = null;
let sections = null;
let lastScrollInMs = null;

window.onload = () => {
    links = document.querySelectorAll('nav > a');
    sections = document.getElementsByTagName('section');
    for (let i = 0; i < links.length; i++) {
        links[i].onclick = () => { selectNthLink(i) }
    }
    fadeInSections();
    updateSelectedLink();
}

window.onscroll = () => {
    const now = performance.now();
    if (lastScrollInMs == null || now - lastScrollInMs > 20) {
        lastScrollInMs = now;
        fadeInSections();
        updateSelectedLink();
    }
}

function fadeInSections() {
    if (sections == null) {
        return;
    }
    for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
            section.classList.add('fade-in');
        }
    }
}

function updateSelectedLink() {
    if (sections == null) {
        return;
    }
    if (window.scrollY < 360) {
        selectNthLink(0);
    } else {
        const target = window.innerHeight / 2;
        let minDist = Infinity;
        let selIndex = 0;
        console.log();
        for (let i = 0; i < sections.length; i++) {
            const top = sections[i].getBoundingClientRect().top;
            const dist = target - top;
            console.log(i,'dist',dist);
            if (dist > 0 && dist < minDist) {
                minDist = dist;
                selIndex = i + 1;
            }
        }
        selectNthLink(selIndex);
    }
}

function selectNthLink(index) {
    if (links == null) {
        return;
    }
    for (let i = 0; i < links.length; i++) {
        if (i == index) {
            links[i].classList.add('sel');
        } else {
            links[i].classList.remove('sel');
        }
    }
}