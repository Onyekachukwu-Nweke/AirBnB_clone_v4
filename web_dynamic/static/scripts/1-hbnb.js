const amenityCheck = {};
$(document).on('change', "input[type=checkbox]", function(){
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