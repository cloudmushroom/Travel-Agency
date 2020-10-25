$(document).ready(function(){
    var get = $.ajax({
            type: "GET",
            url: "http://localhost:3000/destinations"
            });
    get.done(function (podaci) {
        $.each(podaci, function (i, podatak) {
            $("tbody").append('<tr><td class="cityDestination">' + podatak.destination + '</td><td>' + podatak.date + '</td><td>' + podatak.duration + '</td><td class="destinationPrice">' + podatak.price + '</td><td><button id ="' + podatak.id + '" class="btn btn-warning"onClick="openCityModal(this)">View Details</button></td><td><button id ="' + podatak.id + '" class="btn btn-default btn-transparent border border-warning" onClick="openReservationModal(this)">Make Reservation</button></td></tr>');
        });
        $("#table").dataTable();
    });
    get.fail(function (podaci) {
        alert(podaci.statusText);
    });                
});


function openCityModal(btn) {
    var button = $(btn);
    var id = button.attr('id');

    $.get("http://localhost:3000/destinations/" + id, function(destination) {
       
    var detail = destination.detail;
        
        $('#cityModal').find('h4[id="title"]').html(destination.destination);
        $('#cityModal').find('p[id="detail"]').html(detail);
        $('#cityModal').find(".foto").attr("src", destination.img);
    })
    $('#cityModal').modal('toggle');
}


function openReservationModal(dugme){
  fillReservationInfo(dugme);
    $('#reservationModal').modal('toggle');

}

function fillReservationInfo(dugme) {
    var reservationBtn = $(dugme);
    var mojRed = reservationBtn.closest("tr");
    var mojCity = mojRed.find(".cityDestination");
    var mojCityIme = mojCity.html();

    var locationHolder = $("#location");
    locationHolder.html(mojCityIme);
    $('#destinationName').val(mojCityIme);
    
    
    var reservationBtn = $(dugme);
    var mojRed = reservationBtn.closest("tr");
    var priceCell = mojRed.find(".destinationPrice");
    var priceShow = priceCell.html();
    $("#locationPrice").html(priceShow);
    $('#destinationPrice').val(priceShow);
}

function makeReservation(dugme) {
    var dataToSend = getDataToSend(dugme);
    sendData(dataToSend);
    $('#reservationModal').modal('toggle');
}
function getDataToSend(btn) {
    var sendButton = $(btn);
    var reservationForm = sendButton.closest("form");
    var bla =  reservationForm.serialize();
    console.log(bla);
    return bla;  
}

function sendData(dataToSend){
    $.post("http://localhost:3000/reservations",dataToSend);
}
