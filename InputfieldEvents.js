$(document).ready(function() {

	$(document).on("click", ".InputfieldEventsAddMore", function(e) {
		$('#recurDatesPopup').popup('show');
		$('#recurDatesPopup .datepicker').datetimepicker({
		 i18n:{
		  pl:{
		   months:[
			'Styczeń','Luty','Marzec','Kwiecień',
			'Maj','Czerwiec','Lipiec','Sierpień',
			'Wrzesień','Październik','Listopad','Grudzień',
		   ],
		   dayOfWeek:[
			"Niedziela", "Poniedziałek", "Wtorek", "Środa", 
			"Czwartek", "Piątek", "Sobota",
		   ]
		  }
		 },
		 timepicker:true,
		 format:'Y-m-d H:i',
		 step: 5
		});
		var id = $(this).attr('id'); 
		setTimeout("$('#" + id + "').removeClass('ui-state-active')", 500); 
		return false; 
	});	
	
	$(document).on("click", ".InputfieldEventsAdd", function(e) {
		$(this).removeClass('ui-state-active'); 
		var $row = $(this).parents(".InputfieldEvents").find("tr.EventTemplate");
		$row.parent('tbody').append($row.clone().hide().removeClass('EventTemplate').css('display', 'table-row').fadeIn());  
		var id = $(this).attr('id'); 
		setTimeout("$('#" + id + "').removeClass('ui-state-active')", 500); 
		return false; 
	});	
	
	$(document).on("click", "#insertOccurence", function(e) {
		var eventLocation = $('#eventLocation').val();
		var eventNotes = $('#eventNotes').val();
		var start = $('#start').val();
		var time = start.substr(-5);
		
		$('#recurOutput > span.occurItem').each(function () {
			var newDate= $(this).children("span.occurItemValue").text();
			var $row = $("table.InputfieldEvents").find("tr.EventTemplate"); 
			var $clone = $row.clone().hide().removeClass('EventTemplate').css('display', 'table-row').fadeIn();
			var $new = $row.parent('tbody').append($clone); 
			$clone.find("input[name*='Events_date']").val(newDate);
			$clone.find("input[name*='Events_location']").val(eventLocation);
			$clone.find("input[name*='Events_notes']").val(eventNotes);
			});
	    $('#recurDatesPopup').popup('hide');
		return false; 
	});	

	$(document).on("click", ".InputfieldEvents a.EventClone", function(e) {
		var $row = $(this).parents("tr.Event"); 
		var $table = $(this).parents("table.InputfieldEvents"); 
		$table.append($row.clone().hide().css('display', 'table-row').fadeIn()); 
		return false; 
	}); 

	$(document).on("click", ".InputfieldEvents a.EventDel", function(e) {
		var $row = $(this).parents("tr.Event"); 
		if($row.size() == 0) {
			// delete all
			$(this).parents("thead").next("tbody").find('.EventDel').click();
			return false; 	
		}
		var $input = $(this).next('input'); 
		if($input.val() == 1) {
			$input.val(0); 
			$row.removeClass("EventTBD"); 
			$row.removeClass('ui-state-error'); 
		} else {
			$input.val(1); 
			$row.addClass("EventTBD"); 
			$row.addClass('ui-state-error');
		}
		return false; 
	}); 

	$(document).on("click", ".InputfieldEvents .eventsDatePicker", function() {
		console.log("click");
		jQuery.datetimepicker.setLocale('pl');
		$(this).parent().children(".datepicker").datetimepicker({
		 i18n:{
		  pl:{
		   months:[
			'Styczeń','Luty','Marzec','Kwiecień',
			'Maj','Czerwiec','Lipiec','Sierpień',
			'Wrzesień','Październik','Listopad','Grudzień',
		   ],
		   dayOfWeek:[
			"Niedziela", "Poniedziałek", "Wtorek", "Środa", 
			"Czwartek", "Piątek", "Sobota",
		   ]
		  }
		 },
		 timepicker:true,
		 format:'Y-m-d H:i',
		 step: 5
		});
		$(this).parent().children(".datepicker").datetimepicker('show');
	}); 

}); 
