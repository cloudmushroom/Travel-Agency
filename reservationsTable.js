//Delete
function deleteReservation(btn) {
  var button = $(btn);
  var id = button.attr("id");
  var deleteIdUrl = "http://localhost:3000/reservations/" + id;

  console.log(deleteIdUrl);

  $.ajax({
    url: deleteIdUrl,
    type: "DELETE",
    dataType: "json",
    success: function () {
      console.log("Obrisano");
    },
  });
  button.closest("tr").remove();
}

function openEditModal(btn) {
  var button = $(btn);

  var parentRow = button.closest("tr");
  var name = parentRow.find("td[class*='nameColumn']").html();
  var surname = parentRow.find("td[class*='surnameColumn']").html();
  var email = parentRow.find("td[class*='emailColumn']").html();
  var destinationName = parentRow
    .find("td[class*='destinationNameColumn']")
    .html();
  var destinationPrice = parentRow
    .find("td[class*='destinationPriceColumn']")
    .html();
  var note = parentRow.find("td[class*='noteColumn']").html();

  $("#name").val(name);
  $("#surname").val(surname);
  $("#email").val(email);
  $("#destinationName").val(destinationName);
  $("#destinationPrice").val(destinationPrice);
  $("#note").val(note);
  $("#id").val(button.attr('id'));

  $("#modalUnos").modal("toggle");
}

function saveEdit(btn) {
  var button = $(btn);

  var forma = $("#forma");
  var dataToSend = forma.serialize();
  var id =  $("#id").val();

  $.ajax({
    url: "http://localhost:3000/reservations/" + id,
    type: "PUT",
    data: dataToSend,
    success: function (podatak) {
      var get = $.ajax({
        type: "GET",
        url: "http://localhost:3000/reservations",
      });
      get.done(function (podaci) {
          // isprazni tabelu
          $("tbody").empty();
        $.each(podaci, function (i, podatak) {
          $("tbody").append(
            `<tr><td class="nameColumn">${podatak.name}</td><td class="surnameColumn">${podatak.surname}</td><td class="emailColumn">${podatak.email}</td><td class="destinationNameColumn">${podatak.destinationName}</td><td class="destinationPriceColumn">${podatak.destinationPrice}</td><td class="noteColumn">${podatak.note}</td><td><button id="${podatak.id}" class= "btn btn-warning" onclick="openEditModal(this)">Edit</button></td> + <td><button id="${podatak.id}" class="btn btn-danger" onclick="deleteReservation(this)">Delete</button></td>`
          );
        });
        $("#table").dataTable();
        $("#modalUnos").modal("toggle");
      });
      get.fail(function (podaci) {
        alert(podaci.statusText);
      });
    },
  });
}

//GET Reservations
$(document).ready(function () {
  var get = $.ajax({
    type: "GET",
    url: "http://localhost:3000/reservations",
  });
  get.done(function (podaci) {
    $.each(podaci, function (i, podatak) {
      $("tbody").append(
        `<tr><td class="nameColumn">${podatak.name}</td><td class="surnameColumn">${podatak.surname}</td><td class="emailColumn">${podatak.email}</td><td class="destinationNameColumn">${podatak.destinationName}</td><td class="destinationPriceColumn">${podatak.destinationPrice}</td><td class="noteColumn">${podatak.note}</td><td><button id="${podatak.id}" class= "btn btn-warning" onclick="openEditModal(this)">Edit</button></td> + <td><button id="${podatak.id}" class="btn btn-danger" onclick="deleteReservation(this)">Delete</button></td>`
      );
    });
    $("#table").dataTable();
  });
  get.fail(function (podaci) {
    alert(podaci.statusText);
  });
});
