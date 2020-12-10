// // Popups
// const popupLinks = document.querySelectorAll('.popup-link');
// const body = document.querySelector('body');
// const lockPadding = document.querySelectorAll('.lock-padding'); // для фиксед элементов

// let unlock = true;

// const timeout = 800; // должно быть равно времени анимации в css

// if (popupLinks.length > 0) {
//   for (let index = 0; index < popupLinks.length; index++) {
//     const popupLink = popupLinks[index];
//     popupLink.addEventListener('click', function (e) {
//       const popupName = popupLink.getAttribute('href').replace('#', '');
//       const currentPopup = document.getElementById(popupName); // Нужная модалка
//       popupOpen(currentPopup);
//       e.preventDefault();
//     });
//   }
// }

// const popupCloseIcon = document.querySelectorAll('.close-popup'); // иконка закрытия
// if (popupCloseIcon.length > 0) {
//   for (let index = 0; index < popupCloseIcon.length; index++) {
//     const el = popupCloseIcon[index];
//     el.addEventListener('click', function (e) {
//       popupClose(el.closest('.popup'));
//       e.preventDefault();
//     });
//   }
// }

// function popupOpen(currentPopup) {
//   if (currentPopup && unlock) {
//     const popupActive = document.querySelector('.popup.open');
//     if (popupActive) {
//       popupClose(popupActive, false);
//     } else {
//       bodyLock();
//     }
//     currentPopup.classList.add('open');
//     currentPopup.addEventListener('click', function (e) {
//       if (!e.target.closest('.popup__body')) { // Клик не по телу модалки
//         popupClose(e.target.closest('.popup'))
//       }
//     });
//   }
// }

// function popupClose(popupActive, doUnlock = true) {
//   if (unlock) {
//     popupActive.classList.remove('open');
//     if (doUnlock) {
//       bodyUnlock();
//     }
//   }
// }

// function bodyLock() {
//   const LockPaddingValue =
//     window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'; // минус обертка всей страницы

//   if (lockPadding.length > 0) {
//     for (let index = 0; index < LockPadding.length; index++) { // Если есть фиксированный элемент
//       const el = lockPadding[index];
//       el.style.paddingRight = LockPaddingValue;
//     }
//   }

//   body.style.paddingRight = LockPaddingValue;
//   body.classList.add('lock');

//   unlock = false;
//   setTimeout(() => {
//     unlock = true;
//   }, timeout);
// }

// function bodyUnlock() {
//   setTimeout(function () {
//     if (lockPadding.length > 0) {
//       for (let inex = 0; index < lockPadding.length; index++) {
//         const el = lockPadding[index];
//         el.style.paddingRight = '0px'
//       }
//     }
//     body.style.paddingRight = '0px';
//     body.classList.remove('lock');
//   }, timeout);

//   unlock = false;
//   setTimeout(function () {
//     unlock = true;
//   }, timeout);
// }
// // закрытие при нажатии на esc
// document.addEventListener('keydown', function (e) {
//   if (e.key === 'Escape') {
//     const popupActive = document.querySelector('.popup.open');
//     popupClose(popupActive)
//   }
// });

// Оптимизация при скролле
var timer;
var body = document.body;

window.addEventListener('scroll', function () {
  clearTimeout(timer);
  if (!body.classList.contains('disable-hover')) {
    body.classList.add('disable-hover')
  }

  timer = setTimeout(function () {
    body.classList.remove('disable-hover')
  }, 500);
}, false);
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
  yoyo: true
};

CSSPlugin.useSVGTransformAttr = true;

var tl = new TimelineMax(tmax_optionsGlobal),
  path = '.main__title svg *',
  stagger_val = 0.0125,
  duration = 3.5;

$.each($(path), function (i, el) {
  tl.set($(this), {
    x: '+=' + getRandom(-500, 500),
    y: '+=' + getRandom(-500, 500),
    rotation: '+=' + getRandom(-720, 720),
    scale: 0,
    opacity: 0
  });
});

var stagger_opts_to = {
  x: 0,
  y: 0,
  opacity: 1,
  scale: 1,
  rotation: 0,
  ease: Power4.easeInOut
};

var stagger_opts_back = {
  x: '+=' + getRandom(-500, 500),
  y: '+=' + getRandom(-500, 500),
  rotation: '+=' + getRandom(-720, 720),
  scale: 0,
  opacity: 0,
  ease: Power4.easeInOut
};

tl.staggerTo(path, duration, stagger_opts_to, stagger_val);

let canBack = true
window.addEventListener('scroll', function () {
  if (pageYOffset > 10 && canBack) {
    canBack = false
    tl.staggerTo(path, 0.75, stagger_opts_back, stagger_val);
    setTimeout(() => {
      // $('.main').addClass('hidden fixed');

    }, 3500)
    console.log(pageYOffset);
  }
  else if (pageYOffset < 10) {
    body.classList.remove('lock');

  }
});


function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}
//

;
// Declare the animation container and parameter to be used in the animation
var animContainer = document.getElementById('bodymovin');
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
var body = document.body;
var close = document.getElementById('close');

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

// When clicking the cross, 
// the animation reverses to close the modal
close.addEventListener("click", function () {
  anim.setDirection(-1);
  anim.play();
  body.classList.remove("open");
})
// Litener on click to show modal
$('.popup-link').click(function (e) {
  e.preventDefault();

  anim.setDirection(1);
  anim.play();
  body.classList.remove("completed");
  body.classList.add("open");

});

;

$(document).ready(function () {
  // Получаем координаты элемента
  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
  };

  // Сияние звезд
  let stars = document.querySelectorAll('.interests__star');

  let count = 0;
  const flick = () => {
    const starsLenght = stars.length;
    if (count < starsLenght && count != 0) {
      stars[count].classList.add('show');
      stars[count - 1].classList.remove('show');
      count++
    }
    else {
      stars[starsLenght - 1].classList.remove('show');
      stars[0].classList.add('show');
      count = 0;
      count++;
    }
  }

  flick();

  const intervalId = setInterval(function () {
    flick();
  }, 3000);

  // Горизонтальный скролл на Papers
  const scrollSlider = () => {
    const papers = document.querySelector('.papers');
    const papersContainer = document.querySelector('.papers__slider');
    const itemOffset = offset(papersContainer).top; // Координата блока
    const itemHeight = papersContainer.offsetWidth * 2; // Умножаем на два для более длительного скролла
    const windowHeight = window.innerHeight;
    const scrollRight = pageYOffset - itemOffset; // На сколько будет смещаться блок вправо
    const title = document.querySelector('.papers__title');
    papersContainer.style.height = itemHeight + 'px';

    if (pageYOffset > itemOffset && pageYOffset < itemHeight + itemOffset - windowHeight) {
      let scrollRightSlow = 0;
      papers.style.transform = `translate3d(-${scrollRight / 2}px,0,0)`;
      title.style.transform = `translate3d(${scrollRight / 1.25}px,0,0)`
      papers.classList.remove('absolute');
      papers.classList.add('fixed');
      papers.classList.remove('hidden');
      body.style.backgroundColor = '#000';
    } else if (pageYOffset > itemHeight + itemOffset - windowHeight) {
      papers.classList.remove('fixed');
      papers.classList.add('absolute');
      papers.classList.add('hidden');
    }
    else {
      papers.classList.remove('fixed');
      papers.classList.remove('absolute');
      papers.style.transform = `translate3d(0,0,0)`;
      title.style.transform = `translate3d(0,0,0)`;
    }
  }

  scrollSlider()
  window.addEventListener('scroll', scrollSlider)

  // Анимация перехода по блокам при скролле 

  $(window).ready(function () {

    let wHeight = $(window).height();

    $('.slide')
      .height(wHeight)
      .scrollie({
        scrollOffset: - wHeight / 3,
        scrollingInView: function (elem) {
          let bgColor = elem.data('background');
          $('body').css('background-color', bgColor);
          if (bgColor == '#000000') {
            $('.header').css('color', '#fff')
          }
          else {
            $('.header').css('color', '#000')
          }
        }

      });
  });

  $('.slider').slick({
    arrows: false,
    dots: true,
    customPaging: function (slider, i) {
      let thumb = jQuery(slider.$slides[i]).data();
      return '<span class="slider-projects__dots">' + (i + 1) + '</span>'; // <-- old
    },
    speed: 500,
    easing: 'ease',
    autoplay: false,
    draggable: false, /* На компах отключает возможность переключения будто перелистывание*/
  });


  $('.main__text').addClass('hidden')

  body.classList.add('lock');


  setTimeout(() => {
    $('.main').addClass('fixed')
    var wow = new WOW(
      {
        callback: function (box) {
          if (box.id == 'slider_text') {
            setTimeout(() => {
              $('.slider-projects__text').addClass('shown')
            }, 1500)
          }
        }
      }
    );
    wow.init()
  }, 3500)
  // if ($('.header animated')) {
  //   body.classList.add('lock')
  // }


  window.addEventListener('scroll', function () {

  });

});







