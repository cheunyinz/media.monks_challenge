const sections = document.querySelectorAll('.section');
const header = document.querySelector('#header');
const headerLogo = document.querySelector('#header-logo');
const navBar = document.querySelector('#navbar');

let currentSectionClass = null;
let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
let currentSectionClassNav = null;
let lastNavScrollTop = window.pageYOffset || document.documentElement.scrollTop;

const updateHeader = (sectionCount) => {
    if (currentSectionClass !== sectionCount) {
        header.classList.remove(`header--${currentSectionClass}`);
        header.classList.add(`header--${sectionCount}`);
        headerLogo.src = `../assets/logo/logo_${sectionCount}.svg`;
        currentSectionClass = sectionCount;
    }
};

const updateNavBar = (sectionCount) => {
    if (currentSectionClassNav !== sectionCount) {
        navBar.classList.remove(`navbar--${currentSectionClassNav}`);
        navBar.classList.add(`navbar--${sectionCount}`);
        currentSectionClassNav = sectionCount;
    }
};

const createHeaderObserver = (threshold, callback) => {
    return new IntersectionObserver((entries) => {
        const visibleSections = entries.filter(entry => entry.isIntersecting);
        if (visibleSections.length > 0) {
            const sectionCount = visibleSections[0].target.className.split('--')[1];
            callback(sectionCount);
        }
    }, { threshold });
};

const createNavObserver = (threshold, callback) => {
    return new IntersectionObserver(entries => {
        const visibleSections = entries.filter(entry => entry.isIntersecting);
        if (visibleSections.length > 0) {
            const sectionCount = visibleSections[visibleSections.length - 1].target.className.split('--')[1];
            callback(sectionCount);
        }
    }, { threshold });
};

const scrollHandler = (observer1, observer2, isScrollDown) => {
    observer1.disconnect();
    observer2.disconnect();
    sections.forEach(section => {
        isScrollDown ? observer2.observe(section) : observer1.observe(section);
    });
};

const headerScrollEventListener = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        header.classList.add('header--hidden');
        scrollHandler(downObserver, upObserver, true);
    } else {
        header.classList.remove('header--hidden');
        scrollHandler(upObserver, downObserver, false);
    }
    lastScrollTop = scrollTop;
};

const navScrollEventListener = () => {
    const scrollNavTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollNavTop > lastNavScrollTop) {
        // navBar.classList.add('navbar--hidden');
        scrollHandler(downNavObserver, upNavObserver, true);
    } else {
        // navBar.classList.remove('navbar--hidden');
        scrollHandler(upNavObserver, downNavObserver, false);
    }
    lastNavScrollTop = scrollNavTop;
};

const downObserver = createHeaderObserver(0.9, updateHeader);
const upObserver = createHeaderObserver(0.1, updateHeader);
const downNavObserver = createNavObserver(0.9, updateNavBar);
const upNavObserver = createNavObserver(0.1, updateNavBar);

sections.forEach(section => {
    downObserver.observe(section);
    upObserver.observe(section);
    downNavObserver.observe(section);
    upNavObserver.observe(section);
});

window.addEventListener('scroll', headerScrollEventListener);
window.addEventListener('scroll', navScrollEventListener);








