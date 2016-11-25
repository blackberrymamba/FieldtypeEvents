function generate_recurrence () {
	var unit = $('#unit').find(":selected").val();
	var start = $('#start').val();
	var every = parseInt($('#every').val());
	
	if(every == 0){
		alert("Rekurencja nie może być równa 0");
		return false;
	}	
	if(start == ""){
		alert("Wprowadź datę początkową");
		return false;
	}	
	
	switch(unit) {
		case "d":
			generate_day_occurence();
			break;
		case "w":
			generate_week_occurence();
			break;
		case "m":
			generate_month_occurence();
			break;
		default:
			console.log("default");
	}
}
function generate_day_occurence(){
	var start = $('#start').val();
	var unit = parseInt($('#every').val());
	var rfor = parseInt($('#rfor').val());
	var until = $('#until').val();
	var end_condition = $('#end_condition').find(":selected").val();
	var myDate, recurrence;
	myDate = moment(start);
	
	if (end_condition == "until"){
		recurrence = myDate.recur().every(unit).day();
		recurrence.startDate(start);
		recurrence.endDate(until);
		nextDates = recurrence.all("YYYY-MM-DD");
		fill_text_area(nextDates);
	}
	if (end_condition == "for"){
		recurrence = myDate.recur().every(unit).day();
		nextDates = recurrence.next(rfor,"YYYY-MM-DD");
		nextDates.unshift(start.substr(0, 10));
		fill_text_area(nextDates);
	}
	
}
function generate_week_occurence(){	
	var start = $('#start').val();
	var unit = parseInt($('#every').val());
	var rfor = parseInt($('#rfor').val());
	var days = parseInt($('#week_days').find(":selected").val());
	var until = $('#until').val();
	var end_condition = $('#end_condition').find(":selected").val();
	
	var myDate, recurrence;
	myDate = moment(start);
	
	if (end_condition == "until"){
		recurrence = myDate.recur().every(days).daysOfWeek();
		recurrence.startDate(start);
		recurrence.endDate(until);
		nextDates = recurrence.all("YYYY-MM-DD");
		var nextDaysUnit = [];
		nextDaysUnit.push(start.substr(0, 10));
		for (i=(unit);i<nextDates.length;i+=unit){
			nextDaysUnit.push(nextDates[i]);
		}
		fill_text_area(nextDaysUnit);
	}
	if (end_condition == "for"){
		rfor = rfor * unit;
		recurrence = myDate.recur().every(days).daysOfWeek();
		nextDates = recurrence.next(rfor,"YYYY-MM-DD");
		
		var nextDaysUnit = [];
		nextDaysUnit.push(start.substr(0, 10));
		for (i=(unit-1);i<nextDates.length;i+=unit){
			nextDaysUnit.push(nextDates[i]);
		}
		fill_text_area(nextDaysUnit);
	}
	
        
}
function generate_month_occurence(){	
	var start = $('#start').val();
	var unit = parseInt($('#every').val());
	var nth = $('#nth').find(":selected").val();
	var occurrence_of = $('#occurrence_of').find(":selected").val();
	var rfor = parseInt($('#rfor').val());
	var until = $('#until').val();
	var end_condition = $('#end_condition').find(":selected").val();
	
	var myDate, recurrence;
	myDate = moment(start);
	
	if (end_condition == "until"){
		recurrence = myDate.recur().every(occurrence_of).daysOfWeek().every(nth).weeksOfMonthByDay();
		recurrence.startDate(start);
		recurrence.endDate(until);
		nextDates = recurrence.all("YYYY-MM-DD");
		var nextDaysUnit = [];
		for (i=(unit);i<nextDates.length;i+=unit){
			nextDaysUnit.push(nextDates[i]);
		}
		fill_text_area(nextDaysUnit);
	}
	if (end_condition == "for"){
		rfor = rfor * unit;
		recurrence = myDate.recur().every(occurrence_of).daysOfWeek().every(nth).weeksOfMonthByDay();
		nextDates = recurrence.next(rfor,"YYYY-MM-DD");
		var nextDaysUnit = [];
		nextDaysUnit.push(start.substr(0, 10));
		for (i=(unit-1);i<nextDates.length;i+=unit){
			nextDaysUnit.push(nextDates[i]);
		}
		fill_text_area(nextDaysUnit);
	}
	
}
function fill_text_area(events){
	$('#recurOutput').empty();
	var start = $('#start').val();
	var time = start.substr(-5);
	
	//$('#recurOutput').append('<span class="occurItem">'+$('#start').val()+'<span class="delOccur"></span></span>');
	for (i=0;i<events.length;i++){
		$('#recurOutput').append('<span class="occurItem">'+(i+1)+'. - <span class="occurItemValue">'+events[i] +' '+time+'<span class="delOccur"></span></span></span>');
	}
	
}
function delOccur(){
	$(this).parent().remove();
}
$(document).on('click','.delOccur',function(){
	$(this).closest(".occurItem").remove();
});
$(document).on('click','#clearOccurence',function(){
	$('#recurOutput').empty();
});

$(document).ready(function() {
  moment(new Date()).format("YYYY-MM-DD");
  $('#recurDatesPopup').popup();
  $('#generateOccurence').click(generate_recurrence);

	
	$('#end_condition').change(function () {
	  $('#for_span, #until_span').hide();
	  $('#' + this.value + '_span').show();
	});

	$('#unit').change(function () {
	  $('#week_span, #month_span').hide();
	  if (this.value == 'w') $('#week_span').show();
	  if (this.value == 'm') $('#month_span').show();
	});
	
	jQuery.datetimepicker.setLocale('pl');
	$("#start").datetimepicker({
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
		  
});
