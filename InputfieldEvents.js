$(document).ready(function() {

    var table = $('table.InputfieldEvents').DataTable( {
	"bPaginate": false,
	"bScrollInfinite": true,
    "bScrollCollapse": true,
    "sScrollY": "400px",
	"order": [[ 1, "desc" ]],
    "aoColumns": [
      { "bSortable": false },
      null,
      null,
      null,
      { "bSortable": false },
    ],
	"language": {
		"zeroRecords": ""
	}
    });
	
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
	
	$(document).on("focusout", "table.InputfieldEvents input", function(e) {
		e.preventDefault();
		$(this).hide();
		if($(this).val().length>0){
			$(this).siblings("span.inputValue").fadeIn().empty().text($(this).val());
		}else{
			$(this).siblings("span.inputValue").fadeIn().html('<span class="placeholder">(Click to edit)</span>');
		}
	});		
	$(document).on("keypress", "table.InputfieldEvents input", function(e) {
		 if(e.which == 13) {
			e.preventDefault();
			$(this).hide();
			if($(this).val().length>0){
					$(this).siblings("span").fadeIn().text($(this).val());
			}else{
				$(this).siblings("span").fadeIn().html('<span class="placeholder">(Click to edit)</span>');
			}
		 }
	});	
	$(document).on("click", "table.InputfieldEvents td", function(e) {
		if(!$(this).children("input").is(':visible')){
			$(this).children("span").hide();
			$(this).children("input").fadeIn();
			$(this).children("input").focus();
		}
	});	
	$(document).on("click", ".InputfieldEventsAdd", function(e) {
		$(this).removeClass('ui-state-active'); 
		var $dsttable = $(this).parents(".InputfieldEvents").find("table.InputfieldEvents");
		var $row = $("table.EventTemplateTable").find("tr.EventTemplate");
		
		$clone = $row.clone().hide().removeClass('EventTemplate');
		$clone.find("span:not(.ui-icon)").hide();
		$clone.find("span").show();
		$clone.find("input").hide();
		
		//$dsttable.children('tbody').append($clone.css('display', 'table-row').fadeIn());  
		$clone.css('display', 'table-row');
		table.row.add($clone.fadeIn()).draw();
		
		var $scrollBody = $(table.table().node()).parent();
		$scrollBody.scrollTop($scrollBody.get(0).scrollHeight);
		
		var id = $(this).attr('id'); 
		setTimeout("$('#" + id + "').removeClass('ui-state-active')", 500); 
		table.draw(); 
		return false; 
	});	
	
	$(document).on("click", "#insertOccurence", function(e) {
		var eventLocation = $('#eventLocation').val();
		var eventNotes = $('#eventNotes').val();
		var start = $('#start').val();
		var time = start.substr(-5);
		var $row = $("table.EventTemplateTable").find("tr.EventTemplate");
		
		$('#recurOutput > span.occurItem').each(function () {
			var newDate= $(this).children("span.occurItemValue").text();
			var $clone = $row.clone().removeClass('EventTemplate').css('display', 'table-row').fadeIn();
			$date  = $clone.find("input[name*='Events_date']");
			$date.val(newDate);
			
			$location = $clone.find("input[name*='Events_location']");
			$location.val(eventLocation);
			
			$notes = $clone.find("input[name*='Events_notes']");
			$notes.val(eventNotes);
			
			table.row.add($clone.fadeIn()).draw();
			});
		$('.InputfieldEvents input').each(function () {
			if($(this).val().length>0){
				$(this).siblings("span").fadeIn().text($(this).val());
			}else{
				$(this).siblings("span").fadeIn().html('<span class="placeholder">(Click to edit)</span>');
			}
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

	$(document).on("click", ".InputfieldEvents a.EventDelAll", function(e) {
		var $row = $(this).parents(".dataTables_scrollHead").siblings(".dataTables_scrollBody").find("tr.Event")
		$row.find('.EventDel').click();
		return false; 	
	});
	$(document).on("click", ".InputfieldEvents a.EventDel", function(e) {
		var $row = $(this).parents("tr.Event"); 
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
		 onClose:function(ct,$i){
		  	
		 },
		 timepicker:true,
		 format:'Y-m-d H:i',
		 step: 5
		});
		$(this).parent().children(".datepicker").datetimepicker('show');

	}); 
	$(document).submit(function (e) {
		//table.rows().nodes().page.len(-1).draw(false);
	});
}); 
