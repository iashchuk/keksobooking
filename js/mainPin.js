'use strict';

(function () {

  var dragLimit = {
    x: {
      MIN: 0,
      MAX: 1200
    },
    y: {
      MIN: 130,
      MAX: 630
    }
  };

  var mainPinSizes = {
    WIDTH: 65,
    HEIGHT: 84
  };

  var mainPinStartCoords = {
    x: '570px',
    y: '375px'
  };


  var mapPinMain = document.querySelector('.map__pin--main');


  // Получение координат главного пина по-умолчанию
  var getMainPinDefaultPosition = function () {
    mapPinMain.style.left = mainPinStartCoords.x;
    mapPinMain.style.top = mainPinStartCoords.y;
  };


  /**
   * Получаем координаты главного пина
   * @return {Location}
   */
  var getMainPinPosition = function () {
    var mainPinPosition = {
      x: mapPinMain.offsetLeft + Math.floor(mainPinSizes.WIDTH / 2),
      y: mapPinMain.offsetTop + mainPinSizes.HEIGHT
    };
    return mainPinPosition;
  };

  // Функция инициализации страницы
  var dragPin = function () {

    mapPinMain.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var mainPinCoords = getMainPinPosition();

        if (
          mainPinCoords.y - shift.y >= dragLimit.y.MIN &&
          mainPinCoords.y - shift.y <= dragLimit.y.MAX
        ) {
          mapPinMain.style.top = mapPinMain.offsetTop - shift.y + 'px';
        }
        if (
          mainPinCoords.x - shift.x >= dragLimit.x.MIN &&
          mainPinCoords.x - shift.x <= dragLimit.x.MAX
        ) {
          mapPinMain.style.left = mapPinMain.offsetLeft - shift.x + 'px';
        }
        window.form.setAddress(mainPinCoords);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);

    });
  };


  dragPin();

  window.mainPin = {
    getDefaultPosition: getMainPinDefaultPosition,
    getPosition: getMainPinPosition
  };

})();
