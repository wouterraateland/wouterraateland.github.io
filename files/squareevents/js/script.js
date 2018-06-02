$(document).ready(function(){
	
	keepblock();
	validate();
	
});

function validate(){
	
	$('#contact_form').submit(function(event){
		if($('#name').val().length < 1){
			$('#name-group .glyphicon').css('color', 'red');
			$('#name-group input').attr('placeholder', 'Vul alstublieft uw naam in.');
			event.preventDefault();
		}
		if($('#email').val().length < 1){
			$('#email-group .glyphicon').css('color', 'red');
			$('#email-group input').attr('placeholder', 'Vul alstublieft uw e-mailadres in.');
			event.preventDefault();
		}
		if($('#text').val().length < 1){
			$('#text-group .glyphicon').css('color', 'red');
			$('#text-group textarea').attr('placeholder', 'Vergeet niet uw bericht te schrijven.');
			event.preventDefault();
		}
	});

}

function keepblock(){
	
	$(window).resize(function(){
		$.each('.box',function(){
			
			var width = $(this).outerWidth();
			$(this).css('height',width);
			
		});
		
	});
	
}