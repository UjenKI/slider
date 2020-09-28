import myOwnSlicker from "./slicker/slicker";

const slider = new myOwnSlicker({
    wrapper: document.querySelector('.slider-wrapper'),
    slideToShow: 1,
    slideToScroll: 1,
    dots: true,
    imageSlideNav: false,
    infinite: true,

});