let links = null;
let sections = null;
let lastScrollInMs = null;
let homeHeight = 400;

window.onload = () => {
    links = document.querySelectorAll('nav > a');
    sections = document.getElementsByTagName('section');
    for (let i = 0; i < links.length; i++) {
        links[i].onclick = () => { selectNthLink(i) }
    }
    fadeInSections();
    updateSelectedLink();
    sections[0].classList.add('fade-in');
    homeHeight = document.getElementById('home-grid').clientHeight;
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
        if (rect.top < window.innerHeight - 80) {
            section.classList.add('fade-in');
        }
    }
}

function updateSelectedLink() {
    if (sections == null) {
        return;
    }
    const scrollY = window.scrollY || window.pageYOffset;
    const innerHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    const atMaxScroll = scrollY + innerHeight >= scrollHeight - 100;
    if (window.scrollY < homeHeight - 40) {
        selectNthLink(0);
    } else if (atMaxScroll) {
        selectNthLink(links.length-1);
    } else {
        const target = window.innerHeight / 2;
        let minDist = Infinity;
        let selIndex = 0;
        for (let i = 0; i < sections.length; i++) {
            const top = sections[i].getBoundingClientRect().top;
            const dist = target - top;
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
    if (index > 0) {
        sections[index-1].classList.add('force-in');
    }
    for (let i = 0; i < links.length; i++) {
        if (i == index) {
            links[i].classList.add('sel');
        } else {
            links[i].classList.remove('sel');
        }
    }
}
