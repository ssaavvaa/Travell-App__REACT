const createVenueHTML = (name, location, iconSource) => {
    return `<h2 class = "venuename" > ${name} </h2>
    <img class="venueimage" src="${iconSource}"/>
    <h3 class="address">Address:</h3>
    <p class = "">${location.address}</p>
    <p class = "anton">${location.city}</p>
    <p class = "anton">${location.country}</p>`;
  }
  
  const createWeatherHTML = (currentDay) => {
    return `<h2> Temp: ${currentDay.day.avgtemp_c} &#8451;</h2>
    <h2> Temp: ${currentDay.day.avgtemp_f} &#8457;</h2>
      
      <img src="https://${currentDay.day.condition.icon}" class="weathericon" />
      <p class="possible">${currentDay.day.condition.text}</p>
      <h2 class="datestyle">${currentDay.date}</h2>`;
  }


  Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();
  
    return [this.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
           ].join('');
  };

  var date = new Date();
  date.yyyymmdd()

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  
  var dateToday = today.getDate();
  if (dd < 10) {
    dd = '0' + dd;
  }
  
  if (mm < 10) {
    mm = '0' + mm;
  }
  
  today = mm + '/' + dd + '/' + yyyy;

  


const apiKey = '07426ee63a3f4dd797301734190303';
const forecastUrl = 'https://api.apixu.com/v1/forecast.json?key=';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4"), $("#venue5")];
const $weatherDivs = [$("#weather1"), $("#weather2"), $("#weather3"), $("#weather4")];
const weekDays = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


$("#todayDate").html("Today is "+  today)




const getVenues = async() => {
  const city = $input.val()
  const urlToFetch = 'https://api.foursquare.com/v2/venues/explore?near=' + city + '&limit=10&client_id=WOHYZNSJT0L3YP5PKOVKWZHAYMYAIG33H0PLDS31LKBHPIQN&client_secret=YIUZV53Q5JREBWDYADXF2JFC3IMFW5FHQX1WDNWSFZAUFFJZ&v=' + date.yyyymmdd();
  try{
    const response = await fetch(urlToFetch)
    if(response.ok){
   
     const jsonResponse = await response.json()
     const venues = jsonResponse.response.groups[0].items.map(item => item.venue);
      console.log(venues)
      return venues
    }
  }
  catch(error){
  
    console.log(error)
  }
}

const getForecast = async() => {
  const urlToFetch = forecastUrl + apiKey + '&q=' + $input.val() + '&days=4&hour=11';
try {
  const response = await fetch(urlToFetch);
  if (response.ok) {
    const jsonResponse = await response.json();

    const days = jsonResponse.forecast.forecastday;
    console.log(days)
    return days;
  }
}
  catch(error){
   
    console.log(error)
  }

}




const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    const venue = venues[index];
    const venueIcon = venue.categories[0].icon;
    const venueImgSrc = `${venueIcon.prefix}88${venueIcon.suffix}`;
    let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (days) => {
  $weatherDivs.forEach(($day, index) => {
    const currentDay = days[index];
    
    let weatherContent = createWeatherHTML(currentDay); 
    $day.append(weatherContent);
  
  });
}






let executeSearch = () => {
  
  $venueDivs.forEach(day => day.empty());
 $weatherDivs.forEach(day => day.empty());
  $destination.empty();
  $('#weather1').hide()
  $('#weather2').hide()
  $('#weather3').hide()
  $('#weather4').hide()
  $('#warning').hide()
  $('#venue1').hide()
  $('#venue2').hide()
  $('#venue3').hide()
  $('#venue4').hide()
  $('#venue5').hide()

 
  $('.container').hide()
  getVenues().then(venues => renderVenues(venues));
  getForecast().then(forecast => renderForecast(forecast));

  const timing1 = () => {
    setTimeout(() => {
      if($('#destination').is(':empty')){
        $container.fadeOut()
        $('#warning').fadeIn()
        $('#warning').html("There is no such city or Country...or your internet connection is too Slow, try one more time...or Network unavailable at this time...or...something else happened :)")
      }else{
        $('.container').show()
        $('#weather1').fadeIn(500)
        $('#weather2').fadeIn(700)
        $('#weather3').fadeIn(900)
        $('#weather4').fadeIn(1100)
        $('#venue1').slideDown(600)
        $('#venue2').slideDown(800)
        $('#venue3').slideDown(1000)
        $('#venue4').slideDown(1200)
        $('#venue5').slideDown(1400)
        $('#warning').html("")
        $container.fadeIn()
      }
    }, 700);
  }
  timing1()
  


 
  return false;
}



$submit.click(executeSearch)