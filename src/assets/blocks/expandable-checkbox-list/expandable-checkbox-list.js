$(()=> {
  $('.expandable-checkbox-list__title').on('click','.field-template', function(event) {
    let idToSearch = $(event.delegateTarget).siblings('fieldset');
    console.log(idToSearch);
    idToSearch.toggle('.expandable-checkbox-list__fieldset--hidden');
  });
})