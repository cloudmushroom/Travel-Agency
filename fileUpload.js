var loadFile = function(event) {
    var file =  URL.createObjectURL(event.target.files[0]);
    $('#galerija').append(`<div class="col-md-3 imgGallery">
        <img id="output" src="${file}" width="150" alt="">
      </div>`)
};

