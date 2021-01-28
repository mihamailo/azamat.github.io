@@include('_custom.js');
@@include('_modal.js');
@@include('_carusel.js');

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







