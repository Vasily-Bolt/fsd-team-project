$(()=> {
  $('.room-booking').each( function() {
    let blockWithNumberOfDays = $(this).find('span[id$="daysOfResidence"]');
    //Делаем переменную для быстрого доступа к Пикеру
    let datePickerDataSelector = $(this).find('input[id$="InputField"]').data('dateRangePicker');

    //При рендеринге страницы поля заполняются заданными датами, но плагин до первого вызова
    //не подтягивает их и метод getDaysPicked не работает. Потому выковыриваем информацию из
    //ДОМ и после кидаем через метод SetDateRange
    let ResidenceDaysRange = [
      $(this).find('input[id$="multiple-firstInputField"]').val(),
      $(this).find('input[id$="multiple-secondInputField"]').val()
    ];
    let daysOfResidence = 4;

    blockWithNumberOfDays.html( daysOfResidence );
    
    datePickerDataSelector.setDateRange ( ResidenceDaysRange[0], ResidenceDaysRange[1] );
    
    daysOfResidence = datePickerDataSelector.getDaysPicked();
    console.log( daysOfResidence-1 );
    // setTimeout(() => {
    //   $(this).find('input[id$="InputField"]').data('dateRangePicker').getDaysPicked();
    // }, 5000);
    // setTimeout(() => {
    //   $(this).find('input[id$="InputField"]').data('dateRangePicker').getDaysPicked();
    // }, 10000);
  });
});