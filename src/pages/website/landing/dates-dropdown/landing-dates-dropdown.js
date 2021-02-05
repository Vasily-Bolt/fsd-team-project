$(()=> {
  const DatepickerToSetup = $( document ).find('input[id$="InputField"]').data('dateRangePicker');
  DatepickerToSetup.open();
  DatepickerToSetup.setDateRange('19.08.2019','23.08.2019');
});