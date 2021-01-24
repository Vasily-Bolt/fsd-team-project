$(()=> {

	$( '.nav-menu__arrow-container' ).parent().on( 'click', function(){
		$(this).children('.nav-menu__submenu').toggleClass('nav-menu__submenu--hidden nav-menu__submenu--visible	');
		
		$(document).one('click', function() {
			console.log('321');	
			$('.nav-menu__submenu').removeClass('nav-menu__submenu--hidden nav-menu__submenu--visible	');
		});
	});
	
});