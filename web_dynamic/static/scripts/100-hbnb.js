const amenityCheck = {};
const stateCheck = {};
const cityCheck = {};
$(document).on('change', ".amenities input[type=checkbox]", function(){
  if (this.checked) {
      amenityCheck[$(this).data('id')] = $(this).data('name');
  } else {
      delete amenityCheck[$(this).data('id')];
  }
  const amenityList = Object.values(amenityCheck)
  if (amenityList.length > 0){
      $("div.amenities > h4").text(amenityList.join(', '));
  } else {
      $("div.amenities > h4").html('&nbsp;');
  }
});

$(document).on('change', ".locations input[id='statecheck']", function () {
  if (this.checked) {
    stateCheck[$(this).data('id')] = $(this).data('name');
  } else {
    delete stateCheck[$(this).data('id')];
  }
  const stateList = Object.values(stateCheck);
  if (stateList.length > 0) {
    $("div.locations > h4").text(stateList.join(', '));
  } else {
    $("div.locations > h4").html('&nbsp;');
  }
});

$(document).on('change', ".locations input[id='citycheck']", function () {
  if (this.checked) {
    cityCheck[$(this).data('id')] = $(this).data('name');
  } else {
    delete cityCheck[$(this).data('id')];
  }
  const cityList = Object.values(cityCheck);
  if (cityList.length > 0) {
    $("div.locations > h4").text(cityList.join(', '));
  } else {
    $("div.locations > h4").html('&nbsp;');
  }
});

$.get('http://0.0.0.0:5001/api/v1/status/', function (result, textStatus) {
    if (textStatus === 'success') {
      if (result.status === "OK") {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    }
});

$.ajax({
  type: 'POST',
  url: 'http://0.0.0.0:5001/api/v1/places_search/',
  data: '{}',
  dataType: 'json',
  contentType: "application/json",
  success: function(data) {
    for (i=0; i < data.length; i++){
      let place = data[i];
      $('.places').append('<article><div class="title_box"><h2>' + place.name + '</h2><div class="price_by_night"><p>$' + place.price_by_night + '</p></div></div><div class="information"><div class="max_guest">' + place.max_guest + ' Guests</div><div class="number_rooms">' + place.number_rooms + ' Bedroom</div><div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom</div></div><div class="user"><b>Owner: </b>' + place.owner + '</div><div class="description">' + place.description + '</div></article>');
    }
  }
});

$('button:contains("Search")').click(function () {
  $('.places > article').remove();
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    data: JSON.stringify({'amenities': Object.keys(amenityCheck), 'states': Object.keys(stateCheck), 'cities': Object.keys(cityCheck)}),
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        let place = data[i];
        $('.places ').append('<article><div class="title_box"><h2>' + place.name + '</h2><div class="price_by_night"><p>$' + place.price_by_night + '</p></div></div><div class="information"><div class="max_guest">' + place.max_guest + ' Guests</div><div class="number_rooms">' + place.number_rooms + ' Bedroom</div><div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom</div></div><div class="user"><b>Owner: </b>' + place.owner + '</div><div class="description">' + place.description + '</div></article>');
      }
    }
  }); 
});