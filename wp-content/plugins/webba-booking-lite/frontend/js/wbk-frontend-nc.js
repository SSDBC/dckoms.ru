// WEBBA Booking frontend scripts
// step count
var wbk_total_steps;
var wbkjQ = jQuery.noConflict();
// onload function
wbkjQ( function ($) {
	wbkjQ(document).off('ajaxSend');
	if( wbkjQ('.wbk-payment-init').length > 0 ){
 		wbk_set_payment_events();
	}
 	if( wbkjQ( '#wbk-cancel_booked_appointment' ).length > 0 ){
 		wbk_cancel_booked_appointment_events();
	}
 	if( wbkjQ( '.wbk-addgg-link' ).length > 0 ){
 		wbk_add_gg_appointment_events();
	}
	if( wbkjQ('#wbk-confirm-services').length > 0 ){
		wbkjQ( '.wbk-service-checkbox' ).change( function(){
			var service_count = wbkjQ( '.wbk-service-checkbox:checked').length;
		 	if( service_count == 0 ){
		 		wbkjQ( '#wbk-confirm-services' ).attr( "disabled", true );
		 	} else {
		 		wbkjQ( '#wbk-confirm-services' ).attr( "disabled", false );
		 	}
		});
		wbkjQ( '#wbk-confirm-services' ).click( function(){
			wbk_renderSetDate( true );
		});
	}
	if( wbkjQ('.wbk_multiserv_hidden_services').length > 0 ){
		wbk_renderSetDate( false );
	}
	wbkjQ('#wbk-category-id').change(function() {

		wbkjQ( '#wbk_current_category' ).val = wbkjQ(this).val();
		wbk_clearSetDate();
		wbk_clearSetTime();
		wbk_clearForm();
		wbk_clearDone();
		wbk_clearTimeslots();
		wbk_clearForm();

		if( wbkjQ('#wbk-confirm-services').length > 0  ){
			if( wbkjQ(this).val() == 0 ){
				wbkjQ('.wbk-service-category-label').addClass('wbk_hidden');
			} else {
				wbkjQ('.wbk-service-category-label').removeClass('wbk_hidden');
			}
			wbkjQ( '.wbk_service_chk_label' ).addClass('wbk_hidden');
			wbkjQ( '.wbk-clear' ).addClass('wbk_hidden');
			var services_opt = wbkjQ(this).find('option:selected').attr('data-services').split('-');
			wbkjQ.each( services_opt, function( index, value ){
				wbkjQ( '.wbk_service_chk_label_' + value ).removeClass('wbk_hidden');
				wbkjQ( '.wbk_chk_clear_' + value ).removeClass('wbk_hidden');
			});
			wbkjQ('.wbk-service-checkbox').prop('checked', false);
			wbkjQ('#wbk-confirm-services').prop('disabled', true);
		} else {
			if( wbkjQ(this).val() == 0 ){
				wbkjQ('#wbk_service_list_holder').fadeOut('fast');
				return;
			}
			var services_opt = wbkjQ(this).find('option:selected').attr('data-services').split('-');
			wbkjQ('#wbk-service-id > option').each( function() {
				if( wbkjQ(this).attr('value') != 0 ){
					wbkjQ(this).remove();
				}
			});
			wbkjQ('#wbk_service_id_full_list > option').each( function() {
				if( wbkjQ(this).attr('value') != 0 ){
					if( wbkjQ.inArray( wbkjQ(this).attr('value'), services_opt ) != -1 ){
						var elem_outerHtml = wbkjQ(this)[0].outerHTML;
						wbkjQ('#wbk-service-id').append( elem_outerHtml );
					}
				}
			});
			wbkjQ('#wbk-service-id').val(0);
			wbkjQ('#wbk_service_list_holder').fadeIn('fast');
		}
	});
	if( wbkjQ('#wbk-service-id').length == 0 ){
	    return;
    }
	var service_id = wbkjQ('#wbk-service-id').val();
	if ( wbkl10n.mode == 'extended' ){
	// extended mode
		if ( service_id == 0 ) {
			wbk_total_steps = 4;
	 		wbk_setServiceEvent();
	 	} else {
	 		wbk_total_steps = 3;
	 		wbk_renderSetDate( false );
		}
	} else {
	// basic mode
		if ( service_id == 0 ) {
			wbk_total_steps = 3;
	 		wbk_setServiceEvent();
	 	} else {
	 		wbk_total_steps = 2;
	 		wbk_renderSetDate( false );
		}
		wbkjQ('#timeselect_row').remove();
	}
	if ( service_id != 0 ) {
		var multi_limit = wbkjQ('#wbk-service-id').attr('data-multi-limit');
		wbkl10n.multi_low_limit = wbkjQ('#wbk-service-id').attr('data-multi-low-limit');
		if( multi_limit != '' ){
			wbkl10n.multi_limit = multi_limit;
		}
	}



});
function wbk_is_int(n){
	return n % 1 === 0;
}
// since 3.0.8
function wbk_cancel_booking(){
	wbkjQ('#wbk-slots-container, #wbk-time-container, #wbk-booking-form-container').fadeOut( 'fast', function(){
		wbkjQ('#wbk-time-container').html('');
		wbkjQ('#wbk-booking-form-container').html('');
		wbkjQ('#wbk-slots-container').html('');
		if( wbkjQ('#wbk-date').attr('type') == 'text' ){
			wbkjQ('#wbk-date').val(wbkl10n.selectdate);
		} else {
			wbkjQ('#wbk-date').val(0);
		}
		wbkjQ(wbkl10n.scroll_container).animate({
        	scrollTop: wbkjQ('#wbk-date-container').offset().top - wbkl10n.scroll_value
   		}, 1000);
	});
	wbkjQ('#wbk-to-checkout').fadeOut('fast');
}
// clear set date
function wbk_clearSetDate() {
	wbkjQ('#wbk-date-container').html('');
}
// clear timeslots
function wbk_clearTimeslots() {
	wbkjQ('#wbk-slots-container').html('');
}
// clear form
function wbk_clearForm() {
	wbkjQ('#wbk-booking-form-container').html('');
}
// clear results
function wbk_clearDone() {
	wbkjQ('#wbk-booking-done').html('');
	wbkjQ('#wbk-payment').html('');
}
// set service event
function wbk_setServiceEvent() {
	wbkjQ('#wbk-service-id').change(function() {
		wbk_clearSetDate();
		wbk_clearSetTime();
		wbk_clearForm();
		wbk_clearDone();
		wbk_clearTimeslots();
		wbk_clearForm();
		var service_id = wbkjQ('#wbk-service-id').val();
		if ( service_id != 0 ){
			wbk_renderSetDate( true );
			var service_desc = wbkjQ('#wbk-service-id').find('[value="' + service_id + '"]').attr('data-desc');
			if( wbkl10n.show_desc == 'enabled' ){
				wbkjQ( '#wbk_description_holder' ).html( '<label class="wbk-input-label">' + service_desc + '</label>' );
			}
			var multi_limit = wbkjQ('#wbk-service-id').find(':selected').attr('data-multi-limit');
			if( multi_limit == '' ){
 				wbkl10n.multi_limit = wbkl10n.multi_limit_default;
			} else {
 				wbkl10n.multi_limit = multi_limit;
			}
			wbkl10n.multi_low_limit = wbkjQ('#wbk-service-id').find(':selected').attr('data-multi-low-limit');
		} else {
			wbk_clearSetDate();
			wbk_clearSetTime();
		}
	});
}
// clear set time
function wbk_clearSetTime() {
	wbkjQ('#wbk-time-container').html('');
	wbkjQ('#wbk-to-checkout').fadeOut( function(){
		wbkjQ('#wbk-to-checkout').remove();
	});
}
// render time set
function wbk_renderTimeSet() {
	var service = wbkjQ('#wbk-service-id').val();
	var data = {
		'action' : 'wbk-render-days',
		'step' : wbk_total_steps,
 		'service' : service
 	};
	wbkjQ('#wbk-time-container').html('<div class="wbk-loading"></div>');
 	wbkjQ.post( wbkl10n.ajaxurl, data, function(response) {
 		wbkjQ('#wbk-time-container').attr('style', 'display:none !important');
 		if ( response == -1 ){
			wbkjQ('#wbk-time-container').html('error');
 		} else {
			wbkjQ('#wbk-time-container').html(response);
			if( wbkl10n.show_suitable_hours == 'no' ){
				wbk_searchTime();
				return;
			}
 		}
		wbkjQ('#wbk-time-container').fadeIn('slow');
		wbkjQ('#wbk-search_time_btn').focus();
		if( wbkjQ('#wbk-time-container').length > 0 ){
			wbkjQ(wbkl10n.scroll_container).animate({
	        	scrollTop: wbkjQ('#wbk-time-container').offset().top - wbkl10n.scroll_value
	   		}, 1000);
		}
   		wbkjQ( '[id^=wbk-day]' ).change(function() {
			var day = wbkjQ(this).attr('id');
			day = day.substring(8, day.length);
			if( wbkjQ(this).is(':checked') ) {
				wbkjQ('#wbk-time_'+day).attr("disabled", false);
 	        } else {
				wbkjQ('#wbk-time_'+day).attr("disabled", true);
 	        }
		});
   		wbkjQ('#wbk-search_time_btn').click(function() {
			 wbk_searchTime();
		});
	});
}
// render date input
function wbk_renderSetDate( scroll ) {
	var service_name = '';
	if( wbkjQ('#wbk-confirm-services').length > 0 ){
		var selected_service_id = [];
		wbkjQ( '.wbk-service-checkbox:checked').each( function(){
			selected_service_id.push( wbkjQ( this ).val() );
		});
		if( selected_service_id.length == 0 ){
			return;
		}
	} else {
		var selected_service_id = wbkjQ('#wbk-service-id').val();
		if( wbkjQ('#wbk-service-id').attr('type') != 'hidden' ){
			service_name = wbkjQ( '#wbk-service-id option:selected' ).text();
		}
	}
	var offset = new Date().getTimezoneOffset();
	var data = {
		'action' : 'wbk_prepare_service_data',
		'service' : selected_service_id,
		'offset' : offset
 	};

	if( selected_service_id === undefined ) {
		return;
	}
	wbkjQ('#wbk-date-container').html('<div class="wbk-loading"></div>');
    wbkjQ.post( wbkl10n.ajaxurl, data, function(response) {
    	response_obj = wbkjQ.parseJSON( response );
		wbkjQ('#wbk-date-container').css( 'display', 'none');
		var sep_html = '<hr class="wbk-separator"/>';
		if ( wbkjQ('#wbk-service-id').attr('type') == 'hidden' ){
			sep_html = '';
		}
		if( wbkjQ('.wbk_multiserv_hidden_services').length > 0){
			sep_html = '';
		}
		if( wbkl10n.date_input == 'popup' || wbkl10n.date_input == 'classic'  ){
			if ( response_obj.limits != '' ){
				if( wbk_is_int( response_obj.limits  ) ){
					wbkjQ('#wbk-date-container').html('<input value="' +  response_obj.limits  + '" type="hidden" name="wbk-date_submit" class="wbk-input" id="wbk-date" />');
					wbk_clearForm();
	         		wbk_clearDone();
	         		wbk_clearTimeslots();
	         		wbk_clearSetTime();
	    			if( wbkjQ('#wbk-date').val() != 0 ){
		         		if ( wbkl10n.mode == 'extended' ){
		         			wbk_renderTimeSet();
		    			} else {
		  					wbk_searchTime();
		   				}
	    			}
					return;
				}
			}
			var prefil_date = wbk_get_url_parameter('date');
			if( prefil_date != ''){
				prefil_date = 'data-value="' + prefil_date + '"';
			}
			if ( wbkl10n.mode == 'extended' ){
				var date_label =  wbkl10n.selectdatestart;
				date_label = date_label.replace( '#service', service_name  );
				wbkjQ('#wbk-date-container').html( sep_html + '<div class="wbk-col-12-12"><label class="wbk-input-label">' + date_label + '</label><input value="' + wbkl10n.selectdate + '" type="text" class="wbk-input"  ' + prefil_date + ' id="wbk-date" /></div>');
			} else {
				var date_label =  wbkl10n.selectdatestartbasic;
				date_label = date_label.replace( '#service', service_name  );
				wbkjQ('#wbk-date-container').html(  sep_html + '<div class="wbk-col-12-12"><label class="wbk-input-label">' + date_label + '</label><input value="' + wbkl10n.selectdate + '" type="text" ' + prefil_date + ' class="wbk-input" id="wbk-date" /></div>');
		 	}
		 	if( prefil_date != ''){
			 	if ( wbkl10n.mode == 'extended' ){
	 				wbk_clearSetTime();
					wbk_renderTimeSet();
				} else {
					wbk_clearSetTime();
					wbk_searchTime();
				}
			}
		} else {
			if ( wbkl10n.mode == 'extended' ){
				var date_label =  wbkl10n.selectdatestart;
				date_label = date_label.replace( '#service', service_name  );
				wbkjQ('#wbk-date-container').html( sep_html + '<div class="wbk-col-12-12"><label class="wbk-input-label">' + date_label + '</label><select name="wbk-date_submit" class="wbk-input" id="wbk-date" /></select></div>');
			} else {
				var date_label =  wbkl10n.selectdatestartbasic;
				date_label = date_label.replace( '#service', service_name  );
				wbkjQ('#wbk-date-container').html(  sep_html + '<div class="wbk-col-12-12"><label class="wbk-input-label">' + date_label + '</label><select name="wbk-date_submit" class="wbk-input" id="wbk-date" /></select></div>');
		 	}

		}
		wbkjQ('#wbk-date-container').fadeIn('slow');

		if( wbkl10n.date_input == 'popup' || wbkl10n.date_input == 'classic' ){
		 	var disability_result = [];
			disability_result.push(true);
		 	var range_min = undefined;
		 	var range_max = undefined;
			var initial_date = undefined;
			var allowed_timestamps = [];

		    if ( response_obj.disabilities  != '' ){
				var day_disabilities_all = response_obj.disabilities.split(';');
			 	var index;
				for (index = 0; index < day_disabilities_all.length; index++ ) {
			    	var disablity_current_day = day_disabilities_all[index].split(',');
					disability_result.push(disablity_current_day);
					var converte_date = new Date( disablity_current_day[0], disablity_current_day[1], disablity_current_day[2], 0, 0, 0);

					allowed_timestamps.push(converte_date.getTime());
				}
				if( disability_result.length > 1 ){
					initial_date = disability_result[1];
				}
		    }


		    if ( response_obj.limits != '' ){

		    	var date_range =  response_obj.limits.split('-');
		    	range_min = date_range[0].split(',');
		    	range_min[0] = parseInt(range_min[0]);
		    	range_min[1] = parseInt(range_min[1]) - 1;
		    	range_min[2] = parseInt(range_min[2]);

		    	range_max = date_range[1].split(',');
		   		range_max[0] = parseInt(range_max[0]);
		    	range_max[1] = parseInt(range_max[1]) - 1;
		    	range_max[2] = parseInt(range_max[2]);

		    	var range_start = new Date( range_min[0], range_min[1], range_min[2] );
			   	var range_end = new Date( range_max[0], range_max[1], range_max[2] );
				var now = new Date();

				if( range_start < now ){
					range_min[0] = now.getFullYear();
		    		range_min[1] = now.getMonth();
		    		range_min[2] = now.getDate();
				}
			}
			if( wbk_is_ios() ){
				disability_result = response_obj.week_disabilities;
			}

			var date_input = wbkjQ('#wbk-date').pickadate({
					min: true,
				    monthsFull: [ wbkl10n.january,
								  wbkl10n.february,
		  						  wbkl10n.march,
								  wbkl10n.april,
								  wbkl10n.may,
								  wbkl10n.june,
								  wbkl10n.july,
								  wbkl10n.august,
								  wbkl10n.september,
								  wbkl10n.october,
								  wbkl10n.november,
								  wbkl10n.december
		 	    				 ],
				    monthsShort: [ wbkl10n.jan,
								   wbkl10n.feb,
		  						   wbkl10n.mar,
								   wbkl10n.apr,
								   wbkl10n.mays,
								   wbkl10n.jun,
								   wbkl10n.jul,
								   wbkl10n.aug,
								   wbkl10n.sep,
								   wbkl10n.oct,
								   wbkl10n.nov,
								   wbkl10n.dec
				    			 ],
				    weekdaysFull: [ wbkl10n.sunday,
								    wbkl10n.monday,
		  						    wbkl10n.tuesday,
								    wbkl10n.wednesday,
								    wbkl10n.thursday,
								    wbkl10n.friday,
								    wbkl10n.saturday
		  		     			  ],
				    weekdaysShort: [ wbkl10n.sun,
								     wbkl10n.mon,
		  						     wbkl10n.tue,
								     wbkl10n.wed,
								     wbkl10n.thu,
								     wbkl10n.fri,
								     wbkl10n.sat
		  		     			  ],
				    today:  wbkl10n.today,
				    clear:  wbkl10n.clear,
				    close:  wbkl10n.close,
				    firstDay:  wbkl10n.startofweek,
				    format: wbkl10n.picker_format,
				    // disable: disability_result,
				    labelMonthNext: wbkl10n.nextmonth,
				    labelMonthPrev: wbkl10n.prevmonth,
					formatSubmit: 'yyyy/mm/dd',
					hiddenPrefix: 'wbk-date',
					onOpen: function() {
						if( range_min != undefined ){
						    this.set('highlight', range_min );
						} else {
							if( initial_date != undefined ){
								this.set('highlight', initial_date );
							}
						}
					},
					onRender: function() {
						wbkjQ('.picker__day').addClass('picker__day--disabled');
						wbkjQ('.picker__day').each( function(){
							 var current_pick = wbkjQ(this).attr('data-pick');
							 var elem = wbkjQ(this);
							 wbkjQ.each( allowed_timestamps, function( key, value ) {
								 if( value == current_pick ){
									 elem.removeClass('picker__day--disabled');
								 }
	 						 });
						});
					},
					onClose: function(){
					    wbkjQ(document.activeElement).blur();
					},
		         	onSet: function( thingSet ) {
		         		if(typeof thingSet.select != 'undefined'){
		         			if( wbkjQ('#wbk-confirm-services').length > 0 ){
		         				wbk_searchTime();
		         			} else {
			         			if ( wbkl10n.mode == 'extended' ){
			         				wbk_clearSetTime();
				   					wbk_renderTimeSet();
			    				} else {
			    					wbk_clearSetTime();
			    					wbk_searchTime();
			    				}
			    			}
		    			}
		  			}
			});
			if( range_min != undefined ){

				var picker = date_input.pickadate('picker');
				picker.set( 'min', range_min );
				picker.set( 'max', range_max );
			}

			wbkjQ(document).trigger('wbk_picker_initialized');
		} else {
			 if ( response_obj.abilities != '' ){
			 	var options_html = '<option value="0">' + wbkl10n.selectdate + '</option>';
				var day_abilities = response_obj.abilities.split(';');
				wbkjQ.each( day_abilities, function( key, value ) {
					var formated_pair =  value.split( '-HM-');
					options_html += '<option class="' + formated_pair[2] +'" value="' + formated_pair[0] + '" >' + formated_pair[1] + '</option>';

				});
				wbkjQ('#wbk-date').html( options_html );
				wbkjQ('#wbk-date').unbind('change');
				wbkjQ('#wbk-date').change(function() {
					wbk_clearForm();
	         		wbk_clearDone();
	         		wbk_clearTimeslots();
	         		wbk_clearSetTime();
	    			if( wbkjQ('#wbk-date').val() != 0 ){
		         		if ( wbkl10n.mode == 'extended' ){
		         			wbk_renderTimeSet();
		    			} else {
		  					wbk_searchTime();
		   				}
	    			}
				});
			}
		}
		if ( scroll == true ) {
			wbkjQ(wbkl10n.scroll_container).animate({
		       	scrollTop: wbkjQ('#wbk-date-container').offset().top - wbkl10n.scroll_value
		   	}, 1000);
		}

		if( typeof wbk_after_prepare_service_data === 'function' ) {
			wbk_after_prepare_service_data();
		}
		if( typeof wbk_after_prepare_service_data_param === 'function' ) {
			wbk_after_prepare_service_data_param( response );
		}

	});


}

// search time
function wbk_searchTime() {
	wbk_clearForm();
	wbk_clearDone();

	if( wbkjQ('#wbk-confirm-services').length > 0 ){
		days = '';
		times = '';

		var service = [];
		wbkjQ( '.wbk-service-checkbox:checked').each( function(){
			service.push( wbkjQ( this ).val() );
		});

	} else {
		if ( wbkl10n.mode == 'extended' ) {
		    var days = wbkjQ( '.wbk-checkbox:checked' ).map(function() {
		    	return wbkjQ( this ).val();
		    }).get();
		    var times = wbkjQ( '.wbk-time_after:enabled' ).map(function() {
		    	return wbkjQ( this ).val();
		    }).get();
		    if ( days == '' ) {
		    	return;
		    }
		} else {
			days = '';
			times = '';
		}
		var service = wbkjQ('#wbk-service-id').val();
	}


    var date = wbkjQ('[name=wbk-date_submit]').val();
    if ( date == '' ){
    	wbkjQ('#wbk-date').addClass('wbk-input-error');
    	return;
    }
    var offset = new Date().getTimezoneOffset();
	var time_zone_client = Intl.DateTimeFormat().resolvedOptions().timeZone;
	if (typeof(time_zone_client) == "undefined"){
		time_zone_client = '';
	}
    var data = {
		'action' : 'wbk_search_time',
		'days': days,
		'times': times,
		'service': service,
		'date': date,
 		'offset': offset,
		'time_zone_client': time_zone_client
 	};
	wbkjQ.each( wbk_get_converted, function( key, value ) {
		if ( key != 'action' && key != 'time' && key != 'service' && key != 'step' ){
		 	data[key] = value;
			}
	});
	wbkjQ('#wbk-slots-container').html('<div class="wbk-loading"></div>');
    wbkjQ.post( wbkl10n.ajaxurl, data, function(response) {

    	if ( response == 0 || response == -1 || response == -2 || response == -3 || response == -4 || response == -4 || response == -6 || response == -7){
     		wbkjQ('#wbk-slots-container').html('error');
     	} else {
     		response_obj = wbkjQ.parseJSON( response );
     		if( response_obj.dest == 'form' ){
     			wbkjQ('#wbk-slots-container').html('');
     			wbkjQ('#wbk-booking-form-container').html(response_obj.data);
				wbk_set_char_count();
     			wbkjQ('#wbk-book_appointment').click(function() {
			   		wbk_book_processing( response_obj.time, service );
				});
				wbkjQ('.wbk-checkbox-label').not('.wbk-dayofweek-label').click(function() {
				if ( !wbkjQ(this).siblings('.wbk-checkbox').prop('checked') ){
						wbkjQ(this).siblings('.wbk-checkbox').prop('checked',true);
				 		var current_box = wbkjQ(this).siblings('.wbk-checkbox');

				 		var elem_cf_holder =  wbkjQ(this).closest( '.wbk-checkbox-custom');
				 		if( elem_cf_holder.hasClass('wpcf7-exclusive-checkbox') == true){
				 			 elem_cf_holder.find('.wbk-checkbox').not( current_box ).prop('checked',false);
				 		}
					} else {
					 	wbkjQ(this).siblings('.wbk-checkbox').not('.wbk-service-checkbox').prop('checked',false);
					}
				});
				if( typeof wbk_on_form_rendered === 'function' ) {
				   wbk_on_form_rendered( service );
				}
				wbkjQ('.wbk-cancel-button').click(function() {
					wbk_cancel_booking();
				});

     			return;
     		}
     		if( response_obj.dest == 'slot' ){
     			response = response_obj.data;
     		}
    		wbkjQ('#wbk-slots-container').attr('style', 'display:none !important');
			wbkjQ('#wbk-slots-container').html( response );
			wbkjQ('#wbk-slots-container').fadeIn('slow');

			if( wbkjQ('#wbk-date').attr('type') != 'hidden' && wbkjQ('#wbk-service-id').attr('type') != 'hidden' ){
				wbkjQ(wbkl10n.scroll_container).animate({ scrollTop: wbkjQ('#wbk-slots-container').offset().top - wbkl10n.scroll_value }, 1000);
			}
			wbk_setTimeslotEvent();

			if ( wbkl10n.mode == 'extended' ){
				wbkjQ('#wbk-show_more_btn').click(function() {
					wbkjQ('.wbk-cancel-button').fadeOut( function(){
						wbkjQ(this).remove();
					});
					wbk_showMore();
				});
			} else {
				wbkjQ('#wbk-service-id').focus();
			}
			wbkjQ('.wbk-cancel-button').click(function() {
				wbk_cancel_booking();
			});

    	}
    });
}
// search time show more callback
function wbk_showMore() {
	wbkjQ('.wbk-cancel-button').fadeOut( function(){
		wbkjQ( '.wbk-cancel-button' ).remove();
	});
    if( wbkjQ('#wbk-confirm-services').length > 0 ){
		days = '';
		times = '';
		var service = [];
		wbkjQ( '.wbk-service-checkbox:checked').each( function(){
			service.push( wbkjQ( this ).val() );
		});

	} else {
	    var days = wbkjQ( '.wbk-checkbox:checked' ).map(function() {
	    	return wbkjQ( this ).val();
	    }).get();
	    var times = wbkjQ( '.wbk-time_after:enabled' ).map(function() {
	    	return wbkjQ( this ).val();
	    }).get();
	    if ( days == '' ) {
	    	return;
	    }
		var service = wbkjQ('#wbk-service-id').val();
	}
    var date = wbkjQ('#wbk-show-more-start').val();
    var offset = new Date().getTimezoneOffset();
	var time_zone_client = Intl.DateTimeFormat().resolvedOptions().timeZone;
	if (typeof(time_zone_client) == "undefined"){
		time_zone_client = '';
	}
    var data = {
		'action' : 'wbk_search_time',
		'days': days,
		'times': times,
		'service': service,
		'date': date,
		'offset': offset
 	};
	wbkjQ('#wbk-show_more_container').html('<div class="wbk-loading"></div>');
    wbkjQ.post( wbkl10n.ajaxurl, data, function(response) {
    	if (response == 0 || response == -1){
			wbkjQ('#wbk-more-container').html('error');
    	} else {
    		response_obj = wbkjQ.parseJSON( response );
     		if( response_obj.dest == 'slot' ){
     			response = response_obj.data;
     		}
      		wbkjQ('#wbk-show_more_container').remove();
      		wbkjQ(wbkl10n.scroll_container).animate({ scrollTop: wbkjQ('.wbk-more-container').last().offset().top - wbkl10n.scroll_value }, 1000);
			wbkjQ('.wbk-more-container').last().attr('style', 'display:none !important');
			wbkjQ('.wbk-more-container').last().html(response);
			wbkjQ('.wbk-more-container').eq(-2).fadeIn('slow');
			wbk_setTimeslotEvent();
			wbk_do_continious_time_slot( null );

			wbkjQ('.wbk-cancel-button').click(function() {
				wbk_cancel_booking();
			});
			wbkjQ('#wbk-show_more_btn').click(function() {
				wbk_showMore();
			});
   	}
   });
}
// continious time slots processing
function wbk_do_continious_time_slot( elem ){
 	if( wbkjQ( '#wbk-service-id' ).length > 0 ){
		if( wbkjQ('.wbk-slot-active-button').not('#wbk-to-checkout').length == 0 ){
			wbkjQ( '.wbk-slot-button' ).removeClass( 'wbk-slot-disabled-button' );
			wbkjQ( '.wbk-slot-button' ).removeAttr( 'disabled' );
			return;
		}
		var continious_appointments =   wbkl10n.continious_appointments.split( ',' );
		var service_id = wbkjQ( '#wbk-service-id' ).val();
		if( wbkjQ.inArray( service_id, continious_appointments ) != -1 ){
			var i = 0;
			wbkjQ( '.wbk-slot-button' ).each(function() {
				i++;
				wbkjQ(this).attr('data-num', i );
			});
			wbkjQ( '.wbk-slot-button' ).not('.wbk-slot-active-button').addClass('wbk-slot-disabled-button');
			wbkjQ( '.wbk-slot-button' ).not('.wbk-slot-active-button').attr( 'disabled', 'disabled' );
			wbkjQ( '.wbk-slot-active-button' ).each(function() {
				var selected_cnt = wbkjQ('.wbk-slot-active-button').not('#wbk-to-checkout').length;
				if ( wbkl10n.multi_limit != ''    ){
					if( parseInt( wbkl10n.multi_limit ) != parseInt( selected_cnt ) ){
						var curent_num =	wbkjQ(this).attr('data-num');
						var next_num = parseInt( curent_num ) + 1;
						var prev_num = parseInt( curent_num ) - 1;

						wbkjQ("[data-num='"+ next_num +"']").removeClass( 'wbk-slot-disabled-button' );
						wbkjQ("[data-num='"+ prev_num +"']").removeClass( 'wbk-slot-disabled-button' );

						wbkjQ("[data-num='"+ next_num +"']").removeAttr( 'disabled' );
						wbkjQ("[data-num='"+ prev_num +"']").removeAttr( 'disabled' );
					}
				} else {
					var curent_num =	wbkjQ(this).attr('data-num');
					var next_num = parseInt( curent_num ) + 1;
					var prev_num = parseInt( curent_num ) - 1;

					wbkjQ("[data-num='"+ next_num +"']").removeClass( 'wbk-slot-disabled-button' );
					wbkjQ("[data-num='"+ prev_num +"']").removeClass( 'wbk-slot-disabled-button' );

					wbkjQ("[data-num='"+ next_num +"']").removeAttr( 'disabled' );
					wbkjQ("[data-num='"+ prev_num +"']").removeAttr( 'disabled' );
				}
			});
			if( elem !== null ){
				if( !elem.hasClass( 'wbk-slot-active-button' ) ){
					var unselected_slot = elem.attr('data-num');
					wbkjQ( '.wbk-slot-active-button' ).not('#wbk-to-checkout').each(function() {
						var selected_num =  parseInt( wbkjQ(this).attr('data-num') );
						if( parseInt( selected_num ) > parseInt( unselected_slot ) ){
							wbkjQ(this).removeClass( 'wbk-slot-active-button' );
						}
					});
				}
				wbk_do_continious_time_slot( null );
			}
		}
	}

}
function wbk_do_limited_time_slot(){
	var selected_cnt = wbkjQ('.wbk-slot-active-button').not('#wbk-to-checkout').length;
	if( wbkjQ( '#wbk-service-id' ).length > 0 ){
		if ( wbkl10n.multi_limit != '' && parseInt( wbkl10n.multi_limit ) == parseInt( selected_cnt ) ){
			wbkjQ( '.wbk-slot-button' ).not( '.wbk-slot-active-button' ).addClass( 'wbk-slot-disabled-button' );
			wbkjQ( '.wbk-slot-button' ).not( '.wbk-slot-active-button' ).attr( 'disabled', 'disabled' );
		} else {
		 	wbkjQ( '.wbk-slot-button' ).not( '.wbk-slot-active-button' ).removeClass( 'wbk-slot-disabled-button' );
		 	wbkjQ( '.wbk-slot-button' ).not( '.wbk-slot-active-button' ).removeAttr( 'disabled' );
		}
	}
}
// set timeslot button event
function wbk_setTimeslotEvent(){
	wbk_clearDone();
	wbkjQ('[id^=wbk-timeslot-btn_]').unbind('click');
	wbkjQ('[id^=wbk-timeslot-btn_]').click(function() {
		// multi booking mode start
		if( wbkl10n.multi_booking == 'enabled' || wbkl10n.multi_booking == 'enabled_slot' ){


 			wbkjQ('#wbk-booking-form-container').html('');
 			wbkjQ(this).toggleClass('wbk-slot-active-button');
			var selected_cnt = wbkjQ('.wbk-slot-active-button').not('#wbk-to-checkout').length;
			if ( wbkl10n.multi_limit != '' && parseInt( wbkl10n.multi_limit ) < parseInt( selected_cnt ) ){
				wbkjQ(this).toggleClass('wbk-slot-active-button');
				return;
			}
			wbk_do_continious_time_slot( wbkjQ(this) );
			if( wbkl10n.range_selection == 'enabled' ){
				if( selected_cnt == 2 ){
					var start = parseInt( wbkjQ( '.wbk-slot-active-button' ).not('#wbk-to-checkout').first().attr('data-start') );
					var end = parseInt( wbkjQ( '.wbk-slot-active-button' ).not('#wbk-to-checkout').last().attr('data-start') );
					var over_slot = false;
					wbkjQ( '.wbk-slot-button' ).each( function( index, element ){
						var cur = parseInt( wbkjQ(this).attr('data-start') );
						if( cur > start && cur < end ){
							if( wbkjQ(this).hasClass('wbk-slot-booked') ){
								over_slot = true;
							}
						}
					});
					if( !over_slot ){
						wbkjQ( '.wbk-slot-button' ).each( function( index, element ){
							var cur = parseInt( wbkjQ(this).attr('data-start') );
							if( cur > start && cur < end ){
								wbkjQ(this).addClass('wbk-slot-active-button');
							}
						});
					} else {
						wbkjQ(this).toggleClass('wbk-slot-active-button');
					}
				}
				if( selected_cnt > 2 ){
					wbkjQ('.wbk-slot-active-button').not('#wbk-to-checkout').removeClass('wbk-slot-active-button');
					wbkjQ(this).addClass('wbk-slot-active-button');
				}
			}
			if( selected_cnt > 0 ){
				if(  wbkl10n.multi_booking == 'enabled_slot' ){
					wbkjQ('#wbk-to-checkout').remove();
				}
					if( wbkjQ('#wbk-service-id').attr('type') != 'hidden' ){
						var service_name = wbkjQ( '#wbk-service-id option:selected' ).text();
					} else {
						var service_name = '';
					}
					var checkout_label =  wbkl10n.checkout;
					checkout_label = checkout_label.replace( '#service', service_name  );
					if(  wbkl10n.multi_booking  == 'enabled' ){
						var zindex = parseInt( wbk_find_highest_zindex('div') ) + 1;
						if( wbkjQ( '#wbk-to-checkout' ).length == 0 ){
							wbkjQ( 'body' ).prepend( '<div  id="wbk-to-checkout" style="display:none;" class="wbk-slot-active-button" >' + checkout_label + '</div>' );
						}
						wbkjQ('.wbk_multi_selected_count').html(selected_cnt);
 						wbkjQ('.wbk_multi_total_count').html(wbkl10n.multi_limit);
 						wbkjQ('.wbk_multi_low_limit').html(wbkl10n.multi_low_limit);

						wbkjQ('#wbk-to-checkout').css('z-index', zindex);
					}
					if(  wbkl10n.multi_booking  == 'enabled_slot' ){
						wbkjQ( this ).parent().append( '<div  id="wbk-to-checkout" style="display:none;" class="wbk-slot-active-button" >' + checkout_label + '</div>' );
						wbkjQ('.wbk_multi_selected_count').html(selected_cnt);
						wbkjQ('.wbk_multi_total_count').html(wbkl10n.multi_limit);
						wbkjQ('.wbk_multi_low_limit').html(wbkl10n.multi_low_limit);
						wbkjQ( '#wbk-to-checkout' ).css( 'position', 'relative' );
						wbkjQ( '#wbk-to-checkout' ).css( 'margin-top', '5px' );
						var fontsize = wbkjQ( '.wbk-slot-time' ).css('font-size');
						wbkjQ( '#wbk-to-checkout' ).css( 'font-size', fontsize );

					}

				wbkjQ('#wbk-to-checkout').fadeIn('slow');
				wbkjQ('#wbk-to-checkout').unbind('click');
				if ( wbkl10n.multi_low_limit != '' ){
			    	if( parseInt( wbkl10n.multi_low_limit ) > selected_cnt ){
			    		wbkjQ( '#wbk-to-checkout' ).css( 'cursor', 'default' );
			    		wbkjQ( '#wbk-to-checkout' ).addClass( 'wbk_not_active_checkout' );
			    	} else {
			    		wbkjQ( '#wbk-to-checkout' ).css( 'cursor', 'pointer' );
			    		wbkjQ( '#wbk-to-checkout' ).removeClass( 'wbk_not_active_checkout' );
			    	}
			    }
				wbkjQ('#wbk-to-checkout').click(function() {

					if ( wbkl10n.multi_low_limit != '' ){
				    	if( parseInt( wbkl10n.multi_low_limit ) > selected_cnt ){
				    		return
				    	}
				    }
					var times = [];
					var services = [];
					wbkjQ('.wbk-slot-active-button').not('#wbk-to-checkout').each(function() {
						var btn_id = wbkjQ(this).attr('id');
						var time = btn_id.substring(17, btn_id.length);
						times.push(time);
						services.push( wbkjQ(this).attr( 'data-service' ) );
					});
					var service = wbkjQ('#wbk-service-id').val();
					var time_offset = new Date().getTimezoneOffset();
					var time_zone_client = Intl.DateTimeFormat().resolvedOptions().timeZone;
					if (typeof(time_zone_client) == "undefined"){
						time_zone_client = '';
					}
					var data = {
						'action' : 'wbk_render_booking_form',
						'time': times,
						'service': service,
						'step' : wbk_total_steps,
						'services' : services,
                        'time_offset' : time_offset,
						'time_zone_client' : time_zone_client

				 	};
					wbkjQ.each( wbk_get_converted, function( key, value ) {
						if ( key != 'action' && key != 'time' && key != 'service' && key != 'step' ){
						 	data[key] = value;
						}
			 		});

					// begin render booking form for multiple slots **********************************************************************************************
					wbkjQ('.wbk-cancel-button').fadeOut( function(){
						wbkjQ(this).remove();
										});
					wbk_clearDone();
					wbkjQ('#wbk-booking-form-container').html('<div class="wbk-loading"></div>');
					wbkjQ(wbkl10n.scroll_container).animate({ scrollTop: wbkjQ('#wbk-booking-form-container').last().offset().top - wbkl10n.scroll_value }, 1000);

					// request form rendering and binding events   **********************************************************************************************
					wbkjQ.post( wbkl10n.ajaxurl, data, function(response) {
						wbkjQ('#wbk-booking-form-container').attr('style', 'display: none !important;');
				    	if (response == 0 || response == -1){
							wbkjQ('#wbk-booking-form-container').html('error');
				    	} else {
							wbkjQ('#wbk-to-checkout').fadeOut('fast');
							wbkjQ('#wbk-booking-form-container').html(response);

							if( typeof wbk_init_conditional_fields === 'function' ) {
								wbk_init_conditional_fields();
							}
							wbkjQ('.wbk-cancel-button').click(function() {
								wbk_cancel_booking();
							});
				    		if ( wbkl10n.phonemask == 'enabled' ||  wbkl10n.phonemask == 'enabled_mask_plugin' ){
				    			wbkjQ('#wbk-phone').mask(wbkl10n.phoneformat);
				    		}
							wbkjQ('.wbk-checkbox-label').not('.wbk-dayofweek-label').each(function() {
								wbkjQ(this).replaceWith( '<label class="wbk-checkbox-label">' + wbkjQ(this).html() + '</label>' );
							});
							wbkjQ('.wbk-checkbox-label').not('.wbk-dayofweek-label').click(function() {
			 					if ( !wbkjQ(this).siblings('.wbk-checkbox').prop('checked') ){
			 						wbkjQ(this).siblings('.wbk-checkbox').prop('checked',true);
			 				 		var current_box = wbkjQ(this).siblings('.wbk-checkbox');

			 				 		var elem_cf_holder =  wbkjQ(this).closest( '.wbk-checkbox-custom');
			 				 		if( elem_cf_holder.hasClass('wpcf7-exclusive-checkbox') == true){
			 				 			 elem_cf_holder.find('.wbk-checkbox').not( current_box ).prop('checked',false);
			 				 		}
			 					} else {
			 					 	wbkjQ(this).siblings('.wbk-checkbox').not('.wbk-service-checkbox').prop('checked',false);
				 				}
							});
							if( typeof wbk_on_form_rendered === 'function' ) {
							   wbk_on_form_rendered( service );
							}
							wbkjQ('#wbk-booking-form-container').fadeIn('slow');
				    		wbkjQ( 'input, textarea' ).focus(function() {
								wbkjQ( this ).removeClass('wbk-input-error');
                                var field_id = wbkjQ( this ).attr('id');
                                wbkjQ( 'label[for="' + field_id + '"]' ).find('.wbk_error_message').remove();
							});
				    		wbkjQ( '.wbk-select' ).change( function(){
				    			wbkjQ( this ).removeClass('wbk-input-error');
				    		});

				    		// assign book click
							wbk_set_char_count();
				    		wbkjQ('#wbk-book_appointment').click(function() {
								var acceptance_valid = true;
							 	wbkjQ('.wbk-acceptance-error').css('display','none');
								wbkjQ('[name="wbk-acceptance"]').each(function() {
									if( !wbkjQ(this).is(':checked') ) {
										wbkjQ(this).closest('.wpcf7-form-control-wrap').next('.wbk-acceptance-error').css('display', 'inline');
										wbkjQ(this).closest('.wpcf7-form-control-wrap').next('.wbk-acceptance-error').css('color', 'red');
										acceptance_valid = false;
									}
								});
								if( !acceptance_valid ){
									return;
				  				}

								var name = wbkjQ.trim( wbkjQ( '#wbk-name' ).val() );
								var email = wbkjQ.trim( wbkjQ( '#wbk-email' ).val() );

								if( wbkjQ( '[name="wbk-phone-cf7it-national"]').length > 0 ){
									var phone_code = wbkjQ.trim( wbkjQ( '[name="wbk-phone-cf7it-national"]').parent().find('.selected-flag').attr('title') );
									phone_code = phone_code.match(/\d+/)[0];
									var phone = '+' +  phone_code + ' ' +  wbkjQ.trim( wbkjQ( '[name="wbk-phone-cf7it-national"]').val() );
								} else {
									var phone = wbkjQ.trim( wbkjQ( '#wbk-phone' ).val() );

								}
								var desc =  wbkjQ.trim( wbkjQ( '#wbk-comment' ).val() );
								var quantity_length = wbkjQ( '[name="wbk-book-quantity"]' ).length;
								var quantity = -1;
								if ( quantity_length == 0 ){
									quantity = 1;
								} else {
									quantity =  wbkjQ.trim( wbkjQ( '[name="wbk-book-quantity"]' ).val() );
								}
								var error_status = 0;
								if ( !wbkCheckString( name, 1, 128 ) ){
					 				error_status = 1;
				 	 				wbkjQ( '#wbk-name' ).addClass('wbk-input-error');
									wbk_add_error_message( wbkjQ( '#wbk-name' ) );

					 			}
					 			if ( !wbkCheckEmail( email ) ){
					 				error_status = 1;
					 				wbkjQ( '#wbk-email' ).addClass('wbk-input-error');
									wbk_add_error_message( wbkjQ( '#wbk-email' ) );
					 			}
					 			if ( !wbkCheckString( phone, wbkl10n.phone_required, 30 ) ){
					 				error_status = 1;
					 				wbkjQ( '#wbk-phone' ).addClass('wbk-input-error');
									wbk_add_error_message( wbkjQ( '#wbk-phone' ) );
					 			}
					 			if ( !wbkCheckString( desc, 0, 1024 ) ){
					 				error_status = 1;
					 				wbkjQ( '#wbk-comment' ).addClass('wbk-input-error');
									wbk_add_error_message( wbkjQ( '#wbk-comment' ) );
					 			}
					 			if ( !wbkCheckIntegerMinMax( quantity, 1, 1000000 ) ){
 					 				error_status = 1;
					 			}
					 			var current_category = wbkjQ( '#wbk-category-id' ).val();
								if ( !wbkCheckIntegerMinMax( current_category, 1, 1000000 ) ){
									current_category = 0;
								}

					 			// validate custom fields (text)
								wbkjQ('.wbk-text[aria-required="true"]').not('#wbk-phone').each(function() {
									if( wbkjQ(this).closest('.wpcf7cf-hidden').length == 0 ){
										var value =  wbkjQ( this ).val();
										if ( !wbkCheckString( value, 1, 128 ) ){
						 					error_status = 1;
						 					wbkjQ( this ).addClass('wbk-input-error');
											wbk_add_error_message( wbkjQ( this ) );
						 				}
									}
								});
					 			// validate custom fields (select)
								wbkjQ('.wbk-select[aria-required="true"]').each(function() {
									if( wbkjQ(this).closest('.wpcf7cf-hidden').length == 0 ){
									    var value =  wbkjQ( this ).val();
									    var first_value  = wbkjQ(this).find('option:eq(0)').html();
									    if ( value == first_value ){
									    	error_status = 1;
						 					wbkjQ( this ).addClass('wbk-input-error');
											wbk_add_error_message( wbkjQ( this ) );
									    }
									}
								});
					 			// validate custom fields (emails)
								wbkjQ('.wbk-email-custom[aria-required="true"]').each(function() {
									if( wbkjQ(this).closest('.wpcf7cf-hidden').length == 0 ){
									    var value =  wbkjQ( this ).val();
										if ( !wbkCheckEmail( value, 1, 128 ) ){
						 					error_status = 1;
						 					wbkjQ( this ).addClass('wbk-input-error');
											wbk_add_error_message( wbkjQ( this ) );
						 				}
						 			}
								});
								// validate custom fields (textareas)
								wbkjQ('.wbk-textarea[aria-required="true"]').each(function() {
									if( wbkjQ(this).closest('.wpcf7cf-hidden').length == 0 ){
									    var value =  wbkjQ( this ).val();
										if ( !wbkCheckString( value, 1, 1024 ) ){
						 					error_status = 1;
						 					wbkjQ( this ).addClass('wbk-input-error');
											wbk_add_error_message( wbkjQ( this ) );
						 				}
						 			}
								});
								// validate custom fields file inputs
								wbkjQ('.wbk-file[aria-required="true"]').each(function() {
									if( wbkjQ(this).closest('.wpcf7cf-hidden').length == 0 ){
										if ( wbkjQ(this).prop('files').length == 0 ){
											error_status = 1;
											wbkjQ( this ).addClass('wbk-input-error');
											wbk_add_error_message( wbkjQ( this ) );
										}
									}
								});
								// validate checkbox
								wbkjQ('.wbk-checkbox-custom.wpcf7-validates-as-required').each(function() {
									if( wbkjQ(this).closest('.wpcf7cf-hidden').length == 0 ){
										var validbox = false;
										wbkjQ(this).find('.wbk-checkbox-custom').each( function(){
											if ( wbkjQ(this).is(':checked') ){
												validbox = true;
											}
										});
										if( !validbox ){
											wbkjQ(this).find('.wbk-checkbox-label').addClass( 'wbk-input-error' );
											error_status = 1;
										}
									}
								});
								// end validate custom fields
								var extra_value = [];
								// custom fields values (text)
								wbkjQ('.wbk-text, .wbk-email-custom').not('#wbk-name,#wbk-email,#wbk-phone').each(function() {
									if( wbkjQ(this).closest('.wpcf7cf-hidden').length == 0 ){
										var extra_item = [];
										extra_item.push( wbkjQ( this ).attr('id') );
										extra_item.push( wbkjQ('label[for="' + wbkjQ( this ).attr('id') + '"]').html() );
										extra_item.push( wbkjQ( this ).val() );
										extra_value.push( extra_item );
									}
								});
								// custom fields values (checkbox)
								wbkjQ('.wbk-checkbox-custom.wpcf7-checkbox').each(function() {
									if( wbkjQ(this).closest('.wpcf7cf-hidden').length == 0 ){
										var extra_item = [];
										extra_item.push( wbkjQ( this ).attr('id') );
										extra_item.push( wbkjQ('label[for="' + wbkjQ( this ).attr('id') + '"]').html() );
										var current_checkbox_value = '';
										wbkjQ(this).children('span').each(function() {
											wbkjQ(this).children('input:checked').each(function() {
												current_checkbox_value += wbkjQ(this).val() + ' ';
											});
										});

										extra_item.push( current_checkbox_value );
										extra_value.push( extra_item );
									}
								});
								wbkjQ('.wbk-select').not('#wbk-book-quantity, #wbk-service-id').each(function() {
									if( wbkjQ(this).closest('.wpcf7cf-hidden').length == 0 ){
										var extra_item = [];
										extra_item.push( wbkjQ( this ).attr('id') );
										extra_item.push( wbkjQ('label[for="' + wbkjQ( this ).attr('id') + '"]').html() );
										extra_item.push( wbkjQ( this ).val() );
										extra_value.push( extra_item );
									}
								});
								// custom fields text areas
								wbkjQ('.wbk-textarea').not('#wbk-comment,#wbk-customer_desc').each(function() {
									if( wbkjQ(this).closest('.wpcf7cf-hidden').length == 0 ){
										var extra_item = [];
										extra_item.push( wbkjQ( this ).attr('id') );
										extra_item.push( wbkjQ('label[for="' + wbkjQ( this ).attr('id') + '"]').html() );
										extra_item.push( wbkjQ( this ).val() );
										extra_value.push( extra_item );
									}
								});
								// secondary names, emails
								var secondary_data = [];
								wbkjQ('[id^="wbk-secondary-name"]').each(function() {
									var name_p = wbkjQ(this).val();
									var name_id = wbkjQ(this).attr('id');
									if ( wbkCheckString( name, 1, 128 ) ){
										var arr = name_id.split( '_' );
										var id2 = 'wbk-secondary-email_' + arr[1];
										email_p = wbkjQ('#' + id2).val();
										var person = new Object();
										person.name = name_p;
										person.email = email_p;
										secondary_data.push(person);
									}
								});
					 			if ( error_status == 1 ) {
					 				wbkjQ(wbkl10n.scroll_container).animate({ scrollTop: wbkjQ('.wbk-form-separator').last().offset().top - wbkl10n.scroll_value  }, 1000);
					 				return;
					 			}
					 			wbkjQ('#wbk-booking-done').html( '<div class="wbk-loading"></div>');
								wbkjQ('#wbk-booking-form-container').fadeOut('slow', function() {
				    				wbkjQ('#wbk-booking-form-container').html('');
				    				wbkjQ('#wbk-booking-form-container').fadeIn();
									wbkjQ(wbkl10n.scroll_container).animate({
								        							scrollTop: wbkjQ('#wbk-booking-done').offset().top - wbkl10n.scroll_value
								   								}, 1000);
				  				});

								var time_zone_client = Intl.DateTimeFormat().resolvedOptions().timeZone;
								if (typeof(time_zone_client) == "undefined"){
									time_zone_client = '';
								}
								var time_offset = new Date().getTimezoneOffset();
								var form_data = new FormData();
								form_data.append( 'action' , 'wbk_book');
								form_data.append( 'time', times);
								form_data.append( 'service', service);
				 				form_data.append( 'custname', name );
				 				form_data.append( 'email', email);
				 				form_data.append( 'phone', phone);
				 				form_data.append( 'desc', desc);
				 				form_data.append( 'extra', JSON.stringify( extra_value ) );
				 				form_data.append( 'quantity', quantity);
				 				form_data.append( 'secondary_data', JSON.stringify( secondary_data ) );
			 					form_data.append( 'current_category', current_category );
			 					form_data.append( 'time_offset', time_offset );
			 					form_data.append( 'services', services );
								form_data.append( 'time_zone_client', time_zone_client );

			 					var per_serv_quantity = [];
			 					if( wbkjQ('.wbk-book-quantity').length > 0 ){
			 						wbkjQ('.wbk-book-quantity').each(function() {
			 							per_serv_quantity.push( wbkjQ(this).attr( 'data-service' ) + ';' + wbkjQ(this).val() );
			 						});
			 					} else{
			 						var per_serv_quantity = '';
			 					}
			 					form_data.append( 'per_serv_quantity', per_serv_quantity );

								var iteration = 0;
								if( wbkl10n.allow_attachment == 'yes' ){
									wbkjQ('.wbk-file').each( function () {
										iteration++;
										var fileindex = 'file' + iteration;
										form_data.append( fileindex, wbkjQ(this).prop('files')[0] );
									});
								}
				                wbkjQ.ajax({
					    		  	url: wbkl10n.ajaxurl,
						          	type: 'POST',
						          	data: form_data,
						          	cache: false,
						            processData: false,
								    contentType: false,
						        	success: function( response ) {

						        		if ( response != -1 &&
					 						response != -2 &&
					 						response != -3 &&
					 						response != -4 &&
					 						response != -5 &&
					 						response != -6 &&
					 						response != -7 &&
					 						response != -8 &&
					 						response != -9 &&
					 						response != -10 &&
					 						response != -11 &&
					 						response != -12 &&
											response != -13 &&
											response != -14
					 						) {
												response_obj = wbkjQ.parseJSON( response );
							        			if( wbkl10n.auto_add_to_cart == 'disabled' || !response_obj.thanks_message.includes( 'wbk-payment-init-woo' )  ){
													wbkjQ('#wbk-to-checkout').fadeOut('fast');
													wbkjQ('#wbk-booking-done').html( '<div class="wbk-details-sub-title wbk-mb-20">' + response_obj.thanks_message + '</div>' );
													wbkjQ(wbkl10n.scroll_container).animate({
							        							scrollTop: wbkjQ('#wbk-booking-done').offset().top - wbkl10n.scroll_value
							   								}, 1000);
							                        if ( wbkl10n.hide_form == 'enabled' ){
								                        wbkjQ('#wbk-slots-container, #wbk-time-container, #wbk-date-container, #wbk-service-container' ).fadeOut( 'fast', function(){
								                        	wbkjQ('#wbk-slots-container, #wbk-time-container, #wbk-date-container, #wbk-service-container').html('');
								                        	wbkjQ(wbkl10n.scroll_container).animate({
							        							scrollTop: wbkjQ('#wbk-booking-done').offset().top - wbkl10n.scroll_value
							   								}, 1000);
								                        });
							                    	} else {
							                    		wbkjQ('.wbk-slot-active-button').not('#wbk-to-checkout').each(function () {
							                    			timeslots_after_book( wbkjQ( this ), quantity, response_obj.booked_slot_text );
								                    	});
							                    	}
													if( typeof wbk_on_booking === 'function' ) {
													   wbk_on_booking( service, time, name, email, phone, desc, quantity );
													}
													wbk_set_payment_events();
												} else {
													response_obj = wbkjQ.parseJSON( response );
													wbkjQ('#wbk-booking-done').html( '<div class="wbk_hidden wbk-details-sub-title wbk-mb-20">' + response_obj.thanks_message + '</div>' );

													wbk_set_payment_events();
													wbkjQ('.wbk-payment-init-woo').trigger('click');
												}
										} else {
											wbkjQ(wbkl10n.scroll_container).animate({
					        							scrollTop: wbkjQ('#wbk-booking-done').offset().top
					   								}, 1000);

											if( response == '-13' ){
												wbkjQ('#wbk-booking-done').html(wbkl10n.time_slot_booked );
											} else {

												if( response == '-14' ){
													wbkjQ('#wbk-booking-done').html(wbkl10n.limit_per_email_message );
												} else {
													wbkjQ('#wbk-booking-done').html(wbkl10n.something_wrong );
												}
											}
										}
										wbkjQ('#wbk-slots-container').show('slide');
						        	}
				        	 	});
							});
						};
					});



				});
			} else {
				wbkjQ('#wbk-to-checkout').fadeOut('slow');
			}
 			return;
		}
		// multi booking mode end
		// get time from id
		wbkjQ('.wbk-slot-button').removeClass('wbk-slot-active-button');
		wbkjQ(this).addClass('wbk-slot-active-button');
		wbkjQ('.wbk-cancel-button').fadeOut( function(){
			wbkjQ(this).remove();
		});
		wbk_clearDone();
		var btn_id = wbkjQ(this).attr('id');
		var time = btn_id.substring(17, btn_id.length);
		var service = wbkjQ('#wbk-service-id').val();
		var availale_count = wbkjQ(this).attr('data-available');
		var max_available = 0;
		var time_offset = new Date().getTimezoneOffset();
		var time_zone_client = Intl.DateTimeFormat().resolvedOptions().timeZone;
		if (typeof(time_zone_client) == "undefined"){
			time_zone_client = '';
		}
	    var data = {
			'action' : 'wbk_render_booking_form',
			'time': time,
			'service': service,
			'step' : wbk_total_steps,
			'time_offset' : time_offset,
			'time_zone_client' : time_zone_client
	 	};
		wbkjQ.each( wbk_get_converted, function( key, value ) {
			 if ( key != 'action' && key != 'time' && key != 'service' && key != 'step' ){
			 	data[key] = value;
			 }
 		});
		wbkjQ('#wbk-booking-form-container').html('<div class="wbk-loading"></div>');
		wbkjQ(wbkl10n.scroll_container).animate({ scrollTop: wbkjQ('#wbk-booking-form-container').last().offset().top - wbkl10n.scroll_value }, 1000);
	 		 	wbkjQ.post( wbkl10n.ajaxurl, data, function(response) {

			wbkjQ('#wbk-booking-form-container').attr('style', 'display:none !important');
	    	if (response == 0 || response == -1){
				wbkjQ('#wbk-booking-form-container').html('error');
	    	} else {
			wbkjQ('#wbk-booking-form-container').html(response);

			if( typeof wbk_init_conditional_fields === 'function' ) {
				wbk_init_conditional_fields();
			}
			wbkjQ('.wbk-cancel-button').click(function() {
				wbk_cancel_booking();
			});
    		if ( wbkl10n.phonemask == 'enabled' ||  wbkl10n.phonemask == 'enabled_mask_plugin' ){
    			wbkjQ('#wbk-phone').mask(wbkl10n.phoneformat);
    		}
			wbkjQ('.wbk-checkbox-label').not('.wbk-dayofweek-label').each(function() {
				wbkjQ(this).replaceWith( '<label class="wbk-checkbox-label">' + wbkjQ(this).html() + '</label>' );
			});

			wbkjQ('.wbk-checkbox-label').not('.wbk-dayofweek-label').click(function() {
				if ( !wbkjQ(this).siblings('.wbk-checkbox').prop('checked') ){
					wbkjQ(this).siblings('.wbk-checkbox').prop('checked',true);
			 		var current_box = wbkjQ(this).siblings('.wbk-checkbox');

			 		var elem_cf_holder =  wbkjQ(this).closest( '.wbk-checkbox-custom');
			 		if( elem_cf_holder.hasClass('wpcf7-exclusive-checkbox') == true){
			 			 elem_cf_holder.find('.wbk-checkbox').not( current_box ).prop('checked',false);
			 		}
				} else {
				 	wbkjQ(this).siblings('.wbk-checkbox').not('.wbk-service-checkbox').prop('checked',false);
				}
			});
			if( typeof wbk_on_form_rendered === 'function' ) {
			   wbk_on_form_rendered( service );
			}
			wbkjQ('#wbk-booking-form-container').fadeIn('slow');
    		wbkjQ( 'input, textarea' ).focus(function() {
                var field_id = wbkjQ( this ).attr('id');
                wbkjQ( 'label[for="' + field_id + '"]' ).find('.wbk_error_message').remove();
				wbkjQ( this ).removeClass('wbk-input-error');
			});
			wbkjQ( '.wbk-select' ).change( function(){
    			wbkjQ( this ).removeClass('wbk-input-error');
    		});
			wbk_set_char_count();
			wbkjQ('#wbk-book_appointment').click(function() {
			     wbk_book_processing( time, service );
			});


    	}
    });

	});

	wbkjQ(document).trigger('wbk_timeslots_rendered');
}
function __wbk_setTimeslotEvent(){
	wbk_clearDone();
	wbkjQ('[id^=wbk-timeslot-btn_]').unbind('click');
	wbkjQ('[id^=wbk-timeslot-btn_]').click(function() {
		// multi booking mode start
		if( wbkl10n.multi_booking == 'enabled' || wbkl10n.multi_booking == 'enabled_slot' ){


 			wbkjQ('#wbk-booking-form-container').html('');
 			wbkjQ(this).toggleClass('wbk-slot-active-button');
			var selected_cnt = wbkjQ('.wbk-slot-active-button').not('#wbk-to-checkout').length;

			if ( wbkl10n.multi_limit != '' && parseInt( wbkl10n.multi_limit ) < parseInt( selected_cnt ) ){
				wbkjQ(this).toggleClass('wbk-slot-active-button');
				return;
			}
			wbk_do_continious_time_slot( wbkjQ(this) );


			if( selected_cnt > 0 ){
				if(  wbkl10n.multi_booking == 'enabled_slot' ){
					wbkjQ('#wbk-to-checkout').remove();
				}
					if( wbkjQ('#wbk-service-id').attr('type') != 'hidden' ){
						var service_name = wbkjQ( '#wbk-service-id option:selected' ).text();
					} else {
						var service_name = '';
					}
					var checkout_label =  wbkl10n.checkout;
					checkout_label = checkout_label.replace( '#service', service_name  );
					if(  wbkl10n.multi_booking  == 'enabled' ){
						var zindex = parseInt( wbk_find_highest_zindex('div') ) + 1;
						if( wbkjQ( '#wbk-to-checkout' ).length == 0 ){
							wbkjQ( 'body' ).prepend( '<div  id="wbk-to-checkout" style="display:none;" class="wbk-slot-active-button" >' + checkout_label + '</div>' );
						}
						wbkjQ('.wbk_multi_selected_count').html(selected_cnt);
 						wbkjQ('.wbk_multi_total_count').html(wbkl10n.multi_limit);
 						wbkjQ('.wbk_multi_low_limit').html(wbkl10n.multi_low_limit);

						wbkjQ('#wbk-to-checkout').css('z-index', zindex);
					}
					if(  wbkl10n.multi_booking  == 'enabled_slot' ){
						wbkjQ( this ).parent().append( '<div  id="wbk-to-checkout" style="display:none;" class="wbk-slot-active-button" >' + checkout_label + '</div>' );

						wbkjQ('.wbk_multi_selected_count').html(selected_cnt);
						wbkjQ('.wbk_multi_total_count').html(wbkl10n.multi_limit);
						wbkjQ('.wbk_multi_low_limit').html(wbkl10n.multi_low_limit);



						wbkjQ( '#wbk-to-checkout' ).css( 'position', 'relative' );
						wbkjQ( '#wbk-to-checkout' ).css( 'margin-top', '5px' );
						var fontsize = wbkjQ( '.wbk-slot-time' ).css('font-size');
						wbkjQ( '#wbk-to-checkout' ).css( 'font-size', fontsize );

					}

				wbkjQ('#wbk-to-checkout').fadeIn('slow');
				wbkjQ('#wbk-to-checkout').unbind('click');
				if ( wbkl10n.multi_low_limit != '' ){
			    	if( parseInt( wbkl10n.multi_low_limit ) > selected_cnt ){
			    		wbkjQ( '#wbk-to-checkout' ).css( 'cursor', 'default' );
			    		wbkjQ( '#wbk-to-checkout' ).addClass( 'wbk_not_active_checkout' );
			    	} else {
			    		wbkjQ( '#wbk-to-checkout' ).css( 'cursor', 'pointer' );
			    		wbkjQ( '#wbk-to-checkout' ).removeClass( 'wbk_not_active_checkout' );
			    	}
			    }
				wbkjQ('#wbk-to-checkout').click(function() {

					if ( wbkl10n.multi_low_limit != '' ){
				    	if( parseInt( wbkl10n.multi_low_limit ) > selected_cnt ){
				    		return
				    	}
				    }
					var times = [];
					var services = [];
					wbkjQ('.wbk-slot-active-button').not('#wbk-to-checkout').each(function() {
						var btn_id = wbkjQ(this).attr('id');
						var time = btn_id.substring(17, btn_id.length);
						times.push(time);
						services.push( wbkjQ(this).attr( 'data-service' ) );
					});
					var service = wbkjQ('#wbk-service-id').val();
					var time_offset = new Date().getTimezoneOffset();
					var time_zone_client = Intl.DateTimeFormat().resolvedOptions().timeZone;
					if (typeof(time_zone_client) == "undefined"){
						time_zone_client = '';
					}
					var data = {
						'action' : 'wbk_render_booking_form',
						'time': times,
						'service': service,
						'step' : wbk_total_steps,
						'services' : services,
                        'time_offset' : time_offset,
						'time_zone_client' : time_zone_client

				 	};
					wbkjQ.each( wbk_get_converted, function( key, value ) {
						if ( key != 'action' && key != 'time' && key != 'service' && key != 'step' ){
						 	data[key] = value;
						}
			 		});

					// begin render booking form for multiple slots **********************************************************************************************
					wbkjQ('.wbk-cancel-button').fadeOut( function(){
						wbkjQ(this).remove();
										});
					wbk_clearDone();
					wbkjQ('#wbk-booking-form-container').html('<div class="wbk-loading"></div>');
					wbkjQ(wbkl10n.scroll_container).animate({ scrollTop: wbkjQ('#wbk-booking-form-container').last().offset().top - wbkl10n.scroll_value }, 1000);

					// request form rendering and binding events   **********************************************************************************************
					wbkjQ.post( wbkl10n.ajaxurl, data, function(response) {
						wbkjQ('#wbk-booking-form-container').attr('style', 'display: none !important;');
				    	if (response == 0 || response == -1){
							wbkjQ('#wbk-booking-form-container').html('error');
				    	} else {
							wbkjQ('#wbk-to-checkout').fadeOut('fast');
							wbkjQ('#wbk-booking-form-container').html(response);

							if( typeof wbk_init_conditional_fields === 'function' ) {
								wbk_init_conditional_fields();
							}
							wbkjQ('.wbk-cancel-button').click(function() {
								wbk_cancel_booking();
							});
				    		if ( wbkl10n.phonemask == 'enabled' ||  wbkl10n.phonemask == 'enabled_mask_plugin' ){
				    			wbkjQ('#wbk-phone').mask(wbkl10n.phoneformat);
				    		}
							wbkjQ('.wbk-checkbox-label').not('.wbk-dayofweek-label').each(function() {
								wbkjQ(this).replaceWith( '<label class="wbk-checkbox-label">' + wbkjQ(this).html() + '</label>' );
							});
							wbkjQ('.wbk-checkbox-label').not('.wbk-dayofweek-label').click(function() {
			 					if ( !wbkjQ(this).siblings('.wbk-checkbox').prop('checked') ){
			 						wbkjQ(this).siblings('.wbk-checkbox').prop('checked',true);
			 				 		var current_box = wbkjQ(this).siblings('.wbk-checkbox');

			 				 		var elem_cf_holder =  wbkjQ(this).closest( '.wbk-checkbox-custom');
			 				 		if( elem_cf_holder.hasClass('wpcf7-exclusive-checkbox') == true){
			 				 			 elem_cf_holder.find('.wbk-checkbox').not( current_box ).prop('checked',false);
			 				 		}
			 					} else {
			 					 	wbkjQ(this).siblings('.wbk-checkbox').not('.wbk-service-checkbox').prop('checked',false);
				 				}
							});
							wbkjQ('#wbk-booking-form-container').fadeIn('slow');
				    		wbkjQ( 'input, textarea' ).focus(function() {
                                var field_id = wbkjQ( this ).attr('id');
                                wbkjQ( 'label[for="' + field_id + '"]' ).find('.wbk_error_message').remove();
								wbkjQ( this ).removeClass('wbk-input-error');
							});
				    		wbkjQ( '.wbk-select' ).change( function(){
				    			wbkjQ( this ).removeClass('wbk-input-error');
				    		});
							if( typeof wbk_on_form_rendered === 'function' ) {
							   wbk_on_form_rendered( service );
							}
				    		// assign book click
				    		wbk_set_char_count();
				    		wbkjQ('#wbk-book_appointment').click(function() {
								var acceptance_valid = true;
							 	wbkjQ('.wbk-acceptance-error').css('display','none');
								wbkjQ('[name="wbk-acceptance"]').each(function() {
									if( !wbkjQ(this).is(':checked') ) {
										wbkjQ(this).closest('.wpcf7-form-control-wrap').next('.wbk-acceptance-error').css('display', 'inline');
										wbkjQ(this).closest('.wpcf7-form-control-wrap').next('.wbk-acceptance-error').css('color', 'red');
										acceptance_valid = false;
									}
								});
								if( !acceptance_valid ){
									return;
				  				}

								var name = wbkjQ.trim( wbkjQ( '#wbk-name' ).val() );
								var email = wbkjQ.trim( wbkjQ( '#wbk-email' ).val() );

								if( wbkjQ( '[name="wbk-phone-cf7it-national"]').length > 0 ){
									var phone_code = wbkjQ.trim( wbkjQ( '[name="wbk-phone-cf7it-national"]').parent().find('.selected-flag').attr('title') );
									phone_code = phone_code.match(/\d+/)[0];
									var phone = '+' +  phone_code + ' ' +  wbkjQ.trim( wbkjQ( '[name="wbk-phone-cf7it-national"]').val() );
								} else {
									var phone = wbkjQ.trim( wbkjQ( '#wbk-phone' ).val() );

								}
								var desc =  wbkjQ.trim( wbkjQ( '#wbk-comment' ).val() );
								var quantity_length = wbkjQ( '[name="wbk-book-quantity"]' ).length;
								var quantity = -1;
								if ( quantity_length == 0 ){
									quantity = 1;
								} else {
									quantity =  wbkjQ.trim( wbkjQ( '[name="wbk-book-quantity"]' ).val() );
								}
								var error_status = 0;
								if ( !wbkCheckString( name, 1, 128 ) ){
					 				error_status = 1;
				 	 				wbkjQ( '#wbk-name' ).addClass('wbk-input-error');
									wbk_add_error_message( wbkjQ( '#wbk-name' ));


					 			}
					 			if ( !wbkCheckEmail( email ) ){
					 				error_status = 1;
					 				wbkjQ( '#wbk-email' ).addClass('wbk-input-error');
									wbk_add_error_message( wbkjQ( '#wbk-email' ));


					 			}
					 			if ( !wbkCheckString( phone, wbkl10n.phone_required, 30 ) ){
					 				error_status = 1;
					 				wbkjQ( '#wbk-phone' ).addClass('wbk-input-error');
									wbk_add_error_message( wbkjQ( '#wbk-phone' ));


					 			}
					 			if ( !wbkCheckString( desc, 0, 1024 ) ){
					 				error_status = 1;
					 				wbkjQ( '#wbk-comment' ).addClass('wbk-input-error');


					 			}
					 			if ( !wbkCheckIntegerMinMax( quantity, 1, 1000000 ) ){


					 				error_status = 1;
					 			}
					 			var current_category = wbkjQ( '#wbk-category-id' ).val();
								if ( !wbkCheckIntegerMinMax( current_category, 1, 1000000 ) ){
									current_category = 0;
								}

					 			// validate custom fields (text)
								wbkjQ('.wbk-text[aria-required="true"]').not('#wbk-phone').each(function() {
									if( wbkjQ(this).closest('.wpcf7cf-hidden').length == 0 ){
									    var value =  wbkjQ( this ).val();
										if ( !wbkCheckString( value, 1, 128 ) ){
						 					error_status = 1;
						 					wbkjQ( this ).addClass('wbk-input-error');
											wbk_add_error_message( wbkjQ( this ) );
						 				}
									}
								});
					 			// validate custom fields (select)
								wbkjQ('.wbk-select[aria-required="true"]').each(function() {
									if( wbkjQ(this).closest('.wpcf7cf-hidden').length == 0 ){
									    var value =  wbkjQ( this ).val();
									    var first_value  = wbkjQ(this).find('option:eq(0)').html();
									    if ( value == first_value ){
									    	error_status = 1;
						 					wbkjQ( this ).addClass('wbk-input-error');
											wbk_add_error_message( wbkjQ( this ) );
									    }
									}
								});
					 			// validate custom fields (emails)
								wbkjQ('.wbk-email-custom[aria-required="true"]').each(function() {
									if( wbkjQ(this).closest('.wpcf7cf-hidden').length == 0 ){
									    var value =  wbkjQ( this ).val();
										if ( !wbkCheckEmail( value, 1, 128 ) ){
						 					error_status = 1;
						 					wbkjQ( this ).addClass('wbk-input-error');
											wbk_add_error_message( wbkjQ( this ) );
						 				}
						 			}
								});
								// validate custom fields (textareas)
								wbkjQ('.wbk-textarea[aria-required="true"]').each(function() {
									if( wbkjQ(this).closest('.wpcf7cf-hidden').length == 0 ){
									    var value =  wbkjQ( this ).val();
										if ( !wbkCheckString( value, 1, 1024 ) ){
						 					error_status = 1;
						 					wbkjQ( this ).addClass('wbk-input-error');
											wbk_add_error_message( wbkjQ( this ) );
						 				}
						 			}
								});
								// validate custom fields file inputs
								wbkjQ('.wbk-file[aria-required="true"]').each(function() {
									if( wbkjQ(this).closest('.wpcf7cf-hidden').length == 0 ){
										if ( wbkjQ(this).prop('files').length == 0 ){
											error_status = 1;
											wbkjQ( this ).addClass('wbk-input-error');
											wbk_add_error_message( wbkjQ( this ) );
										}
									}
								});
								// validate checkbox
								wbkjQ('.wbk-checkbox-custom.wpcf7-validates-as-required').each(function() {
									if( wbkjQ(this).closest('.wpcf7cf-hidden').length == 0 ){
										var validbox = false;
										wbkjQ(this).find('.wbk-checkbox-custom').each( function(){
											if ( wbkjQ(this).is(':checked') ){
												validbox = true;
											}
										});
										if( !validbox ){
											wbkjQ(this).find('.wbk-checkbox-label').addClass( 'wbk-input-error' );
											error_status = 1;
										}
									}
								});
								// end validate custom fields
								var extra_value = [];
								// custom fields values (text)
								wbkjQ('.wbk-text, .wbk-email-custom').not('#wbk-name,#wbk-email,#wbk-phone').each(function() {
									if( wbkjQ(this).closest('.wpcf7cf-hidden').length == 0 ){
										var extra_item = [];
										extra_item.push( wbkjQ( this ).attr('id') );
										extra_item.push( wbkjQ('label[for="' + wbkjQ( this ).attr('id') + '"]').html() );
										extra_item.push( wbkjQ( this ).val() );
										extra_value.push( extra_item );
									}
								});
								// custom fields values (checkbox)
								wbkjQ('.wbk-checkbox-custom.wpcf7-checkbox').each(function() {
									if( wbkjQ(this).closest('.wpcf7cf-hidden').length == 0 ){
										var extra_item = [];
										extra_item.push( wbkjQ( this ).attr('id') );
										extra_item.push( wbkjQ('label[for="' + wbkjQ( this ).attr('id') + '"]').html() );
										var current_checkbox_value = '';
										wbkjQ(this).children('span').each(function() {
											wbkjQ(this).children('input:checked').each(function() {
												current_checkbox_value += wbkjQ(this).val() + ' ';
											});
										});

										extra_item.push( current_checkbox_value );
										extra_value.push( extra_item );
									}
								});
								wbkjQ('.wbk-select').not('#wbk-book-quantity, #wbk-service-id').each(function() {
									if( wbkjQ(this).closest('.wpcf7cf-hidden').length == 0 ){
										var extra_item = [];
										extra_item.push( wbkjQ( this ).attr('id') );
										extra_item.push( wbkjQ('label[for="' + wbkjQ( this ).attr('id') + '"]').html() );
										extra_item.push( wbkjQ( this ).val() );
										extra_value.push( extra_item );
									}
								});
								// custom fields text areas
								wbkjQ('.wbk-textarea').not('#wbk-comment,#wbk-customer_desc').each(function() {
									if( wbkjQ(this).closest('.wpcf7cf-hidden').length == 0 ){
										var extra_item = [];
										extra_item.push( wbkjQ( this ).attr('id') );
										extra_item.push( wbkjQ('label[for="' + wbkjQ( this ).attr('id') + '"]').html() );
										extra_item.push( wbkjQ( this ).val() );
										extra_value.push( extra_item );
									}
								});
								// secondary names, emails
								var secondary_data = [];
								wbkjQ('[id^="wbk-secondary-name"]').each(function() {
									var name_p = wbkjQ(this).val();
									var name_id = wbkjQ(this).attr('id');
									if ( wbkCheckString( name, 1, 128 ) ){
										var arr = name_id.split( '_' );
										var id2 = 'wbk-secondary-email_' + arr[1];
										email_p = wbkjQ('#' + id2).val();
										var person = new Object();
										person.name = name_p;
										person.email = email_p;
										secondary_data.push(person);
									}
								});
					 			if ( error_status == 1 ) {
					 				wbkjQ(wbkl10n.scroll_container).animate({ scrollTop: wbkjQ('.wbk-form-separator').last().offset().top - wbkl10n.scroll_value }, 1000);
					 				return;
					 			}
					 			wbkjQ('#wbk-booking-done').html( '<div class="wbk-loading"></div>');
								wbkjQ('#wbk-booking-form-container').fadeOut('slow', function() {
				    				wbkjQ('#wbk-booking-form-container').html('');
				    				wbkjQ('#wbk-booking-form-container').fadeIn();
									wbkjQ(wbkl10n.scroll_container).animate({
								        							scrollTop: wbkjQ('#wbk-booking-done').offset().top - wbkl10n.scroll_value
								   								}, 1000);
				  				});
								var time_offset = new Date().getTimezoneOffset();
								var form_data = new FormData();
								form_data.append( 'action' , 'wbk_book');
								form_data.append( 'time', times);
								form_data.append( 'service', service);
				 				form_data.append( 'custname', name );
				 				form_data.append( 'email', email);
				 				form_data.append( 'phone', phone);
				 				form_data.append( 'desc', desc);
				 				form_data.append( 'extra', JSON.stringify( extra_value ) );
				 				form_data.append( 'quantity', quantity);
				 				form_data.append( 'secondary_data', JSON.stringify( secondary_data ) );
			 					form_data.append( 'current_category', current_category );
			 					form_data.append( 'time_offset', time_offset );
			 					form_data.append( 'services', services );
			 					var per_serv_quantity = [];
			 					if( wbkjQ('.wbk-book-quantity').length > 0 ){
			 						wbkjQ('.wbk-book-quantity').each(function() {
			 							per_serv_quantity.push( wbkjQ(this).attr( 'data-service' ) + ';' + wbkjQ(this).val() );
			 						});
			 					} else{
			 						var per_serv_quantity = '';
			 					}
			 					form_data.append( 'per_serv_quantity', per_serv_quantity );

								var iteration = 0;
								if( wbkl10n.allow_attachment == 'yes' ){
									wbkjQ('.wbk-file').each( function () {
										iteration++;
										var fileindex = 'file' + iteration;
										form_data.append( fileindex, wbkjQ(this).prop('files')[0] );
									});
								}
				                wbkjQ.ajax({
					    		  	url: wbkl10n.ajaxurl,
						          	type: 'POST',
						          	data: form_data,
						          	cache: false,
						            processData: false,
								    contentType: false,
						        	success: function( response ) {

						        		if ( response != -1 &&
					 						response != -2 &&
					 						response != -3 &&
					 						response != -4 &&
					 						response != -5 &&
					 						response != -6 &&
					 						response != -7 &&
					 						response != -8 &&
					 						response != -9 &&
					 						response != -10 &&
					 						response != -11 &&
					 						response != -12 &&
											response != -13 &&
											response != -14
					 						) {
												response_obj = wbkjQ.parseJSON( response );
							        			if( wbkl10n.auto_add_to_cart == 'disabled' || !response_obj.thanks_message.includes( 'wbk-payment-init-woo' )  ){
													wbkjQ('#wbk-to-checkout').fadeOut('fast');
													wbkjQ('#wbk-booking-done').html( '<div class="wbk-details-sub-title wbk-mb-20">' + response_obj.thanks_message + '</div>' );
													wbkjQ(wbkl10n.scroll_container).animate({
							        							scrollTop: wbkjQ('#wbk-booking-done').offset().top - wbkl10n.scroll_value
							   								}, 1000);

							                        if ( wbkl10n.hide_form == 'enabled' ){
								                        wbkjQ('#wbk-slots-container, #wbk-time-container, #wbk-date-container, #wbk-service-container' ).fadeOut( 'fast', function(){
								                        	wbkjQ('#wbk-slots-container, #wbk-time-container, #wbk-date-container, #wbk-service-container').html('');
								                        	wbkjQ(wbkl10n.scroll_container).animate({
							        							scrollTop: wbkjQ('#wbk-booking-done').offset().top - wbkl10n.scroll_value
							   								}, 1000);
								                        });
							                    	} else {
							                    		wbkjQ('.wbk-slot-active-button').not('#wbk-to-checkout').each(function () {
							                    			timeslots_after_book( wbkjQ( this ), quantity, response_obj.booked_slot_text );
								                    	});
							                    	}
													if( typeof wbk_on_booking === 'function' ) {
													   wbk_on_booking( service, time, name, email, phone, desc, quantity );
													}
													wbk_set_payment_events();
												} else {
													response_obj = wbkjQ.parseJSON( response );
													wbkjQ('#wbk-booking-done').html( '<div class="wbk_hidden wbk-details-sub-title wbk-mb-20">' + response_obj.thanks_message + '</div>' );
													wbk_set_payment_events();
													wbkjQ('.wbk-payment-init-woo').trigger('click');
												}
										} else {
											wbkjQ(wbkl10n.scroll_container).animate({
					        							scrollTop: wbkjQ('#wbk-booking-done').offset().top
					   								}, 1000);

											if( response == '-13' ){
												wbkjQ('#wbk-booking-done').html(wbkl10n.time_slot_booked );
											} else {

												if( response == '-14' ){
													wbkjQ('#wbk-booking-done').html(wbkl10n.limit_per_email_message );
												} else {
													wbkjQ('#wbk-booking-done').html(wbkl10n.something_wrong );
												}
											}
										}
										wbkjQ('#wbk-slots-container').show('slide');
						        	}
				        	 	});
							});
						};
					});



				});
			} else {
				wbkjQ('#wbk-to-checkout').fadeOut('slow');
			}
 			return;
		}
		// multi booking mode end
		// get time from id
		wbkjQ('.wbk-slot-button').removeClass('wbk-slot-active-button');
		wbkjQ(this).addClass('wbk-slot-active-button');
		wbkjQ('.wbk-cancel-button').fadeOut( function(){
			wbkjQ(this).remove();
		});
		wbk_clearDone();
		var btn_id = wbkjQ(this).attr('id');
		var time = btn_id.substring(17, btn_id.length);
		var service = wbkjQ('#wbk-service-id').val();
		var availale_count = wbkjQ(this).attr('data-available');
		var max_available = 0;
		var time_offset = new Date().getTimezoneOffset();
		var time_zone_client = Intl.DateTimeFormat().resolvedOptions().timeZone;
		if (typeof(time_zone_client) == "undefined"){
			time_zone_client = '';
		}
	    var data = {
			'action' : 'wbk_render_booking_form',
			'time': time,
			'service': service,
			'step' : wbk_total_steps,
			'time_offset' : time_offset,
			'time_zone_client' : time_zone_client

	 	};
		wbkjQ.each( wbk_get_converted, function( key, value ) {
			 if ( key != 'action' && key != 'time' && key != 'service' && key != 'step' ){
			 	data[key] = value;
			 }
 		});
		wbkjQ('#wbk-booking-form-container').html('<div class="wbk-loading"></div>');
		wbkjQ(wbkl10n.scroll_container).animate({ scrollTop: wbkjQ('#wbk-booking-form-container').last().offset().top - wbkl10n.scroll_value }, 1000);
	 		 	wbkjQ.post( wbkl10n.ajaxurl, data, function(response) {

			wbkjQ('#wbk-booking-form-container').attr('style', 'display:none !important');
	    	if (response == 0 || response == -1){
				wbkjQ('#wbk-booking-form-container').html('error');
	    	} else {
			wbkjQ('#wbk-booking-form-container').html(response);

			if( typeof wbk_init_conditional_fields === 'function' ) {
				wbk_init_conditional_fields();
			}
			wbkjQ('.wbk-cancel-button').click(function() {
				wbk_cancel_booking();
			});
    		if ( wbkl10n.phonemask == 'enabled' ||  wbkl10n.phonemask == 'enabled_mask_plugin' ){
			wbkjQ('#wbk-phone').mask(wbkl10n.phoneformat);
    		}
			wbkjQ('.wbk-checkbox-label').not('.wbk-dayofweek-label').each(function() {
				wbkjQ(this).replaceWith( '<label class="wbk-checkbox-label">' + wbkjQ(this).html() + '</label>' );
			});

			wbkjQ('.wbk-checkbox-label').not('.wbk-dayofweek-label').click(function() {
				if ( !wbkjQ(this).siblings('.wbk-checkbox').prop('checked') ){
					wbkjQ(this).siblings('.wbk-checkbox').prop('checked',true);
			 		var current_box = wbkjQ(this).siblings('.wbk-checkbox');

			 		var elem_cf_holder =  wbkjQ(this).closest( '.wbk-checkbox-custom');
			 		if( elem_cf_holder.hasClass('wpcf7-exclusive-checkbox') == true){
			 			 elem_cf_holder.find('.wbk-checkbox').not( current_box ).prop('checked',false);
			 		}
				} else {
				 	wbkjQ(this).siblings('.wbk-checkbox').not('.wbk-service-checkbox').prop('checked',false);
				}
			});
			wbkjQ('#wbk-booking-form-container').fadeIn('slow');
    		wbkjQ( 'input, textarea' ).focus(function() {
                var field_id = wbkjQ( this ).attr('id');
                wbkjQ( 'label[for="' + field_id + '"]' ).find('.wbk_error_message').remove();
				wbkjQ( this ).removeClass('wbk-input-error');
			});
			wbkjQ( '.wbk-select' ).change( function(){
    			wbkjQ( this ).removeClass('wbk-input-error');
    		});
			if( typeof wbk_on_form_rendered === 'function' ) {
			   wbk_on_form_rendered( service );
			}
			wbk_set_char_count();
			wbkjQ('#wbk-book_appointment').click(function() {
			     wbk_book_processing( time, service );
			});


    	}
    });

	});
}
function wbk_cancel_booked_appointment_events(){
	wbkjQ('#wbk-cancel_booked_appointment').click(function() {
		var app_token = wbkjQ(this).attr('data-appointment');
		var email = wbkjQ.trim( wbkjQ( '#wbk-customer_email' ).val() );
		wbkjQ( '#wbk-customer_email' ).val(email);
		if ( !wbkCheckEmail( email ) ){
			wbkjQ( '#wbk-customer_email' ).addClass('wbk-input-error');
	 	} else {
		    var data = {
				'action' : 'wbk_cancel_appointment',
				'app_token':  app_token,
				'email': email
		 	};
		 	wbkjQ('#wbk-cancel-result').html('<div class="wbk-loading"></div>');
			wbkjQ('#wbk-cancel_booked_appointment')
			wbkjQ('#wbk-cancel_booked_appointment').prop('disabled', true);
		 	wbkjQ.post( wbkl10n.ajaxurl, data, function(response) {
		 		response = wbkjQ.parseJSON( response );
		 		wbkjQ('#wbk-cancel-result').html( response.message );
			  	if( response.status == 0 ){
			  		wbkjQ('#wbk-cancel_booked_appointment').prop('disabled', false );
			  	}

		 	});

	 	}
	});
}
function wbk_add_gg_appointment_events(){
	wbkjQ('.wbk-addgg-link').click(function() {
	    window.location.href = wbkjQ(this).attr('data-link');
	});
}
function wbk_set_payment_events(){
	wbkjQ('.wbk-payment-init').click(function() {
	    wbkjQ('#wbk-payment').html('<div class="wbk-loading"></div>');
		wbkjQ(wbkl10n.scroll_container).animate({ scrollTop: wbkjQ('#wbk-payment').last().offset().top - wbkl10n.scroll_value }, 1000);
		var method = wbkjQ(this).attr('data-method');
		var coupon = '';
		if( wbkjQ('#wbk-coupon').length > 0 ){
			coupon = wbkjQ.trim( wbkjQ('#wbk-coupon').val() );
		}
	    var data = {
			'action' : 'wbk_prepare_payment',
			'app_id': wbkjQ(this).attr('data-app-id'),
			'method': method,
			'coupon': coupon
	 	};
	 	wbkjQ.post( wbkl10n.ajaxurl, data, function(response) {
            wbkjQ('#wbk-payment').fadeOut('fast', function(){
            	if( method == 'woocommerce' ){
					response_obj = wbkjQ.parseJSON( response );
					if( response_obj.status == '1' ){
						  window.location.href = response_obj.details;
					} else {
						wbkjQ('#wbk-payment').html( response_obj.details );
						wbkjQ('#wbk-payment').fadeIn('slow');
					}
					return;
				}
			   if( wbkl10n.pp_redirect == 'enabled' && method == 'paypal' && response.indexOf( 'http' ) > -1){
					window.location.href = response;
				} else {
					wbkjQ('#wbk-payment').html(response);
					wbkjQ('#wbk-payment').fadeIn('slow');
					if( method == 'arrival' || method == 'bank' ){
						wbkjQ('.wbk-payment-init').prop('disabled', true);
						wbkjQ('#wbk-coupon').prop('disabled', true);
					}
				}
				if( method == 'paypal' ){
					wbkjQ( '.wbk-approval-link' ).click(function() {
						window.location.href = wbkjQ(this).attr('data-link');
					});
				}
				if( method == 'stripe' ){
					if( response == '-1'){
						wbkjQ('#wbk-payment').html('Unable to initialize Stripe.');
						return;
					}
					if( wbkjQ('.wbk-stripe-approval-button').length == 0 ){
						return;
					}
			 		var height = wbkjQ( '.wbk-input' ).css('height');
			 		var color = wbkjQ( '.wbk-input' ).css('color');

			 		var fontsize = wbkjQ( '.wbk-input' ).css('font-size');
					if( wbkjQ(window).width() <= 800 && wbkl10n.stripe_mob_size != '' ){
						fontsize = wbkl10n.stripe_mob_size;
					}
					var style = {
					  	base: {
					    	lineHeight: height,
					    	color: color,
					    	fontSize:  fontsize
					  	}
					};
					var stripe = Stripe( wbkl10n.stripe_public_key );
					var elements = stripe.elements();
					var stripe_hide_postal = ( wbkl10n.stripe_hide_postal == 'true' );
					var card = elements.create('card', {style: style, hidePostalCode: stripe_hide_postal });
					card.mount('#card-element');
					card.addEventListener('change', function(event) {
						var displayError = document.getElementById('card-errors');
					  	if (event.error) {
					  		if( wbkl10n.override_stripe_error == 'yes' ){
					  			displayError.textContent = wbkl10n.stripe_card_error_message;
					  		} else {
						    	displayError.textContent = event.error.message;
					  		}
					    	wbkjQ('.wbk-stripe-approval-button').prop('disabled', true);
					 	} else {
					    	displayError.textContent = '';
					    	if(wbkjQ( '#wbk-payment').find('.wbk-loading').length == 0 ){
						    	wbkjQ('.wbk-stripe-approval-button').prop('disabled', false);
					    	}
					  	}
					});
					wbkjQ('.wbk-stripe-approval-button').click(function() {
						// addtional fields begin
						var wbk_stripe_fields = {};
						var wbk_stripe_address = {};

						var es = true;
						var details_provided = false;
						wbkjQ( '.wbk-stripe-additional-field' ).each( function(){
							if( wbkjQ( this ).val() == '' ){
								wbkjQ( this ).addClass( 'wbk-input-error' );
								es = false;
							}
							var current_field = wbkjQ( this ).attr( 'data-field' );
							if( current_field == 'name' ){
								wbk_stripe_fields[ current_field ] =  wbkjQ( this ).val()
							} else {
								details_provided = true;
								wbk_stripe_address[ current_field ] = wbkjQ( this ).val()
							}
						})
						if( es == false ){
							return;
						}
						if( details_provided ){
							wbk_stripe_fields['address'] = wbk_stripe_address;
						}

						// addtional field end
						var app_ids = wbkjQ(this).attr('data-app-id');
						var amount = wbkjQ(this).attr('data-amount');
						wbkjQ(this).prop('disabled', true);
						wbkjQ('#wbk-payment').append( '<div class="wbk-loading"></div>' );
						wbkjQ('.wbk_payment_result').remove();

						stripe.createPaymentMethod( 'card', card, { billing_details: wbk_stripe_fields } ).then(function(result) {
						    if (result.error) {
					      		var errorElement = document.getElementById('card-errors');
						     	errorElement.textContent = result.error.message;
						     	wbkjQ('.wbk-stripe-approval-button').prop('disabled', false );
						     	wbkjQ('.wbk-loading').remove();
						    } else {
 						    	var data = {
						    					'action' : 'wbk_stripe_charge',
												'payment_method_id' : result.paymentMethod.id,
												'amount' : amount,
												'app_ids': app_ids
										 	};
								wbkjQ.post( wbkl10n.ajaxurl, data, function( response ){
									response_obj = wbkjQ.parseJSON( response );
									if( response_obj[0] == 1 ){
										wbkjQ('#wbk-payment').find('.wbk-loading').replaceWith( '<span class="wbk_payment_result">' + response_obj[1] + '</span>' );
										if( wbkl10n.stripe_redirect_url == '' ){
								  			wbkjQ('.wbk-payment-init, .wbk-stripe-approval-button').fadeOut( 'fast', function(){
											wbkjQ('.wbk-payment-init, .wbk-stripe-approval-button').remove();
											card.unmount();
										});
										} else {
											window.location.href = unescape( wbkl10n.stripe_redirect_url );
										}
									} else {
										if( response_obj[0] == 2 ){
										// send request again
										stripe.handleCardAction( response_obj[1] ).then(function(result) {
											if (result.error) {
												var errorElement = document.getElementById('card-errors');
												errorElement.textContent = result.error.message;
											    wbkjQ('.wbk-stripe-approval-button').prop('disabled', false );
											    wbkjQ('.wbk-loading').remove();
											} else {
												var data = {	'action' : 'wbk_stripe_charge',
																'payment_intent_id'  : result.paymentIntent.id,
																'app_ids': app_ids,
																'amount' : amount,
														 	};
												wbkjQ.post( wbkl10n.ajaxurl, data, function( response ){
													var response_obj = wbkjQ.parseJSON( response );
													if( response_obj[0] == 1 ){
														wbkjQ('#wbk-payment').find('.wbk-loading').replaceWith( '<span class="wbk_payment_result">' + response_obj[1] + '</span>' );
														if( wbkl10n.stripe_redirect_url == '' ){
												  			wbkjQ('.wbk-payment-init, .wbk-stripe-approval-button').fadeOut( 'fast', function(){
															wbkjQ('.wbk-payment-init, .wbk-stripe-approval-button').remove();
															card.unmount();
														});
														} else {
															window.location.href = unescape( wbkl10n.stripe_redirect_url );
														}
													} else {
														wbkjQ('#wbk-payment').find('.wbk-loading').replaceWith( '<span class="wbk_payment_result">' + response_obj[1] + '</span>' );
														wbkjQ('.wbk-stripe-approval-button').prop('disabled', false );
														wbkjQ('#card-element').fadeIn('fast');
														wbkjQ('#card-element').focus();
													}

												});
											}
										});


									} else {
										wbkjQ('#wbk-payment').find('.wbk-loading').replaceWith( '<span class="wbk_payment_result">' + response_obj[1] + '</span>' );
										wbkjQ('.wbk-stripe-approval-button').prop('disabled', false );
										wbkjQ('#card-element').fadeIn('fast');
										wbkjQ('#card-element').focus();
									}
								}
								});
						    }
						})
					});
				}

            });
	 	});
	});
	if( typeof wbk_after_payment_events_set === 'function' ) {
		wbk_after_payment_events_set();
	}
}
function wbk_find_highest_zindex(elem){
	var elems = document.getElementsByTagName(elem);
	var highest = 0;
	for (var i = 0; i < elems.length; i++)
	{
	var zindex=document.defaultView.getComputedStyle(elems[i],null).getPropertyValue("z-index");
	if ((zindex > highest) && (zindex != 'auto')){
	  highest = zindex;
	}
	}
	return highest;
}
function timeslots_after_book( element, quantity, slot_text ){
	var avail_container_cnt = element.siblings('.wbk-slot-available').length;
	if ( avail_container_cnt >= 1 ){
		// decrease available count
		var current_avail = parseInt( element.siblings('.wbk-slot-available').find('.wbk-abailable-container').html() );
		current_avail = current_avail - quantity;
		if( current_avail == 0 ){
			if( wbkl10n.show_booked == 'disabled' ){
				element.parent().parent().fadeOut( 'fast', function(){
					element.parent().parent().remove();
				});
			} else {
				element.siblings('.wbk-slot-available').find('.wbk-abailable-container').html(current_avail);
				if( wbkl10n.show_prev_booking == 'disabled' ){
					element.replaceWith('<input value="' + slot_text +'" class="wbk-slot-button wbk-slot-booked" type="button">');
				} else {
					element.remove();
				}
			}
		} else {
			element.siblings('.wbk-slot-available').find('.wbk-abailable-container').html(current_avail);
		}
	} else {
		if( wbkl10n.show_booked == 'disabled' ){
			element.parent().fadeOut( 'fast', function(){
				element.parent().remove();
			});
		} else {
			element.replaceWith('<input value="' + slot_text +'" class="wbk-slot-button wbk-slot-booked" type="button">');
		}
	}
}
function wbk_book_processing( time, service ){
	var acceptance_valid = true;
 	wbkjQ('.wbk-acceptance-error').css('display','none');
		wbkjQ('[name="wbk-acceptance"]').each(function() {
		if( !wbkjQ(this).is(':checked') ) {
			wbkjQ(this).closest('.wpcf7-form-control-wrap').next('.wbk-acceptance-error').css('display', 'inline');
			wbkjQ(this).closest('.wpcf7-form-control-wrap').next('.wbk-acceptance-error').css('color', 'red');
			acceptance_valid = false;
		}
	});
	if( !acceptance_valid ){
		return;
	}

	var name = wbkjQ.trim( wbkjQ( '#wbk-name' ).val() );
	var email = wbkjQ.trim( wbkjQ( '#wbk-email' ).val() );

	if( wbkjQ( '[name="wbk-phone-cf7it-national"]').length > 0 ){
		var phone_code = wbkjQ.trim( wbkjQ( '[name="wbk-phone-cf7it-national"]').parent().find('.selected-flag').attr('title') );
		phone_code = phone_code.match(/\d+/)[0];
		var phone = '+' +  phone_code + ' ' +  wbkjQ.trim( wbkjQ( '[name="wbk-phone-cf7it-national"]').val() );
	} else {
		var phone = wbkjQ.trim( wbkjQ( '#wbk-phone' ).val() );
	}
	var desc =  wbkjQ.trim( wbkjQ( '#wbk-comment' ).val() );
	var quantity_length = wbkjQ( '[name="wbk-book-quantity"]' ).length;
	var quantity = -1;
	if ( quantity_length == 0 ){
		quantity = 1;
	} else {
		quantity =  wbkjQ.trim( wbkjQ( '[name="wbk-book-quantity"]' ).val() );
	}
	var error_status = 0;
	if ( !wbkCheckString( name, 1, 128 ) ){
		error_status = 1;
		wbkjQ( '#wbk-name' ).addClass('wbk-input-error');
        wbk_add_error_message( wbkjQ( '#wbk-name' ) );
	}
	if ( !wbkCheckEmail( email ) ){
		error_status = 1;
		wbkjQ( '#wbk-email' ).addClass('wbk-input-error');
        wbk_add_error_message( wbkjQ( '#wbk-email' ) );
	}
	if ( !wbkCheckString( phone, wbkl10n.phone_required, 30 ) ){
		error_status = 1;
		wbkjQ( '#wbk-phone' ).addClass('wbk-input-error');
        wbk_add_error_message( wbkjQ( '#wbk-phone' ) );
	}
	if ( !wbkCheckString( desc, 0, 1024 ) ){
		error_status = 1;
		wbkjQ( '#wbk-comment' ).addClass('wbk-input-error');
        wbk_add_error_message( wbkjQ( '#wbk-comment' ) );
	}
	if ( !wbkCheckIntegerMinMax( quantity, 1, 1000000 ) ){
		error_status = 1;
	}
	var current_category = wbkjQ( '#wbk-category-id' ).val();

	if ( !wbkCheckIntegerMinMax( current_category, 1, 1000000 ) ){
		current_category = 0;
	}
	// validate custom fields (text)
	wbkjQ('.wbk-text[aria-required="true"]').not('#wbk-phone').each(function() {
		if( wbkjQ(this).closest('.wpcf7cf-hidden').length == 0 ){
		    var value =  wbkjQ( this ).val();
			if ( !wbkCheckString( value, 1, 128 ) ){
					error_status = 1;
					wbkjQ( this ).addClass('wbk-input-error');
	                wbk_add_error_message( wbkjQ( this ) );
				}
		}
	});

	// validate custom fields (select)
	wbkjQ('.wbk-select[aria-required="true"]').each(function() {
		if( wbkjQ(this).closest('.wpcf7cf-hidden').length == 0 ){
		    var value =  wbkjQ( this ).val();
		    var first_value  = wbkjQ(this).find('option:eq(0)').html();
		    if ( value == first_value ){
		    	error_status = 1;
				wbkjQ( this ).addClass('wbk-input-error');
	            wbk_add_error_message( wbkjQ( this ) );
	        }
		}
	});
	// validate custom fields (emails)
	wbkjQ('.wbk-email-custom[aria-required="true"]').each(function() {
		if( wbkjQ(this).closest('.wpcf7cf-hidden').length == 0 ){
		    var value =  wbkjQ( this ).val();
			if ( !wbkCheckEmail( value, 1, 128 ) ){
					error_status = 1;
					wbkjQ( this ).addClass('wbk-input-error');
	                wbk_add_error_message( wbkjQ( this ) );
				}
		}
	});
	// validate custom fields (textareas)
	wbkjQ('.wbk-textarea[aria-required="true"]').each(function() {
		if( wbkjQ(this).closest('.wpcf7cf-hidden').length == 0 ){
		    var value =  wbkjQ( this ).val();
			if ( !wbkCheckString( value, 1, 1024 ) ){
				error_status = 1;
				wbkjQ( this ).addClass('wbk-input-error');
	            wbk_add_error_message( wbkjQ( this ) );
			}
		}
	});

	// validate custom fields file inputs
	wbkjQ('.wbk-file[aria-required="true"]').each(function() {
		if( wbkjQ(this).closest('.wpcf7cf-hidden').length == 0 ){
			if ( wbkjQ(this).prop('files').length == 0 ){
				error_status = 1;
				wbkjQ( this ).addClass('wbk-input-error');
	            wbk_add_error_message( wbkjQ( this ) );
			}
		}
	});
	// validate checkbox
	wbkjQ('.wbk-checkbox-custom.wpcf7-validates-as-required').each(function() {
		var validbox = false;
		wbkjQ(this).find('.wbk-checkbox-custom').each( function(){
			if ( wbkjQ(this).is(':checked') ){
				validbox = true;
			}
		});
		if( !validbox ){
			wbkjQ(this).find('.wbk-checkbox-label').addClass( 'wbk-input-error' );
			error_status = 1;
		}
	});

	var extra_value = [];
	// custom fields values (text)
	wbkjQ('.wbk-text, .wbk-email-custom').not('#wbk-name,#wbk-email,#wbk-phone').each(function() {
		if( wbkjQ(this).closest('.wpcf7cf-hidden').length == 0 ){
			var extra_item = [];
			extra_item.push( wbkjQ( this ).attr('id') );
			extra_item.push( wbkjQ('label[for="' + wbkjQ( this ).attr('id') + '"]').html() );
			extra_item.push( wbkjQ( this ).val() );
			extra_value.push( extra_item );
		}
	});
	// custom fields values (checkbox)
	wbkjQ('.wbk-checkbox-custom.wpcf7-checkbox').each(function() {
		if( wbkjQ(this).closest('.wpcf7cf-hidden').length == 0 ){
			var extra_item = [];
			extra_item.push( wbkjQ( this ).attr('id') );
			extra_item.push( wbkjQ('label[for="' + wbkjQ( this ).attr('id') + '"]').html() );
			var current_checkbox_value = '';
			wbkjQ(this).children('span').each(function() {
				wbkjQ(this).children('input:checked').each(function() {
					current_checkbox_value += wbkjQ(this).val() + ' ';
				});
			});
			extra_item.push( current_checkbox_value );
			extra_value.push( extra_item );
		}
	});
	wbkjQ('.wbk-select').not('#wbk-book-quantity, #wbk-service-id').each(function() {
		if( wbkjQ(this).closest('.wpcf7cf-hidden').length == 0 ){
			var extra_item = [];
			extra_item.push( wbkjQ( this ).attr('id') );
			extra_item.push( wbkjQ('label[for="' + wbkjQ( this ).attr('id') + '"]').html() );
			extra_item.push( wbkjQ( this ).val() );
			extra_value.push( extra_item );
		}
	});
	// custom fields text areas
	wbkjQ('.wbk-textarea').not('#wbk-comment,#wbk-customer_desc').each(function() {
		if( wbkjQ(this).closest('.wpcf7cf-hidden').length == 0 ){
			var extra_item = [];
			extra_item.push( wbkjQ( this ).attr('id') );
			extra_item.push( wbkjQ('label[for="' + wbkjQ( this ).attr('id') + '"]').html() );
			extra_item.push( wbkjQ( this ).val() );
			extra_value.push( extra_item );
		}
	});
	// secondary names, emails
	var secondary_data = [];
	wbkjQ('[id^="wbk-secondary-name"]').each(function() {
		var name_p = wbkjQ(this).val();
		var name_id = wbkjQ(this).attr('id');
		if ( wbkCheckString( name_p, 1, 128 ) ){
			var arr = name_id.split( '_' );
			var id2 = 'wbk-secondary-email_' + arr[1];
			email_p = wbkjQ('#' + id2).val();
			var person = new Object();
			person.name = name_p;
			person.email = email_p;
			secondary_data.push(person);
		}


	});


	if ( error_status == 1 ) {
		wbkjQ(wbkl10n.scroll_container).animate({ scrollTop: wbkjQ('.wbk-form-separator').last().offset().top - wbkl10n.scroll_value }, 1000);
		return;
	}
	wbkjQ('#wbk-booking-done').html( '<div class="wbk-loading"></div>');
	wbkjQ('#wbk-booking-form-container').fadeOut('slow', function() {
		wbkjQ('#wbk-booking-form-container').html('');
		wbkjQ('#wbk-booking-form-container').fadeIn();
		wbkjQ(wbkl10n.scroll_container).animate({
	        							scrollTop: wbkjQ('#wbk-booking-done').offset().top - wbkl10n.scroll_value
	   								}, 1000);
	});
	var form_data = new FormData();
	var time_offset = new Date().getTimezoneOffset();

	extra_value = JSON.stringify( extra_value );
	form_data.append( 'action' , 'wbk_book');
	form_data.append( 'time', time );
	form_data.append( 'service', service);
	form_data.append( 'custname', name);
	form_data.append( 'email', email);
	form_data.append( 'phone', phone);
	form_data.append( 'desc', desc);
	form_data.append( 'extra', extra_value );
	form_data.append( 'quantity', quantity);
	form_data.append( 'secondary_data', JSON.stringify( secondary_data ) );
	form_data.append( 'current_category', current_category );
	form_data.append( 'time_offset', time_offset );

	wbk_cstuomer_email_on_from = email;

	var iteration = 0;
	if( wbkl10n.allow_attachment == 'yes' ){
		wbkjQ('.wbk-file').each( function () {
			iteration++;
			var fileindex = 'file' + iteration;
			form_data.append( fileindex, wbkjQ(this).prop('files')[0] );
		});
	}

    wbkjQ.ajax({
	  	url: wbkl10n.ajaxurl,
      	type: 'POST',
      	data: form_data,
      	cache: false,
        processData: false,
	    contentType: false,
    	success: function( response ) {
    		if ( response != -1 &&
					response != -2 &&
					response != -3 &&
					response != -4 &&
					response != -5 &&
					response != -6 &&
					response != -7 &&
					response != -8 &&
					response != -9 &&
					response != -10 &&
					response != -11 &&
					response != -12 &&
					response != -13 &&
					response != -14
					) {
					wbkjQ('#wbk-to-checkout').fadeOut('fast');
					response_obj = wbkjQ.parseJSON( response );
					if( wbkl10n.auto_add_to_cart == 'disabled' || !response_obj.thanks_message.includes( 'wbk-payment-init-woo' ) ){
						wbkjQ('#wbk-booking-done').html( '<div class="wbk-details-sub-title wbk-mb-20">' + response_obj.thanks_message + '</div>' );
						wbkjQ(wbkl10n.scroll_container).animate({
							        							scrollTop: wbkjQ('#wbk-booking-done').offset().top - wbkl10n.scroll_value
							   								}, 1000);
	                    if ( wbkl10n.hide_form == 'enabled' ){
	                        wbkjQ('#wbk-slots-container, #wbk-time-container, #wbk-date-container, #wbk-service-container' ).fadeOut( 'fast', function(){
	                        	wbkjQ('#wbk-slots-container, #wbk-time-container, #wbk-date-container, #wbk-service-container').html('');
	                        	wbkjQ(wbkl10n.scroll_container).animate({
	    							scrollTop: wbkjQ('#wbk-booking-done').offset().top - wbkl10n.scroll_value
									}, 1000);
	                        });
	                	} else {
	                		wbkjQ('.wbk-slot-active-button').not('#wbk-to-checkout').each(function () {
	                			timeslots_after_book( wbkjQ( this ), quantity, response_obj.booked_slot_text );
	                    	});
	                	}
						if( typeof wbk_on_booking === 'function' ) {
						   wbk_on_booking( service, time, name, email, phone, desc, quantity );
						}
						wbk_set_payment_events();
					} else {
						wbkjQ('#wbk-booking-done').html( '<div class="wbk_hidden wbk-details-sub-title wbk-mb-20">' + response_obj.thanks_message + '</div>' );
						wbkjQ(wbkl10n.scroll_container).animate({
							        							scrollTop: wbkjQ('#wbk-booking-done').offset().top - wbkl10n.scroll_value
							   								}, 1000);
						wbk_set_payment_events();
						wbkjQ('.wbk-payment-init-woo').trigger('click');
					}

			} else {
				wbkjQ(wbkl10n.scroll_container).animate({
							scrollTop: wbkjQ('#wbk-booking-done').offset().top
							}, 1000);
					if( response == '-13' ){
						wbkjQ('#wbk-booking-done').html(wbkl10n.time_slot_booked );
					} else {

						if( response == '-14' ){
							wbkjQ('#wbk-booking-done').html(wbkl10n.limit_per_email_message );
						} else {
							wbkjQ('#wbk-booking-done').html(wbkl10n.something_wrong );
						}
					}
			}
			wbkjQ('#wbk-slots-container').show('slide');
    	}
 	});

}

function wbk_get_url_parameter(sParam){
   var sPageURL = window.location.search.substring(1);
   var sURLVariables = sPageURL.split('&');
   for (var i = 0; i < sURLVariables.length; i++){
 	   var sParameterName = sURLVariables[i].split('=');
       if (sParameterName[0] == sParam){
            return sParameterName[1];
       }
   }
   return '';
}
function wbk_add_error_message( elem ){
	if( wbkl10n.field_required == '' ){
		return;
	}
	var field_id = elem.attr('id');
	wbkjQ( 'label[for="' + field_id + '"]' ).find('.wbk_error_message').remove();
	wbkjQ( 'label[for="' + field_id + '"]' ).append(' <span class="wbk_error_message">' + wbkl10n.field_required + '</span>' );
}

function wbk_set_char_count(){
	wbkjQ( '.wpcf7-character-count' ).each( function() {
		var $count = wbkjQ( this );
		var name = $count.attr( 'data-target-name' );
		var down = $count.hasClass( 'down' );
		var starting = parseInt( $count.attr( 'data-starting-value' ), 10 );
		var maximum = parseInt( $count.attr( 'data-maximum-value' ), 10 );
		var minimum = parseInt( $count.attr( 'data-minimum-value' ), 10 );

		var updateCount = function( target ) {
			var $target = wbkjQ( target );
			var length = $target.val().length;
			var count = down ? starting - length : length;
			$count.attr( 'data-current-value', count );
			$count.text( count );

			if ( maximum && maximum < length ) {
				$count.addClass( 'too-long' );
			} else {
				$count.removeClass( 'too-long' );
			}

			if ( minimum && length < minimum ) {
				$count.addClass( 'too-short' );
			} else {
				$count.removeClass( 'too-short' );
			}
		};

		wbkjQ( ':input[name="' + name + '"]' ).each( function() {
			updateCount( this );

			wbkjQ( this ).keyup( function() {
				updateCount( this );
			});
		});
	});
}

function wbk_is_ios() {
	return [
	'iPad Simulator',
	'iPhone Simulator',
	'iPod Simulator',
	'iPad',
	'iPhone',
	'iPod'
	].includes(navigator.platform)
	|| (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}
