const leftButton = document.querySelector('.slide-left-btn');
const rightButton = document.querySelector('.slide-right-btn');
const firstSlide = document.querySelector('.slide-first');
const secondSlide = document.querySelector('.slide-second');
// const slides = [firstSlide, secondSlide];
let isFirst = true;
let isClickActive = true;
let isDragActive = true;
let autoSlideTimer;
let firstX;
let isMousedown = false;

const deactivateFunc = (auto = true) => {
  isClickActive = false;
  isDragActive = false;
  if (auto) clearInterval(autoSlideTimer);
};

const initSlide = isLeft => {
  let offsetX;
  if (isFirst && isLeft) {
    offsetX = [0, '-200%'];
  } else if (!isFirst && isLeft) {
    offsetX = ['-100%', '-100%'];
  } else if (isFirst && !isLeft) {
    offsetX = [0, 0];
  } else {
    offsetX = ['100%', '-100%'];
  }
  firstSlide.style.transition = 'none';
  firstSlide.style.transform = `translate3d(${offsetX[0]}, 0, 0)`;
  secondSlide.style.transition = 'none';
  secondSlide.style.transform = `translate3d(${offsetX[1]}, 0, 0)`;
};

const moveSlide = isLeft => {
  setTimeout(() => {
    let offsetX;
    if (isFirst && isLeft) {
      offsetX = ['100%', '-100%'];
    } else if (!isFirst && isLeft) {
      offsetX = [0, 0];
    } else if (isFirst && !isLeft) {
      offsetX = ['-100%', '-100%'];
    } else {
      offsetX = [0, '-200%'];
    }
    firstSlide.style.transition = 'transform .5s';
    firstSlide.style.transform = `translate3d(${offsetX[0]}, 0, 0)`;
    secondSlide.style.transition = 'transform .5s';
    secondSlide.style.transform = `translate3d(${offsetX[1]}, 0, 0)`;

    isFirst = !isFirst;
  }, 10);
};

const activateFunc = (auto = true) => {
  setTimeout(() => {
    isClickActive = true;
    isDragActive = true;
    if (auto) setAutoSlide();
  }, 510);
};

const setAutoSlide = () => {
  autoSlideTimer = setInterval(() => {
    initSlide(false);
    deactivateFunc(false);
    moveSlide(false)
    activateFunc(false);
  }, 3000);
};

const dragMousedown = ({ currentTarget }) => {
  firstX = currentTarget.offsetX;
  isMousedown = true;
};

const dragMousemove = ({ currentTarget }) => {
  if (isMousedown) {
    
  }
};

const getSlideEventHandler = (isLeft = true) => {
  return () => {
    if (!isClickActive) return;
    initSlide(isLeft);
    deactivateFunc();
    moveSlide(isLeft)
    activateFunc();
  }
};

leftButton.addEventListener('click', getSlideEventHandler());
rightButton.addEventListener('click', getSlideEventHandler(false));
setAutoSlide();