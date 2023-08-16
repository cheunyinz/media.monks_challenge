const sections = document.querySelectorAll('.section');
const header = document.querySelector('#header');
const headerLogo = document.querySelector('#header-logo');
const navBar = document.querySelector('#navbar');
const navBarLinks = document.querySelectorAll('.navbar__link');

let currentSectionClass = null;
let lastHeaderScrollTop = window.pageYOffset || document.documentElement.scrollTop;
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

let selectedNavBarLink;

const updateNavBar = (sectionCount) => {
    const navBarLinksArray = Array.from(navBarLinks);

    navBarLinksArray.forEach(link => {
        if (link.dataset.linkcount !== sectionCount) {
            link.classList.forEach(className => {
                if (className.startsWith('navbar__link--')) {
                    link.classList.remove(className);
                }
            });
        }
    });

    selectedNavBarLink = navBarLinksArray.find(link => link.dataset.linkcount === sectionCount);

    if (currentSectionClassNav !== sectionCount) {
        navBar.classList.remove(`navbar--${currentSectionClassNav}`);
        navBar.classList.add(`navbar--${sectionCount}`);
        selectedNavBarLink.classList.add(`navbar__link--${sectionCount}`);

        currentSectionClassNav = sectionCount;
    }
};

const createHeaderObserver = (threshold, callback) => {
    return new IntersectionObserver((entries) => {
        const visibleSections = entries.filter(entry => entry.isIntersecting);
        if (visibleSections.length > 0) {
            const sectionCount = visibleSections[0].target.dataset.sectioncount;
            callback(sectionCount);
        }
    }, { threshold });
};

const createNavObserver = (threshold, callback) => {
    return new IntersectionObserver(entries => {
        const visibleSections = entries.filter(entry => entry.isIntersecting);
        if (visibleSections.length > 0) {
            const sectionCount = visibleSections[visibleSections.length - 1].target.dataset.sectioncount;
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
    const scrollHeaderTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollHeaderTop > lastHeaderScrollTop) {
        header.classList.add('header--hidden');
        scrollHandler(downHeaderObserver, upHeaderObserver, true);
    } else {
        header.classList.remove('header--hidden');
        scrollHandler(upHeaderObserver, downHeaderObserver, false);
    }
    lastHeaderScrollTop = scrollHeaderTop;
};

const navScrollEventListener = () => {
    const scrollNavTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollNavTop > lastNavScrollTop) {
        navBar.classList.add('navbar--hidden');
        scrollHandler(downNavObserver, upNavObserver, true);
    } else {
        navBar.classList.remove('navbar--hidden');
        scrollHandler(upNavObserver, downNavObserver, false);

    }
    lastNavScrollTop = scrollNavTop;
};

const downHeaderObserver = createHeaderObserver(0.9, updateHeader);
const upHeaderObserver = createHeaderObserver(0.1, updateHeader);

let downNavObserver;
let upNavObserver;

const updateNavObserversThresholds = () => {

    if (downNavObserver) {
        downNavObserver.disconnect();
    }
    if (upNavObserver) {
        upNavObserver.disconnect();
    }

    if (window.innerWidth < 1200) {
        downNavObserver = createNavObserver(0.9, updateNavBar);
        upNavObserver = createNavObserver(0.1, updateNavBar);


    } else {
        downNavObserver = createNavObserver(0.5, updateNavBar);
        upNavObserver = createNavObserver(0.5, updateNavBar);
    }

    sections.forEach(section => {
        downNavObserver.observe(section);
        upNavObserver.observe(section);
    });
};

updateNavObserversThresholds();


sections.forEach(section => {
    downHeaderObserver.observe(section);
    upHeaderObserver.observe(section);

});

window.addEventListener('scroll', headerScrollEventListener);
window.addEventListener('scroll', navScrollEventListener);
window.addEventListener('resize', updateNavObserversThresholds);



const wrapperBackground = document.querySelector('#wrapper-background');
const sectionThree = document.querySelector('.section--third');
const lastSection = sections[sections.length - 1];

const updateWrapperBackgroundPosition = () => {
    const sectionThreeTop = sectionThree.offsetTop;
    const lastSectionTop = lastSection.offsetTop;
    const totalScrollDistance = lastSectionTop - sectionThreeTop;
    const currentScrollPosition = Math.min(
        Math.max(0, window.scrollY - sectionThreeTop),
        totalScrollDistance
    );

    const scrollProgress = currentScrollPosition / totalScrollDistance;

    const targetBottomValue = 170 - 170 * scrollProgress;
    wrapperBackground.style.transform = `translateY(-${targetBottomValue}%`;
};

window.addEventListener('scroll', updateWrapperBackgroundPosition);
