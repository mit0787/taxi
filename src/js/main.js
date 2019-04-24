let btnMenu = document.querySelector('.navbar__icon'),
    btnBlock = document.querySelector('.navbar__buttons'),
    menuClose = document.querySelector('.navbar__cross');

btnMenu.addEventListener('click', function () {
  btnBlock.style.transform = "translateX(0)";
});

menuClose.addEventListener('click', function () {
  btnBlock.style.transform = "translateX(-260px)";
});