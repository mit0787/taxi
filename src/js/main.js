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

	// автодополнение
	$(function () {
		$('input[name="city"]').kladr({
		type: $.kladr.type.city
		});
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
		privacyBtnClose = document.querySelector('.privacy__button'),
		offer = document.querySelector('.offer'),
		privacy = document.querySelector('.privacy'),
		offerLinks = document.querySelectorAll('a[href="#offer"]'),
		privacyLinks = document.querySelectorAll('a[href="#privacy"]'),
		btnClose = document.querySelectorAll('.modal__cross'),
		modals = document.querySelectorAll('.modal'),
		phoneLink = document.querySelector('.navbar-phone__link'),
		heroBtn = document.querySelector('.hero__button'),
		request = document.querySelector('.modal-request'),
		confirm = document.querySelector('.confirm'),
		callBtn = document.querySelector('.footer__call'),
		callManager = document.querySelector('.call-manager'),
		footerBtn = document.querySelector('.footer__details'),
		details = document.querySelector('.details'),
		detailsConfirm = document.querySelector('.details-confirm'),
		testPhone = document.querySelector('.card__final span'),
		testInput = document.querySelector('.test__input');

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

	privacyLinks.forEach(function (item) { // открытие договора оферты
		item.addEventListener('click', function () {
			modalOpen(privacy);
		});
	});

	offerBtnClose.addEventListener('click', function () { // закрытие договора оферты
		modalClose(offer);
	});

	privacyBtnClose.addEventListener('click', function () { // закрытие договора оферты
		modalClose(privacy);
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

	footerBtn.addEventListener('click', function () { // открытие реквизитов
		modalOpen(details);
	});

	// тест и реквизиты
	let cardTest = document.querySelectorAll(".test__card"), //создаем массив с карточками-вопросами из теста
		cardDeteails = document.querySelectorAll(".details__card"), // массив карточек из формы "Реквизиты"
		cardLink = document.querySelector('.card__link');

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

	let form = document.querySelectorAll('form'); // активация submit

	form.forEach(function (item, i, arr) {
		let accept = item.querySelector('input[type="checkbox"]'),
			submit = item.querySelector('input[type="submit"]');
		accept.addEventListener('click', function () {
			if (accept.checked == true) {
				submit.removeAttribute('disabled');
			}
			if (accept.checked == false) {
				submit.setAttribute('disabled', "true");
			}
		});
	});

	let detailsLabel = document.querySelectorAll('.details__input'),
		detailsText = document.querySelector('.details__confirm');
	
	detailsLabel.forEach(function (item) {
		item.addEventListener('click', function () {
			if (detailsLabel[1].checked == true) {
				detailsText.style.display = "block";
			}
			if (detailsLabel[1].checked == false) {
				detailsText.style.display = "none";
			}
		});
	});

	// таймер
	let timer = document.getElementById('timer');

	function startTimer(duration, display) { // duration в минутах, display - куда выводим значение
		var timer = duration,
			minutes, seconds;
		setInterval(function () {
			minutes = parseInt(timer / 60, 10);
			seconds = parseInt(timer % 60, 10);

			minutes = minutes < 10 ? minutes : minutes;
			seconds = seconds < 10 ? "0" + seconds : seconds;

			display.textContent = minutes + ":" + seconds;

			if (--timer < 0) {
				display.textContent = "0:00";
				prevCard(5, cardLink, cardTest);
			}
		}, 1000);
	}

	let btnDetNext = document.querySelector('#details-button'),
			detInp = document.querySelectorAll('.req-input');
	
	btnDetNext.setAttribute("disabled", "disabled");
	
	detInp.forEach(function(item) {
		item.addEventListener('input', function() {
			if (detInp[0].value !== "" && detInp[1].value !== "" && detInp[2].value) {
				btnDetNext.removeAttribute("disabled");
			} else {
				btnDetNext.setAttribute("disabled", "disabled");
			}
		});
	});

	// Маска полей
	$("#test-phone").mask("8 (999) 999-99-99",{autoclear: false});
	$("#request-phone").mask("8 (999) 999-99-99",{autoclear: false});
	$("#modal-phone").mask("8 (999) 999-99-99",{autoclear: false});
	$("#call-phone").mask("8 (999) 999-99-99",{autoclear: false});
	$("#details-phone").mask("8 (999) 999-99-99",{autoclear: false});
	$("#bic-bank").mask("049999999",{autoclear: false});
	$("#account").mask("99999 999 9 9999 9999999",{autoclear: false});
	$("#card-number").mask("9999 9999 9999 9999",{autoclear: false});

	// валидация форм
	$("#test-form").validate({
    rules: {
      phone: "required",
    },
    messages: {
      phone: {
        required: "Заполните поле"
      },
		},
		errorElement: "div",
    submitHandler: function (form) {
      event.preventDefault();
      $.ajax({
        url: 'mailer/smart.php',
        type: 'POST',
        data: $(form).serialize(),
        success: function (data) {
					testPhone.innerHTML = testInput.value;
					cardTest[4].style.display = "none";
					cardTest[5].style.display = "grid";
					startTimer(180, timer);
        },
        error: function (jqXHR, textStatus) {
          console.log(jqXHR + ': ' + textStatus);
        }
      });
    }
	});

	$("#request-form").validate({
    rules: {
      username: {
        required: true,
        minlength: 2
      },
      phone: "required",
			city:"required"
    },
    messages: {
      username: {
        required: "Заполните поле",
        minlength: jQuery.validator.format("Длина имени не меньше {0} символов"),
      },
      phone: {
        required: "Заполните поле"
      },
      city: {
        required: "Заполните поле"
      }
		},
		errorElement: "div",
    submitHandler: function (form) {
      event.preventDefault();
      $.ajax({
        url: 'mailer/smart.php',
        type: 'POST',
        data: $(form).serialize(),
        success: function (data) {
					modalOpen(confirm);
          $('#request-username').val('');
          $('#request-phone').val('');
          $('#request-city').val('');
        },
        error: function (jqXHR, textStatus) {
          console.log(jqXHR + ': ' + textStatus);
        }
      });
    }
	});
	
	$("#modal-form").validate({
    rules: {
      username: {
        required: true,
        minlength: 2
      },
      phone: "required",
			city:"required"
    },
    messages: {
      username: {
        required: "Заполните поле",
        minlength: jQuery.validator.format("Длина имени не меньше {0} символов"),
      },
      phone: {
        required: "Заполните поле"
      },
      city: {
        required: "Заполните поле"
      }
		},
		errorElement: "div",
    submitHandler: function (form) {
      event.preventDefault();
      $.ajax({
        url: 'mailer/smart.php',
        type: 'POST',
        data: $(form).serialize(),
        success: function (data) {
					modalOpen(confirm);
          $('#modal-username').val('');
          $('#modal-phone').val('');
					$('#modal-city').val('');
					modalClose(request);
        },
        error: function (jqXHR, textStatus) {
          console.log(jqXHR + ': ' + textStatus);
        }
      });
    }
	});
	
	$("#manager-form").validate({
    rules: {
      username: {
        required: true,
        minlength: 2
      },
      phone: "required"
    },
    messages: {
      username: {
        required: "Заполните поле",
        minlength: jQuery.validator.format("Длина имени не меньше {0} символов"),
      },
      phone: {
        required: "Заполните поле"
      }
		},
		errorElement: "div",
    submitHandler: function (form) {
      event.preventDefault();
      $.ajax({
        url: 'mailer/smart.php',
        type: 'POST',
        data: $(form).serialize(),
        success: function (data) {
					modalOpen(confirm);
          $('#call-username').val('');
          $('#call-phone').val('');
					modalClose(callManager);
        },
        error: function (jqXHR, textStatus) {
          console.log(jqXHR + ': ' + textStatus);
        }
      });
    }
	});

	$("#details-form").validate({
    rules: {
      username: {
        required: true,
        minlength: 2
			},
			city: "required",
			phone: "required",
			holder: "required",
			bank: "required",
			bicbank: "required",
			account: "required",
			coraccount: "required",
			cardnumber: "required"
    },
    messages: {
      username: {
        required: "Заполните поле",
        minlength: jQuery.validator.format("Длина имени не меньше {0} символов"),
      },
      city: {
        required: "Заполните поле"
			},
			phone: {
        required: "Заполните поле"
			},
			holder: {
        required: "Заполните поле"
			},
			bank: {
        required: "Заполните поле"
			},
			bicbank: {
        required: "Заполните поле"
			},
			account:  {
        required: "Заполните поле"
			},
			coraccount: {
        required: "Заполните поле"
			},
			cardnumber:  {
        required: "Заполните поле"
			}
		},
		errorElement: "div",
    submitHandler: function (form) {
      event.preventDefault();
      $.ajax({
        url: 'mailer/smartDetails.php',
        type: 'POST',
        data: $(form).serialize(),
        success: function (data) {
					modalOpen(detailsConfirm);
					modalClose(details);
        },
        error: function (jqXHR, textStatus) {
          console.log(jqXHR + ': ' + textStatus);
        }
      });
    }
	});

	// код ниже для настройки отправки формы
	// let btnSubmit = document.querySelector('.card__button_submit');
	// 	detailsBtn = document.querySelector('.details__button_submit');

	// detailsBtn.addEventListener('click', function (event) {
	// 	event.preventDefault();
	// 	detailsConfirm.style.display = "flex";
	// 	modalClose(details);
	// });

	// btnSubmit.addEventListener('click', function (event) {
	// 	event.preventDefault();
	// 	testPhone.innerHTML = testInput.value;
	// 	calc();
	// 	cardTest[4].style.display = "none";
	// 	cardTest[5].style.display = "grid";
	// 	startTimer(180, timer);
	// });

	// submitBtn.forEach(function (item) {
	// 	item.addEventListener('click', function (event) {
	// 		event.preventDefault();
	// 		modalOpen(confirm);
	// 		modalClose(request);
	// 	});
	// });
});