const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper i");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildren = [...carousel.children];
const swiper = new Swiper('.slider-wrapper1', {
    loop: true,
    gradCursor: true,
    spaceBetween: 30,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        0: {
            slidesPerView: 1
        },
        768: {
            slidesPerView: 2
        },
        1024: {
            slidesPerView: 2
        },
    }
});

let isDragging = false,
    startX, startScrollleft;
let cardPerView = Math.round(carousel.offsetwidth / firstCardWidth);

carouselChildren.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});
carouselChildren.slice(0, cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollleft = e.pageX;
};

const dragging = (e) => {
    if (!isDragging) return;
    carousel.scrollLeft = startScrollleft - (e.pageX - startX);
};
const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
};
const infiniteScroll = () => {
    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetwidth);
        carousel.classList.remove("no-transition");
    } else if (carousel.scrollLeft === carousel.scrollWidth - carousel.offsetwidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetwidth;
        carousel.classList.remove("no-transition");
    }
};
carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("mousemove", dragStart);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);