$(()=> {
  
  const DatepickerToSetup = $( document ).find('div[id^="datepickerHead"]').data('dateRangePicker');
  if ( $('#demoOfDatepicker').hasClass('demo') ) DatepickerToSetup.setDateRange('19.08.2019','23.08.2019');
  if ( $('#demoOfDatepicker').hasClass('demoOfDatepicker') ) DatepickerToSetup.open();
});