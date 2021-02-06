$(()=> {
  
  const DatepickerToSetup = $( document ).find('div[id^="datepickerHead"]').data('dateRangePicker');
  DatepickerToSetup.setDateRange('19.08.2019','23.08.2019');
  if ( $('#demoOfDatepicker').attr('id') == 'demoOfDatepicker' ) DatepickerToSetup.open();
});