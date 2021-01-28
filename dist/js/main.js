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


;
// Declare the animation container and parameter to be used in the animation
var animContainer = document.querySelector('.popup__body');
// The animation data exported from Adobe After Effects
var animationData = { "assets": [], "v": "4.3.0", "ddd": 0, "layers": [{ "ddd": 0, "ind": 0, "ty": 1, "nm": "blob__yellow", "ks": { "o": { "k": 100 }, "r": { "k": 0 }, "p": { "k": [540, 540, 0] }, "a": { "k": [540, 540, 0] }, "s": { "k": [{ "i": { "x": [0.222, 0.222, 0.667], "y": [1, 1, 0.667] }, "o": { "x": [0.167, 0.167, 0.167], "y": [0.167, 0.167, 0.167] }, "n": ["0p222_1_0p167_0p167", "0p222_1_0p167_0p167", "0p667_0p667_0p167_0p167"], "t": 4, "s": [0, 0, 100], "e": [100, 100, 100] }, { "t": 15 }] } }, "hasMask": true, "masksProperties": [{ "cl": true, "inv": false, "mode": "a", "pt": { "k": [{ "i": { "x": 0.833, "y": 0.833 }, "o": { "x": 0.167, "y": 0.167 }, "n": "0p833_0p833_0p167_0p167", "t": 4, "s": [{ "i": [[26.858, -3.247], [25.249, -14.754], [-5.297, -33], [-16.249, -9.037], [-28.885, -3.379], [-21, -2.703], [-40.627, 14.108], [-1.297, 12], [7.283, 17.874], [17.465, 10.855]], "o": [[-19, 2.297], [-25.249, 14.754], [5.297, 33], [14.667, 8.157], [28.885, 3.379], [21, 2.703], [17.679, -6.139], [3.22, -29.802], [-8.734, -21.435], [-22.887, -14.224]], "v": [[476, 432.703], [431.249, 460.246], [379.703, 490], [426.333, 512.843], [462.115, 534.621], [501, 518.297], [551.321, 547.139], [565.297, 516], [575.717, 473.126], [521.887, 477.224]] }], "e": [{ "i": [[145.748, 0], [141.126, -140.618], [22.297, -160], [-7.41, -117.525], [-128.115, -71.621], [-127.399, 0], [-141.321, 102.861], [0, 194.556], [64.283, 87.874], [138.363, 82.457]], "o": [[-214.963, 0], [-141.795, 141.284], [-17.361, 124.581], [3.667, 58.158], [116.055, 64.879], [236.39, 0], [145.858, -106.163], [0, -112.43], [-95.835, -131.005], [-116.724, -69.561]], "v": [[506, 3.703], [219.249, 247.246], [9.703, 488], [92.333, 749.842], [72.115, 1023.621], [526, 936.297], [953.321, 953.139], [978.297, 592], [1063.717, 236.126], [768.887, 177.224]] }] }, { "i": { "x": 0.833, "y": 0.833 }, "o": { "x": 0.167, "y": 0.167 }, "n": "0p833_0p833_0p167_0p167", "t": 21, "s": [{ "i": [[145.748, 0], [141.126, -140.618], [22.297, -160], [-7.41, -117.525], [-128.115, -71.621], [-127.399, 0], [-141.321, 102.861], [0, 194.556], [64.283, 87.874], [138.363, 82.457]], "o": [[-214.963, 0], [-141.795, 141.284], [-17.361, 124.581], [3.667, 58.158], [116.055, 64.879], [236.39, 0], [145.858, -106.163], [0, -112.43], [-95.835, -131.005], [-116.724, -69.561]], "v": [[506, 3.703], [219.249, 247.246], [9.703, 488], [92.333, 749.842], [72.115, 1023.621], [526, 936.297], [953.321, 953.139], [978.297, 592], [1063.717, 236.126], [768.887, 177.224]] }], "e": [{ "i": [[281.812, 0], [0, 0], [0, -256], [0, -126.158], [0, 0], [-271.5, 0], [0, 0], [0, 148.875], [0, 156.126], [0, 0]], "o": [[-281.812, 0], [0, 0], [0, 256], [0, 126.158], [0, 0], [271.5, 0], [0, 0], [0, -148.875], [0, -156.126], [0, 0]], "v": [[501.812, 0.016], [-0.001, -0.004], [-0.297, 416], [0, 845.842], [0.115, 1079.621], [532.5, 1080.297], [1080.036, 1079.997], [1080.047, 652.875], [1079.967, 268.126], [1080.012, -0.026]] }] }, { "t": 32 }] }, "o": { "k": 100 }, "x": { "k": 0 }, "nm": "Mask 1" }], "sw": 1080, "sh": 1080, "sc": "#000", "ip": 4, "op": 33, "st": 4, "bm": 0, "sr": 1 }, { "ddd": 0, "ind": 1, "ty": 1, "nm": "blob__white", "ks": { "o": { "k": 100 }, "r": { "k": 0 }, "p": { "k": [540, 540, 0] }, "a": { "k": [540, 540, 0] }, "s": { "k": [{ "i": { "x": [0.222, 0.222, 0.667], "y": [1, 1, 0.667] }, "o": { "x": [0.167, 0.167, 0.167], "y": [0.167, 0.167, 0.167] }, "n": ["0p222_1_0p167_0p167", "0p222_1_0p167_0p167", "0p667_0p667_0p167_0p167"], "t": 0, "s": [0, 0, 100], "e": [100, 100, 100] }, { "t": 11 }] } }, "hasMask": true, "masksProperties": [{ "cl": true, "inv": false, "mode": "a", "pt": { "k": [{ "i": { "x": 0.833, "y": 0.833 }, "o": { "x": 0.167, "y": 0.167 }, "n": "0p833_0p833_0p167_0p167", "t": 0, "s": [{ "i": [[26.858, -3.247], [25.249, -14.754], [-5.297, -33], [-16.249, -9.037], [-28.885, -3.379], [-21, -2.703], [-40.627, 14.108], [-1.297, 12], [7.283, 17.874], [17.465, 10.855]], "o": [[-19, 2.297], [-25.249, 14.754], [5.297, 33], [14.667, 8.157], [28.885, 3.379], [21, 2.703], [17.679, -6.139], [3.22, -29.802], [-8.734, -21.435], [-22.887, -14.224]], "v": [[476, 432.703], [431.249, 460.246], [379.703, 490], [426.333, 512.843], [462.115, 534.621], [501, 518.297], [551.321, 547.139], [565.297, 516], [575.717, 473.126], [521.887, 477.224]] }], "e": [{ "i": [[145.748, 0], [141.126, -140.618], [22.297, -160], [-7.41, -117.525], [-128.115, -71.621], [-127.399, 0], [-141.321, 102.861], [0, 194.556], [64.283, 87.874], [138.363, 82.457]], "o": [[-214.963, 0], [-141.795, 141.284], [-17.361, 124.581], [3.667, 58.158], [116.055, 64.879], [236.39, 0], [145.858, -106.163], [0, -112.43], [-95.835, -131.005], [-116.724, -69.561]], "v": [[506, 3.703], [219.249, 247.246], [9.703, 488], [92.333, 749.842], [72.115, 1023.621], [526, 936.297], [953.321, 953.139], [978.297, 592], [1063.717, 236.126], [768.887, 177.224]] }] }, { "i": { "x": 0.833, "y": 0.833 }, "o": { "x": 0.167, "y": 0.167 }, "n": "0p833_0p833_0p167_0p167", "t": 17, "s": [{ "i": [[145.748, 0], [141.126, -140.618], [22.297, -160], [-7.41, -117.525], [-128.115, -71.621], [-127.399, 0], [-141.321, 102.861], [0, 194.556], [64.283, 87.874], [138.363, 82.457]], "o": [[-214.963, 0], [-141.795, 141.284], [-17.361, 124.581], [3.667, 58.158], [116.055, 64.879], [236.39, 0], [145.858, -106.163], [0, -112.43], [-95.835, -131.005], [-116.724, -69.561]], "v": [[506, 3.703], [219.249, 247.246], [9.703, 488], [92.333, 749.842], [72.115, 1023.621], [526, 936.297], [953.321, 953.139], [978.297, 592], [1063.717, 236.126], [768.887, 177.224]] }], "e": [{ "i": [[281.812, 0], [0, 0], [0, -256], [0, -126.158], [0, 0], [-271.5, 0], [0, 0], [0, 148.875], [0, 156.126], [0, 0]], "o": [[-281.812, 0], [0, 0], [0, 256], [0, 126.158], [0, 0], [271.5, 0], [0, 0], [0, -148.875], [0, -156.126], [0, 0]], "v": [[501.812, 0.016], [-0.001, -0.004], [-0.297, 416], [0, 845.842], [0.115, 1079.621], [532.5, 1080.297], [1080.036, 1079.997], [1080.047, 652.875], [1079.967, 268.126], [1080.012, -0.026]] }] }, { "t": 28 }] }, "o": { "k": 100 }, "x": { "k": 0 }, "nm": "Mask 1" }], "sw": 1080, "sh": 1080, "sc": "#F2C94C", "ip": 0, "op": 33, "st": 0, "bm": 0, "sr": 1 }], "ip": 0, "op": 33, "fr": 60, "w": 1080, "h": 1080 };
var params = {
  container: animContainer,
  renderer: 'svg',
  loop: false,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'none'
  }
};

// Load the bodyMovin animation
var anim = bodymovin.loadAnimation(params);
anim.setDirection(-1);
// Add class to the body to use some transition on the text in CSS
var body = document.body;;


// bodymovin event listener for when the animation
// is complete (the animation autostarts)
// if we open the modal, then 
anim.addEventListener("complete", function () {
  if (anim.playDirection == -1) {

    anim.play();
    body.classList.remove("completed");
  } else {
    // The modal is open, which triggers the content transitions
    body.classList.add("open");
    body.classList.add("completed");
  }
});




;
// set and cache variables
var w, container, carousel, item, radius, itemLength, rY, ticker, fps;
var mouseX = 0;
var mouseY = 0;
var mouseZ = 0;
var addX = 0;

function initCarusel() {
  w = $(window);
  container = $('#contentContainer');
  carousel = $('#carouselContainer');
  item = $('.carouselItem');
  itemLength = $('.carouselItem').length;
  // fps = $('#fps');
  rY = 360 / itemLength;
  radius = Math.round((250) / Math.tan(Math.PI / itemLength));

  // set container 3d props
  TweenMax.set(container, { perspective: 600 })
  TweenMax.set(carousel, { z: -(radius) })

  // create carousel item props

  for (var i = 0; i < itemLength; i++) {
    var $item = item.eq(i);
    var $block = $item.find('.carouselItemInner');

    //thanks @chrisgannon!        
    TweenMax.set($item, { rotationY: rY * i, z: radius, transformOrigin: "50% 50% " + -radius + "px" });
    animateIn($item, $block)
  }

  mouseX = 0.1;
  mouseY = 0;
  mouseZ = - radius + 200

  // set mouse x and y props and looper ticker
  window.addEventListener("mousemove", onMouseMove, false);
  ticker = setInterval(looper, 1000 / 60);
}

function animateIn($item, $block) {
  var $nrX = 360 * getRandomInt(2);
  var $nrY = 360 * getRandomInt(2);

  var $nx = -(2000) + getRandomInt(4000)
  var $ny = -(2000) + getRandomInt(4000)
  var $nz = -4000 + getRandomInt(4000)

  var $s = 1.5 + (getRandomInt(10) * .1)
  var $d = 1 - (getRandomInt(8) * .1)

  TweenMax.set($item, { autoAlpha: 1, delay: $d })
  TweenMax.set($block, { z: $nz, rotationY: $nrY, rotationX: $nrX, x: $nx, y: $ny, autoAlpha: 0 })
  TweenMax.to($block, $s, { delay: $d, rotationY: 0, rotationX: 0, z: 0, ease: Expo.easeInOut })
  TweenMax.to($block, $s - .5, { delay: $d, x: 0, y: 0, autoAlpha: 1, ease: Expo.easeInOut })


}

function onMouseMove(event) {

  mouseX = -(-(window.innerWidth * .5) + event.pageX) * .001;
  mouseY = -(-(window.innerHeight * .5) + event.pageY) * .005;
  // mouseZ = - (Math.abs(-(window.innerHeight * .5) + event.pageY) - 200);
  mouseZ = - radius + 200
}

// loops and sets the carousel 3d properties
function looper() {
  addX += mouseX
  TweenMax.to(carousel, 1, { rotationY: addX, rotationX: mouseY, ease: Quint.easeOut })
  TweenMax.set(carousel, { z: mouseZ })
}

function getRandomInt($n) {
  return Math.floor((Math.random() * $n) + 1);
};

$(document).ready(function () {
  $('.header__fullscreen').click(function (e) {
    e.preventDefault();
    fullscreen();
    $('.header__fullscreen').show()
    $(this).hide()
  });

  document.addEventListener('fullscreenchange', (event) => {
    if (!document.fullscreenElement) {
      $('.header__fullscreen').show()
      $('.header__fullscreen-cancel').hide()
    }
  });

  // Мерцание звезд
  let stars = document.querySelectorAll('.interests__star');

  // let count = 0;
  // const flick = () => {
  //   const starsLength = stars.length;
  //   if (count < starsLength && count != 0) {
  //     stars[count].classList.add('show');
  //     stars[count - 1].classList.remove('show');
  //     count++
  //   }
  //   else {
  //     stars[starsLength - 1].classList.remove('show');
  //     stars[0].classList.add('show');
  //     count = 0;
  //     count++;
  //   }
  // }

  // flick();

  // const intervalId = setInterval(function () {
  //   flick();
  // }, 3000);

  // Анимация перехода по блокам при скролле 

  setTimeout(() => {
    $('.header__inner').addClass('shown');
    $('.main__text span').addClass('shown');
  }, 2000);

  // Чтобы слайдер нельзя было быстро переключить
  // setTimeout(() => {
  //   pageSlider.allowSlidePrev = true;
  //   pageSlider.allowSlideNext = true;
  //   pageSlider.update();
  // }, 3000); // 3000

  $('.nav__item').on('click', function (e) {
    e.preventDefault();
    let idToSlide = $(this).index();
    pageSlider.slideTo(idToSlide);
    $('.header__burger, .header__nav').toggleClass('active');
    $('.nav__item').removeClass('active');
    $(this).addClass('active')
  });
  //

  // Projects Slider
  let projectsSlider = new Swiper('.projects__body', {
    wrapperClass: 'projects__slider',
    slideClass: 'slider-projects__item',
    simulateTouch: false,
    speed: 400,
    spaceBetween: 40,
    pagination: {
      el: '.projects__pagination',
      renderBullet: function (index, className) {
        return '<li><span class=" ' + className + ' ">' + (index + 1) + '</span></li>'
      }
    },
    breakpoints: {
      1660: {
        spaceBetween: 800
      },
    },
    on: {
      slideChange() {
        const prevState = $(this.slides[this.previousIndex]).attr('data-colors');
        const dataColors = $(this.slides[this.activeIndex]).attr('data-colors')

        $('.projects').removeClass(`projects--${prevState}`);
        $('.projects').addClass(`projects--${dataColors}`)
      }
    }
  });

  $('.projects__pagination li').on('click', function (event) {
    let idToSlide = $(this).index();

    projectsSlider.slideTo(idToSlide);
  });

  const aboutCheckBtn = $('#check');

  $('#check').click(function () {
    $(this).toggleClass('checked')
  })

  $('.about__on').click(function () {
    aboutCheckBtn.addClass('checked')
  })

  $('.about__off').click(function () {
    aboutCheckBtn.removeClass('checked')
  })

  //Hover social choose

  $('.choose-social__item').hover(function () {
    $('.choose-social__item').removeClass('active')
    $(this).addClass('active')
    const id = $(this).index()
    const currentImg = $('.img-social__image').eq(id)
    $('.img-social__image').removeClass('active');
    currentImg.addClass('active')
  })

  $('#form-btn').click(function (e) {
    e.preventDefault();
    sendAjaxForm('result_form', 'phone-form', 'mail.php')
  })

  $('#file-input').on('change', () => {
    $('#file-input ~ label span').html('Загружено');
  });

  $('.item-find__btn').click(function (e) {
    e.preventDefault();
    const linkToPopup = $(this).attr('href');
    $(linkToPopup).addClass('active');
  });

  $('.find-popup__close').click(function () {
    $('.find-popup').removeClass('active')
  });

  function sendAjaxForm(result_form, ajax_form, url) {
    $.ajax({
      url: url,
      type: "POST",
      dataType: "html",
      data: $("." + ajax_form).serialize(),
      success: function () {
        $('#result_form').html('все ок');
      },
      error: function () {
        $('#result_form').html('Ошибка. Данные не отправлены.');
      }
    });
  }

});







