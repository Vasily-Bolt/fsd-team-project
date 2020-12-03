$(()=> {
	var sliderFromSeperated = '';
	var sliderToSeperated = '';
	$( ".slider-range" ).slider({
		range: true,
		min: 0000,
		max: 15850,
		values: [ 5000, 10000 ],
		slide: function( event, ui ) {
			sliderFromSeperated = String( ui.values[0]).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
			sliderToSeperated = String( ui.values[1]).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');			
			$( "#amount" ).val( sliderFromSeperated + "P - " + sliderToSeperated + "P");
		}
	});
	sliderFromSeperated = String($( ".slider-range" ).slider( "values", 0 )).
		replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
	sliderToSeperated = String($( ".slider-range" ).slider( "values", 1 )).
		replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
	$( "#amount" ).val( sliderFromSeperated +
		"P - " + sliderToSeperated + "P");
	// $('.slider-range').children('span').addClass('ui-state--myhandle');
} );