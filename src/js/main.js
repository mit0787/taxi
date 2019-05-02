'use strict';

window.addEventListener('DOMContentLoaded', function () {
  // скроллбар модального окна
  $(".offer__text").mCustomScrollbar({
    setHeight: 440,
    theme: 'dark'
  });

  // плавная прокрутка
  $('.go-anchor').on('click', function (event) {
    event.preventDefault();
    var sc = $(this).attr("href"), // заносим информацию о том, к какому блоку надо перейти
      dn = $(sc).offset().top; // определяем положение блока на странице
    $('html, body').animate({
      scrollTop: dn
    }, 1000);
  });

  // выпадающее меню
  let btnMenu = document.querySelector('.navbar__icon'),
    btnBlock = document.querySelector('.navbar__buttons'),
    menuClose = document.querySelector('.navbar__cross');

  btnMenu.addEventListener('click', function () {
    btnBlock.style.transform = "translateX(0)";
  });

  menuClose.addEventListener('click', function () {
    btnBlock.style.transform = "translateX(-260px)";
  });

  // модальные окна
  function modalClose(elem) { // функция закрытия
    elem.style.display = "none";
  }

  function modalOpen(elem) { // функция открытия
    elem.style.display = "flex";
  }

  let offerBtnClose = document.querySelector('.offer__button'),
      offer = document.querySelector('.offer'),
      offerLinks = document.querySelectorAll('a[href="#offer"]'),
      btnClose = document.querySelectorAll('.modal__cross'),
      modals = document.querySelectorAll('.modal'),
      phoneLink = document.querySelector('.navbar-phone__link'),
      heroBtn = document.querySelector('.hero__button'),
      request = document.querySelector('.modal-request'),
      submitBtn = document.querySelectorAll('.request__button'),
      confirm = document.querySelector('.confirm'),
      callBtn = document.querySelector('.footer__call'),
      callManager = document.querySelector('.call-manager'),
      footerBtn = document.querySelector('.footer__details'),
      details = document.querySelector('.details'),
      detailsConfirm = document.querySelector('.details-confirm');

  btnClose.forEach(function (item, i) { // закрытие модальных окон
    item.addEventListener('click', function () {
      modalClose(modals[i]);
    });
  });

  offerLinks.forEach(function (item) { // открытие договора оферты
    item.addEventListener('click', function () {
      modalOpen(offer);
    });
  });

  offerBtnClose.addEventListener('click', function () { // закрытие договора оферты
    modalClose(offer);
  });

  heroBtn.addEventListener('click', function () { // открытие заявки из блока hero
    modalOpen(request);
  });

  phoneLink.addEventListener('click', function () { // открытие заявки из навбара
    modalOpen(request);
  });

  callBtn.addEventListener('click', function () { // звонок директора
    modalOpen(callManager);
  });

  footerBtn.addEventListener('click', function () {
    modalOpen(details);
  });

  // тест и реквизиты
  let cardTest = document.querySelectorAll(".test__card"), //создаем массив с карточками-вопросами из теста
    cardDeteails = document.querySelectorAll(".details__card"), // массив карточек из формы "Реквизиты"
    cardLink = document.querySelector('.card__link');

  prevCard(5, cardLink, cardTest);

  cardTest.forEach(function (item, i, arr) {
    cardSlider(item, i, arr);
  });

  cardDeteails.forEach(function (item, i, arr) {
    cardSlider(item, i, arr);
  });

  function cardSlider(item, i, arr) {
    let btnNext = item.querySelector('.card__button_next'), // кнопка "Далее"
      btnPrev = item.querySelector('.card__button_prev'); // кнопка "Назад"
    if (btnNext) {
      nextCard(i, btnNext, arr);
    }
    if (btnPrev) {
      prevCard(i, btnPrev, arr);
    }
  }

  function nextCard(i, btn, arr) { // переход к следующей карточке
    btn.addEventListener('click', function (event) {
      event.preventDefault();
      arr[i].style.display = "none";
      arr[i + 1].style.display = "grid";
    });
  }

  function prevCard(i, btn, arr) { // переход к предыдущей карточке
    btn.addEventListener('click', function (event) {
      event.preventDefault();
      arr[i].style.display = "none";
      arr[i - 1].style.display = "grid";
    });
  }

  let input = document.querySelector('input[name="result"]'); // получаем инпут, в который будем выводить результат
  function calc() { // функция расчета
    let value = 0;
    for (let j = 0; j < (cardTest.length - 1); j++) { // перебираем карточки
      let radio = cardTest[j].querySelector('input[type="radio"]:checked'); // получаем отмеченную в карточке радио-точку
      if (radio) { // проверяем на наличие отмеченной точки
        value += +radio.value; // прибавляем значение радио-точки
      }
    }
    input.value = value; // выводим результат
  }

  // код ниже удалить после настройки отправки формы
  let btnSubmit = document.querySelector('.card__button_submit'),
      detailsBtn = document.querySelector('.details__button_submit');

  detailsBtn.addEventListener('click', function (event) {
    event.preventDefault();
    detailsConfirm.style.display = "flex";
  });
  
  btnSubmit.addEventListener('click', function (event) {
    event.preventDefault();
    calc();
    cardTest[4].style.display = "none";
    cardTest[5].style.display = "grid";
  });

  submitBtn.forEach(function (item) {
    item.addEventListener('click', function (event) {
      event.preventDefault();
      modalOpen(confirm);
    });
  });
});