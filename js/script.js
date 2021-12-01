const leftButton = document.querySelector('.slide-left-btn');
const rightButton = document.querySelector('.slide-right-btn');
const firstSlide = document.querySelector('.slide-first');
const secondSlide = document.querySelector('.slide-second');
const slides = [firstSlide, secondSlide];
let isFirst = true;

const moveSlide = isLeft => {
  setTimeout(() => {
    let offsetX;
    if (isFirst && isLeft) {
      offsetX = ['-100%', '-100%'];
    } else if (!isFirst && isLeft) {
      offsetX = [0, '-200%'];
    } else if (isFirst && !isLeft) {
      offsetX = ['100%', '-100%'];
    } else {
      offsetX = [0, 0];
    }
    firstSlide.style.transition = 'transform .5s';
    firstSlide.style.transform = `translateX(${offsetX[0]})`;
    secondSlide.style.transition = 'transform .5s';
    secondSlide.style.transform = `translateX(${offsetX[1]})`;

    isFirst = !isFirst;
  }, 10);
};

const initSlide = isLeft => {
  let offsetX;
  if (isFirst && isLeft) {
    offsetX = [0, 0];
  } else if (!isFirst && isLeft) {
    offsetX = ['100%', '-100%'];
  } else if (isFirst && !isLeft) {
    offsetX = [0, '-200%'];
  } else {
    offsetX = ['-100%', '-100%'];
  }
  firstSlide.style.transition = 'none';
  firstSlide.style.transform = `translateX(${offsetX[0]})`;
  secondSlide.style.transition = 'none';
  secondSlide.style.transform = `translateX(${offsetX[1]})`;
};

const getSlideEventHandler = (isLeft = true) => {
  return () => {
    initSlide(isLeft);
    moveSlide(isLeft);
  }
};

leftButton.addEventListener('click', getSlideEventHandler());
rightButton.addEventListener('click', getSlideEventHandler(false));