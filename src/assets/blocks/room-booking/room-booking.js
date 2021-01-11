$(()=> {
  $('.room-booking').each( function() {
    let thisBlockId = $(this).attr('id');
    let daysOfResidence = 4;
    console.log( thisBlockId );
    $(this).find('span[id$="daysOfResidence"]').html( daysOfResidence );
  });
});