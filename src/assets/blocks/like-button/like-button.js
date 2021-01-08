$(()=> {
  // После нажатия на кнопку like меняется значение поля content (меняем количество лайков)
  // работает "наоборот", т.к. проверка наличия property checked производится после его
  // изменения! На всякий случай защита от дурака - если отмечен лайк, а кол-во 0 при снятии
  // не будет -1
  $('.like-button').click( function() {
    var currentLikeValue = $(this).children('.like-button__content').html();
    if ( +$(this).siblings('.like-button__input').prop('checked') ) {
      if ( currentLikeValue > 0) $(this).children('.like-button__content').html(+currentLikeValue-1);
    }
    else {
      $(this).children('.like-button__content').html(+currentLikeValue+1);
    };
  });
} );
