'use strict';

window.addEventListener('DOMContentLoaded', function () {

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

  // тест
  let card = document.querySelectorAll(".test__card"); //создаем массив с карточками-вопросами из теста

  for (let j = 0; j < card.length; j++) { // цикл по перебору карточек
    let btnNext = card[j].querySelector('.card__button_next'), // кнопка "Далее"
      btnPrev = card[j].querySelector('.card__button_prev'), // кнопка "Назад"
      cardLink = card[j].querySelector('.card__link');
    if (btnNext) { // проверка, что в карточке есть кнопка "Далее"
      nextCard(j, btnNext);
    }
    if (btnPrev) { // проверка, что в карточке есть кнопка "Назад"
      prevCard(j, btnPrev);
    }
    if (cardLink) {
      cardLink.addEventListener('click', function (event) {
        event.preventDefault();
        card[j].style.display = "none";
        card[j - 1].style.display = "grid";
      });
    }
  }

  function nextCard(index, btn) {
    btn.addEventListener('click', function () { // переход к следующей карточке
      if (index === (card.length - 3)) { // вывод результата на последней карточке
        calc();
      }
      card[index].style.display = "none";
      card[index + 1].style.display = "grid";
    });
  }

  function prevCard(index, btn) {
    btn.addEventListener('click', function () { // переход к предыдущей карточке
      card[index].style.display = "none";
      card[index - 1].style.display = "grid";
    });
  }

  function calc() { // функция расчета
    let input = document.querySelector('input[name="result"]'), // получаем инпут, в который будем выводить результат
      value = 0;
    for (let j = 0; j < (card.length - 1); j++) { // перебираем карточки
      let radio = card[j].querySelector('input[type="radio"]:checked'); // получаем отмеченную в карточке радио-точку
      if (radio) { // проверяем на наличие отмеченной точки
        value += +radio.value; // прибавляем значение радио-точки
      }
    }
    input.value = value; // выводим результат
  }

  let btnSubmit = document.querySelector('.card__button_submit'); // удалить после настройки отправки формы

  btnSubmit.addEventListener('click', function (event) { // удалить после настройки отправки формы
    event.preventDefault();
    card[4].style.display = "none";
    card[5].style.display = "grid";
  });

  // плавная прокрутка
  $('.go-anchor').on('click', function (event) {
    event.preventDefault();
    var sc = $(this).attr("href"),
      dn = $(sc).offset().top;
    /*
    * sc - в переменную заносим информацию о том, к какому блоку надо перейти
    * dn - определяем положение блока на странице
    */
    $('html, body').animate({ scrollTop: dn }, 1000);
  });
  // скроллбар модального окна
  $(".content").mCustomScrollbar(
    {
      setHeight: 440
    }
  );
  // модальные окна
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
      callManager = document.querySelector('.call-manager');

  btnClose.forEach(function (item, i) {
    item.addEventListener('click', function () {
      modalClose(modals[i]);
    });
  });

  offerLinks.forEach(function (item) {
    item.addEventListener('click', function () {
      modalOpen(offer);
    });
  });

  offerBtnClose.addEventListener('click', function () {
    modalClose(offer);
  });

  heroBtn.addEventListener('click', function () {
    modalOpen(request);
  });

  phoneLink.addEventListener('click', function () {
    modalOpen(request);
  });

  callBtn.addEventListener('click', function () {
    modalOpen(callManager);
  });

  submitBtn.forEach(function (item) { // удалить после настройки отправки формы
    item.addEventListener('click', function (event) {
      event.preventDefault();
      modalOpen(confirm);
    });
  });

  function modalClose(elem) {
    elem.style.display = "none";
  }

  function modalOpen(elem) {
    elem.style.display = "flex";
  }

});