"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createVenueHTML = function createVenueHTML(name, location, iconSource) {
  return "<h2>".concat(name, "</h2>\n    <img class=\"venueimage\" src=\"").concat(iconSource, "\"/>\n    <h3>Address:</h3>\n    <p class = \"address\">").concat(location.address, "</p>\n    <p class = \"anton\">").concat(location.city, "</p>\n    <p class = \"anton\">").concat(location.country, "</p>");
};

var createWeatherHTML = function createWeatherHTML(currentDay) {
  return "<h2> High: ".concat(currentDay.day.maxtemp_c, "</h2>\n      <h2> Low: ").concat(currentDay.day.mintemp_c, "</h2>\n      <img src=\"https://").concat(currentDay.day.condition.icon, "\" class=\"weathericon\" />\n      <h2>").concat(weekDays[new Date(currentDay.date).getDay()], "</h2>");
};

var apiKey = '07426ee63a3f4dd797301734190303';
var forecastUrl = 'https://api.apixu.com/v1/forecast.json?key='; // Page Elements

var $input = $('#city');
var $submit = $('#button');
var $destination = $('#destination');
var $container = $('.container');
var $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4"), $("#venue5")];
var $weatherDivs = [$("#weather1"), $("#weather2"), $("#weather3"), $("#weather4")];
var weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

var getVenues =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var city, urlToFetch, response, jsonResponse, venues;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            city = $input.val();
            urlToFetch = 'https://api.foursquare.com/v2/venues/explore?near=' + city + '&limit=10&client_id=WOHYZNSJT0L3YP5PKOVKWZHAYMYAIG33H0PLDS31LKBHPIQN&client_secret=YIUZV53Q5JREBWDYADXF2JFC3IMFW5FHQX1WDNWSFZAUFFJZ&v=20190303';
            _context.prev = 2;
            _context.next = 5;
            return fetch(urlToFetch);

          case 5:
            response = _context.sent;

            if (!response.ok) {
              _context.next = 13;
              break;
            }

            _context.next = 9;
            return response.json();

          case 9:
            jsonResponse = _context.sent;
            venues = jsonResponse.response.groups[0].items.map(function (item) {
              return item.venue;
            });
            console.log(venues);
            return _context.abrupt("return", venues);

          case 13:
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](2);
            console.log(_context.t0);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[2, 15]]);
  }));

  return function getVenues() {
    return _ref.apply(this, arguments);
  };
}();

var getForecast =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var urlToFetch, response, jsonResponse, days;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            urlToFetch = forecastUrl + apiKey + '&q=' + $input.val() + '&days=4&hour=11';
            _context2.prev = 1;
            _context2.next = 4;
            return fetch(urlToFetch);

          case 4:
            response = _context2.sent;

            if (!response.ok) {
              _context2.next = 12;
              break;
            }

            _context2.next = 8;
            return response.json();

          case 8:
            jsonResponse = _context2.sent;
            days = jsonResponse.forecast.forecastday;
            console.log(days);
            return _context2.abrupt("return", days);

          case 12:
            _context2.next = 17;
            break;

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](1);
            console.log(_context2.t0);

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[1, 14]]);
  }));

  return function getForecast() {
    return _ref2.apply(this, arguments);
  };
}();

var renderVenues = function renderVenues(venues) {
  $venueDivs.forEach(function ($venue, index) {
    var venue = venues[index];
    var venueIcon = venue.categories[0].icon;
    var venueImgSrc = "".concat(venueIcon.prefix, "88").concat(venueIcon.suffix);
    var venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
    $venue.append(venueContent);
  });
  $destination.append("<h2>".concat(venues[0].location.city, "</h2>"));
};

var renderForecast = function renderForecast(days) {
  $weatherDivs.forEach(function ($day, index) {
    var currentDay = days[index];
    var weatherContent = createWeatherHTML(currentDay);
    $day.append(weatherContent);
  });
};

var executeSearch = function executeSearch() {
  $venueDivs.forEach(function (day) {
    return day.empty();
  });
  $weatherDivs.forEach(function (day) {
    return day.empty();
  });
  $destination.empty();
  getVenues().then(function (venues) {
    return renderVenues(venues);
  });
  getForecast().then(function (forecast) {
    return renderForecast(forecast);
  });
  $container.css("visibility", "visible");
  return false;
};

$submit.click(executeSearch);