var timer;
var body = document.body;

const LockPaddingValue =
  window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
// Burger 
$('.header__burger').click(function (event) {
  $('.header__burger, .header__nav').toggleClass('active');
  $('body').toggleClass('lock');
  if ($('body').hasClass('lock')) {
    $('body').css('padding-right', LockPaddingValue);
  }
  else {
    $('body').css('padding-right', '');
  }
});

// To get correct window height on phone

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px `);

window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  let PageSliderFreeHeight = sliderFree.innerHeight() * slidesFree.length;
});


//  Динамический адаптив
(function () {
  let originalPositions = [];
  let daElements = document.querySelectorAll('[data-da]');
  let daElementsArray = [];
  let daMatchMedia = [];
  //Заполняем массивы
  if (daElements.length > 0) {
    let number = 0;
    for (let index = 0; index < daElements.length; index++) {
      const daElement = daElements[index];
      const daMove = daElement.getAttribute('data-da');
      if (daMove != '') {
        const daArray = daMove.split(',');
        const daPlace = daArray[1] ? daArray[1].trim() : 'last';
        const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
        const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
        const daDestination = document.querySelector('.' + daArray[0].trim())
        if (daArray.length > 0 && daDestination) {
          daElement.setAttribute('data-da-index', number);
          //Заполняем массив первоначальных позиций
          originalPositions[number] = {
            "parent": daElement.parentNode,
            "index": indexInParent(daElement)
          };
          //Заполняем массив элементов 
          daElementsArray[number] = {
            "element": daElement,
            "destination": document.querySelector('.' + daArray[0].trim()),
            "place": daPlace,
            "breakpoint": daBreakpoint,
            "type": daType
          }
          number++;
        }
      }
    }
    dynamicAdaptSort(daElementsArray);

    //Создаем события в точке брейкпоинта
    for (let index = 0; index < daElementsArray.length; index++) {
      const el = daElementsArray[index];
      const daBreakpoint = el.breakpoint;
      const daType = el.type;

      daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
      daMatchMedia[index].addListener(dynamicAdapt);
    }
  }
  //Основная функция
  function dynamicAdapt(e) {
    for (let index = 0; index < daElementsArray.length; index++) {
      const el = daElementsArray[index];
      const daElement = el.element;
      const daDestination = el.destination;
      const daPlace = el.place;
      const daBreakpoint = el.breakpoint;
      const daClassname = "_dynamic_adapt_" + daBreakpoint;

      if (daMatchMedia[index].matches) {
        //Перебрасываем элементы
        if (!daElement.classList.contains(daClassname)) {
          let actualIndex = indexOfElements(daDestination)[daPlace];
          if (daPlace === 'first') {
            actualIndex = indexOfElements(daDestination)[0];
          } else if (daPlace === 'last') {
            actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
          }
          daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
          daElement.classList.add(daClassname);
        }
      } else {
        //Возвращаем на место
        if (daElement.classList.contains(daClassname)) {
          dynamicAdaptBack(daElement);
          daElement.classList.remove(daClassname);
        }
      }
    }
  }

  //Вызов основной функции
  dynamicAdapt();

  //Функция возврата на место
  function dynamicAdaptBack(el) {
    const daIndex = el.getAttribute('data-da-index');
    const originalPlace = originalPositions[daIndex];
    const parentPlace = originalPlace['parent'];
    const indexPlace = originalPlace['index'];
    const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
    parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
  }
  //Функция получения индекса внутри родителя
  function indexInParent(el) {
    var children = Array.prototype.slice.call(el.parentNode.children);
    return children.indexOf(el);
  }
  //Функция получения массива индексов элементов внутри родителя 
  function indexOfElements(parent, back) {
    const children = parent.children;
    const childrenArray = [];
    for (let i = 0; i < children.length; i++) {
      const childrenElement = children[i];
      if (back) {
        childrenArray.push(i);
      } else {
        //Исключая перенесенный элемент
        if (childrenElement.getAttribute('data-da') == null) {
          childrenArray.push(i);
        }
      }
    }
    return childrenArray;
  }
  //Сортировка объекта
  function dynamicAdaptSort(arr) {
    arr.sort(function (a, b) {
      if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
    });
    arr.sort(function (a, b) {
      if (a.place > b.place) { return 1 } else { return -1 }
    });
  }

}());

//

// Epic animaiton h1
var tmax_optionsGlobal = {
  repeat: 0,
  repeatDelay: 0.65,
  yoyo: false
};

const getRandom = (min, max) => {
  return Math.random() * (max - min) + min;
}

CSSPlugin.useSVGTransformAttr = true;

var tl = new TimelineMax(tmax_optionsGlobal),
  path = '.main__title svg *',
  stagger_val = 0.0125,
  duration = 2.5;

const setStartPosition = () => {
  $.each($(path), function (i, el) {
    tl.set($(this), {
      x: '+=' + getRandom(-500, 500),
      y: '+=' + getRandom(-500, 500),
      rotation: '+=' + getRandom(-720, 720),
      scale: 0,
      opacity: 0
    });
  });
}

setStartPosition();

var stagger_opts_back = {
  x: getRandom(-500, 500),
  y: getRandom(-500, 500),
  rotation: '+=' + getRandom(-720, 720),
  scale: 0,
  opacity: 0
};

var stagger_opts_to = {
  x: 0,
  y: 0,
  opacity: 1,
  scale: 1,
  rotation: 0,
  ease: Power4.easeInOut
};

tl.staggerTo(path, duration, stagger_opts_to, stagger_val);

//


// Фуллскрин
function fullscreen() {
  var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
    (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
    (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
    (document.msFullscreenElement && document.msFullscreenElement !== null);

  var docElm = document.documentElement;
  if (!isInFullScreen) {
    if (docElm.requestFullscreen) {
      docElm.requestFullscreen();
    } else if (docElm.mozRequestFullScreen) {
      docElm.mozRequestFullScreen();
    } else if (docElm.webkitRequestFullScreen) {
      docElm.webkitRequestFullScreen();
    } else if (docElm.msRequestFullscreen) {
      docElm.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
}
//

// Слайдер вместо скролла

let startFinding = false;

let canPageSliding = true;

// const pageSliderFunciton = () => {
//   if (canPageSliding) {
//     const { activeIndex, previousIndex, slides } = pageSlider
//     const previousSlide = slides[previousIndex];
//     const wHeight = window.innerHeight; // try to use let vh

//     $('.nav__item').removeClass('active')
//     $('.nav__item').eq(activeIndex).addClass('active')

//     // При скролле с главной
//     if (activeIndex == 1) {
//       if (previousSlide) {
//         previousSlide.classList.add('swiper-slide-top');
//         setTimeout(() => {
//           previousSlide.classList.add('fadeOut');
//         }, 700);
//         setTimeout(() => {
//           previousSlide.classList.remove('swiper-slide-top', 'fadeOut');
//         }, 1000);
//       }

//       document.querySelector('.page-wrapper').style.transitionDelay = '0.3s';
//       slides[1].style.transitionDelay = '0.3s'

//       tl.reverse().delay(0).timeScale(4); // Запускаем обратную анимацию в 4 раза быстрее

//       slides.map((item) => {  // Перемещаем каждый слайдер на расстояние протвоположное перемещению врапера
//         item.style.transform = `translate3d(0px,${wHeight * activeIndex}px,0px)`;
//         item.style.transitionDelay = '0.3s';
//         setTimeout(() => {
//           item.style.transitionDelay = ''
//         }, 1300);
//       })

//       setTimeout(() => {
//         $('.main__title').addClass('hidden');
//       }, 700);

//       setTimeout(() => {
//         document.querySelector('.page-wrapper').style.transitionDelay = '0s';
//         $('.main__title').removeClass('hidden');
//       }, 2500);
//     }

//     // При скролле на главную
//     else if (activeIndex == 0) {
//       tl.play().timeScale(1);

//       slides.map((item) => {  // Перемещаем каждый слайдер на расстояние протвоположное перемещению врапера
//         item.style.transform = `translate3d(0px,${wHeight * activeIndex}px,0px)`;
//       })

//       if (previousSlide) {
//         previousSlide.classList.add('swiper-slide-top', 'fadeOut')
//         setTimeout(() => {
//           previousSlide.classList.remove('swiper-slide-top', 'fadeOut');
//         }, 1000);
//       }
//     }

//     // При скролле на другие блоки
//     else {
//       if (previousSlide) {
//         previousSlide.classList.add('swiper-slide-top', 'fadeOut')
//         setTimeout(() => {
//           previousSlide.classList.remove('swiper-slide-top', 'fadeOut');
//         }, 1000);
//       }
//       slides.map((item) => {  // Перемещаем каждый слайдер на расстояние протвоположное перемещению врапера
//         item.style.transform = `translate3d(0px,${wHeight * activeIndex}px,0px)`;
//       })
//     }
//   }
// }


// Функция запуска сыщика
const findingFunction = () => {
  if (window.matchMedia("(min-width: 767px)").matches) {
    $('.finder').addClass('right');
    $('.finder').removeClass('left');
    $('.find__body').css('position', 'relative')
    setTimeout(() => {
      $('.finder').addClass('left');
      $('.finder').removeClass('right');
      $('.find__body').css('position', 'static')
      setTimeout(() => {
        findingFunction();
      }, 15000);
    }, 15000);
  }
  else {
    $('.finder').addClass('right');
    $('.finder').removeClass('left');
    $('.find__body').css('position', 'relative')
    setTimeout(() => {
      $('.finder').addClass('left');
      $('.finder').removeClass('right');
      $('.find__body').css('position', 'static')
      setTimeout(() => {
        findingFunction();
      }, 15000);
    }, 15000);
  }
}

//


let handWasShown = false;
let indexSlide = 0;
let newIndexSlide = false;
let timerAnim = 1500;

const pageSlides = $('.page-slide');

setTimeout(() => {
  newIndexSlide = true;
}, 100);

function pageSliderNext() {
  pageSlides[indexSlide].classList.remove('slide-active')
  pageSlides[indexSlide].classList.add('slide-hidden')
  indexSlide++;
  newIndexSlide = false
  pageSlides[indexSlide].classList.add('slide-anim')
  startAnimOnChange(pageSlides[indexSlide])
  setTimeout(() => {
    newIndexSlide = true;
    pageSlides[indexSlide - 1].classList.remove('slide-hidden')
    pageSlides[indexSlide].classList.add('slide-active')
    pageSlides[indexSlide].classList.remove('slide-anim')
  }, timerAnim);
}

function pageSliderPrev() {
  pageSlides[indexSlide].classList.remove('slide-active')
  pageSlides[indexSlide].classList.add('slide-hidden')
  indexSlide--
  newIndexSlide = false
  pageSlides[indexSlide].classList.add('slide-anim')
  startAnimOnChange(pageSlides[indexSlide])
  setTimeout(() => {
    newIndexSlide = true
    pageSlides[indexSlide + 1].classList.remove('slide-hidden')
    pageSlides[indexSlide].classList.add('slide-active')
    pageSlides[indexSlide].classList.remove('slide-anim')
  }, timerAnim)
}

let scrollState = 'mainScroll';
let moveSliderFree = 0;

// Page sliders listener
function pageSliderListener() {
  $(window).bind('mousewheel DOMMouseScroll', function (e) {
    if (scrollState == 'mainScroll') pageScroll(e);
    if (scrollState == 'freeScroll') pageScrollFree(e);
    if (scrollState == 'modalScroll') pageScrollModal(e);
  })
}

function pageScroll(e) {
  const delta = e.originalEvent.deltaY
  if (delta > 0 && newIndexSlide) {
    pageSliderNext()
  }
  else if (delta < 0 && newIndexSlide) {
    pageSliderPrev()
  }
}

const sliderFree = $('.page-wrapper-free');
const slidesFree = $('.page-slide-free');
let pieceOfPage = 0;
let currentSlide = slidesFree[pieceOfPage]
let nextActive = 0;
let countCnangeActive = true;
let PageSliderFreeHeight = sliderFree.innerHeight() * slidesFree.length;
let maxTranslate = PageSliderFreeHeight - window.innerHeight
let movePapersSliderFree = 0;
let disableScroll = false;

let papersSlide = $('.papers__item')
let papersStarted = false;
let papersEnded = false;

let scrollTo = 'bottom';

function pageScrollFree(e) {
  let currentSlide = slidesFree[pieceOfPage];
  let nextSlide = slidesFree[pieceOfPage + 1];
  let prevSlide = slidesFree[pieceOfPage - 1]
  let scrollDirection = e.originalEvent.deltaY > 0 ? true : false; // Если вниз - true, Если нет - false
  // Начало скролла на papers
  if ($(currentSlide).attr('id') == 'papers') {
    movePapersSliderFree += e.originalEvent.deltaY / 2;
    $('.papers__wrapper').css('transform', `translate3d(-${movePapersSliderFree}px,0,0)`)
    $('.papers__wrapper').css('transition-timing-function', 'cubic-bezier(.16,.64,.24,.96)')
    $('.papers__wrapper').css('transition-duration', '2000ms')
    console.log(movePapersSliderFree);

    if (moveSliderFree >= window.innerHeight && scrollDirection) { // Если скролл вниз и прокрутка равна высоте страницы
      if (movePapersSliderFree < (papersSlide.innerWidth() * papersSlide.length)) {
        disableScroll = true;
        moveSliderFree = window.innerHeight;
        sliderFree.css('transform', `translate3d(0,-${moveSliderFree}px,0)`)
        sliderFree.css('transition-timing-function', 'cubic-bezier(.16,.64,.24,.96)')
        sliderFree.css('transition-duration', '1000ms')
        console.log('слайдер остановился скролл вниз');
      } else {
        disableScroll = false
        console.log('слайдер запустился скролл вниз');
      }
    }
    else if (moveSliderFree <= window.innerHeight && !scrollDirection) { // Если скролл вверх и прокрутка равна высоте страницы
      if (movePapersSliderFree > 0) {
        disableScroll = true;
        moveSliderFree = window.innerHeight;
        sliderFree.css('transform', `translate3d(0,-${moveSliderFree}px,0)`)
        sliderFree.css('transition-timing-function', 'cubic-bezier(.16,.64,.24,.96)')
        sliderFree.css('transition-duration', '2000ms')
        console.log('слайдер остановился скролл вверх');
      } else {
        disableScroll = false
        console.log('слайдер запустился скролл вверх');

      }
    }
  }
  // Функция перемещения слайдера
  if (!disableScroll) {
    moveSliderFree += e.originalEvent.deltaY / 2;

    if (moveSliderFree >= PageSliderFreeHeight - window.innerHeight && scrollDirection) { // End
      moveSliderFree = PageSliderFreeHeight - window.innerHeight
    }
    // Start
    else if (moveSliderFree < 0) {
      moveSliderFree = 0
    }

    slidesFree.removeClass('slide-active')
    pieceOfPage = Math.ceil(moveSliderFree / maxTranslate * slidesFree.length) - 1

    $(currentSlide).addClass('slide-active')
    sliderFree.css('transform', `translate3d(0,-${moveSliderFree}px,0)`)
    sliderFree.css('transition-timing-function', 'cubic-bezier(.16,.64,.24,.96)')
    sliderFree.css('transition-duration', '2000ms')

    const dataHeaderColor = $(currentSlide).attr('data-header');
    $('.header').css('color', dataHeaderColor)

    // Для анимации при пререключении
    $('.swiper-slide-active .to-anim').addClass('shown');

    if ($(currentSlide).attr('data-bg')) {
      currentSlide.style.backgroundColor = $(currentSlide).attr('data-bg');
      if (nextSlide) nextSlide.style.backgroundColor = $(currentSlide).attr('data-bg');
      if (prevSlide) prevSlide.style.backgroundColor = $(currentSlide).attr('data-bg');
    }

  }
}
pageSliderListener()

// Modal's sliders
let activeSliderWidth = 0
var moveSliderModal = 0; // Перемещение слайдера
function pageScrollModal(e) {
  moveSliderModal += e.originalEvent.deltaY / 2;

  if (moveSliderModal < 0) {
    moveSliderModal = 0
  } else if (moveSliderModal >= activeSliderWidth) {
    moveSliderModal = activeSliderWidth
  }
  TweenMax.to('.active .modal__content', 1, {
    x: -moveSliderModal,
    ease: SlowMo.easeOut
  })
}


function startAnimOnChange(currentSlide) {
  // Анимации блоков с классом to-anim
  $('.slide-anim .to-anim').addClass('shown');
  // Меняем цвет хедера в зависимости от атрибута data-header
  const dataHeaderColor = $(currentSlide).attr('data-header');
  $('.header').css('color', dataHeaderColor)
  if ($(currentSlide).attr('id') == 'about') {
    tl.reverse().delay(0).timeScale(4); // Запускаем обратную анимацию в 4 раза быстрее
    setTimeout(() => {
      $('.main__title').addClass('hidden');
    }, 1000);
    $(pageSlides[0]).css('transition', 'opacity 1000ms ease 1500ms, visibility 0ms ease 2200ms');
    $(pageSlides[1]).css('transition', 'opacity 1000ms ease 1500ms, visibility 0ms ease 2200ms');
    timerAnim = 2000;
    setTimeout(() => {
      timerAnim = 1500;
      $(pageSlides[0]).css('transition', '');
      $(pageSlides[1]).css('transition', '');
    }, 1000);
    setTimeout(() => {
      $('.main__title').removeClass('hidden');
    }, 2500);
  }
  if ($(currentSlide).attr('id') == 'main') {
    tl.play().timeScale(1);
  }
  if ($(currentSlide).attr('id') == 'find' && !startFinding) {
    findingFunction();

    $(window).mousemove(function (e) {
      let w = $('.spotlight').innerWidth(),
        h = $('.spotlight').innerHeight(),
        t = e.pageY - $('.spotlight').offset().top,
        l = e.pageX - $('.spotlight').offset().left;
      $('.spotlight').css('background-image', 'radial-gradient(circle at ' + (l / w * 100) + '% ' + (t / h * 100) + '%, rgba(255, 255, 255, 0.2) 140px, rgba(0, 0, 0, 0.8) 180px)');
    });


    startFinding = true // Чтобы больше не запускался сыщик
  };
  if ($(currentSlide).attr('id') == 'consultation' && !handWasShown) {
    handWasShown = true;
    const handVideo = document.querySelector(".consultation__bg video")
    setTimeout(() => {
      handVideo.play();
    }, 2000);
    setTimeout(() => {
      $(handVideo).css('display', 'none')
      document.querySelector('.consultation__bg img').classList.remove('hidden')
    }, 8000);

    setTimeout(() => {
      initCarusel();
    }, 6000);
  }
  if ($(currentSlide).attr('id') == 'fake-slide') {
    $('.page-slider').css('z-index', '-1');
    $('.page-slider').css('visibility', 'hidden')
    setTimeout(() => {
      $('.page-slider-free').css('z-index', '3');
      // $('.page-slider').css('z-index', '-1');
      // $('.page-slider').css('visibility', 'hidden')
    }, 700);
    setTimeout(() => {
      scrollState = 'freeScroll';
    }, 1000);

    setTimeout(() => {
      pageSliderPrev();
    }, 1600);

    $('.benifits .to-anim').addClass('shown')
    // window.addEventListener('mousewheel', onMouseWheelFree, false)
    // window.addEventListener('DOMMouseScroll', onMouseWheelFree, false)
  }
}
// Переключение слайдера на мобилке
var eventTouchMove = null;

if (window.matchMedia("(max-width: 767px)").matches) {
  // Swiper listener
  document.addEventListener("touchstart", function (e) {
    eventTouchMove = e;
  });
  document.addEventListener("touchmove", function (e) {
    if (e.touches[0].pageY - eventTouchMove.touches[0].pageY < -250 && newIndexSlide) {
      newIndexSlide = false
      pageSliderNext()
      setTimeout(() => {
        newIndexSlide = true;
      }, 1500);
    }
    // else if (eventTouchMove < -50) {

    // }
  });
  document.addEventListener("touched", function (e) {
    eventTouchMove = null;
  });
}

// let pageSliderSettings = {
//   wrapperClass: 'page-wrapper',
//   slideClass: 'page-slide',
//   direction: 'vertical',
//   parallax: true,
//   // virtualTranslate: true,
//   simulateTouch: false,
//   resistance: false,
//   allowSlideNext: false,
//   allowSlidePrev: false,
//   touchStartPreventDefault: false,
//   followFinger: false,
//   freeMode: false,
//   keyboard: {
//     enabled: true,
//     ovlyInViewport: true,
//     pageUpDown: true,
//   },
//   mousewheel: {
//     sensitivity: 0.5,
//   },
//   speed: 1000,
//   scrollbar: {
//     el: '.page-scroll',
//     dragClass: 'page-scroll-drag',
//     draggable: true,
//   },
//   runCallbacksOnInit: true,
//   on: {
//     slideChange() {
//       const { activeIndex, slides } = pageSlider;
//       // Измененное переключение слайда
//       pageSliderFunciton();
//       // Меняем цвет хедера в зависимости от data-header
//       const dataHeaderColor = $(slides[activeIndex]).attr('data-header');
//       $('.header').css('color', dataHeaderColor)

//       // Для анимации при пререключении
//       $('.swiper-slide-next .to-anim').addClass('shown');
//       // Запускаем сыщика
//       if ($(slides[activeIndex]).attr('id') == 'find' && !startFinding) {
//         findingFunction();

//         $(window).mousemove(function (e) {
//           let w = $('.spotlight').innerWidth(),
//             h = $('.spotlight').innerHeight(),
//             t = e.pageY - $('.spotlight').offset().top,
//             l = e.pageX - $('.spotlight').offset().left;
//           $('.spotlight').css('background-image', 'radial-gradient(circle at ' + (l / w * 100) + '% ' + (t / h * 100) + '%, rgba(255, 255, 255, 0.2) 140px, rgba(0, 0, 0, 0.8) 180px)');
//         });


//         startFinding = true // Чтобы больше не запускался сыщик
//       };
//       // при скролле на consultation
//       if ($(slides[activeIndex]).attr('id') == 'consultation' && !handWasShown) {
//         handWasShown = true;

//         setTimeout(() => {
//           document.querySelector(".consultation__bg video").play();
//         }, 2000);

//         setTimeout(() => {
//           initCarusel();
//         }, 6000);
//       }
//       // При скролле на benifits

//       if ($(slides[activeIndex]).attr('id') == 'fake-slide') {
//         $('.page-slider').addClass('hidden');
//         setTimeout(() => {
//           $('.page-slider-free').css('z-index', '0');
//           $('.page-slider').css('z-index', '-1');
//         }, 700);
//         setTimeout(() => {
//           $('.page-slider').removeClass('hidden');
//           pageSlider.slideTo(pageSlider.previousIndex, 0);
//         }, 1000);

//         $('.benifits .to-anim').addClass('shown')
//         // window.addEventListener('mousewheel', onMouseWheelFree, false)
//         // window.addEventListener('DOMMouseScroll', onMouseWheelFree, false)
//       }
//     },
//     init() {
//     }
//   }
// }
// Smooth scroll

function onMouseWheelFree() {
  clearTimeout($.data(this, 'timer'));

  $('.page-wrapper-free').addClass('mousewheel');

  $.data(this, 'timer', setTimeout(function () {
    $('.page-wrapper-free').removeClass('mousewheel')
  }, 250));
};

function onMouseWheelPapers() {
  clearTimeout($.data(this, 'timer'));

  $(".papers__wrapper").addClass('mousewheel');

  $.data(this, 'timer', setTimeout(function () {
    $(".papers__wrapper").removeClass('mousewheel')
  }, 250));
};

// Инициируем главный слайдер
let pageSlider = null;

// Перемещиние слайдера Papers до отключения управления мышью

let papersMoveRight = 500;

const translatePapersSlider = () => {
  papersMoveRight = Math.round(pageSliderFree.translate + window.innerHeight);
  $('.papers__content').css('transform', `translate3d(${papersMoveRight - 800}px,0,0)`)
  $('.papers__title').css('transform', `translate3d(-${papersMoveRight * 1.5}px,0,0)`)
}

let translateBeforeDisable = false;
let canReturnToPageSlider = false;
let canLockSlider = true;

// let pageSliderFree = new Swiper('.page-slider-free', {
//   wrapperClass: 'page-wrapper-free',
//   slideClass: 'page-slide-free',
//   direction: 'vertical',
//   parallax: true,
//   simulateTouch: false,
//   // resistance: false,
//   allowSlideNext: true,
//   slidesPerView: 1,
//   freeMode: true,
//   watchSlidesVisibility: true,
//   // virtualTranslate: false,
//   keyboard: {
//     enabled: true,
//     ovlyInViewport: true,
//     pageUpDown: true,
//   },
//   mousewheel: {
//     sensitivity: 0.5
//   },
//   speed: 1000,
//   runCallbacksOnInit: true,
//   on: {
//     init() {
//       PageSliderFreeHeight = this.height * this.slides.length;
//     },
//     slideChange() {
//       const { activeIndex, previousIndex, slides } = this;
//       const currentSlide = slides[activeIndex];
//       const prevSlide = slides[previousIndex];
//       const nextSlide = slides[activeIndex + 1]

//       // Меняем цвет хедера в зависимости от data-header
//       const dataHeaderColor = $(currentSlide).attr('data-header');
//       $('.header').css('color', dataHeaderColor)

//       // Для анимации при пререключении
//       $('.swiper-slide-active .to-anim').addClass('shown');

//       if ($(currentSlide).attr('data-bg')) {
//         currentSlide.style.backgroundColor = $(currentSlide).attr('data-bg');
//         prevSlide.style.backgroundColor = $(currentSlide).attr('data-bg');
//         if (nextSlide) nextSlide.style.backgroundColor = $(currentSlide).attr('data-bg');
//       }

//       if ($(currentSlide).attr('id') == 'papers') {
//         translateBeforeDisable = true;
//         papersSlider.init()
//         // smooth scoll
//         // window.addEventListener('mousewheel', onMouseWheelPapers, false)
//         // window.addEventListener('DOMMouseScroll', onMouseWheelPapers, false)
//       } else {
//         translateBeforeDisable = false;
//         // smooth scoll remove listeners
//         // window.removeEventListener('mousewheel', onMouseWheelPapers, false)
//         // window.removeEventListener('DOMMouseScroll', onMouseWheelPapers, false)
//       }
//     },
//     // setTranslate() {
//     //   //(this.translate <= (-window.innerHeight - 30) && this.translate >= (-window.innerHeight - 150))
//     //   if (scrollTo == 'bottom' && papersMoveRight < 50) {
//     //     $(this).css('transform', `translate3d(0,${-(window.innerHeight)}px,0)`)
//     //     papersSlider.mousewheel.enable();
//     //     this.mousewheel.disable();
//     //     document.removeEventListener('wheel', translatePapersSlider);
//     //   }
//     //   else if (scrollTo == 'top' && papersMoveRight > 51) {
//     //     papersSlider.mousewheel.enable();
//     //     this.mousewheel.disable();
//     //     document.removeEventListener('wheel', translatePapersSlider);
//     //   }
//     //   else if (translateBeforeDisable) {
//     //     papersSlider.mousewheel.disable();
//     //     this.mousewheel.enable();
//     //     document.addEventListener('wheel', translatePapersSlider);
//     //     $('.papers__title').addClass('shown')
//     //     if (papersMoveRight < -160 && papersMoveRight > -380 && !canLockSlider) {
//     //       canLockSlider = true
//     //     }

//     //   }
//     // },
//     setTranslate() {
//       if (-(this.translate) <= 0) {

//         setTimeout(() => {
//           canReturnToPageSlider = true;
//         }, 1000);
//         if (canReturnToPageSlider) {

//           $('.page-slider-free').css('transition', 'all 0.3s ease');
//           $('.page-slider-free').addClass('hidden');
//           // pageSlider.slideTo(pageSlider.previousIndex, 0);
//           setTimeout(() => {
//             $('.page-slider').css('z-index', '3');
//             $('.page-slider').css('visibility', '')
//             $('.page-slider-free').css('z-index', '2');
//           }, 700);
//           setTimeout(() => {
//             $('.page-slider-free').removeClass('hidden')
//             $('.page-slider-free').css('transition', '');
//             scrollState = 'mainScroll';
//           }, 1500);
//           // window.removeEventListener('mousewheel', onMouseWheelFree, false)
//           // window.removeEventListener('DOMMouseScroll', onMouseWheelFree, false)

//           canReturnToPageSlider = false;
//         }
//       }
//       else {
//         canReturnToPageSlider = false
//       }
//     }
//   },

// });

//Чтобы вернуться на предыдущий слайдер

let papersSlider = new Swiper('.papers__slider', {
  init: false,
  wrapperClass: 'papers__wrapper',
  slideClass: 'papers__item',
  simulateTouch: false,
  freeMode: true,
  slidesPerView: 3,
  keyboard: {
    enabled: true,
    ovlyInViewport: true,
    pageUpDown: true,
  },
  mousewheel: {
    sensitivity: 0.5,
    eventsTarget: '.papers'
  },
  speed: 5000,
  runCallbacksOnInit: true,
  on: {
    setTranslate() {
      const movePapersTitle = -papersMoveRight * 1.5 + -this.translate * 1.25;
      $('.papers__title').css('transform', `translate3d(${movePapersTitle}px,0,0)`)
    },
    reachEnd() {
      pageSliderFree.mousewheel.enable();
      $('.papers__title').removeClass('shown');
      canLockSlider = false
      scrollTo = 'top';
    },
    reachBeginning() {
      canLockSlider = false
      pageSliderFree.mousewheel.enable();
      scrollTo = 'bottom';
    }
  }
});

// papersSlider.mousewheel.disable();

// Litener on click to show modal
$('.popup-link').click(function (e) {
  e.preventDefault();

  const link = $(this).attr('modal');

  $(this).find('#check').addClass('checked');

  $('.modal__content').css('transform', '')
  setTimeout(() => {
    // Делаем активним нужный modal
    $(`#${link}`).addClass('active')
    anim.setDirection(1);
    anim.play();
    body.classList.remove("completed");
    body.classList.add("open");

    $('.modal__content').css('transition', '')

    // Получаем ширину активного слайдера
    activeItems = $('.active .modal__item');
    activeItems.each(function () {
      activeSliderWidth += $(this).width();
    })
  }, 800);

  scrollState = 'modalScroll';
});

// When clicking the cross, the animation reverses to close the modal
var close = document.querySelector('#close');;

close.addEventListener("click", function () {
  anim.setDirection(-1);
  anim.play();
  body.classList.remove("open");

  $('.modal').removeClass('active')

  setTimeout(() => {
    $('#check').removeClass('checked')
  }, 1000);

  scrollState = 'mainScroll'
})

// let aboutSlider = new Swiper('#popup_1', {
//   wrapperClass: 'modal__content',
//   slideClass: 'modal__item',
//   slidesPerView: 'auto',
//   simulateTouch: false,
//   setWrapperSize: true,
//   freeMode: true,
//   direction: 'horizontal',
//   keyboard: {
//     enabled: true,
//     ovlyInViewport: true,
//     pageUpDown: true,
//   },
//   virtualTranslate: true,
//   mousewheel: {
//     sensitivity: 1,
//   },
//   speed: 5000,
//   breakpoint: {
//     769: {
//       virtualTranslate: true
//     }
//   },
//   observeParents: true,
//   observer: true,
//   observeSlideChildren: true,
// });

let interestsSlider = new Swiper('#popup_2', {
  wrapperClass: 'modal__content',
  slideClass: 'modal__item',
  simulateTouch: false,
  freeMode: true,
  direction: 'horizontal',
  slidesPerView: 'auto',
  keyboard: {
    enabled: true,
    ovlyInViewport: true,
    pageUpDown: true,
  },
  virtualTranslate: false,
  mousewheel: {
    sensitivity: 1,
  },
  speed: 5000,
  breakpoint: {
    769: {
      virtualTranslate: true
    }
  },
  observer: true,
  observeParents: true,
  observeSlideChildren: true,
});

// Hover на увидеть
const video1 = document.querySelector('.interests__video-1');
const video2 = document.querySelector('.interests__video-2');
const video3 = document.querySelector('.interests__video-3');

let canHolder = true;
let canStart = true;
let canEnd = false;
let startVideo2, showVideo1, setStartVideo1

function pauseVideo() {
  var playPromise = video1.play();
  if (playPromise !== undefined) {
    playPromise.then(_ => {
      video1.pause()
    })
  }
}

// При наведении на увидеть
$('.list-interests__btn').on('mouseenter', function () {
  if (canStart) {
    video1.play()
    video3.classList.add('hide')
    clearInterval(showVideo1)
    // через секудну запускаем второй ролик, скрываем первый
    startVideo2 = setTimeout(() => {
      if (canHolder) {
        video1.classList.add('hide')
        video2.classList.remove('hide')
        video2.play()
        canStart = false;
      }
      // ставим первый видос на ноль
      setTimeout(() => {
        video1.currentTime = 0
        canHolder = true;
      }, 110);
    }, 1000);
  }

})
// При отведении
$('.list-interests__btn').on('mouseleave', function () {
  video3.play()
  video3.classList.remove('hide')
  video2.classList.add('hide')
  video1.classList.add('hide')
  canHolder = false;
  pauseVideo()
  video1.currentTime = 0
  clearInterval(startVideo2)
  showVideo1 = setTimeout(() => {
    video3.classList.add('hide')
    video1.classList.remove('hide')
    canStart = true;
    canHolder = true;
  }, 500);
})


