const sections = document.querySelectorAll('.section');
const header = document.querySelector('#header');
const headerLogo = document.querySelector('#header-logo');

let currentSectionClass = null;

const updateHeaderColor = (sectionCount) => {
    if (currentSectionClass !== sectionCount) {
        header.classList.remove(`header--${currentSectionClass}`);
        header.classList.add(`header--${sectionCount}`);
        headerLogo.src = `../assets/logo/logo_${sectionCount}.svg`;
        currentSectionClass = sectionCount;
    }
};

const createObserver = (threshold, callback) => {
    return new IntersectionObserver(entries => {
        const visibleSections = entries.filter(entry => entry.isIntersecting);
        if (visibleSections.length > 0) {
            const sectionCount = visibleSections[0].target.className.split('--')[1];
            callback(sectionCount);
        }
    }, { threshold });
};

const downObserver = createObserver(0.90, updateHeaderColor);
const upObserver = createObserver(0.10, updateHeaderColor);

sections.forEach(section => {
    downObserver.observe(section);
    upObserver.observe(section);
});

let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Scrolling down
        header.classList.add('header--hidden'); // Add the hidden class
        upObserver.disconnect();
        downObserver.disconnect();
        sections.forEach(section => {
            downObserver.observe(section);
        });
    } else {
        // Scrolling up
        header.classList.remove('header--hidden'); // Remove the hidden class
        downObserver.disconnect();
        upObserver.disconnect();
        sections.forEach(section => {
            upObserver.observe(section);
        });
    }

    lastScrollTop = scrollTop;
});


// const sections = document.querySelectorAll('.section');
// const header = document.querySelector('#header');
// const headerLogo = document.querySelector('#header-logo');

// let currentSectionClass = null;

// const updateHeaderColor = (sectionCount) => {
//     if (currentSectionClass !== sectionCount) {
//         header.classList.remove(`header--${currentSectionClass}`);
//         header.classList.add(`header--${sectionCount}`);
//         headerLogo.src = `../assets/logo/logo_${sectionCount}.svg`;
//         currentSectionClass = sectionCount;
//     }
// };

// const createObserver = (threshold, callback) => {
//     return new IntersectionObserver(entries => {
//         const visibleSections = entries.filter(entry => entry.isIntersecting);
//         if (visibleSections.length > 0) {
//             const sectionCount = visibleSections[0].target.className.split('--')[1];
//             callback(sectionCount);
//         }
//     }, { threshold });
// };

// const downObserver = createObserver(0.90, updateHeaderColor);
// const upObserver = createObserver(0.10, updateHeaderColor);

// sections.forEach(section => {
//     downObserver.observe(section);
//     upObserver.observe(section);
// });

// let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

// window.addEventListener('scroll', () => {
//     const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

//     if (scrollTop > lastScrollTop) {
//         // Scrolling down
//         header.classList.add('header--hidden'); // Add the hidden class
//         upObserver.disconnect();
//         downObserver.disconnect();
//         sections.forEach(section => {
//             downObserver.observe(section);
//         });
//     } else {
//         // Scrolling up
//         header.classList.remove('header--hidden'); // Remove the hidden class
//         downObserver.disconnect();
//         upObserver.disconnect();
//         sections.forEach(section => {
//             upObserver.observe(section);
//         });
//     }

//     lastScrollTop = scrollTop;
// });

// const sections = document.querySelectorAll('.section');
// const header = document.querySelector('#header');
// const headerLogo = document.querySelector('#header-logo');

// let currentSectionClass = null;

// const updateHeaderColor = (sectionCount) => {
//     if (currentSectionClass !== sectionCount) {
//         header.classList.remove(`header--${currentSectionClass}`);
//         header.classList.add(`header--${sectionCount}`);
//         headerLogo.src = `../assets/logo/logo_${sectionCount}.svg`;
//         currentSectionClass = sectionCount;
//     }
// };

// const createObserver = (threshold, callback) => {
//     return new IntersectionObserver(entries => {
//         const visibleSections = entries.filter(entry => entry.isIntersecting);
//         if (visibleSections.length > 0) {
//             const sectionCount = visibleSections[0].target.className.split('--')[1];
//             callback(sectionCount);
//         }
//     }, { threshold });
// };

// const downObserver = createObserver(0.90, updateHeaderColor);
// const upObserver = createObserver(0.10, updateHeaderColor);

// sections.forEach(section => {
//     downObserver.observe(section);
//     upObserver.observe(section);
// });

// let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

// window.addEventListener('scroll', () => {
//     const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

//     if (scrollTop > lastScrollTop) {
//         // Scrolling down
//         upObserver.disconnect();
//         downObserver.disconnect();
//         sections.forEach(section => {
//             downObserver.observe(section);
//         });
//     } else {
//         // Scrolling up
//         downObserver.disconnect();
//         upObserver.disconnect();
//         sections.forEach(section => {
//             upObserver.observe(section);
//         });
//     }

//     lastScrollTop = scrollTop;
// });







