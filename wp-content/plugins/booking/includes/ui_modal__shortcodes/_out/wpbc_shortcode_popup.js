"use strict";

/**
 * Shortcode Config - Main Loop
 */
function wpbc_set_shortcode() {
  var wpbc_shortcode = '[';
  var shortcode_id = jQuery('#wpbc_shortcode_type').val().trim(); // -----------------------------------------------------------------------------------------------------------------
  // [booking]  | [bookingcalendar] | ...
  // -----------------------------------------------------------------------------------------------------

  if ('booking' === shortcode_id || 'bookingcalendar' === shortcode_id || 'bookingselect' === shortcode_id || 'bookingtimeline' === shortcode_id || 'bookingform' === shortcode_id || 'bookingsearch' === shortcode_id || 'bookingother' === shortcode_id || 'booking_import_ics' === shortcode_id || 'booking_listing_ics' === shortcode_id) {
    wpbc_shortcode += shortcode_id;
    var wpbc_options_arr = []; // -------------------------------------------------------------------------------------------------------------
    // [bookingselect] | [bookingtimeline] - Options relative only to this shortcode.
    // -------------------------------------------------------------------------------------------------------------

    if ('bookingselect' === shortcode_id || 'bookingtimeline' === shortcode_id) {
      // [bookingselect type='1,2,3'] - Multiple Resources
      if (jQuery('#' + shortcode_id + '_wpbc_multiple_resources').length > 0) {
        var multiple_resources = jQuery('#' + shortcode_id + '_wpbc_multiple_resources').val();

        if (multiple_resources != null && multiple_resources.length > 0) {
          // Remove empty spaces from  array : '' | "" | 0
          multiple_resources = multiple_resources.filter(function (n) {
            return parseInt(n);
          });
          multiple_resources = multiple_resources.join(',').trim();

          if (multiple_resources != 0) {
            wpbc_shortcode += ' type=\'' + multiple_resources + '\'';
          }
        }
      } // [bookingselect selected_type=1] - Selected Resource


      if (jQuery('#' + shortcode_id + '_wpbc_selected_resource').length > 0) {
        if (jQuery('#' + shortcode_id + '_wpbc_selected_resource').val() !== null //FixIn: 8.2.1.12
        && parseInt(jQuery('#' + shortcode_id + '_wpbc_selected_resource').val()) > 0) {
          wpbc_shortcode += ' selected_type=' + jQuery('#' + shortcode_id + '_wpbc_selected_resource').val().trim();
        }
      } // [bookingselect label='Tada'] - Label


      if (jQuery('#' + shortcode_id + '_wpbc_text_label').length > 0) {
        if ('' !== jQuery('#' + shortcode_id + '_wpbc_text_label').val().trim()) {
          wpbc_shortcode += ' label=\'' + jQuery('#' + shortcode_id + '_wpbc_text_label').val().trim().replace(/'/gi, '') + '\'';
        }
      } // [bookingselect first_option_title='Tada'] - First  Option


      if (jQuery('#' + shortcode_id + '_wpbc_first_option_title').length > 0) {
        if ('' !== jQuery('#' + shortcode_id + '_wpbc_first_option_title').val().trim()) {
          wpbc_shortcode += ' first_option_title=\'' + jQuery('#' + shortcode_id + '_wpbc_first_option_title').val().trim().replace(/'/gi, '') + '\'';
        }
      }
    } // -------------------------------------------------------------------------------------------------------------
    // [bookingtimeline] - Options relative only to this shortcode.
    // -------------------------------------------------------------------------------------------------------------


    if ('bookingtimeline' === shortcode_id) {
      // Visually update
      var wpbc_is_matrix__view_days_num_temp = wpbc_shortcode_config__update_elements_in_timeline();
      var wpbc_is_matrix = wpbc_is_matrix__view_days_num_temp[0];
      var view_days_num_temp = wpbc_is_matrix__view_days_num_temp[1]; // : view_days_num

      if (view_days_num_temp != 30) {
        wpbc_shortcode += ' view_days_num=' + view_days_num_temp;
      } // : header_title


      if (jQuery('#' + shortcode_id + '_wpbc_text_label_timeline').length > 0) {
        var header_title_temp = jQuery('#' + shortcode_id + '_wpbc_text_label_timeline').val().trim();
        header_title_temp = header_title_temp.replace(/'/gi, '');

        if (header_title_temp != '') {
          wpbc_shortcode += ' header_title=\'' + header_title_temp + '\'';
        }
      } // : scroll_month


      if (jQuery('#' + shortcode_id + '_wpbc_scroll_timeline_scroll_month').is(':visible') && jQuery('#' + shortcode_id + '_wpbc_scroll_timeline_scroll_month').length > 0 && parseInt(jQuery('#' + shortcode_id + '_wpbc_scroll_timeline_scroll_month').val().trim()) !== 0) {
        wpbc_shortcode += ' scroll_month=' + parseInt(jQuery('#' + shortcode_id + '_wpbc_scroll_timeline_scroll_month').val().trim());
      } // : scroll_day


      if (jQuery('#' + shortcode_id + '_wpbc_scroll_timeline_scroll_days').is(':visible') && jQuery('#' + shortcode_id + '_wpbc_scroll_timeline_scroll_days').length > 0 && parseInt(jQuery('#' + shortcode_id + '_wpbc_scroll_timeline_scroll_days').val().trim()) !== 0) {
        wpbc_shortcode += ' scroll_day=' + parseInt(jQuery('#' + shortcode_id + '_wpbc_scroll_timeline_scroll_days').val().trim());
      } // :limit_hours
      //FixIn: 7.0.1.17


      jQuery('.bookingtimeline_view_times').hide();

      if (wpbc_is_matrix && view_days_num_temp == 1 || !wpbc_is_matrix && view_days_num_temp == 30) {
        jQuery('.bookingtimeline_view_times').show();
        var view_times_start_temp = parseInt(jQuery('#bookingtimeline_wpbc_start_end_time_timeline_starttime').val().trim());
        var view_times_end_temp = parseInt(jQuery('#bookingtimeline_wpbc_start_end_time_timeline_endtime').val().trim());

        if (view_times_start_temp != 0 || view_times_end_temp != 24) {
          wpbc_shortcode += ' limit_hours=\'' + view_times_start_temp + ',' + view_times_end_temp + '\'';
        }
      } // :scroll_start_date


      if (jQuery('#bookingtimeline_wpbc_start_date_timeline_active').is(':checked') && jQuery('#bookingtimeline_wpbc_start_date_timeline_active').length > 0) {
        wpbc_shortcode += ' scroll_start_date=\'' + jQuery('#bookingtimeline_wpbc_start_date_timeline_year').val().trim() + '-' + jQuery('#bookingtimeline_wpbc_start_date_timeline_month').val().trim() + '-' + jQuery('#bookingtimeline_wpbc_start_date_timeline_day').val().trim() + '\'';
      }
    } // -------------------------------------------------------------------------------------------------------------
    // [bookingform  ] - Form Only        -     [bookingform type=1 selected_dates='01.03.2024']
    // -------------------------------------------------------------------------------------------------------------


    if ('bookingform' === shortcode_id) {
      var wpbc_selected_day = jQuery('#' + shortcode_id + '_wpbc_booking_date_day').val().trim();

      if (parseInt(wpbc_selected_day) < 10) {
        wpbc_selected_day = '0' + wpbc_selected_day;
      }

      var wpbc_selected_month = jQuery('#' + shortcode_id + '_wpbc_booking_date_month').val().trim();

      if (parseInt(wpbc_selected_month) < 10) {
        wpbc_selected_month = '0' + wpbc_selected_month;
      }

      wpbc_shortcode += ' selected_dates=\'' + wpbc_selected_day + '.' + wpbc_selected_month + '.' + jQuery('#' + shortcode_id + '_wpbc_booking_date_year').val().trim() + '\'';
    } // -------------------------------------------------------------------------------------------------------------
    // [bookingsearch  ] - Options relative only to this shortcode.     [bookingsearch searchresultstitle='{searchresults} Result(s) Found' noresultstitle='Nothing Found']
    // -------------------------------------------------------------------------------------------------------------


    if ('bookingsearch' === shortcode_id) {
      // Check  if we selected 'bookingsearch' | 'bookingsearchresults'
      var wpbc_search_form_results = 'bookingsearch';

      if (jQuery("input[name='bookingsearch_wpbc_search_form_results']:checked").length > 0) {
        wpbc_search_form_results = jQuery("input[name='bookingsearch_wpbc_search_form_results']:checked").val().trim();
      } // Show | Hide form  fields for 'bookingsearch' depends from  radio  bution  selection


      if ('bookingsearchresults' === wpbc_search_form_results) {
        wpbc_shortcode = '[bookingsearchresults';
        jQuery('.wpbc_search_availability_form').hide();
      } else {
        jQuery('.wpbc_search_availability_form').show(); // New page for search results

        if (jQuery('#' + shortcode_id + '_wpbc_search_new_page_enabled').length > 0 && jQuery('#' + shortcode_id + '_wpbc_search_new_page_enabled').is(':checked')) {
          // Show
          jQuery('.' + shortcode_id + '_wpbc_search_new_page_wpbc_sc_searchresults_new_page').show(); // : Search Results URL

          if (jQuery('#' + shortcode_id + '_wpbc_search_new_page_url').length > 0) {
            var search_results_url_temp = jQuery('#' + shortcode_id + '_wpbc_search_new_page_url').val().trim();
            search_results_url_temp = search_results_url_temp.replace(/'/gi, '');

            if (search_results_url_temp != '') {
              wpbc_shortcode += ' searchresults=\'' + search_results_url_temp + '\'';
            }
          }
        } else {
          // Hide
          jQuery('.' + shortcode_id + '_wpbc_search_new_page_wpbc_sc_searchresults_new_page').hide();
        }
        /*              //FixIn: 10.0.0.41
                        // : Search Header
                        if ( jQuery( '#' + shortcode_id + '_wpbc_search_header' ).length > 0 ){
                            var search_header_temp = jQuery( '#' + shortcode_id + '_wpbc_search_header' ).val().trim();
                            search_header_temp = search_header_temp.replace( /'/gi, '' );
                            if ( search_header_temp != '' ){
                                wpbc_shortcode += ' searchresultstitle=\'' + search_header_temp + '\'';
                            }
                        }
                        // : Nothing Found
                        if ( jQuery( '#' + shortcode_id + '_wpbc_search_nothing_found' ).length > 0 ){
                            var nothingfound_temp = jQuery( '#' + shortcode_id + '_wpbc_search_nothing_found' ).val().trim();
                            nothingfound_temp = nothingfound_temp.replace( /'/gi, '' );
                            if ( nothingfound_temp != '' ){
                                wpbc_shortcode += ' noresultstitle=\'' + nothingfound_temp + '\'';
                            }
                        }
        */
        // : Users      // [bookingsearch searchresultstitle='{searchresults} Result(s) Found' noresultstitle='Nothing Found' users='3,4543,']


        if (jQuery('#' + shortcode_id + '_wpbc_search_for_users').length > 0) {
          var only_for_users_temp = jQuery('#' + shortcode_id + '_wpbc_search_for_users').val().trim();
          only_for_users_temp = only_for_users_temp.replace(/'/gi, '');

          if (only_for_users_temp != '') {
            wpbc_shortcode += ' users=\'' + only_for_users_temp + '\'';
          }
        }
      }
    } // -------------------------------------------------------------------------------------------------------------
    // [bookingedit] , [bookingcustomerlisting] , [bookingresource type=6 show='capacity'] , [booking_confirm]
    // -------------------------------------------------------------------------------------------------------------


    if ('bookingother' === shortcode_id) {
      //TRICK:
      shortcode_id = 'no'; //required for not update booking resource ID
      // Check  if we selected 'bookingsearch' | 'bookingsearchresults'

      var bookingother_shortcode_type = 'bookingsearch';

      if (jQuery("input[name='bookingother_wpbc_shortcode_type']:checked").length > 0) {
        bookingother_shortcode_type = jQuery("input[name='bookingother_wpbc_shortcode_type']:checked").val().trim();
      } // Show | Hide sections


      if ('booking_confirm' === bookingother_shortcode_type) {
        wpbc_shortcode = '[booking_confirm';
        jQuery('.bookingother_section_additional').hide();
        jQuery('.bookingother_section_' + bookingother_shortcode_type).show();
      }

      if ('bookingedit' === bookingother_shortcode_type) {
        wpbc_shortcode = '[bookingedit';
        jQuery('.bookingother_section_additional').hide();
        jQuery('.bookingother_section_' + bookingother_shortcode_type).show();
      }

      if ('bookingcustomerlisting' === bookingother_shortcode_type) {
        wpbc_shortcode = '[bookingcustomerlisting';
        jQuery('.bookingother_section_additional').hide();
        jQuery('.bookingother_section_' + bookingother_shortcode_type).show();
      }

      if ('bookingresource' === bookingother_shortcode_type) {
        //TRICK:
        shortcode_id = 'bookingother'; //required to force update booking resource ID

        wpbc_shortcode = '[bookingresource';
        jQuery('.bookingother_section_additional').hide();
        jQuery('.bookingother_section_' + bookingother_shortcode_type).show();

        if (jQuery('#bookingother_wpbc_resource_show').val().trim() != 'title') {
          wpbc_shortcode += ' show=\'' + jQuery('#bookingother_wpbc_resource_show').val().trim() + '\'';
        }
      }
    } // [booking-manager-import ...]     ||      [booking-manager-listing ...]


    if ('booking_import_ics' === shortcode_id || 'booking_listing_ics' === shortcode_id) {
      wpbc_shortcode = '[booking-manager-import';

      if ('booking_listing_ics' === shortcode_id) {
        wpbc_shortcode = '[booking-manager-listing';
      } ////////////////////////////////////////////////////////////////
      // : .ics feed URL
      ////////////////////////////////////////////////////////////////


      var shortcode_url_temp = '';

      if (jQuery('#' + shortcode_id + '_wpbc_url').length > 0) {
        shortcode_url_temp = jQuery('#' + shortcode_id + '_wpbc_url').val().trim();
        shortcode_url_temp = shortcode_url_temp.replace(/'/gi, '');

        if (shortcode_url_temp != '') {
          wpbc_shortcode += ' url=\'' + shortcode_url_temp + '\'';
        }
      }

      if (shortcode_url_temp == '') {
        // Error:
        wpbc_shortcode = '[ URL is required ';
      } else {
        // VALID:
        ////////////////////////////////////////////////////////////////
        // [... from='' 'from_offset=''  ...]
        ////////////////////////////////////////////////////////////////
        if (jQuery('#' + shortcode_id + '_from').length > 0) {
          var p_from = jQuery('#' + shortcode_id + '_from').val().trim();
          var p_from_offset = jQuery('#' + shortcode_id + '_from_offset').val().trim();
          p_from = p_from.replace(/'/gi, '');
          p_from_offset = p_from_offset.replace(/'/gi, '');

          if ('' != p_from && 'date' != p_from) {
            // Offset
            wpbc_shortcode += ' from=\'' + p_from + '\'';

            if ('any' != p_from && '' != p_from_offset) {
              p_from_offset = parseInt(p_from_offset);

              if (!isNaN(p_from_offset)) {
                wpbc_shortcode += ' from_offset=\'' + p_from_offset + jQuery('#' + shortcode_id + '_from_offset_type').val().trim().charAt(0) + '\'';
              }
            }
          } else if (p_from == 'date' && p_from_offset != '') {
            // If selected Date
            wpbc_shortcode += ' from=\'' + p_from_offset + '\'';
          }
        } ////////////////////////////////////////////////////////////////
        // [... until='' 'until_offset=''  ...]
        ////////////////////////////////////////////////////////////////


        if (jQuery('#' + shortcode_id + '_until').length > 0) {
          var p_until = jQuery('#' + shortcode_id + '_until').val().trim();
          var p_until_offset = jQuery('#' + shortcode_id + '_until_offset').val().trim();
          p_until = p_until.replace(/'/gi, '');
          p_until_offset = p_until_offset.replace(/'/gi, '');

          if ('' != p_until && 'date' != p_until) {
            // Offset
            wpbc_shortcode += ' until=\'' + p_until + '\'';

            if ('any' != p_until && '' != p_until_offset) {
              p_until_offset = parseInt(p_until_offset);

              if (!isNaN(p_until_offset)) {
                wpbc_shortcode += ' until_offset=\'' + p_until_offset + jQuery('#' + shortcode_id + '_until_offset_type').val().trim().charAt(0) + '\'';
              }
            }
          } else if (p_until == 'date' && p_until_offset != '') {
            // If selected Date
            wpbc_shortcode += ' until=\'' + p_until_offset + '\'';
          }
        } ////////////////////////////////////////////////////////////////
        // Max
        ////////////////////////////////////////////////////////////////


        if (jQuery('#' + shortcode_id + '_conditions_max_num').length > 0) {
          var p_max = parseInt(jQuery('#' + shortcode_id + '_conditions_max_num').val().trim());

          if (p_max != 0) {
            wpbc_shortcode += ' max=' + p_max;
          }
        } ////////////////////////////////////////////////////////////////
        // Silence
        ////////////////////////////////////////////////////////////////


        if (jQuery('#' + shortcode_id + '_silence').length > 0) {
          if ('1' === jQuery('#' + shortcode_id + '_silence').val().trim()) {
            wpbc_shortcode += ' silence=1';
          }
        } ////////////////////////////////////////////////////////////////
        // is_all_dates_in
        ////////////////////////////////////////////////////////////////


        if (jQuery('#' + shortcode_id + '_conditions_events').length > 0) {
          var p_is_all_dates_in = parseInt(jQuery('#' + shortcode_id + '_conditions_events').val().trim());

          if (p_is_all_dates_in != 0) {
            wpbc_shortcode += ' is_all_dates_in=' + p_is_all_dates_in;
          }
        } ////////////////////////////////////////////////////////////////
        // import_conditions
        ////////////////////////////////////////////////////////////////


        if (jQuery('#' + shortcode_id + '_conditions_import').length > 0) {
          var p_import_conditions = jQuery('#' + shortcode_id + '_conditions_import').val().trim();
          p_import_conditions = p_import_conditions.replace(/'/gi, '');

          if (p_import_conditions != '') {
            wpbc_shortcode += ' import_conditions=\'' + p_import_conditions + '\'';
          }
        }
      }
    } // -------------------------------------------------------------------------------------------------------------
    // [booking] , [bookingcalendar] , ...  parameters for these shortcodes and others...
    // -------------------------------------------------------------------------------------------------------------


    if (jQuery('#' + shortcode_id + '_wpbc_resource_id').length > 0) {
      if (jQuery('#' + shortcode_id + '_wpbc_resource_id').val() === null) {
        //FixIn: 8.2.1.12
        jQuery('#wpbc_text_put_in_shortcode').val('---');
        return;
      } else {
        wpbc_shortcode += ' resource_id=' + jQuery('#' + shortcode_id + '_wpbc_resource_id').val().trim();
      }
    }

    if (jQuery('#' + shortcode_id + '_wpbc_custom_form').length > 0) {
      var form_type_temp = jQuery('#' + shortcode_id + '_wpbc_custom_form').val().trim();
      if (form_type_temp != 'standard') wpbc_shortcode += ' form_type=\'' + jQuery('#' + shortcode_id + '_wpbc_custom_form').val().trim() + '\'';
    }

    if (jQuery('#' + shortcode_id + '_wpbc_nummonths').length > 0 && parseInt(jQuery('#' + shortcode_id + '_wpbc_nummonths').val().trim()) > 1) {
      wpbc_shortcode += ' nummonths=' + jQuery('#' + shortcode_id + '_wpbc_nummonths').val().trim();
    }

    if (jQuery('#' + shortcode_id + '_wpbc_startmonth_active').length > 0 && jQuery('#' + shortcode_id + '_wpbc_startmonth_active').is(':checked')) {
      wpbc_shortcode += ' startmonth=\'' + jQuery('#' + shortcode_id + '_wpbc_startmonth_year').val().trim() + '-' + jQuery('#' + shortcode_id + '_wpbc_startmonth_month').val().trim() + '\'';
    }

    if (jQuery('#' + shortcode_id + '_wpbc_aggregate').length > 0) {
      var wpbc_aggregate_temp = jQuery('#' + shortcode_id + '_wpbc_aggregate').val();

      if (wpbc_aggregate_temp != null && wpbc_aggregate_temp.length > 0) {
        wpbc_aggregate_temp = wpbc_aggregate_temp.join(';');

        if (wpbc_aggregate_temp != 0) {
          // Check about 0=>'None'
          wpbc_shortcode += ' aggregate=\'' + wpbc_aggregate_temp + '\'';

          if (jQuery('#' + shortcode_id + '_wpbc_aggregate__bookings_only').is(':checked')) {
            wpbc_options_arr.push('{aggregate type=bookings_only}');
          }
        }
      }
    } // -------------------------------------------------------------------------------------------------------------
    // Option Param
    // -------------------------------------------------------------------------------------------------------------
    // Options : Size


    var wpbc_options_size = '';

    if (jQuery('#' + shortcode_id + '_wpbc_size_enabled').length > 0 && jQuery('#' + shortcode_id + '_wpbc_size_enabled').is(':checked')) {
      // options='{calendar months_num_in_row=2 width=100% cell_height=40px}'
      wpbc_options_size += '{calendar';
      wpbc_options_size += ' ' + 'months_num_in_row=' + Math.min(parseInt(jQuery('#' + shortcode_id + '_wpbc_size_months_num_in_row').val().trim()), parseInt(jQuery('#' + shortcode_id + '_wpbc_nummonths').val().trim()));
      wpbc_options_size += ' ' + 'width=' + parseInt(jQuery('#' + shortcode_id + '_wpbc_size_calendar_width').val().trim()) + jQuery('#' + shortcode_id + '_wpbc_size_calendar_width_px_pr').val().trim();
      wpbc_options_size += ' ' + 'cell_height=' + parseInt(jQuery('#' + shortcode_id + '_wpbc_size_calendar_cell_height').val().trim()) + 'px';
      wpbc_options_size += '}';
      wpbc_options_arr.push(wpbc_options_size);
    } // Options: Days number depend on   Weekday


    if (jQuery('#' + shortcode_id + 'wpbc_select_day_weekday_textarea').length > 0) {
      wpbc_options_size = jQuery('#' + shortcode_id + 'wpbc_select_day_weekday_textarea').val().trim();

      if (wpbc_options_size.length > 0) {
        wpbc_options_arr.push(wpbc_options_size);
      }
    } // Options: Days number depend on   SEASON


    if (jQuery('#' + shortcode_id + 'wpbc_select_day_season_textarea').length > 0) {
      wpbc_options_size = jQuery('#' + shortcode_id + 'wpbc_select_day_season_textarea').val().trim();

      if (wpbc_options_size.length > 0) {
        wpbc_options_arr.push(wpbc_options_size);
      }
    } // Options: Start weekday depend on   SEASON


    if (jQuery('#' + shortcode_id + 'wpbc_start_day_season_textarea').length > 0) {
      wpbc_options_size = jQuery('#' + shortcode_id + 'wpbc_start_day_season_textarea').val().trim();

      if (wpbc_options_size.length > 0) {
        wpbc_options_arr.push(wpbc_options_size);
      }
    } // Option: Days number depend on from  DATE


    if (jQuery('#' + shortcode_id + 'wpbc_select_day_fordate_textarea').length > 0) {
      wpbc_options_size = jQuery('#' + shortcode_id + 'wpbc_select_day_fordate_textarea').val().trim();

      if (wpbc_options_size.length > 0) {
        wpbc_options_arr.push(wpbc_options_size);
      }
    }

    if (wpbc_options_arr.length > 0) {
      wpbc_shortcode += ' options=\'' + wpbc_options_arr.join(',') + '\'';
    }
  }

  wpbc_shortcode += ']';
  jQuery('#wpbc_text_put_in_shortcode').val(wpbc_shortcode);
}
/**
 * Open TinyMCE Modal */


function wpbc_tiny_btn_click(tag) {
  //FixIn: 9.0.1.5
  jQuery('#wpbc_tiny_modal').wpbc_my_modal({
    keyboard: false,
    backdrop: true,
    show: true
  }); //FixIn: 8.3.3.99

  jQuery("#wpbc_text_gettenberg_section_id").val('');
}
/**
 * Open TinyMCE Modal */


function wpbc_tiny_close() {
  jQuery('#wpbc_tiny_modal').wpbc_my_modal('hide'); //FixIn: 9.0.1.5
}
/* ------------------------------------------------------------------------------------------------------------------ */

/** Send Text */

/* ------------------------------------------------------------------------------------------------------------------ */

/**
 * Send text  to editor */


function wpbc_send_text_to_editor(h) {
  // FixIn: 8.3.3.99
  if (typeof wpbc_send_text_to_gutenberg == 'function') {
    var is_send = wpbc_send_text_to_gutenberg(h);

    if (true === is_send) {
      return;
    }
  }

  var ed,
      mce = typeof tinymce != 'undefined',
      qt = typeof QTags != 'undefined';

  if (!wpActiveEditor) {
    if (mce && tinymce.activeEditor) {
      ed = tinymce.activeEditor;
      wpActiveEditor = ed.id;
    } else if (!qt) {
      return false;
    }
  } else if (mce) {
    if (tinymce.activeEditor && (tinymce.activeEditor.id == 'mce_fullscreen' || tinymce.activeEditor.id == 'wp_mce_fullscreen')) ed = tinymce.activeEditor;else ed = tinymce.get(wpActiveEditor);
  }

  if (ed && !ed.isHidden()) {
    // restore caret position on IE
    if (tinymce.isIE && ed.windowManager.insertimagebookmark) ed.selection.moveToBookmark(ed.windowManager.insertimagebookmark);

    if (h.indexOf('[caption') !== -1) {
      if (ed.wpSetImgCaption) h = ed.wpSetImgCaption(h);
    } else if (h.indexOf('[gallery') !== -1) {
      if (ed.plugins.wpgallery) h = ed.plugins.wpgallery._do_gallery(h);
    } else if (h.indexOf('[embed') === 0) {
      if (ed.plugins.wordpress) h = ed.plugins.wordpress._setEmbed(h);
    }

    ed.execCommand('mceInsertContent', false, h);
  } else if (qt) {
    QTags.insertContent(h);
  } else {
    document.getElementById(wpActiveEditor).value += h;
  }

  try {
    tb_remove();
  } catch (e) {}

  ;
}
/**
 * RESOURCES PAGE: Open TinyMCE Modal */


function wpbc_resource_page_btn_click(resource_id) {
  var shortcode_default_value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  //FixIn: 9.0.1.5
  jQuery('#wpbc_tiny_modal').wpbc_my_modal({
    keyboard: false,
    backdrop: true,
    show: true
  }); // Disable some options - selection of booking resource - because we configure it only for specific booking resource, where we clicked.

  var shortcode_arr = ['booking', 'bookingcalendar', 'bookingform'];

  for (var shortcde_key in shortcode_arr) {
    var shortcode_id = shortcode_arr[shortcde_key];
    jQuery('#' + shortcode_id + '_wpbc_resource_id').prop('disabled', false);
    jQuery('#' + shortcode_id + "_wpbc_resource_id option[value='" + resource_id + "']").prop('selected', true).trigger('change');
    jQuery('#' + shortcode_id + '_wpbc_resource_id').prop('disabled', true);
  } // Hide left  navigation  items
  //        jQuery( ".wpbc_shortcode_config_navigation_column .wpbc_settings_navigation_item" ).hide();


  jQuery("#wpbc_shortcode_config__nav_tab__booking").show();
  jQuery("#wpbc_shortcode_config__nav_tab__bookingcalendar").show(); // Hide | Show Insert  button  for booking resource page

  jQuery(".wpbc_tiny_button__insert_to_editor").hide();
  jQuery(".wpbc_tiny_button__insert_to_resource").show();
}
/**
 * Get Shortcode Value from  shortcode text field in PopUp shortcode Config dialog and insert  into DIV and INPUT TEXT field near specific booking resource.
 *  But it takes ID  of booking resource,  where to  insert  this shortcode only from  'booking' section  of Config Dialog. usually  such  booking resource  disabled there!
 *  e.g.: jQuery( "#booking_wpbc_resource_id" ).val()
 *
 * @param shortcode_val
 */


function wpbc_send_text_to_resource(shortcode_val) {
  jQuery('#div_booking_resource_shortcode_' + jQuery("#booking_wpbc_resource_id").val()).html(shortcode_val);
  jQuery('#booking_resource_shortcode_' + jQuery("#booking_wpbc_resource_id").val()).val(shortcode_val);
  jQuery('#booking_resource_shortcode_' + jQuery("#booking_wpbc_resource_id").val()).trigger('change'); // Scroll

  if ('function' === typeof wpbc_scroll_to) {
    wpbc_scroll_to('#div_booking_resource_shortcode_' + jQuery("#booking_wpbc_resource_id").val());
  }
}
/* R E S E T */


function wpbc_shortcode_config__reset(shortcode_val) {
  jQuery('#' + shortcode_val + '_wpbc_startmonth_active').prop('checked', false).trigger('change');
  jQuery('#' + shortcode_val + '_wpbc_aggregate option:selected').prop('selected', false);
  jQuery('#' + shortcode_val + '_wpbc_aggregate option:eq(0)').prop('selected', true);
  jQuery('#' + shortcode_val + '_wpbc_aggregate__bookings_only').prop('checked', false).trigger('change');
  jQuery('#' + shortcode_val + '_wpbc_custom_form option:eq(0)').prop('selected', true);
  jQuery('#' + shortcode_val + '_wpbc_nummonths option:eq(0)').prop('selected', true);
  jQuery('#' + shortcode_val + '_wpbc_size_enabled').prop('checked', false).trigger('change');
  wpbc_shortcode_config__select_day_weekday__reset(shortcode_val + 'wpbc_select_day_weekday');
  wpbc_shortcode_config__select_day_season__reset(shortcode_val + 'wpbc_select_day_season');
  wpbc_shortcode_config__start_day_season__reset(shortcode_val + 'wpbc_start_day_season');
  wpbc_shortcode_config__select_day_fordate__reset(shortcode_val + 'wpbc_select_day_fordate'); // Reset  for [bookingselect] shortcode params

  jQuery('#' + shortcode_val + '_wpbc_multiple_resources option:selected').prop('selected', false);
  jQuery('#' + shortcode_val + '_wpbc_multiple_resources option:eq(0)').prop('selected', true).trigger('change');
  jQuery('#' + shortcode_val + '_wpbc_selected_resource option:eq(0)').prop('selected', true).trigger('change');
  jQuery('#' + shortcode_val + '_wpbc_text_label').val('').trigger('change');
  jQuery('#' + shortcode_val + '_wpbc_first_option_title').val('').trigger('change'); // Reset  for [bookingtimeline] shortcode params

  jQuery('#' + shortcode_val + '_wpbc_text_label_timeline').val('').trigger('change');
  jQuery('#' + shortcode_val + '_wpbc_scroll_timeline_scroll_month option[value="0"]').prop('selected', true).trigger('change');
  jQuery('#' + shortcode_val + '_wpbc_scroll_timeline_scroll_days option[value="0"]').prop('selected', true).trigger('change');
  jQuery('#' + shortcode_val + '_wpbc_start_date_timeline_active').prop('checked', false).trigger('change');
  jQuery('#' + shortcode_val + '_wpbc_start_end_time_timeline_starttime option[value="0"]').prop('selected', true).trigger('change');
  jQuery('#' + shortcode_val + '_wpbc_start_end_time_timeline_endtime option[value="24"]').prop('selected', true).trigger('change');
  jQuery('input[name="' + shortcode_val + '_wpbc_view_mode_timeline_months_num_in_row"][value="30"]').prop('checked', true).trigger('change');
  jQuery('#' + shortcode_val + '_wpbc_start_date_timeline_year option[value="' + new Date().getFullYear() + '"]').prop('selected', true).trigger('change');
  jQuery('#' + shortcode_val + '_wpbc_start_date_timeline_month option[value="' + (new Date().getMonth() + 1) + '"]').prop('selected', true).trigger('change');
  jQuery('#' + shortcode_val + '_wpbc_start_date_timeline_day option[value="' + new Date().getDate() + '"]').prop('selected', true).trigger('change'); // Reset  for [bookingform] shortcode params

  jQuery('#' + shortcode_val + '_wpbc_booking_date_year option[value="' + new Date().getFullYear() + '"]').prop('selected', true).trigger('change');
  jQuery('#' + shortcode_val + '_wpbc_booking_date_month option[value="' + (new Date().getMonth() + 1) + '"]').prop('selected', true).trigger('change');
  jQuery('#' + shortcode_val + '_wpbc_booking_date_day option[value="' + new Date().getDate() + '"]').prop('selected', true).trigger('change'); // Reset  for [[bookingsearch ...] shortcode params

  jQuery('#' + shortcode_val + '_wpbc_search_new_page_url').val('').trigger('change');
  jQuery('#' + shortcode_val + '_wpbc_search_new_page_enabled').prop('checked', false).trigger('change'); // jQuery( '#' + shortcode_val + '_wpbc_search_header' ).val( '' ).trigger('change');                           //FixIn: 10.0.0.41
  // jQuery( '#' + shortcode_val + '_wpbc_search_nothing_found' ).val( '' ).trigger('change');

  jQuery('#' + shortcode_val + '_wpbc_search_for_users').val('').trigger('change');
  jQuery('input[name="' + shortcode_val + '_wpbc_search_form_results"][value="bookingsearch"]').prop('checked', true).trigger('change'); // Reset  for [bookingedit] , [bookingcustomerlisting] , [bookingresource type=6 show='capacity'] , [booking_confirm]

  jQuery('input[name="' + shortcode_val + '_wpbc_shortcode_type"][value="booking_confirm"]').prop('checked', true).trigger('change'); // booking_import_ics , booking_listing_ics

  jQuery('#' + shortcode_val + '_wpbc_url').val('').trigger('change');
  jQuery('#' + shortcode_val + '_from option[value="today"]').prop('selected', true).trigger('change');
  jQuery('#' + shortcode_val + '_from_offset').val('').trigger('change');
  jQuery('#' + shortcode_val + '_from_offset_type option:eq(0)').prop('selected', true).trigger('change');
  jQuery('#' + shortcode_val + '_until option[value="any"]').prop('selected', true).trigger('change');
  jQuery('#' + shortcode_val + '_until_offset').val('').trigger('change');
  jQuery('#' + shortcode_val + '_until_offset_type option:eq(0)').prop('selected', true).trigger('change');
  jQuery('#' + shortcode_val + '_conditions_import option:eq(0)').prop('selected', true).trigger('change');
  jQuery('#' + shortcode_val + '_conditions_events option[value="1"]').prop('selected', true).trigger('change');
  jQuery('#' + shortcode_val + '_conditions_max_num option[value="0"]').prop('selected', true).trigger('change');
  jQuery('#' + shortcode_val + '_silence option[value="0"]').prop('selected', true).trigger('change');
}
/* ------------------------------------------------------------------------------------------------------------------ */

/**
 *  SHORTCODE_CONFIG
 * */

/* ------------------------------------------------------------------------------------------------------------------ */

/**
 * When click on menu item in "Left Vertical Navigation" panel  in shortcode config popup
 */


function wpbc_shortcode_config_click_show_section(_this, section_id_to_show, shortcode_name) {
  // Menu
  jQuery(_this).parents('.wpbc_settings_flex_container').find('.wpbc_settings_navigation_item_active').removeClass('wpbc_settings_navigation_item_active');
  jQuery(_this).parents('.wpbc_settings_navigation_item').addClass('wpbc_settings_navigation_item_active'); // Content

  jQuery(_this).parents('.wpbc_settings_flex_container').find('.wpbc_sc_container__shortcode').hide();
  jQuery(section_id_to_show).show(); // Scroll

  if ('function' === typeof wpbc_scroll_to) {
    wpbc_scroll_to(section_id_to_show);
  } // Set - Shortcode Type


  jQuery('#wpbc_shortcode_type').val(shortcode_name); // Parse shortcode params

  wpbc_set_shortcode();
}
/**
 * Do Next / Prior step
 * @param _this		button  this
 * @param step		'prior' | 'next'
 */


function wpbc_shortcode_config_content_toolbar__next_prior(_this, step) {
  var j_work_nav_tab;
  var submenu_selected = jQuery(_this).parents('.wpbc_sc_container__shortcode').find('.wpbc_sc_container__shortcode_section:visible').find('.wpdevelop-submenu-tab-selected:visible');

  if (submenu_selected.length) {
    if ('next' === step) {
      j_work_nav_tab = submenu_selected.nextAll('a.nav-tab:visible').first();
    } else {
      j_work_nav_tab = submenu_selected.prevAll('a.nav-tab:visible').first();
    }

    if (j_work_nav_tab.length) {
      j_work_nav_tab.trigger('click');
      return;
    }
  }

  if ('next' === step) {
    j_work_nav_tab = jQuery(_this).parents('.wpbc_sc_container__shortcode').find('.nav-tab.nav-tab-active:visible').nextAll('a.nav-tab:visible').first();
  } else {
    j_work_nav_tab = jQuery(_this).parents('.wpbc_sc_container__shortcode').find('.nav-tab.nav-tab-active:visible').prevAll('a.nav-tab:visible').first();
  }

  if (j_work_nav_tab.length) {
    j_work_nav_tab.trigger('click');
  }
}
/**
 * Condition:   {select-day condition="weekday" for="5" value="3"}
 */


function wpbc_shortcode_config__select_day_weekday__add(id) {
  var condition_rule_arr = [];

  for (var weekday_num = 0; weekday_num < 8; weekday_num++) {
    if (jQuery('#' + id + '__weekday_' + weekday_num).is(':checked')) {
      var days_to_select = jQuery('#' + id + '__days_number_' + weekday_num).val().trim(); // Remove all words except digits and , and -

      days_to_select = days_to_select.replace(/[^0-9,-]/g, '');
      days_to_select = days_to_select.replace(/[,]{2,}/g, ',');
      days_to_select = days_to_select.replace(/[-]{2,}/g, '-');
      jQuery('#' + id + '__days_number_' + weekday_num).val(days_to_select);

      if ('' !== days_to_select) {
        condition_rule_arr.push('{select-day condition="weekday" for="' + weekday_num + '" value="' + days_to_select + '"}');
      } else {
        // Red highlight fields,  if some required fields are empty
        if ('function' === typeof wpbc_field_highlight && '' === jQuery('#' + id + '__days_number_' + weekday_num).val()) {
          wpbc_field_highlight('#' + id + '__days_number_' + weekday_num);
        }
      }
    }
  }

  var condition_rule = condition_rule_arr.join(',');
  jQuery('#' + id + '_textarea').val(condition_rule);
  wpbc_set_shortcode();
}

function wpbc_shortcode_config__select_day_weekday__reset(id) {
  for (var weekday_num = 0; weekday_num < 8; weekday_num++) {
    jQuery('#' + id + '__days_number_' + weekday_num).val('');

    if (jQuery('#' + id + '__weekday_' + weekday_num).is(':checked')) {
      jQuery('#' + id + '__weekday_' + weekday_num).prop('checked', false);
    }
  }

  jQuery('#' + id + '_textarea').val('');
  wpbc_set_shortcode();
}
/**
 * Condition:   {select-day condition="season" for="High season" value="7-14,20"}
 */


function wpbc_shortcode_config__select_day_season__add(id) {
  var season_filter_name = jQuery('#' + id + '__season_filter_name option:selected').text().trim(); // Escape quote symbols

  season_filter_name = season_filter_name.replace(/[\""]/g, '\\"');
  var days_number = jQuery('#' + id + '__days_number').val().trim(); // Remove all words except digits and , and -

  days_number = days_number.replace(/[^0-9,-]/g, '');
  days_number = days_number.replace(/[,]{2,}/g, ',');
  days_number = days_number.replace(/[-]{2,}/g, '-');
  jQuery('#' + id + '__days_number').val(days_number);

  if ('' != days_number && '' != season_filter_name && 0 != jQuery('#' + id + '__season_filter_name').val()) {
    var exist_configuration = jQuery('#' + id + '_textarea').val();
    exist_configuration = exist_configuration.replaceAll("},{", '}~~{');
    var condition_rule_arr = exist_configuration.split('~~'); // Remove empty spaces from  array : '' | ""

    condition_rule_arr = condition_rule_arr.filter(function (n) {
      return n;
    });
    condition_rule_arr.push('{select-day condition="season" for="' + season_filter_name + '" value="' + days_number + '"}'); // Remove duplicates from  the array

    condition_rule_arr = condition_rule_arr.filter(function (item, pos) {
      return condition_rule_arr.indexOf(item) === pos;
    });
    var condition_rule = condition_rule_arr.join(',');
    jQuery('#' + id + '_textarea').val(condition_rule);
    wpbc_set_shortcode();
  } // Red highlight fields,  if some required fields are empty


  if ('function' === typeof wpbc_field_highlight && '' === jQuery('#' + id + '__days_number').val()) {
    wpbc_field_highlight('#' + id + '__days_number');
  }

  if ('function' === typeof wpbc_field_highlight && '0' === jQuery('#' + id + '__season_filter_name').val()) {
    wpbc_field_highlight('#' + id + '__season_filter_name');
  }
}

function wpbc_shortcode_config__select_day_season__reset(id) {
  jQuery('#' + id + '__season_filter_name option:eq(0)').prop('selected', true);
  jQuery('#' + id + '__days_number').val('');
  jQuery('#' + id + '_textarea').val('');
  wpbc_set_shortcode();
}
/**
 * Condition:   {start-day condition="season" for="Low season" value="0,1,5"}
 */


function wpbc_shortcode_config__start_day_season__add(id) {
  var season_filter_name = jQuery('#' + id + '__season_filter_name option:selected').text().trim(); // Escape quote symbols

  season_filter_name = season_filter_name.replace(/[\""]/g, '\\"');

  if ('' != season_filter_name && 0 != jQuery('#' + id + '__season_filter_name').val()) {
    var activated_weekdays = [];

    for (var weekday_num = 0; weekday_num < 8; weekday_num++) {
      if (jQuery('#' + id + '__weekday_' + weekday_num).is(':checked')) {
        activated_weekdays.push(weekday_num);
      }
    }

    activated_weekdays = activated_weekdays.join(',');

    if ('' != activated_weekdays) {
      var exist_configuration = jQuery('#' + id + '_textarea').val();
      exist_configuration = exist_configuration.replaceAll("},{", '}~~{');
      var condition_rule_arr = exist_configuration.split('~~'); // Remove empty spaces from  array : '' | ""

      condition_rule_arr = condition_rule_arr.filter(function (n) {
        return n;
      });
      condition_rule_arr.push('{start-day condition="season" for="' + season_filter_name + '" value="' + activated_weekdays + '"}'); // Remove duplicates from  the array

      condition_rule_arr = condition_rule_arr.filter(function (item, pos) {
        return condition_rule_arr.indexOf(item) === pos;
      });
      var condition_rule = condition_rule_arr.join(',');
      jQuery('#' + id + '_textarea').val(condition_rule);
      wpbc_set_shortcode();
    }
  } // Red highlight fields,  if some required fields are empty


  if ('function' === typeof wpbc_field_highlight && '0' === jQuery('#' + id + '__season_filter_name').val()) {
    wpbc_field_highlight('#' + id + '__season_filter_name');
  }
}

function wpbc_shortcode_config__start_day_season__reset(id) {
  jQuery('#' + id + '__season_filter_name option:eq(0)').prop('selected', true);

  for (var weekday_num = 0; weekday_num < 8; weekday_num++) {
    if (jQuery('#' + id + '__weekday_' + weekday_num).is(':checked')) {
      jQuery('#' + id + '__weekday_' + weekday_num).prop('checked', false);
    }
  }

  jQuery('#' + id + '_textarea').val('');
  wpbc_set_shortcode();
}
/**
 * Condition:   {select-day condition="date" for="2023-10-01" value="20,25,30-35"}
 */


function wpbc_shortcode_config__select_day_fordate__add(id) {
  var start_date__fordate = jQuery('#' + id + '__date').val().trim(); // Remove all words except digits and , and -

  start_date__fordate = start_date__fordate.replace(/[^0-9-]/g, '');
  var globalRegex = new RegExp(/^\d{4}-[01]{1}\d{1}-[0123]{1}\d{1}$/, 'g');
  var is_valid_date = globalRegex.test(start_date__fordate);

  if (!is_valid_date) {
    start_date__fordate = '';
  }

  jQuery('#' + id + '__date').val(start_date__fordate);
  var days_number = jQuery('#' + id + '__days_number').val().trim(); // Remove all words except digits and , and -

  days_number = days_number.replace(/[^0-9,-]/g, '');
  days_number = days_number.replace(/[,]{2,}/g, ',');
  days_number = days_number.replace(/[-]{2,}/g, '-');
  jQuery('#' + id + '__days_number').val(days_number);

  if ('' != days_number && '' != start_date__fordate && 0 != jQuery('#' + id + '__season_filter_name').val()) {
    var exist_configuration = jQuery('#' + id + '_textarea').val();
    exist_configuration = exist_configuration.replaceAll("},{", '}~~{');
    var condition_rule_arr = exist_configuration.split('~~'); // Remove empty spaces from  array : '' | ""

    condition_rule_arr = condition_rule_arr.filter(function (n) {
      return n;
    });
    condition_rule_arr.push('{select-day condition="date" for="' + start_date__fordate + '" value="' + days_number + '"}'); // Remove duplicates from  the array

    condition_rule_arr = condition_rule_arr.filter(function (item, pos) {
      return condition_rule_arr.indexOf(item) === pos;
    });
    var condition_rule = condition_rule_arr.join(',');
    jQuery('#' + id + '_textarea').val(condition_rule);
    wpbc_set_shortcode();
  } else // Red highlight fields,  if some required fields are empty
    if ('function' === typeof wpbc_field_highlight && '' === jQuery('#' + id + '__date').val()) {
      wpbc_field_highlight('#' + id + '__date');
    }

  if ('function' === typeof wpbc_field_highlight && '' === jQuery('#' + id + '__days_number').val()) {
    wpbc_field_highlight('#' + id + '__days_number');
  }
}

function wpbc_shortcode_config__select_day_fordate__reset(id) {
  jQuery('#' + id + '__date').val('');
  jQuery('#' + id + '__days_number').val('');
  jQuery('#' + id + '_textarea').val('');
  wpbc_set_shortcode();
}

function wpbc_shortcode_config__update_elements_in_timeline() {
  var wpbc_is_matrix = false;

  if (jQuery('#bookingtimeline_wpbc_multiple_resources').length > 0) {
    var bookingtimeline_wpbc_multiple_resources_temp = jQuery('#bookingtimeline_wpbc_multiple_resources').val();

    if (bookingtimeline_wpbc_multiple_resources_temp != null && bookingtimeline_wpbc_multiple_resources_temp.length > 0) {
      jQuery("input[name='bookingtimeline_wpbc_view_mode_timeline_months_num_in_row']").prop("disabled", false);
      jQuery(".wpbc_sc_container__shortcode_bookingtimeline label.wpbc-form-radio").show();

      if (bookingtimeline_wpbc_multiple_resources_temp.length > 1 || bookingtimeline_wpbc_multiple_resources_temp.length == 1 && bookingtimeline_wpbc_multiple_resources_temp[0] == '0') {
        // Matrix
        wpbc_is_matrix = true;
        jQuery("input[name='bookingtimeline_wpbc_view_mode_timeline_months_num_in_row'][value='90']").prop("disabled", true);
        jQuery("input[name='bookingtimeline_wpbc_view_mode_timeline_months_num_in_row'][value='90']").parents('.wpbc-form-radio').hide();
        jQuery("input[name='bookingtimeline_wpbc_view_mode_timeline_months_num_in_row'][value='365']").prop("disabled", true);
        jQuery("input[name='bookingtimeline_wpbc_view_mode_timeline_months_num_in_row'][value='365']").parents('.wpbc-form-radio').hide();
      } else {
        // Single
        jQuery("input[name='bookingtimeline_wpbc_view_mode_timeline_months_num_in_row'][value='1']").prop("disabled", true);
        jQuery("input[name='bookingtimeline_wpbc_view_mode_timeline_months_num_in_row'][value='1']").parents('.wpbc-form-radio').hide();
        jQuery("input[name='bookingtimeline_wpbc_view_mode_timeline_months_num_in_row'][value='7']").prop("disabled", true);
        jQuery("input[name='bookingtimeline_wpbc_view_mode_timeline_months_num_in_row'][value='7']").parents('.wpbc-form-radio').hide();
        jQuery("input[name='bookingtimeline_wpbc_view_mode_timeline_months_num_in_row'][value='60']").prop("disabled", true);
        jQuery("input[name='bookingtimeline_wpbc_view_mode_timeline_months_num_in_row'][value='60']").parents('.wpbc-form-radio').hide();
      }

      if (jQuery("input[name='bookingtimeline_wpbc_view_mode_timeline_months_num_in_row']:checked").is(':disabled')) {
        jQuery("input[name='bookingtimeline_wpbc_view_mode_timeline_months_num_in_row'][value='30']").prop("checked", true);
      }
    }
  }

  var view_days_num_temp = 30;

  if (jQuery("input[name='bookingtimeline_wpbc_view_mode_timeline_months_num_in_row']:checked").length > 0) {
    var view_days_num_temp = parseInt(jQuery("input[name='bookingtimeline_wpbc_view_mode_timeline_months_num_in_row']:checked").val().trim());
  } ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Hide or Show Scrolling Days and Months, depending on from type of view and number of booking resources
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  jQuery("#wpbc_bookingtimeline_scroll_month,#wpbc_bookingtimeline_scroll_day").prop("disabled", false);
  jQuery(".wpbc_bookingtimeline_scroll_month,.wpbc_bookingtimeline_scroll_day").show(); // Matrix //////////////////////////////////////////////

  if (wpbc_is_matrix && (view_days_num_temp == 1 || view_days_num_temp == 7) // Day | Week view
  ) {
    jQuery("#wpbc_bookingtimeline_scroll_month").prop("disabled", true); // Scroll Month NOT working

    jQuery('.wpbc_bookingtimeline_scroll_month').hide();
  }

  if (wpbc_is_matrix && (view_days_num_temp == 30 || view_days_num_temp == 60) // Month view
  ) {
    jQuery("#wpbc_bookingtimeline_scroll_day").prop("disabled", true); // Scroll Days NOT working

    jQuery('.wpbc_bookingtimeline_scroll_day').hide();
  } // Single //////////////////////////////////////////////


  if (!wpbc_is_matrix && (view_days_num_temp == 30 || view_days_num_temp == 90) // Month | 3 Months view (like week view)
  ) {
    jQuery("#wpbc_bookingtimeline_scroll_month").prop("disabled", true); // Scroll Month NOT working

    jQuery('.wpbc_bookingtimeline_scroll_month').hide();
  }

  if (!wpbc_is_matrix && view_days_num_temp == 365 // Year view
  ) {
    jQuery("#wpbc_bookingtimeline_scroll_day").prop("disabled", true); // Scroll Days NOT working

    jQuery('.wpbc_bookingtimeline_scroll_day').hide();
  } ////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  return [wpbc_is_matrix, view_days_num_temp];
}

jQuery(document).ready(function () {
  // -----------------------------------------------------------------------------------------------------
  // [booking ... ]
  var shortcode_arr = ['booking', 'bookingcalendar', 'bookingselect', 'bookingtimeline', 'bookingform', 'bookingsearch', 'bookingother', 'booking_import_ics', 'booking_listing_ics'];

  for (var shortcde_key in shortcode_arr) {
    var id = shortcode_arr[shortcde_key]; // -------------------------------------------------------------------------------------------------------------
    // Hide by Size sections
    // -------------------------------------------------------------------------------------------------------------

    jQuery('.' + id + '_wpbc_size_wpbc_sc_calendar_size').hide(); // options :: Show / Hide SIZE calendar  section

    jQuery('#' + id + '_wpbc_size_enabled').on('change', {
      'id': id
    }, function (event) {
      if (jQuery('#' + event.data.id + '_wpbc_size_enabled').is(':checked')) {
        jQuery('.' + event.data.id + '_wpbc_size_wpbc_sc_calendar_size').show();
      } else {
        jQuery('.' + event.data.id + '_wpbc_size_wpbc_sc_calendar_size').hide();
      }
    }); // If we changed number of months in 'Setup Size & Structure' then  change general 'Visible months' number      //FixIn: 10.0.0.4

    jQuery('#' + id + '_wpbc_size_months_num_in_row' // - Month Num in Row
    ).on('change', {
      'id': id
    }, function (event) {
      jQuery('#' + event.data.id + '_wpbc_nummonths option[value="' + parseInt(jQuery('#' + event.data.id + '_wpbc_size_months_num_in_row').val().trim()) + '"]').prop('selected', true); //.trigger('change');

      if ('function' === typeof wpbc_field_highlight) {
        wpbc_field_highlight('#' + event.data.id + '_wpbc_nummonths');
      }
    }); // -------------------------------------------------------------------------------------------------------------
    // Update Shortcode on changing: Size
    // -------------------------------------------------------------------------------------------------------------

    jQuery('#' + id + '_wpbc_size_enabled' // Size On | Off
    + ',#' + id + '_wpbc_size_months_num_in_row' // - Month Num in Row
    + ',#' + id + '_wpbc_size_calendar_width' // - Width
    + ',#' + id + '_wpbc_size_calendar_width_px_pr' // - Width PS | %
    + ',#' + id + '_wpbc_size_calendar_cell_height' // - Cell Height
    + ',#' + id + 'wpbc_select_day_weekday_textarea' // Rule Weekday
    + ',#' + id + 'wpbc_select_day_season_textarea' // Rule Season
    + ',#' + id + 'wpbc_start_day_season_textarea' // Rule Season - Start day
    + ',#' + id + 'wpbc_select_day_fordate_textarea' // Rule Date
    + ',#' + id + '_wpbc_resource_id' // Resource ID
    + ',#' + id + '_wpbc_custom_form' // Custom Form
    + ',#' + id + '_wpbc_nummonths' // Num Months
    + ',#' + id + '_wpbc_startmonth_active' // Start Month Enable
    + ',#' + id + '_wpbc_startmonth_year' //  - Year
    + ',#' + id + '_wpbc_startmonth_month' //  - Month
    + ',#' + id + '_wpbc_aggregate' // Aggregate
    + ',#' + id + '_wpbc_aggregate__bookings_only' // aggregate option
    + ',#' + id + '_wpbc_multiple_resources' // [bookingselect] - Multiple Resources
    + ',#' + id + '_wpbc_selected_resource' // [bookingselect] - Selected Resource
    + ',#' + id + '_wpbc_text_label' // [bookingselect] - Label
    + ',#' + id + '_wpbc_first_option_title' // [bookingselect] - First  Option
    // TimeLine
    + ",input[name='" + id + "_wpbc_view_mode_timeline_months_num_in_row']" + ',#' + id + '_wpbc_text_label_timeline' + ',#' + id + '_wpbc_scroll_timeline_scroll_days' + ',#' + id + '_wpbc_scroll_timeline_scroll_month' + ',#' + id + '_wpbc_start_date_timeline_active' + ',#' + id + '_wpbc_start_date_timeline_year' + ',#' + id + '_wpbc_start_date_timeline_month' + ',#' + id + '_wpbc_start_date_timeline_day' + ',#' + id + '_wpbc_start_end_time_timeline_starttime' + ',#' + id + '_wpbc_start_end_time_timeline_endtime' // Form Only
    + ',#' + id + '_wpbc_booking_date_year' + ',#' + id + '_wpbc_booking_date_month' + ',#' + id + '_wpbc_booking_date_day' // [bookingsearch ...]
    + ",input[name='" + id + "_wpbc_search_form_results']" + ',#' + id + '_wpbc_search_new_page_enabled' + ',#' + id + '_wpbc_search_new_page_url' // +',#' + id + '_wpbc_search_header'                       //FixIn: 10.0.0.41
    // +',#' + id + '_wpbc_search_nothing_found'
    + ',#' + id + '_wpbc_search_for_users' // [bookingother ... ]
    + ",input[name='" + id + "_wpbc_shortcode_type']" + ',#' + id + '_wpbc_resource_show' //booking_import_ics , booking_listing_ics
    + ',#' + id + '_wpbc_url' + ',#' + id + '_from' + ',#' + id + '_from_offset' + ',#' + id + '_from_offset_type' + ',#' + id + '_until' + ',#' + id + '_until_offset' + ',#' + id + '_until_offset_type' + ',#' + id + '_conditions_import' + ',#' + id + '_conditions_events' + ',#' + id + '_conditions_max_num' + ',#' + id + '_silence').on('change', {
      'id': id
    }, function (event) {
      //console.log( 'on change wpbc_set_shortcode', event.data.id );
      wpbc_set_shortcode();
    });
  } // -----------------------------------------------------------------------------------------------------


  wpbc_set_shortcode();
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluY2x1ZGVzL3VpX21vZGFsX19zaG9ydGNvZGVzL19zcmMvd3BiY19zaG9ydGNvZGVfcG9wdXAuanMiXSwibmFtZXMiOlsid3BiY19zZXRfc2hvcnRjb2RlIiwid3BiY19zaG9ydGNvZGUiLCJzaG9ydGNvZGVfaWQiLCJqUXVlcnkiLCJ2YWwiLCJ0cmltIiwid3BiY19vcHRpb25zX2FyciIsImxlbmd0aCIsIm11bHRpcGxlX3Jlc291cmNlcyIsImZpbHRlciIsIm4iLCJwYXJzZUludCIsImpvaW4iLCJyZXBsYWNlIiwid3BiY19pc19tYXRyaXhfX3ZpZXdfZGF5c19udW1fdGVtcCIsIndwYmNfc2hvcnRjb2RlX2NvbmZpZ19fdXBkYXRlX2VsZW1lbnRzX2luX3RpbWVsaW5lIiwid3BiY19pc19tYXRyaXgiLCJ2aWV3X2RheXNfbnVtX3RlbXAiLCJoZWFkZXJfdGl0bGVfdGVtcCIsImlzIiwiaGlkZSIsInNob3ciLCJ2aWV3X3RpbWVzX3N0YXJ0X3RlbXAiLCJ2aWV3X3RpbWVzX2VuZF90ZW1wIiwid3BiY19zZWxlY3RlZF9kYXkiLCJ3cGJjX3NlbGVjdGVkX21vbnRoIiwid3BiY19zZWFyY2hfZm9ybV9yZXN1bHRzIiwic2VhcmNoX3Jlc3VsdHNfdXJsX3RlbXAiLCJvbmx5X2Zvcl91c2Vyc190ZW1wIiwiYm9va2luZ290aGVyX3Nob3J0Y29kZV90eXBlIiwic2hvcnRjb2RlX3VybF90ZW1wIiwicF9mcm9tIiwicF9mcm9tX29mZnNldCIsImlzTmFOIiwiY2hhckF0IiwicF91bnRpbCIsInBfdW50aWxfb2Zmc2V0IiwicF9tYXgiLCJwX2lzX2FsbF9kYXRlc19pbiIsInBfaW1wb3J0X2NvbmRpdGlvbnMiLCJmb3JtX3R5cGVfdGVtcCIsIndwYmNfYWdncmVnYXRlX3RlbXAiLCJwdXNoIiwid3BiY19vcHRpb25zX3NpemUiLCJNYXRoIiwibWluIiwid3BiY190aW55X2J0bl9jbGljayIsInRhZyIsIndwYmNfbXlfbW9kYWwiLCJrZXlib2FyZCIsImJhY2tkcm9wIiwid3BiY190aW55X2Nsb3NlIiwid3BiY19zZW5kX3RleHRfdG9fZWRpdG9yIiwiaCIsIndwYmNfc2VuZF90ZXh0X3RvX2d1dGVuYmVyZyIsImlzX3NlbmQiLCJlZCIsIm1jZSIsInRpbnltY2UiLCJxdCIsIlFUYWdzIiwid3BBY3RpdmVFZGl0b3IiLCJhY3RpdmVFZGl0b3IiLCJpZCIsImdldCIsImlzSGlkZGVuIiwiaXNJRSIsIndpbmRvd01hbmFnZXIiLCJpbnNlcnRpbWFnZWJvb2ttYXJrIiwic2VsZWN0aW9uIiwibW92ZVRvQm9va21hcmsiLCJpbmRleE9mIiwid3BTZXRJbWdDYXB0aW9uIiwicGx1Z2lucyIsIndwZ2FsbGVyeSIsIl9kb19nYWxsZXJ5Iiwid29yZHByZXNzIiwiX3NldEVtYmVkIiwiZXhlY0NvbW1hbmQiLCJpbnNlcnRDb250ZW50IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInZhbHVlIiwidGJfcmVtb3ZlIiwiZSIsIndwYmNfcmVzb3VyY2VfcGFnZV9idG5fY2xpY2siLCJyZXNvdXJjZV9pZCIsInNob3J0Y29kZV9kZWZhdWx0X3ZhbHVlIiwic2hvcnRjb2RlX2FyciIsInNob3J0Y2RlX2tleSIsInByb3AiLCJ0cmlnZ2VyIiwid3BiY19zZW5kX3RleHRfdG9fcmVzb3VyY2UiLCJzaG9ydGNvZGVfdmFsIiwiaHRtbCIsIndwYmNfc2Nyb2xsX3RvIiwid3BiY19zaG9ydGNvZGVfY29uZmlnX19yZXNldCIsIndwYmNfc2hvcnRjb2RlX2NvbmZpZ19fc2VsZWN0X2RheV93ZWVrZGF5X19yZXNldCIsIndwYmNfc2hvcnRjb2RlX2NvbmZpZ19fc2VsZWN0X2RheV9zZWFzb25fX3Jlc2V0Iiwid3BiY19zaG9ydGNvZGVfY29uZmlnX19zdGFydF9kYXlfc2Vhc29uX19yZXNldCIsIndwYmNfc2hvcnRjb2RlX2NvbmZpZ19fc2VsZWN0X2RheV9mb3JkYXRlX19yZXNldCIsIkRhdGUiLCJnZXRGdWxsWWVhciIsImdldE1vbnRoIiwiZ2V0RGF0ZSIsIndwYmNfc2hvcnRjb2RlX2NvbmZpZ19jbGlja19zaG93X3NlY3Rpb24iLCJfdGhpcyIsInNlY3Rpb25faWRfdG9fc2hvdyIsInNob3J0Y29kZV9uYW1lIiwicGFyZW50cyIsImZpbmQiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwid3BiY19zaG9ydGNvZGVfY29uZmlnX2NvbnRlbnRfdG9vbGJhcl9fbmV4dF9wcmlvciIsInN0ZXAiLCJqX3dvcmtfbmF2X3RhYiIsInN1Ym1lbnVfc2VsZWN0ZWQiLCJuZXh0QWxsIiwiZmlyc3QiLCJwcmV2QWxsIiwid3BiY19zaG9ydGNvZGVfY29uZmlnX19zZWxlY3RfZGF5X3dlZWtkYXlfX2FkZCIsImNvbmRpdGlvbl9ydWxlX2FyciIsIndlZWtkYXlfbnVtIiwiZGF5c190b19zZWxlY3QiLCJ3cGJjX2ZpZWxkX2hpZ2hsaWdodCIsImNvbmRpdGlvbl9ydWxlIiwid3BiY19zaG9ydGNvZGVfY29uZmlnX19zZWxlY3RfZGF5X3NlYXNvbl9fYWRkIiwic2Vhc29uX2ZpbHRlcl9uYW1lIiwidGV4dCIsImRheXNfbnVtYmVyIiwiZXhpc3RfY29uZmlndXJhdGlvbiIsInJlcGxhY2VBbGwiLCJzcGxpdCIsIml0ZW0iLCJwb3MiLCJ3cGJjX3Nob3J0Y29kZV9jb25maWdfX3N0YXJ0X2RheV9zZWFzb25fX2FkZCIsImFjdGl2YXRlZF93ZWVrZGF5cyIsIndwYmNfc2hvcnRjb2RlX2NvbmZpZ19fc2VsZWN0X2RheV9mb3JkYXRlX19hZGQiLCJzdGFydF9kYXRlX19mb3JkYXRlIiwiZ2xvYmFsUmVnZXgiLCJSZWdFeHAiLCJpc192YWxpZF9kYXRlIiwidGVzdCIsImJvb2tpbmd0aW1lbGluZV93cGJjX211bHRpcGxlX3Jlc291cmNlc190ZW1wIiwicmVhZHkiLCJvbiIsImV2ZW50IiwiZGF0YSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQSxTQUFTQSxrQkFBVCxHQUE2QjtBQUV6QixNQUFJQyxjQUFjLEdBQUcsR0FBckI7QUFDQSxNQUFJQyxZQUFZLEdBQUdDLE1BQU0sQ0FB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QUFrQjtBQUN6QixLQXZFTDtBQXdFSCxHQTdHZ0MsQ0E4R2pDOzs7QUFDQUEsRUFBQUEsa0JBQWtCO0FBQ3JCLENBaEhEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIFNob3J0Y29kZSBDb25maWcgLSBNYWluIExvb3BcclxuICovXHJcbmZ1bmN0aW9uIHdwYmNfc2V0X3Nob3J0Y29kZSgpe1xyXG5cclxuICAgIHZhciB3cGJjX3Nob3J0Y29kZSA9ICdbJztcclxuICAgIHZhciBzaG9ydGNvZGVfaWQgPSBqUXVlcnkoICcjd3BiY19zaG9ydGNvZGVfdHlwZScgKS52YWwoKS50cmltKCk7XHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vIFtib29raW5nXSAgfCBbYm9va2luZ2NhbGVuZGFyXSB8IC4uLlxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICBpZiAoXHJcbiAgICAgICAgICAgKCAnYm9va2luZycgPT09IHNob3J0Y29kZV9pZCApXHJcbiAgICAgICAgfHwgKCAnYm9va2luZ2NhbGVuZGFyJyA9PT0gc2hvcnRjb2RlX2lkIClcclxuICAgICAgICB8fCAoICdib29raW5nc2VsZWN0JyA9PT0gc2hvcnRjb2RlX2lkIClcclxuICAgICAgICB8fCAoICdib29raW5ndGltZWxpbmUnID09PSBzaG9ydGNvZGVfaWQgKVxyXG4gICAgICAgIHx8ICggJ2Jvb2tpbmdmb3JtJyA9PT0gc2hvcnRjb2RlX2lkIClcclxuICAgICAgICB8fCAoICdib29raW5nc2VhcmNoJyA9PT0gc2hvcnRjb2RlX2lkIClcclxuICAgICAgICB8fCAoICdib29raW5nb3RoZXInID09PSBzaG9ydGNvZGVfaWQgKVxyXG5cclxuICAgICAgICB8fCAoICdib29raW5nX2ltcG9ydF9pY3MnID09PSBzaG9ydGNvZGVfaWQgKVxyXG4gICAgICAgIHx8ICggJ2Jvb2tpbmdfbGlzdGluZ19pY3MnID09PSBzaG9ydGNvZGVfaWQgKVxyXG4gICAgKXtcclxuXHJcbiAgICAgICAgd3BiY19zaG9ydGNvZGUgKz0gc2hvcnRjb2RlX2lkO1xyXG5cclxuICAgICAgICB2YXIgd3BiY19vcHRpb25zX2FyciA9IFtdO1xyXG5cclxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLy8gW2Jvb2tpbmdzZWxlY3RdIHwgW2Jvb2tpbmd0aW1lbGluZV0gLSBPcHRpb25zIHJlbGF0aXZlIG9ubHkgdG8gdGhpcyBzaG9ydGNvZGUuXHJcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgKCAnYm9va2luZ3NlbGVjdCcgPT09IHNob3J0Y29kZV9pZCApXHJcbiAgICAgICAgICAgIHx8ICggJ2Jvb2tpbmd0aW1lbGluZScgPT09IHNob3J0Y29kZV9pZCApXHJcbiAgICAgICAgKXtcclxuXHJcbiAgICAgICAgICAgIC8vIFtib29raW5nc2VsZWN0IHR5cGU9JzEsMiwzJ10gLSBNdWx0aXBsZSBSZXNvdXJjZXNcclxuICAgICAgICAgICAgaWYgKCBqUXVlcnkoICcjJyArIHNob3J0Y29kZV9pZCArICdfd3BiY19tdWx0aXBsZV9yZXNvdXJjZXMnICkubGVuZ3RoID4gMCApe1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBtdWx0aXBsZV9yZXNvdXJjZXMgPSBqUXVlcnkoICcjJyArIHNob3J0Y29kZV9pZCArICdfd3BiY19tdWx0aXBsZV9yZXNvdXJjZXMnICkudmFsKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCAobXVsdGlwbGVfcmVzb3VyY2VzICE9IG51bGwpICYmIChtdWx0aXBsZV9yZXNvdXJjZXMubGVuZ3RoID4gMCkgKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIGVtcHR5IHNwYWNlcyBmcm9tICBhcnJheSA6ICcnIHwgXCJcIiB8IDBcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aXBsZV9yZXNvdXJjZXMgPSBtdWx0aXBsZV9yZXNvdXJjZXMuZmlsdGVyKGZ1bmN0aW9uKG4pe3JldHVybiBwYXJzZUludChuKTsgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpcGxlX3Jlc291cmNlcyA9IG11bHRpcGxlX3Jlc291cmNlcy5qb2luKCAnLCcgKS50cmltKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICggbXVsdGlwbGVfcmVzb3VyY2VzICE9IDAgKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd3BiY19zaG9ydGNvZGUgKz0gJyB0eXBlPVxcJycgKyBtdWx0aXBsZV9yZXNvdXJjZXMgKyAnXFwnJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFtib29raW5nc2VsZWN0IHNlbGVjdGVkX3R5cGU9MV0gLSBTZWxlY3RlZCBSZXNvdXJjZVxyXG4gICAgICAgICAgICBpZiAoIGpRdWVyeSggJyMnICsgc2hvcnRjb2RlX2lkICsgJ193cGJjX3NlbGVjdGVkX3Jlc291cmNlJyApLmxlbmd0aCA+IDAgKXtcclxuICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAoIGpRdWVyeSggJyMnICsgc2hvcnRjb2RlX2lkICsgJ193cGJjX3NlbGVjdGVkX3Jlc291cmNlJyApLnZhbCgpICE9PSBudWxsICkgICAgICAgICAgICAgICAgICAgICAgLy9GaXhJbjogOC4yLjEuMTJcclxuICAgICAgICAgICAgICAgICAgICAmJiAoIHBhcnNlSW50KCBqUXVlcnkoICcjJyArIHNob3J0Y29kZV9pZCArICdfd3BiY19zZWxlY3RlZF9yZXNvdXJjZScgKS52YWwoKSApID4gMCApXHJcbiAgICAgICAgICAgICAgICApe1xyXG4gICAgICAgICAgICAgICAgICAgIHdwYmNfc2hvcnRjb2RlICs9ICcgc2VsZWN0ZWRfdHlwZT0nICsgalF1ZXJ5KCAnIycgKyBzaG9ydGNvZGVfaWQgKyAnX3dwYmNfc2VsZWN0ZWRfcmVzb3VyY2UnICkudmFsKCkudHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBbYm9va2luZ3NlbGVjdCBsYWJlbD0nVGFkYSddIC0gTGFiZWxcclxuICAgICAgICAgICAgaWYgKCBqUXVlcnkoICcjJyArIHNob3J0Y29kZV9pZCArICdfd3BiY190ZXh0X2xhYmVsJyApLmxlbmd0aCA+IDAgKXtcclxuICAgICAgICAgICAgICAgIGlmICggJycgIT09IGpRdWVyeSggJyMnICsgc2hvcnRjb2RlX2lkICsgJ193cGJjX3RleHRfbGFiZWwnICkudmFsKCkudHJpbSgpICl7XHJcbiAgICAgICAgICAgICAgICAgICAgd3BiY19zaG9ydGNvZGUgKz0gJyBsYWJlbD1cXCcnICsgalF1ZXJ5KCAnIycgKyBzaG9ydGNvZGVfaWQgKyAnX3dwYmNfdGV4dF9sYWJlbCcgKS52YWwoKS50cmltKCkucmVwbGFjZSggLycvZ2ksICcnICkgKyAnXFwnJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gW2Jvb2tpbmdzZWxlY3QgZmlyc3Rfb3B0aW9uX3RpdGxlPSdUYWRhJ10gLSBGaXJzdCAgT3B0aW9uXHJcbiAgICAgICAgICAgIGlmICggalF1ZXJ5KCAnIycgKyBzaG9ydGNvZGVfaWQgKyAnX3dwYmNfZmlyc3Rfb3B0aW9uX3RpdGxlJyApLmxlbmd0aCA+IDAgKXtcclxuICAgICAgICAgICAgICAgIGlmICggJycgIT09IGpRdWVyeSggJyMnICsgc2hvcnRjb2RlX2lkICsgJ193cGJjX2ZpcnN0X29wdGlvbl90aXRsZScgKS52YWwoKS50cmltKCkgKXtcclxuICAgICAgICAgICAgICAgICAgICB3cGJjX3Nob3J0Y29kZSArPSAnIGZpcnN0X29wdGlvbl90aXRsZT1cXCcnICsgalF1ZXJ5KCAnIycgKyBzaG9ydGNvZGVfaWQgKyAnX3dwYmNfZmlyc3Rfb3B0aW9uX3RpdGxlJyApLnZhbCgpLnRyaW0oKS5yZXBsYWNlKCAvJy9naSwgJycgKSArICdcXCcnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vIFtib29raW5ndGltZWxpbmVdIC0gT3B0aW9ucyByZWxhdGl2ZSBvbmx5IHRvIHRoaXMgc2hvcnRjb2RlLlxyXG4gICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICBpZiAoICdib29raW5ndGltZWxpbmUnID09PSBzaG9ydGNvZGVfaWQgKXtcclxuICAgICAgICAgICAgLy8gVmlzdWFsbHkgdXBkYXRlXHJcbiAgICAgICAgICAgIHZhciB3cGJjX2lzX21hdHJpeF9fdmlld19kYXlzX251bV90ZW1wID0gd3BiY19zaG9ydGNvZGVfY29uZmlnX191cGRhdGVfZWxlbWVudHNfaW5fdGltZWxpbmUoKTtcclxuICAgICAgICAgICAgdmFyIHdwYmNfaXNfbWF0cml4ID0gd3BiY19pc19tYXRyaXhfX3ZpZXdfZGF5c19udW1fdGVtcFsgMCBdO1xyXG4gICAgICAgICAgICB2YXIgdmlld19kYXlzX251bV90ZW1wID0gd3BiY19pc19tYXRyaXhfX3ZpZXdfZGF5c19udW1fdGVtcFsgMSBdO1xyXG5cclxuICAgICAgICAgICAgLy8gOiB2aWV3X2RheXNfbnVtXHJcbiAgICAgICAgICAgIGlmICggdmlld19kYXlzX251bV90ZW1wICE9IDMwICl7XHJcbiAgICAgICAgICAgICAgICB3cGJjX3Nob3J0Y29kZSArPSAnIHZpZXdfZGF5c19udW09JyArIHZpZXdfZGF5c19udW1fdGVtcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyA6IGhlYWRlcl90aXRsZVxyXG4gICAgICAgICAgICBpZiAoIGpRdWVyeSggJyMnICsgc2hvcnRjb2RlX2lkICsgJ193cGJjX3RleHRfbGFiZWxfdGltZWxpbmUnICkubGVuZ3RoID4gMCApe1xyXG4gICAgICAgICAgICAgICAgdmFyIGhlYWRlcl90aXRsZV90ZW1wID0galF1ZXJ5KCAnIycgKyBzaG9ydGNvZGVfaWQgKyAnX3dwYmNfdGV4dF9sYWJlbF90aW1lbGluZScgKS52YWwoKS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXJfdGl0bGVfdGVtcCA9IGhlYWRlcl90aXRsZV90ZW1wLnJlcGxhY2UoIC8nL2dpLCAnJyApO1xyXG4gICAgICAgICAgICAgICAgaWYgKCBoZWFkZXJfdGl0bGVfdGVtcCAhPSAnJyApe1xyXG4gICAgICAgICAgICAgICAgICAgIHdwYmNfc2hvcnRjb2RlICs9ICcgaGVhZGVyX3RpdGxlPVxcJycgKyBoZWFkZXJfdGl0bGVfdGVtcCArICdcXCcnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIDogc2Nyb2xsX21vbnRoXHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICggICBqUXVlcnkoICcjJyArIHNob3J0Y29kZV9pZCArICdfd3BiY19zY3JvbGxfdGltZWxpbmVfc2Nyb2xsX21vbnRoJyApLmlzKCAnOnZpc2libGUnICkpXHJcbiAgICAgICAgICAgICAgICAmJiAoICAgalF1ZXJ5KCAnIycgKyBzaG9ydGNvZGVfaWQgKyAnX3dwYmNfc2Nyb2xsX3RpbWVsaW5lX3Njcm9sbF9tb250aCcgKS5sZW5ndGggPiAwKVxyXG4gICAgICAgICAgICAgICAgJiYgKHBhcnNlSW50KCBqUXVlcnkoICcjJyArIHNob3J0Y29kZV9pZCArICdfd3BiY19zY3JvbGxfdGltZWxpbmVfc2Nyb2xsX21vbnRoJyApLnZhbCgpLnRyaW0oKSApICE9PSAwKVxyXG4gICAgICAgICAgICApe1xyXG4gICAgICAgICAgICAgICAgd3BiY19zaG9ydGNvZGUgKz0gJyBzY3JvbGxfbW9udGg9JyArIHBhcnNlSW50KCBqUXVlcnkoICcjJyArIHNob3J0Y29kZV9pZCArICdfd3BiY19zY3JvbGxfdGltZWxpbmVfc2Nyb2xsX21vbnRoJyApLnZhbCgpLnRyaW0oKSApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIDogc2Nyb2xsX2RheVxyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAoICAgalF1ZXJ5KCAnIycgKyBzaG9ydGNvZGVfaWQgKyAnX3dwYmNfc2Nyb2xsX3RpbWVsaW5lX3Njcm9sbF9kYXlzJyApLmlzKCAnOnZpc2libGUnICkpXHJcbiAgICAgICAgICAgICAgICAmJiAoICAgalF1ZXJ5KCAnIycgKyBzaG9ydGNvZGVfaWQgKyAnX3dwYmNfc2Nyb2xsX3RpbWVsaW5lX3Njcm9sbF9kYXlzJyApLmxlbmd0aCA+IDApXHJcbiAgICAgICAgICAgICAgICAmJiAocGFyc2VJbnQoIGpRdWVyeSggJyMnICsgc2hvcnRjb2RlX2lkICsgJ193cGJjX3Njcm9sbF90aW1lbGluZV9zY3JvbGxfZGF5cycgKS52YWwoKS50cmltKCkgKSAhPT0gMClcclxuICAgICAgICAgICAgKXtcclxuICAgICAgICAgICAgICAgIHdwYmNfc2hvcnRjb2RlICs9ICcgc2Nyb2xsX2RheT0nICsgcGFyc2VJbnQoIGpRdWVyeSggJyMnICsgc2hvcnRjb2RlX2lkICsgJ193cGJjX3Njcm9sbF90aW1lbGluZV9zY3JvbGxfZGF5cycgKS52YWwoKS50cmltKCkgKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gOmxpbWl0X2hvdXJzXHJcbiAgICAgICAgICAgIC8vRml4SW46IDcuMC4xLjE3XHJcbiAgICAgICAgICAgIGpRdWVyeSggJy5ib29raW5ndGltZWxpbmVfdmlld190aW1lcycgKS5oaWRlKCk7XHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICggKCB3cGJjX2lzX21hdHJpeCApICYmICggdmlld19kYXlzX251bV90ZW1wID09IDEgKSApXHJcbiAgICAgICAgICAgICAgICB8fCAoICggISB3cGJjX2lzX21hdHJpeCApICYmICggdmlld19kYXlzX251bV90ZW1wID09IDMwICkgKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIGpRdWVyeSggJy5ib29raW5ndGltZWxpbmVfdmlld190aW1lcycgKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmlld190aW1lc19zdGFydF90ZW1wID0gcGFyc2VJbnQoIGpRdWVyeSggJyNib29raW5ndGltZWxpbmVfd3BiY19zdGFydF9lbmRfdGltZV90aW1lbGluZV9zdGFydHRpbWUnICkudmFsKCkudHJpbSgpICk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmlld190aW1lc19lbmRfdGVtcCA9IHBhcnNlSW50KCBqUXVlcnkoICcjYm9va2luZ3RpbWVsaW5lX3dwYmNfc3RhcnRfZW5kX3RpbWVfdGltZWxpbmVfZW5kdGltZScgKS52YWwoKS50cmltKCkgKTtcclxuICAgICAgICAgICAgICAgIGlmICggKHZpZXdfdGltZXNfc3RhcnRfdGVtcCAhPSAwKSB8fCAodmlld190aW1lc19lbmRfdGVtcCAhPSAyNCkgKXtcclxuICAgICAgICAgICAgICAgICAgICB3cGJjX3Nob3J0Y29kZSArPSAnIGxpbWl0X2hvdXJzPVxcJycgKyB2aWV3X3RpbWVzX3N0YXJ0X3RlbXAgKyAnLCcgKyB2aWV3X3RpbWVzX2VuZF90ZW1wICsgJ1xcJyc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIDpzY3JvbGxfc3RhcnRfZGF0ZVxyXG4gICAgICAgICAgICBpZiAoICAoIGpRdWVyeSgnI2Jvb2tpbmd0aW1lbGluZV93cGJjX3N0YXJ0X2RhdGVfdGltZWxpbmVfYWN0aXZlJykuaXMoJzpjaGVja2VkJykgKSAgJiYgKCBqUXVlcnkoICcjYm9va2luZ3RpbWVsaW5lX3dwYmNfc3RhcnRfZGF0ZV90aW1lbGluZV9hY3RpdmUnICkubGVuZ3RoID4gMCApICApIHtcclxuICAgICAgICAgICAgICAgICB3cGJjX3Nob3J0Y29kZSArPSAnIHNjcm9sbF9zdGFydF9kYXRlPVxcJycgKyBqUXVlcnkoICcjYm9va2luZ3RpbWVsaW5lX3dwYmNfc3RhcnRfZGF0ZV90aW1lbGluZV95ZWFyJyApLnZhbCgpLnRyaW0oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgJy0nICsgalF1ZXJ5KCAnI2Jvb2tpbmd0aW1lbGluZV93cGJjX3N0YXJ0X2RhdGVfdGltZWxpbmVfbW9udGgnICkudmFsKCkudHJpbSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyAnLScgKyBqUXVlcnkoICcjYm9va2luZ3RpbWVsaW5lX3dwYmNfc3RhcnRfZGF0ZV90aW1lbGluZV9kYXknICkudmFsKCkudHJpbSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArICdcXCcnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vIFtib29raW5nZm9ybSAgXSAtIEZvcm0gT25seSAgICAgICAgLSAgICAgW2Jvb2tpbmdmb3JtIHR5cGU9MSBzZWxlY3RlZF9kYXRlcz0nMDEuMDMuMjAyNCddXHJcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIGlmICggJ2Jvb2tpbmdmb3JtJyA9PT0gc2hvcnRjb2RlX2lkICl7XHJcblxyXG4gICAgICAgICAgICB2YXIgd3BiY19zZWxlY3RlZF9kYXkgPSBqUXVlcnkoICcjJyArIHNob3J0Y29kZV9pZCArICdfd3BiY19ib29raW5nX2RhdGVfZGF5JyApLnZhbCgpLnRyaW0oKTtcclxuICAgICAgICAgICAgaWYgKCBwYXJzZUludCh3cGJjX3NlbGVjdGVkX2RheSkgPCAxMCApe1xyXG4gICAgICAgICAgICAgICAgd3BiY19zZWxlY3RlZF9kYXkgPSAnMCcgKyB3cGJjX3NlbGVjdGVkX2RheTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgd3BiY19zZWxlY3RlZF9tb250aCA9IGpRdWVyeSggJyMnICsgc2hvcnRjb2RlX2lkICsgJ193cGJjX2Jvb2tpbmdfZGF0ZV9tb250aCcgKS52YWwoKS50cmltKCk7XHJcbiAgICAgICAgICAgIGlmICggcGFyc2VJbnQod3BiY19zZWxlY3RlZF9tb250aCkgPCAxMCApe1xyXG4gICAgICAgICAgICAgICAgd3BiY19zZWxlY3RlZF9tb250aCA9ICcwJyArIHdwYmNfc2VsZWN0ZWRfbW9udGg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgd3BiY19zaG9ydGNvZGUgKz0gJyBzZWxlY3RlZF9kYXRlcz1cXCcnICsgd3BiY19zZWxlY3RlZF9kYXkgKyAnLicgKyB3cGJjX3NlbGVjdGVkX21vbnRoICsgJy4nICsgalF1ZXJ5KCAnIycgKyBzaG9ydGNvZGVfaWQgKyAnX3dwYmNfYm9va2luZ19kYXRlX3llYXInICkudmFsKCkudHJpbSgpICsgJ1xcJyc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLy8gW2Jvb2tpbmdzZWFyY2ggIF0gLSBPcHRpb25zIHJlbGF0aXZlIG9ubHkgdG8gdGhpcyBzaG9ydGNvZGUuICAgICBbYm9va2luZ3NlYXJjaCBzZWFyY2hyZXN1bHRzdGl0bGU9J3tzZWFyY2hyZXN1bHRzfSBSZXN1bHQocykgRm91bmQnIG5vcmVzdWx0c3RpdGxlPSdOb3RoaW5nIEZvdW5kJ11cclxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgaWYgKCAnYm9va2luZ3NlYXJjaCcgPT09IHNob3J0Y29kZV9pZCApe1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgIGlmIHdlIHNlbGVjdGVkICdib29raW5nc2VhcmNoJyB8ICdib29raW5nc2VhcmNocmVzdWx0cydcclxuICAgICAgICAgICAgdmFyIHdwYmNfc2VhcmNoX2Zvcm1fcmVzdWx0cyA9ICdib29raW5nc2VhcmNoJztcclxuICAgICAgICAgICAgaWYgKCBqUXVlcnkoIFwiaW5wdXRbbmFtZT0nYm9va2luZ3NlYXJjaF93cGJjX3NlYXJjaF9mb3JtX3Jlc3VsdHMnXTpjaGVja2VkXCIgKS5sZW5ndGggPiAwICl7XHJcbiAgICAgICAgICAgICAgICB3cGJjX3NlYXJjaF9mb3JtX3Jlc3VsdHMgPSBqUXVlcnkoIFwiaW5wdXRbbmFtZT0nYm9va2luZ3NlYXJjaF93cGJjX3NlYXJjaF9mb3JtX3Jlc3VsdHMnXTpjaGVja2VkXCIgKS52YWwoKS50cmltKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFNob3cgfCBIaWRlIGZvcm0gIGZpZWxkcyBmb3IgJ2Jvb2tpbmdzZWFyY2gnIGRlcGVuZHMgZnJvbSAgcmFkaW8gIGJ1dGlvbiAgc2VsZWN0aW9uXHJcbiAgICAgICAgICAgIGlmICggJ2Jvb2tpbmdzZWFyY2hyZXN1bHRzJyA9PT0gd3BiY19zZWFyY2hfZm9ybV9yZXN1bHRzICl7XHJcbiAgICAgICAgICAgICAgICB3cGJjX3Nob3J0Y29kZSA9ICdbYm9va2luZ3NlYXJjaHJlc3VsdHMnO1xyXG4gICAgICAgICAgICAgICAgalF1ZXJ5KCAnLndwYmNfc2VhcmNoX2F2YWlsYWJpbGl0eV9mb3JtJyApLmhpZGUoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGpRdWVyeSggJy53cGJjX3NlYXJjaF9hdmFpbGFiaWxpdHlfZm9ybScgKS5zaG93KCk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIC8vIE5ldyBwYWdlIGZvciBzZWFyY2ggcmVzdWx0c1xyXG4gICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgIChqUXVlcnkoICcjJyArIHNob3J0Y29kZV9pZCArICdfd3BiY19zZWFyY2hfbmV3X3BhZ2VfZW5hYmxlZCcgKS5sZW5ndGggPiAwKVxyXG4gICAgICAgICAgICAgICAgICAgICYmIChqUXVlcnkoICcjJyArIHNob3J0Y29kZV9pZCArICdfd3BiY19zZWFyY2hfbmV3X3BhZ2VfZW5hYmxlZCcgKS5pcyggJzpjaGVja2VkJyApKVxyXG4gICAgICAgICAgICAgICAgKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBTaG93XHJcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCAnLicgKyBzaG9ydGNvZGVfaWQgKyAnX3dwYmNfc2VhcmNoX25ld19wYWdlX3dwYmNfc2Nfc2VhcmNocmVzdWx0c19uZXdfcGFnZScgKS5zaG93KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIDogU2VhcmNoIFJlc3VsdHMgVVJMXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBqUXVlcnkoICcjJyArIHNob3J0Y29kZV9pZCArICdfd3BiY19zZWFyY2hfbmV3X3BhZ2VfdXJsJyApLmxlbmd0aCA+IDAgKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlYXJjaF9yZXN1bHRzX3VybF90ZW1wID0galF1ZXJ5KCAnIycgKyBzaG9ydGNvZGVfaWQgKyAnX3dwYmNfc2VhcmNoX25ld19wYWdlX3VybCcgKS52YWwoKS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaF9yZXN1bHRzX3VybF90ZW1wID0gc2VhcmNoX3Jlc3VsdHNfdXJsX3RlbXAucmVwbGFjZSggLycvZ2ksICcnICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggc2VhcmNoX3Jlc3VsdHNfdXJsX3RlbXAgIT0gJycgKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdwYmNfc2hvcnRjb2RlICs9ICcgc2VhcmNocmVzdWx0cz1cXCcnICsgc2VhcmNoX3Jlc3VsdHNfdXJsX3RlbXAgKyAnXFwnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSGlkZVxyXG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeSggJy4nICsgc2hvcnRjb2RlX2lkICsgJ193cGJjX3NlYXJjaF9uZXdfcGFnZV93cGJjX3NjX3NlYXJjaHJlc3VsdHNfbmV3X3BhZ2UnICkuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuLyogICAgICAgICAgICAgIC8vRml4SW46IDEwLjAuMC40MVxyXG4gICAgICAgICAgICAgICAgLy8gOiBTZWFyY2ggSGVhZGVyXHJcbiAgICAgICAgICAgICAgICBpZiAoIGpRdWVyeSggJyMnICsgc2hvcnRjb2RlX2lkICsgJ193cGJjX3NlYXJjaF9oZWFkZXInICkubGVuZ3RoID4gMCApe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZWFyY2hfaGVhZGVyX3RlbXAgPSBqUXVlcnkoICcjJyArIHNob3J0Y29kZV9pZCArICdfd3BiY19zZWFyY2hfaGVhZGVyJyApLnZhbCgpLnRyaW0oKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hfaGVhZGVyX3RlbXAgPSBzZWFyY2hfaGVhZGVyX3RlbXAucmVwbGFjZSggLycvZ2ksICcnICk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBzZWFyY2hfaGVhZGVyX3RlbXAgIT0gJycgKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd3BiY19zaG9ydGNvZGUgKz0gJyBzZWFyY2hyZXN1bHRzdGl0bGU9XFwnJyArIHNlYXJjaF9oZWFkZXJfdGVtcCArICdcXCcnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIDogTm90aGluZyBGb3VuZFxyXG4gICAgICAgICAgICAgICAgaWYgKCBqUXVlcnkoICcjJyArIHNob3J0Y29kZV9pZCArICdfd3BiY19zZWFyY2hfbm90aGluZ19mb3VuZCcgKS5sZW5ndGggPiAwICl7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5vdGhpbmdmb3VuZF90ZW1wID0galF1ZXJ5KCAnIycgKyBzaG9ydGNvZGVfaWQgKyAnX3dwYmNfc2VhcmNoX25vdGhpbmdfZm91bmQnICkudmFsKCkudHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vdGhpbmdmb3VuZF90ZW1wID0gbm90aGluZ2ZvdW5kX3RlbXAucmVwbGFjZSggLycvZ2ksICcnICk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBub3RoaW5nZm91bmRfdGVtcCAhPSAnJyApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3cGJjX3Nob3J0Y29kZSArPSAnIG5vcmVzdWx0c3RpdGxlPVxcJycgKyBub3RoaW5nZm91bmRfdGVtcCArICdcXCcnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuKi9cclxuICAgICAgICAgICAgICAgIC8vIDogVXNlcnMgICAgICAvLyBbYm9va2luZ3NlYXJjaCBzZWFyY2hyZXN1bHRzdGl0bGU9J3tzZWFyY2hyZXN1bHRzfSBSZXN1bHQocykgRm91bmQnIG5vcmVzdWx0c3RpdGxlPSdOb3RoaW5nIEZvdW5kJyB1c2Vycz0nMyw0NTQzLCddXHJcbiAgICAgICAgICAgICAgICBpZiAoIGpRdWVyeSggJyMnICsgc2hvcnRjb2RlX2lkICsgJ193cGJjX3NlYXJjaF9mb3JfdXNlcnMnICkubGVuZ3RoID4gMCApe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBvbmx5X2Zvcl91c2Vyc190ZW1wID0galF1ZXJ5KCAnIycgKyBzaG9ydGNvZGVfaWQgKyAnX3dwYmNfc2VhcmNoX2Zvcl91c2VycycgKS52YWwoKS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgb25seV9mb3JfdXNlcnNfdGVtcCA9IG9ubHlfZm9yX3VzZXJzX3RlbXAucmVwbGFjZSggLycvZ2ksICcnICk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBvbmx5X2Zvcl91c2Vyc190ZW1wICE9ICcnICl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdwYmNfc2hvcnRjb2RlICs9ICcgdXNlcnM9XFwnJyArIG9ubHlfZm9yX3VzZXJzX3RlbXAgKyAnXFwnJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vIFtib29raW5nZWRpdF0gLCBbYm9va2luZ2N1c3RvbWVybGlzdGluZ10gLCBbYm9va2luZ3Jlc291cmNlIHR5cGU9NiBzaG93PSdjYXBhY2l0eSddICwgW2Jvb2tpbmdfY29uZmlybV1cclxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgaWYgKCAnYm9va2luZ290aGVyJyA9PT0gc2hvcnRjb2RlX2lkICl7XHJcblxyXG4gICAgICAgICAgICAvL1RSSUNLOlxyXG4gICAgICAgICAgICBzaG9ydGNvZGVfaWQgPSAnbm8nOyAgLy9yZXF1aXJlZCBmb3Igbm90IHVwZGF0ZSBib29raW5nIHJlc291cmNlIElEXHJcblxyXG4gICAgICAgICAgICAvLyBDaGVjayAgaWYgd2Ugc2VsZWN0ZWQgJ2Jvb2tpbmdzZWFyY2gnIHwgJ2Jvb2tpbmdzZWFyY2hyZXN1bHRzJ1xyXG4gICAgICAgICAgICB2YXIgYm9va2luZ290aGVyX3Nob3J0Y29kZV90eXBlID0gJ2Jvb2tpbmdzZWFyY2gnO1xyXG4gICAgICAgICAgICBpZiAoIGpRdWVyeSggXCJpbnB1dFtuYW1lPSdib29raW5nb3RoZXJfd3BiY19zaG9ydGNvZGVfdHlwZSddOmNoZWNrZWRcIiApLmxlbmd0aCA+IDAgKXtcclxuICAgICAgICAgICAgICAgIGJvb2tpbmdvdGhlcl9zaG9ydGNvZGVfdHlwZSA9IGpRdWVyeSggXCJpbnB1dFtuYW1lPSdib29raW5nb3RoZXJfd3BiY19zaG9ydGNvZGVfdHlwZSddOmNoZWNrZWRcIiApLnZhbCgpLnRyaW0oKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gU2hvdyB8IEhpZGUgc2VjdGlvbnNcclxuICAgICAgICAgICAgaWYgKCAnYm9va2luZ19jb25maXJtJyA9PT0gYm9va2luZ290aGVyX3Nob3J0Y29kZV90eXBlICl7XHJcbiAgICAgICAgICAgICAgICB3cGJjX3Nob3J0Y29kZSA9ICdbYm9va2luZ19jb25maXJtJztcclxuICAgICAgICAgICAgICAgIGpRdWVyeSggJy5ib29raW5nb3RoZXJfc2VjdGlvbl9hZGRpdGlvbmFsJyApLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIGpRdWVyeSggJy5ib29raW5nb3RoZXJfc2VjdGlvbl8nICsgYm9va2luZ290aGVyX3Nob3J0Y29kZV90eXBlICkuc2hvdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICggJ2Jvb2tpbmdlZGl0JyA9PT0gYm9va2luZ290aGVyX3Nob3J0Y29kZV90eXBlICl7XHJcbiAgICAgICAgICAgICAgICB3cGJjX3Nob3J0Y29kZSA9ICdbYm9va2luZ2VkaXQnO1xyXG4gICAgICAgICAgICAgICAgalF1ZXJ5KCAnLmJvb2tpbmdvdGhlcl9zZWN0aW9uX2FkZGl0aW9uYWwnICkuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgalF1ZXJ5KCAnLmJvb2tpbmdvdGhlcl9zZWN0aW9uXycgKyBib29raW5nb3RoZXJfc2hvcnRjb2RlX3R5cGUgKS5zaG93KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCAnYm9va2luZ2N1c3RvbWVybGlzdGluZycgPT09IGJvb2tpbmdvdGhlcl9zaG9ydGNvZGVfdHlwZSApe1xyXG4gICAgICAgICAgICAgICAgd3BiY19zaG9ydGNvZGUgPSAnW2Jvb2tpbmdjdXN0b21lcmxpc3RpbmcnO1xyXG4gICAgICAgICAgICAgICAgalF1ZXJ5KCAnLmJvb2tpbmdvdGhlcl9zZWN0aW9uX2FkZGl0aW9uYWwnICkuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgalF1ZXJ5KCAnLmJvb2tpbmdvdGhlcl9zZWN0aW9uXycgKyBib29raW5nb3RoZXJfc2hvcnRjb2RlX3R5cGUgKS5zaG93KCk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICggJ2Jvb2tpbmdyZXNvdXJjZScgPT09IGJvb2tpbmdvdGhlcl9zaG9ydGNvZGVfdHlwZSApe1xyXG5cclxuICAgICAgICAgICAgICAgIC8vVFJJQ0s6XHJcbiAgICAgICAgICAgICAgICBzaG9ydGNvZGVfaWQgPSAnYm9va2luZ290aGVyJzsgIC8vcmVxdWlyZWQgdG8gZm9yY2UgdXBkYXRlIGJvb2tpbmcgcmVzb3VyY2UgSURcclxuXHJcbiAgICAgICAgICAgICAgICB3cGJjX3Nob3J0Y29kZSA9ICdbYm9va2luZ3Jlc291cmNlJztcclxuICAgICAgICAgICAgICAgIGpRdWVyeSggJy5ib29raW5nb3RoZXJfc2VjdGlvbl9hZGRpdGlvbmFsJyApLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIGpRdWVyeSggJy5ib29raW5nb3RoZXJfc2VjdGlvbl8nICsgYm9va2luZ290aGVyX3Nob3J0Y29kZV90eXBlICkuc2hvdygpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICggalF1ZXJ5KCAnI2Jvb2tpbmdvdGhlcl93cGJjX3Jlc291cmNlX3Nob3cnICkudmFsKCkudHJpbSgpICE9ICd0aXRsZScgKXtcclxuICAgICAgICAgICAgICAgICAgICB3cGJjX3Nob3J0Y29kZSArPSAnIHNob3c9XFwnJyArIGpRdWVyeSggJyNib29raW5nb3RoZXJfd3BiY19yZXNvdXJjZV9zaG93JyApLnZhbCgpLnRyaW0oKSArICdcXCcnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBbYm9va2luZy1tYW5hZ2VyLWltcG9ydCAuLi5dICAgICB8fCAgICAgIFtib29raW5nLW1hbmFnZXItbGlzdGluZyAuLi5dXHJcbiAgICAgICAgaWYgKCAoJ2Jvb2tpbmdfaW1wb3J0X2ljcycgPT09IHNob3J0Y29kZV9pZCkgfHwgKCdib29raW5nX2xpc3RpbmdfaWNzJyA9PT0gc2hvcnRjb2RlX2lkKSApe1xyXG5cclxuICAgICAgICAgICAgd3BiY19zaG9ydGNvZGUgPSAnW2Jvb2tpbmctbWFuYWdlci1pbXBvcnQnO1xyXG5cclxuICAgICAgICAgICAgaWYgKCAnYm9va2luZ19saXN0aW5nX2ljcycgPT09IHNob3J0Y29kZV9pZCApe1xyXG4gICAgICAgICAgICAgICAgd3BiY19zaG9ydGNvZGUgPSAnW2Jvb2tpbmctbWFuYWdlci1saXN0aW5nJztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgICAgICAvLyA6IC5pY3MgZmVlZCBVUkxcclxuICAgICAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgICAgICB2YXIgc2hvcnRjb2RlX3VybF90ZW1wID0gJydcclxuICAgICAgICAgICAgaWYgKCBqUXVlcnkoICcjJyArIHNob3J0Y29kZV9pZCArICdfd3BiY191cmwnICkubGVuZ3RoID4gMCApe1xyXG4gICAgICAgICAgICAgICAgc2hvcnRjb2RlX3VybF90ZW1wID0galF1ZXJ5KCAnIycgKyBzaG9ydGNvZGVfaWQgKyAnX3dwYmNfdXJsJyApLnZhbCgpLnRyaW0oKTtcclxuICAgICAgICAgICAgICAgIHNob3J0Y29kZV91cmxfdGVtcCA9IHNob3J0Y29kZV91cmxfdGVtcC5yZXBsYWNlKCAvJy9naSwgJycgKTtcclxuICAgICAgICAgICAgICAgIGlmICggc2hvcnRjb2RlX3VybF90ZW1wICE9ICcnICl7XHJcbiAgICAgICAgICAgICAgICAgICAgd3BiY19zaG9ydGNvZGUgKz0gJyB1cmw9XFwnJyArIHNob3J0Y29kZV91cmxfdGVtcCArICdcXCcnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCBzaG9ydGNvZGVfdXJsX3RlbXAgPT0gJycgKXtcclxuICAgICAgICAgICAgICAgIC8vIEVycm9yOlxyXG4gICAgICAgICAgICAgICAgd3BiY19zaG9ydGNvZGUgPSAnWyBVUkwgaXMgcmVxdWlyZWQgJ1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIFZBTElEOlxyXG5cclxuICAgICAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAgICAgICAgIC8vIFsuLi4gZnJvbT0nJyAnZnJvbV9vZmZzZXQ9JycgIC4uLl1cclxuICAgICAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAgICAgICAgIGlmICggalF1ZXJ5KCAnIycgKyBzaG9ydGNvZGVfaWQgKyAnX2Zyb20nICkubGVuZ3RoID4gMCApe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwX2Zyb20gICAgICAgICAgPSBqUXVlcnkoICcjJyArIHNob3J0Y29kZV9pZCArICdfZnJvbScgKS52YWwoKS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBfZnJvbV9vZmZzZXQgICA9IGpRdWVyeSggJyMnICsgc2hvcnRjb2RlX2lkICsgJ19mcm9tX29mZnNldCcgKS52YWwoKS50cmltKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHBfZnJvbSAgICAgICAgPSBwX2Zyb20ucmVwbGFjZSggLycvZ2ksICcnICk7XHJcbiAgICAgICAgICAgICAgICAgICAgcF9mcm9tX29mZnNldCA9IHBfZnJvbV9vZmZzZXQucmVwbGFjZSggLycvZ2ksICcnICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICggKCcnICE9IHBfZnJvbSkgJiYgKCdkYXRlJyAhPSBwX2Zyb20pICl7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBPZmZzZXRcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdwYmNfc2hvcnRjb2RlICs9ICcgZnJvbT1cXCcnICsgcF9mcm9tICsgJ1xcJyc7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoICgnYW55JyAhPSBwX2Zyb20pICYmICgnJyAhPSBwX2Zyb21fb2Zmc2V0KSApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcF9mcm9tX29mZnNldCA9IHBhcnNlSW50KCBwX2Zyb21fb2Zmc2V0ICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoICFpc05hTiggcF9mcm9tX29mZnNldCApICl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3BiY19zaG9ydGNvZGUgKz0gJyBmcm9tX29mZnNldD1cXCcnICsgcF9mcm9tX29mZnNldCArIGpRdWVyeSggJyMnICsgc2hvcnRjb2RlX2lkICsgJ19mcm9tX29mZnNldF90eXBlJyApLnZhbCgpLnRyaW0oKS5jaGFyQXQoIDAgKSArICdcXCcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIChwX2Zyb20gPT0gJ2RhdGUnKSAmJiAocF9mcm9tX29mZnNldCAhPSAnJykgKXtcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgc2VsZWN0ZWQgRGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3cGJjX3Nob3J0Y29kZSArPSAnIGZyb209XFwnJyArIHBfZnJvbV9vZmZzZXQgKyAnXFwnJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgICAgICAgICAgLy8gWy4uLiB1bnRpbD0nJyAndW50aWxfb2Zmc2V0PScnICAuLi5dXHJcbiAgICAgICAgICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgICAgICAgICBpZiAoIGpRdWVyeSggJyMnICsgc2hvcnRjb2RlX2lkICsgJ191bnRpbCcgKS5sZW5ndGggPiAwICl7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBfdW50aWwgICAgICAgICAgPSBqUXVlcnkoICcjJyArIHNob3J0Y29kZV9pZCArICdfdW50aWwnICkudmFsKCkudHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwX3VudGlsX29mZnNldCAgID0galF1ZXJ5KCAnIycgKyBzaG9ydGNvZGVfaWQgKyAnX3VudGlsX29mZnNldCcgKS52YWwoKS50cmltKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHBfdW50aWwgICAgICAgID0gcF91bnRpbC5yZXBsYWNlKCAvJy9naSwgJycgKTtcclxuICAgICAgICAgICAgICAgICAgICBwX3VudGlsX29mZnNldCA9IHBfdW50aWxfb2Zmc2V0LnJlcGxhY2UoIC8nL2dpLCAnJyApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoICgnJyAhPSBwX3VudGlsKSAmJiAoJ2RhdGUnICE9IHBfdW50aWwpICl7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBPZmZzZXRcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdwYmNfc2hvcnRjb2RlICs9ICcgdW50aWw9XFwnJyArIHBfdW50aWwgKyAnXFwnJztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggKCdhbnknICE9IHBfdW50aWwpICYmICgnJyAhPSBwX3VudGlsX29mZnNldCkgKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBfdW50aWxfb2Zmc2V0ID0gcGFyc2VJbnQoIHBfdW50aWxfb2Zmc2V0ICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoICFpc05hTiggcF91bnRpbF9vZmZzZXQgKSApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdwYmNfc2hvcnRjb2RlICs9ICcgdW50aWxfb2Zmc2V0PVxcJycgKyBwX3VudGlsX29mZnNldCArIGpRdWVyeSggJyMnICsgc2hvcnRjb2RlX2lkICsgJ191bnRpbF9vZmZzZXRfdHlwZScgKS52YWwoKS50cmltKCkuY2hhckF0KCAwICkgKyAnXFwnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCAocF91bnRpbCA9PSAnZGF0ZScpICYmIChwX3VudGlsX29mZnNldCAhPSAnJykgKXtcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgc2VsZWN0ZWQgRGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3cGJjX3Nob3J0Y29kZSArPSAnIHVudGlsPVxcJycgKyBwX3VudGlsX29mZnNldCArICdcXCcnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblx0XHRcdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cdFx0XHRcdC8vIE1heFxyXG5cdFx0XHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAgICAgICAgIGlmICggalF1ZXJ5KCAnIycgKyBzaG9ydGNvZGVfaWQgKyAnX2NvbmRpdGlvbnNfbWF4X251bScgKS5sZW5ndGggPiAwICl7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBfbWF4ID0gcGFyc2VJbnQoIGpRdWVyeSggICcjJyArIHNob3J0Y29kZV9pZCArICdfY29uZGl0aW9uc19tYXhfbnVtJyApLnZhbCgpLnRyaW0oKSApO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICggcF9tYXggIT0gMCApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3cGJjX3Nob3J0Y29kZSArPSAnIG1heD0nICsgcF9tYXg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHRcdFx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblx0XHRcdFx0Ly8gU2lsZW5jZVxyXG5cdFx0XHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAgICAgICAgIGlmICggalF1ZXJ5KCAnIycgKyBzaG9ydGNvZGVfaWQgKyAnX3NpbGVuY2UnICkubGVuZ3RoID4gMCApe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICggJzEnID09PSBqUXVlcnkoICcjJyArIHNob3J0Y29kZV9pZCArICdfc2lsZW5jZScgKS52YWwoKS50cmltKCkgKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd3BiY19zaG9ydGNvZGUgKz0gJyBzaWxlbmNlPTEnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblx0XHRcdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cdFx0XHRcdC8vIGlzX2FsbF9kYXRlc19pblxyXG5cdFx0XHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAgICAgICAgIGlmICggalF1ZXJ5KCAnIycgKyBzaG9ydGNvZGVfaWQgKyAnX2NvbmRpdGlvbnNfZXZlbnRzJyApLmxlbmd0aCA+IDAgKXtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcF9pc19hbGxfZGF0ZXNfaW4gPSBwYXJzZUludCggalF1ZXJ5KCAnIycgKyBzaG9ydGNvZGVfaWQgKyAnX2NvbmRpdGlvbnNfZXZlbnRzJyAgKS52YWwoKS50cmltKCkgKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIHBfaXNfYWxsX2RhdGVzX2luICE9IDAgKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd3BiY19zaG9ydGNvZGUgKz0gJyBpc19hbGxfZGF0ZXNfaW49JyArIHBfaXNfYWxsX2RhdGVzX2luO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblx0XHRcdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cdFx0XHRcdC8vIGltcG9ydF9jb25kaXRpb25zXHJcblx0XHRcdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgICAgICAgICAgaWYgKCBqUXVlcnkoICcjJyArIHNob3J0Y29kZV9pZCArICdfY29uZGl0aW9uc19pbXBvcnQnICkubGVuZ3RoID4gMCApe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwX2ltcG9ydF9jb25kaXRpb25zID0galF1ZXJ5KCAgJyMnICsgc2hvcnRjb2RlX2lkICsgJ19jb25kaXRpb25zX2ltcG9ydCcgKS52YWwoKS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcF9pbXBvcnRfY29uZGl0aW9ucyA9IHBfaW1wb3J0X2NvbmRpdGlvbnMucmVwbGFjZSggLycvZ2ksICcnICk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBwX2ltcG9ydF9jb25kaXRpb25zICE9ICcnICl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdwYmNfc2hvcnRjb2RlICs9ICcgaW1wb3J0X2NvbmRpdGlvbnM9XFwnJyArIHBfaW1wb3J0X2NvbmRpdGlvbnMgKyAnXFwnJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vIFtib29raW5nXSAsIFtib29raW5nY2FsZW5kYXJdICwgLi4uICBwYXJhbWV0ZXJzIGZvciB0aGVzZSBzaG9ydGNvZGVzIGFuZCBvdGhlcnMuLi5cclxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgaWYgKCBqUXVlcnkoICcjJyArIHNob3J0Y29kZV9pZCArICdfd3BiY19yZXNvdXJjZV9pZCcgKS5sZW5ndGggPiAwICkge1xyXG4gICAgICAgICAgICBpZiAoIGpRdWVyeSggJyMnICsgc2hvcnRjb2RlX2lkICsgJ193cGJjX3Jlc291cmNlX2lkJyApLnZhbCgpID09PSBudWxsICkge1x0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL0ZpeEluOiA4LjIuMS4xMlxyXG4gICAgICAgICAgICAgICAgalF1ZXJ5KCAnI3dwYmNfdGV4dF9wdXRfaW5fc2hvcnRjb2RlJyApLnZhbCggJy0tLScgKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHdwYmNfc2hvcnRjb2RlICs9ICcgcmVzb3VyY2VfaWQ9JyArIGpRdWVyeSggJyMnICsgc2hvcnRjb2RlX2lkICsgJ193cGJjX3Jlc291cmNlX2lkJyApLnZhbCgpLnRyaW0oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIGpRdWVyeSggJyMnICsgc2hvcnRjb2RlX2lkICsgJ193cGJjX2N1c3RvbV9mb3JtJyApLmxlbmd0aCA+IDAgKSB7XHJcbiAgICAgICAgICAgIHZhciBmb3JtX3R5cGVfdGVtcCA9IGpRdWVyeSggJyMnICsgc2hvcnRjb2RlX2lkICsgJ193cGJjX2N1c3RvbV9mb3JtJyApLnZhbCgpLnRyaW0oKTtcclxuICAgICAgICAgICAgaWYgKCBmb3JtX3R5cGVfdGVtcCAhPSAnc3RhbmRhcmQnIClcclxuICAgICAgICAgICAgICAgIHdwYmNfc2hvcnRjb2RlICs9ICcgZm9ybV90eXBlPVxcJycgKyBqUXVlcnkoICcjJyArIHNob3J0Y29kZV9pZCArICdfd3BiY19jdXN0b21fZm9ybScgKS52YWwoKS50cmltKCkgKyAnXFwnJztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgKCBqUXVlcnkoICcjJyArIHNob3J0Y29kZV9pZCArICdfd3BiY19udW1tb250aHMnICkubGVuZ3RoID4gMCApXHJcbiAgICAgICAgICAgICAmJiAoIHBhcnNlSW50KCBqUXVlcnkoICcjJyArIHNob3J0Y29kZV9pZCArICdfd3BiY19udW1tb250aHMnICkudmFsKCkudHJpbSgpICkgPiAxIClcclxuICAgICAgICApe1xyXG4gICAgICAgICAgICB3cGJjX3Nob3J0Y29kZSArPSAnIG51bW1vbnRocz0nICsgalF1ZXJ5KCAnIycgKyBzaG9ydGNvZGVfaWQgKyAnX3dwYmNfbnVtbW9udGhzJyApLnZhbCgpLnRyaW0oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICggalF1ZXJ5KCcjJyArIHNob3J0Y29kZV9pZCArICdfd3BiY19zdGFydG1vbnRoX2FjdGl2ZScpLmxlbmd0aCA+IDAgKVxyXG4gICAgICAgICAgICAgJiYgKCBqUXVlcnkoJyMnICsgc2hvcnRjb2RlX2lkICsgJ193cGJjX3N0YXJ0bW9udGhfYWN0aXZlJykuaXMoJzpjaGVja2VkJykgKVxyXG4gICAgICAgICl7XHJcbiAgICAgICAgICAgICB3cGJjX3Nob3J0Y29kZSArPSAnIHN0YXJ0bW9udGg9XFwnJyArIGpRdWVyeSggJyMnICsgc2hvcnRjb2RlX2lkICsgJ193cGJjX3N0YXJ0bW9udGhfeWVhcicgKS52YWwoKS50cmltKCkgKyAnLScgKyBqUXVlcnkoICcjJyArIHNob3J0Y29kZV9pZCArICdfd3BiY19zdGFydG1vbnRoX21vbnRoJyApLnZhbCgpLnRyaW0oKSArICdcXCcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCBqUXVlcnkoICcjJyArIHNob3J0Y29kZV9pZCArICdfd3BiY19hZ2dyZWdhdGUnICkubGVuZ3RoID4gMCApIHtcclxuICAgICAgICAgICAgdmFyIHdwYmNfYWdncmVnYXRlX3RlbXAgPSBqUXVlcnkoICcjJyArIHNob3J0Y29kZV9pZCArICdfd3BiY19hZ2dyZWdhdGUnICkudmFsKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoICggd3BiY19hZ2dyZWdhdGVfdGVtcCAhPSBudWxsICkgJiYgKCB3cGJjX2FnZ3JlZ2F0ZV90ZW1wLmxlbmd0aCA+IDAgKSAgKXtcclxuICAgICAgICAgICAgICAgIHdwYmNfYWdncmVnYXRlX3RlbXAgPSB3cGJjX2FnZ3JlZ2F0ZV90ZW1wLmpvaW4oJzsnKVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICggd3BiY19hZ2dyZWdhdGVfdGVtcCAhPSAwICl7ICAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgYWJvdXQgMD0+J05vbmUnXHJcbiAgICAgICAgICAgICAgICAgICAgd3BiY19zaG9ydGNvZGUgKz0gJyBhZ2dyZWdhdGU9XFwnJyArIHdwYmNfYWdncmVnYXRlX3RlbXAgKyAnXFwnJztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBqUXVlcnkoJyMnICsgc2hvcnRjb2RlX2lkICsgJ193cGJjX2FnZ3JlZ2F0ZV9fYm9va2luZ3Nfb25seScpLmlzKCc6Y2hlY2tlZCcpICl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdwYmNfb3B0aW9uc19hcnIucHVzaCggJ3thZ2dyZWdhdGUgdHlwZT1ib29raW5nc19vbmx5fScgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAvLyBPcHRpb24gUGFyYW1cclxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLy8gT3B0aW9ucyA6IFNpemVcclxuICAgICAgICB2YXIgd3BiY19vcHRpb25zX3NpemUgPSAnJztcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAoIGpRdWVyeSgnIycgKyBzaG9ydGNvZGVfaWQgKyAnX3dwYmNfc2l6ZV9lbmFibGVkJykubGVuZ3RoID4gMCApXHJcbiAgICAgICAgICAgICAmJiAoIGpRdWVyeSgnIycgKyBzaG9ydGNvZGVfaWQgKyAnX3dwYmNfc2l6ZV9lbmFibGVkJykuaXMoJzpjaGVja2VkJykgKVxyXG4gICAgICAgICl7XHJcblxyXG4gICAgICAgICAgICAvLyBvcHRpb25zPSd7Y2FsZW5kYXIgbW9udGhzX251bV9pbl9yb3c9MiB3aWR0aD0xMDAlIGNlbGxfaGVpZ2h0PTQwcHh9J1xyXG5cclxuICAgICAgICAgICAgd3BiY19vcHRpb25zX3NpemUgKz0gJ3tjYWxlbmRhcicgO1xyXG4gICAgICAgICAgICB3cGJjX29wdGlvbnNfc2l6ZSArPSAnICcgKyAnbW9udGhzX251bV9pbl9yb3c9J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIE1hdGgubWluKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZUludCggalF1ZXJ5KCAnIycgKyBzaG9ydGNvZGVfaWQgKyAnX3dwYmNfc2l6ZV9tb250aHNfbnVtX2luX3JvdycgKS52YWwoKS50cmltKCkgKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VJbnQoIGpRdWVyeSggJyMnICsgc2hvcnRjb2RlX2lkICsgJ193cGJjX251bW1vbnRocycgKS52YWwoKS50cmltKCkgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgd3BiY19vcHRpb25zX3NpemUgKz0gJyAnICsgJ3dpZHRoPScgKyBwYXJzZUludCggalF1ZXJ5KCAnIycgKyBzaG9ydGNvZGVfaWQgKyAnX3dwYmNfc2l6ZV9jYWxlbmRhcl93aWR0aCcgKS52YWwoKS50cmltKCkgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBqUXVlcnkoICcjJyArIHNob3J0Y29kZV9pZCArICdfd3BiY19zaXplX2NhbGVuZGFyX3dpZHRoX3B4X3ByJyApLnZhbCgpLnRyaW0oKSA7XHJcbiAgICAgICAgICAgIHdwYmNfb3B0aW9uc19zaXplICs9ICcgJyArICdjZWxsX2hlaWdodD0nICsgcGFyc2VJbnQoIGpRdWVyeSggJyMnICsgc2hvcnRjb2RlX2lkICsgJ193cGJjX3NpemVfY2FsZW5kYXJfY2VsbF9oZWlnaHQnICkudmFsKCkudHJpbSgpICkgKyAncHgnO1xyXG4gICAgICAgICAgICB3cGJjX29wdGlvbnNfc2l6ZSArPSAnfSc7XHJcbiAgICAgICAgICAgIHdwYmNfb3B0aW9uc19hcnIucHVzaCggd3BiY19vcHRpb25zX3NpemUgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE9wdGlvbnM6IERheXMgbnVtYmVyIGRlcGVuZCBvbiAgIFdlZWtkYXlcclxuICAgICAgICBpZiAoIGpRdWVyeSggJyMnICsgc2hvcnRjb2RlX2lkICsgJ3dwYmNfc2VsZWN0X2RheV93ZWVrZGF5X3RleHRhcmVhJyApLmxlbmd0aCA+IDAgKSB7XHJcbiAgICAgICAgICAgIHdwYmNfb3B0aW9uc19zaXplID0galF1ZXJ5KCAnIycgKyBzaG9ydGNvZGVfaWQgKyAnd3BiY19zZWxlY3RfZGF5X3dlZWtkYXlfdGV4dGFyZWEnICkudmFsKCkudHJpbSgpO1xyXG4gICAgICAgICAgICBpZiAoIHdwYmNfb3B0aW9uc19zaXplLmxlbmd0aCA+IDAgKXtcclxuICAgICAgICAgICAgICAgIHdwYmNfb3B0aW9uc19hcnIucHVzaCggd3BiY19vcHRpb25zX3NpemUgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gT3B0aW9uczogRGF5cyBudW1iZXIgZGVwZW5kIG9uICAgU0VBU09OXHJcbiAgICAgICAgaWYgKCBqUXVlcnkoICcjJyArIHNob3J0Y29kZV9pZCArICd3cGJjX3NlbGVjdF9kYXlfc2Vhc29uX3RleHRhcmVhJyApLmxlbmd0aCA+IDAgKSB7XHJcbiAgICAgICAgICAgIHdwYmNfb3B0aW9uc19zaXplID0galF1ZXJ5KCAnIycgKyBzaG9ydGNvZGVfaWQgKyAnd3BiY19zZWxlY3RfZGF5X3NlYXNvbl90ZXh0YXJlYScgKS52YWwoKS50cmltKCk7XHJcbiAgICAgICAgICAgIGlmICggd3BiY19vcHRpb25zX3NpemUubGVuZ3RoID4gMCApe1xyXG4gICAgICAgICAgICAgICAgd3BiY19vcHRpb25zX2Fyci5wdXNoKCB3cGJjX29wdGlvbnNfc2l6ZSApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBPcHRpb25zOiBTdGFydCB3ZWVrZGF5IGRlcGVuZCBvbiAgIFNFQVNPTlxyXG4gICAgICAgIGlmICggalF1ZXJ5KCAnIycgKyBzaG9ydGNvZGVfaWQgKyAnd3BiY19zdGFydF9kYXlfc2Vhc29uX3RleHRhcmVhJyApLmxlbmd0aCA+IDAgKSB7XHJcbiAgICAgICAgICAgIHdwYmNfb3B0aW9uc19zaXplID0galF1ZXJ5KCAnIycgKyBzaG9ydGNvZGVfaWQgKyAnd3BiY19zdGFydF9kYXlfc2Vhc29uX3RleHRhcmVhJyApLnZhbCgpLnRyaW0oKTtcclxuICAgICAgICAgICAgaWYgKCB3cGJjX29wdGlvbnNfc2l6ZS5sZW5ndGggPiAwICl7XHJcbiAgICAgICAgICAgICAgICB3cGJjX29wdGlvbnNfYXJyLnB1c2goIHdwYmNfb3B0aW9uc19zaXplICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE9wdGlvbjogRGF5cyBudW1iZXIgZGVwZW5kIG9uIGZyb20gIERBVEVcclxuICAgICAgICBpZiAoIGpRdWVyeSggJyMnICsgc2hvcnRjb2RlX2lkICsgJ3dwYmNfc2VsZWN0X2RheV9mb3JkYXRlX3RleHRhcmVhJyApLmxlbmd0aCA+IDAgKSB7XHJcbiAgICAgICAgICAgIHdwYmNfb3B0aW9uc19zaXplID0galF1ZXJ5KCAnIycgKyBzaG9ydGNvZGVfaWQgKyAnd3BiY19zZWxlY3RfZGF5X2ZvcmRhdGVfdGV4dGFyZWEnICkudmFsKCkudHJpbSgpO1xyXG4gICAgICAgICAgICBpZiAoIHdwYmNfb3B0aW9uc19zaXplLmxlbmd0aCA+IDAgKXtcclxuICAgICAgICAgICAgICAgIHdwYmNfb3B0aW9uc19hcnIucHVzaCggd3BiY19vcHRpb25zX3NpemUgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCB3cGJjX29wdGlvbnNfYXJyLmxlbmd0aCA+IDAgKXtcclxuICAgICAgICAgICAgd3BiY19zaG9ydGNvZGUgKz0gJyBvcHRpb25zPVxcJycgKyB3cGJjX29wdGlvbnNfYXJyLmpvaW4oICcsJyApICsgJ1xcJyc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICB3cGJjX3Nob3J0Y29kZSArPSAnXSc7XHJcblxyXG4gICAgalF1ZXJ5KCAnI3dwYmNfdGV4dF9wdXRfaW5fc2hvcnRjb2RlJyApLnZhbCggd3BiY19zaG9ydGNvZGUgKTtcclxufVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT3BlbiBUaW55TUNFIE1vZGFsICovXHJcbiAgICBmdW5jdGlvbiB3cGJjX3RpbnlfYnRuX2NsaWNrKCB0YWcgKSB7XHJcbiAgICAgICAgLy9GaXhJbjogOS4wLjEuNVxyXG4gICAgICAgIGpRdWVyeSgnI3dwYmNfdGlueV9tb2RhbCcpLndwYmNfbXlfbW9kYWwoe1xyXG4gICAgICAgICAgICBrZXlib2FyZDogZmFsc2VcclxuICAgICAgICAgICwgYmFja2Ryb3A6IHRydWVcclxuICAgICAgICAgICwgc2hvdzogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vRml4SW46IDguMy4zLjk5XHJcbiAgICAgICAgalF1ZXJ5KCBcIiN3cGJjX3RleHRfZ2V0dGVuYmVyZ19zZWN0aW9uX2lkXCIgKS52YWwoICcnICk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT3BlbiBUaW55TUNFIE1vZGFsICovXHJcbiAgICBmdW5jdGlvbiB3cGJjX3RpbnlfY2xvc2UoKSB7XHJcblxyXG4gICAgICAgIGpRdWVyeSgnI3dwYmNfdGlueV9tb2RhbCcpLndwYmNfbXlfbW9kYWwoJ2hpZGUnKTtcdC8vRml4SW46IDkuMC4xLjVcclxuICAgIH1cclxuXHJcbiAgICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuICAgIC8qKiBTZW5kIFRleHQgKi9cclxuICAgIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZW5kIHRleHQgIHRvIGVkaXRvciAqL1xyXG4gICAgZnVuY3Rpb24gd3BiY19zZW5kX3RleHRfdG9fZWRpdG9yKCBoICkge1xyXG5cclxuICAgICAgICAvLyBGaXhJbjogOC4zLjMuOTlcclxuICAgICAgICBpZiAoIHR5cGVvZiggd3BiY19zZW5kX3RleHRfdG9fZ3V0ZW5iZXJnICkgPT0gJ2Z1bmN0aW9uJyApe1xyXG4gICAgICAgICAgICB2YXIgaXNfc2VuZCA9IHdwYmNfc2VuZF90ZXh0X3RvX2d1dGVuYmVyZyggaCApO1xyXG4gICAgICAgICAgICBpZiAoIHRydWUgPT09IGlzX3NlbmQgKXtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBlZCwgbWNlID0gdHlwZW9mKHRpbnltY2UpICE9ICd1bmRlZmluZWQnLCBxdCA9IHR5cGVvZihRVGFncykgIT0gJ3VuZGVmaW5lZCc7XHJcblxyXG4gICAgICAgICAgICBpZiAoICF3cEFjdGl2ZUVkaXRvciApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIG1jZSAmJiB0aW55bWNlLmFjdGl2ZUVkaXRvciApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkID0gdGlueW1jZS5hY3RpdmVFZGl0b3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cEFjdGl2ZUVkaXRvciA9IGVkLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoICFxdCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIG1jZSApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIHRpbnltY2UuYWN0aXZlRWRpdG9yICYmICh0aW55bWNlLmFjdGl2ZUVkaXRvci5pZCA9PSAnbWNlX2Z1bGxzY3JlZW4nIHx8IHRpbnltY2UuYWN0aXZlRWRpdG9yLmlkID09ICd3cF9tY2VfZnVsbHNjcmVlbicpIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkID0gdGlueW1jZS5hY3RpdmVFZGl0b3I7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWQgPSB0aW55bWNlLmdldCh3cEFjdGl2ZUVkaXRvcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICggZWQgJiYgIWVkLmlzSGlkZGVuKCkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVzdG9yZSBjYXJldCBwb3NpdGlvbiBvbiBJRVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICggdGlueW1jZS5pc0lFICYmIGVkLndpbmRvd01hbmFnZXIuaW5zZXJ0aW1hZ2Vib29rbWFyayApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlZC5zZWxlY3Rpb24ubW92ZVRvQm9va21hcmsoZWQud2luZG93TWFuYWdlci5pbnNlcnRpbWFnZWJvb2ttYXJrKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBoLmluZGV4T2YoJ1tjYXB0aW9uJykgIT09IC0xICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBlZC53cFNldEltZ0NhcHRpb24gKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoID0gZWQud3BTZXRJbWdDYXB0aW9uKGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIGguaW5kZXhPZignW2dhbGxlcnknKSAhPT0gLTEgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGVkLnBsdWdpbnMud3BnYWxsZXJ5IClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaCA9IGVkLnBsdWdpbnMud3BnYWxsZXJ5Ll9kb19nYWxsZXJ5KGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIGguaW5kZXhPZignW2VtYmVkJykgPT09IDAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGVkLnBsdWdpbnMud29yZHByZXNzIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaCA9IGVkLnBsdWdpbnMud29yZHByZXNzLl9zZXRFbWJlZChoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGVkLmV4ZWNDb21tYW5kKCdtY2VJbnNlcnRDb250ZW50JywgZmFsc2UsIGgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCBxdCApIHtcclxuICAgICAgICAgICAgICAgICAgICBRVGFncy5pbnNlcnRDb250ZW50KGgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHdwQWN0aXZlRWRpdG9yKS52YWx1ZSArPSBoO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0cnl7dGJfcmVtb3ZlKCk7fWNhdGNoKGUpe307XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSRVNPVVJDRVMgUEFHRTogT3BlbiBUaW55TUNFIE1vZGFsICovXHJcbiAgICBmdW5jdGlvbiB3cGJjX3Jlc291cmNlX3BhZ2VfYnRuX2NsaWNrKCByZXNvdXJjZV9pZCAsIHNob3J0Y29kZV9kZWZhdWx0X3ZhbHVlID0gJycpIHtcclxuXHJcbiAgICAgICAgLy9GaXhJbjogOS4wLjEuNVxyXG4gICAgICAgIGpRdWVyeSgnI3dwYmNfdGlueV9tb2RhbCcpLndwYmNfbXlfbW9kYWwoe1xyXG4gICAgICAgICAgICBrZXlib2FyZDogZmFsc2VcclxuICAgICAgICAgICwgYmFja2Ryb3A6IHRydWVcclxuICAgICAgICAgICwgc2hvdzogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBEaXNhYmxlIHNvbWUgb3B0aW9ucyAtIHNlbGVjdGlvbiBvZiBib29raW5nIHJlc291cmNlIC0gYmVjYXVzZSB3ZSBjb25maWd1cmUgaXQgb25seSBmb3Igc3BlY2lmaWMgYm9va2luZyByZXNvdXJjZSwgd2hlcmUgd2UgY2xpY2tlZC5cclxuICAgICAgICB2YXIgc2hvcnRjb2RlX2FyciA9IFsnYm9va2luZycsICdib29raW5nY2FsZW5kYXInLCAnYm9va2luZ2Zvcm0nXTtcclxuXHJcbiAgICAgICAgZm9yICggdmFyIHNob3J0Y2RlX2tleSBpbiBzaG9ydGNvZGVfYXJyICl7XHJcblxyXG4gICAgICAgICAgICB2YXIgc2hvcnRjb2RlX2lkID0gc2hvcnRjb2RlX2Fyclsgc2hvcnRjZGVfa2V5IF07XHJcblxyXG4gICAgICAgICAgICBqUXVlcnkoICcjJyArIHNob3J0Y29kZV9pZCArICdfd3BiY19yZXNvdXJjZV9pZCcgKS5wcm9wKCBcdFx0ICdkaXNhYmxlZCcsIGZhbHNlICk7XHJcbiAgICAgICAgICAgIGpRdWVyeSggJyMnICsgc2hvcnRjb2RlX2lkICsgXCJfd3BiY19yZXNvdXJjZV9pZCBvcHRpb25bdmFsdWU9J1wiICsgcmVzb3VyY2VfaWQgKyBcIiddXCIgKS5wcm9wKCAnc2VsZWN0ZWQnLCB0cnVlICkudHJpZ2dlciggJ2NoYW5nZScgKTtcclxuICAgICAgICAgICAgalF1ZXJ5KCAnIycgKyBzaG9ydGNvZGVfaWQgKyAnX3dwYmNfcmVzb3VyY2VfaWQnICkucHJvcCggXHRcdCAnZGlzYWJsZWQnLCB0cnVlICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBIaWRlIGxlZnQgIG5hdmlnYXRpb24gIGl0ZW1zXHJcbi8vICAgICAgICBqUXVlcnkoIFwiLndwYmNfc2hvcnRjb2RlX2NvbmZpZ19uYXZpZ2F0aW9uX2NvbHVtbiAud3BiY19zZXR0aW5nc19uYXZpZ2F0aW9uX2l0ZW1cIiApLmhpZGUoKTtcclxuICAgICAgICBqUXVlcnkoIFwiI3dwYmNfc2hvcnRjb2RlX2NvbmZpZ19fbmF2X3RhYl9fYm9va2luZ1wiICkuc2hvdygpO1xyXG4gICAgICAgIGpRdWVyeSggXCIjd3BiY19zaG9ydGNvZGVfY29uZmlnX19uYXZfdGFiX19ib29raW5nY2FsZW5kYXJcIiApLnNob3coKTtcclxuXHJcbiAgICAgICAgLy8gSGlkZSB8IFNob3cgSW5zZXJ0ICBidXR0b24gIGZvciBib29raW5nIHJlc291cmNlIHBhZ2VcclxuICAgICAgICBqUXVlcnkoIFwiLndwYmNfdGlueV9idXR0b25fX2luc2VydF90b19lZGl0b3JcIiApLmhpZGUoKTtcclxuICAgICAgICBqUXVlcnkoIFwiLndwYmNfdGlueV9idXR0b25fX2luc2VydF90b19yZXNvdXJjZVwiICkuc2hvdygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IFNob3J0Y29kZSBWYWx1ZSBmcm9tICBzaG9ydGNvZGUgdGV4dCBmaWVsZCBpbiBQb3BVcCBzaG9ydGNvZGUgQ29uZmlnIGRpYWxvZyBhbmQgaW5zZXJ0ICBpbnRvIERJViBhbmQgSU5QVVQgVEVYVCBmaWVsZCBuZWFyIHNwZWNpZmljIGJvb2tpbmcgcmVzb3VyY2UuXHJcbiAgICAgKiAgQnV0IGl0IHRha2VzIElEICBvZiBib29raW5nIHJlc291cmNlLCAgd2hlcmUgdG8gIGluc2VydCAgdGhpcyBzaG9ydGNvZGUgb25seSBmcm9tICAnYm9va2luZycgc2VjdGlvbiAgb2YgQ29uZmlnIERpYWxvZy4gdXN1YWxseSAgc3VjaCAgYm9va2luZyByZXNvdXJjZSAgZGlzYWJsZWQgdGhlcmUhXHJcbiAgICAgKiAgZS5nLjogalF1ZXJ5KCBcIiNib29raW5nX3dwYmNfcmVzb3VyY2VfaWRcIiApLnZhbCgpXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHNob3J0Y29kZV92YWxcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gd3BiY19zZW5kX3RleHRfdG9fcmVzb3VyY2UoIHNob3J0Y29kZV92YWwgKXtcclxuXHJcbiAgICAgICAgalF1ZXJ5KCAnI2Rpdl9ib29raW5nX3Jlc291cmNlX3Nob3J0Y29kZV8nICsgalF1ZXJ5KCBcIiNib29raW5nX3dwYmNfcmVzb3VyY2VfaWRcIiApLnZhbCgpICkuaHRtbCggc2hvcnRjb2RlX3ZhbCApO1xyXG4gICAgICAgICAgICBqUXVlcnkoICcjYm9va2luZ19yZXNvdXJjZV9zaG9ydGNvZGVfJyArIGpRdWVyeSggXCIjYm9va2luZ193cGJjX3Jlc291cmNlX2lkXCIgKS52YWwoKSApLnZhbCggc2hvcnRjb2RlX3ZhbCApO1xyXG4gICAgICAgICAgICBqUXVlcnkoICcjYm9va2luZ19yZXNvdXJjZV9zaG9ydGNvZGVfJyArIGpRdWVyeSggXCIjYm9va2luZ193cGJjX3Jlc291cmNlX2lkXCIgKS52YWwoKSApLnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cclxuICAgICAgICAvLyBTY3JvbGxcclxuICAgICAgICBpZiAoICdmdW5jdGlvbicgPT09IHR5cGVvZiAod3BiY19zY3JvbGxfdG8pICl7XHJcbiAgICAgICAgICAgIHdwYmNfc2Nyb2xsX3RvKCAnI2Rpdl9ib29raW5nX3Jlc291cmNlX3Nob3J0Y29kZV8nICsgalF1ZXJ5KCBcIiNib29raW5nX3dwYmNfcmVzb3VyY2VfaWRcIiApLnZhbCgpICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qIFIgRSBTIEUgVCAqL1xyXG4gICAgZnVuY3Rpb24gd3BiY19zaG9ydGNvZGVfY29uZmlnX19yZXNldChzaG9ydGNvZGVfdmFsKXtcclxuICAgICAgICBqUXVlcnkoICcjJyArIHNob3J0Y29kZV92YWwgKyAnX3dwYmNfc3RhcnRtb250aF9hY3RpdmUnICkucHJvcCggJ2NoZWNrZWQnLCBmYWxzZSApLnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cclxuICAgICAgICBqUXVlcnkoICcjJyArIHNob3J0Y29kZV92YWwgKyAnX3dwYmNfYWdncmVnYXRlIG9wdGlvbjpzZWxlY3RlZCcpLnByb3AoICdzZWxlY3RlZCcsIGZhbHNlKTtcclxuICAgICAgICBqUXVlcnkoICcjJyArIHNob3J0Y29kZV92YWwgKyAnX3dwYmNfYWdncmVnYXRlIG9wdGlvbjplcSgwKScgICApLnByb3AoICdzZWxlY3RlZCcsIHRydWUgKTtcclxuICAgICAgICBqUXVlcnkoICcjJyArIHNob3J0Y29kZV92YWwgKyAnX3dwYmNfYWdncmVnYXRlX19ib29raW5nc19vbmx5JyApLnByb3AoICdjaGVja2VkJywgZmFsc2UgKS50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuXHJcbiAgICAgICAgalF1ZXJ5KCAnIycgKyBzaG9ydGNvZGVfdmFsICsgJ193cGJjX2N1c3RvbV9mb3JtIG9wdGlvbjplcSgwKScgKS5wcm9wKCAnc2VsZWN0ZWQnLCB0cnVlICk7XHJcbiAgICAgICAgalF1ZXJ5KCAnIycgKyBzaG9ydGNvZGVfdmFsICsgJ193cGJjX251bW1vbnRocyBvcHRpb246ZXEoMCknICkucHJvcCggJ3NlbGVjdGVkJywgdHJ1ZSApO1xyXG4gICAgICAgIGpRdWVyeSggJyMnICsgc2hvcnRjb2RlX3ZhbCArICdfd3BiY19zaXplX2VuYWJsZWQnICkucHJvcCggJ2NoZWNrZWQnLCBmYWxzZSApLnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cclxuICAgICAgICB3cGJjX3Nob3J0Y29kZV9jb25maWdfX3NlbGVjdF9kYXlfd2Vla2RheV9fcmVzZXQoIHNob3J0Y29kZV92YWwgKyAnd3BiY19zZWxlY3RfZGF5X3dlZWtkYXknICk7XHJcbiAgICAgICAgd3BiY19zaG9ydGNvZGVfY29uZmlnX19zZWxlY3RfZGF5X3NlYXNvbl9fcmVzZXQoIHNob3J0Y29kZV92YWwgKyAnd3BiY19zZWxlY3RfZGF5X3NlYXNvbicgKTtcclxuICAgICAgICB3cGJjX3Nob3J0Y29kZV9jb25maWdfX3N0YXJ0X2RheV9zZWFzb25fX3Jlc2V0KCBzaG9ydGNvZGVfdmFsICsgJ3dwYmNfc3RhcnRfZGF5X3NlYXNvbicgKTtcclxuICAgICAgICB3cGJjX3Nob3J0Y29kZV9jb25maWdfX3NlbGVjdF9kYXlfZm9yZGF0ZV9fcmVzZXQoIHNob3J0Y29kZV92YWwgKyAnd3BiY19zZWxlY3RfZGF5X2ZvcmRhdGUnICk7XHJcblxyXG4gICAgICAgIC8vIFJlc2V0ICBmb3IgW2Jvb2tpbmdzZWxlY3RdIHNob3J0Y29kZSBwYXJhbXNcclxuICAgICAgICBqUXVlcnkoICcjJyArIHNob3J0Y29kZV92YWwgKyAnX3dwYmNfbXVsdGlwbGVfcmVzb3VyY2VzIG9wdGlvbjpzZWxlY3RlZCcpLnByb3AoICdzZWxlY3RlZCcsIGZhbHNlKTtcclxuICAgICAgICBqUXVlcnkoICcjJyArIHNob3J0Y29kZV92YWwgKyAnX3dwYmNfbXVsdGlwbGVfcmVzb3VyY2VzIG9wdGlvbjplcSgwKScgKS5wcm9wKCAnc2VsZWN0ZWQnLCB0cnVlICkudHJpZ2dlcignY2hhbmdlJyk7XHJcbiAgICAgICAgalF1ZXJ5KCAnIycgKyBzaG9ydGNvZGVfdmFsICsgJ193cGJjX3NlbGVjdGVkX3Jlc291cmNlIG9wdGlvbjplcSgwKScgKS5wcm9wKCAnc2VsZWN0ZWQnLCB0cnVlICkudHJpZ2dlcignY2hhbmdlJyk7XHJcbiAgICAgICAgalF1ZXJ5KCAnIycgKyBzaG9ydGNvZGVfdmFsICsgJ193cGJjX3RleHRfbGFiZWwnICkudmFsKCAnJyApLnRyaWdnZXIoJ2NoYW5nZScpO1xyXG4gICAgICAgIGpRdWVyeSggJyMnICsgc2hvcnRjb2RlX3ZhbCArICdfd3BiY19maXJzdF9vcHRpb25fdGl0bGUnICkudmFsKCAnJyApLnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cclxuICAgICAgICAvLyBSZXNldCAgZm9yIFtib29raW5ndGltZWxpbmVdIHNob3J0Y29kZSBwYXJhbXNcclxuICAgICAgICBqUXVlcnkoICcjJyArIHNob3J0Y29kZV92YWwgKyAnX3dwYmNfdGV4dF9sYWJlbF90aW1lbGluZScgKS52YWwoICcnICkudHJpZ2dlcignY2hhbmdlJyk7XHJcbiAgICAgICAgalF1ZXJ5KCAnIycgKyBzaG9ydGNvZGVfdmFsICsgJ193cGJjX3Njcm9sbF90aW1lbGluZV9zY3JvbGxfbW9udGggb3B0aW9uW3ZhbHVlPVwiMFwiXScgKS5wcm9wKCAnc2VsZWN0ZWQnLCB0cnVlICkudHJpZ2dlcignY2hhbmdlJyk7XHJcbiAgICAgICAgalF1ZXJ5KCAnIycgKyBzaG9ydGNvZGVfdmFsICsgJ193cGJjX3Njcm9sbF90aW1lbGluZV9zY3JvbGxfZGF5cyBvcHRpb25bdmFsdWU9XCIwXCJdJyApLnByb3AoICdzZWxlY3RlZCcsIHRydWUgKS50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuICAgICAgICBqUXVlcnkoICcjJyArIHNob3J0Y29kZV92YWwgKyAnX3dwYmNfc3RhcnRfZGF0ZV90aW1lbGluZV9hY3RpdmUnICkucHJvcCggJ2NoZWNrZWQnLCBmYWxzZSApLnRyaWdnZXIoJ2NoYW5nZScpO1xyXG4gICAgICAgIGpRdWVyeSggJyMnICsgc2hvcnRjb2RlX3ZhbCArICdfd3BiY19zdGFydF9lbmRfdGltZV90aW1lbGluZV9zdGFydHRpbWUgb3B0aW9uW3ZhbHVlPVwiMFwiXScgKS5wcm9wKCAnc2VsZWN0ZWQnLCB0cnVlICkudHJpZ2dlcignY2hhbmdlJyk7XHJcbiAgICAgICAgalF1ZXJ5KCAnIycgKyBzaG9ydGNvZGVfdmFsICsgJ193cGJjX3N0YXJ0X2VuZF90aW1lX3RpbWVsaW5lX2VuZHRpbWUgb3B0aW9uW3ZhbHVlPVwiMjRcIl0nICkucHJvcCggJ3NlbGVjdGVkJywgdHJ1ZSApLnRyaWdnZXIoJ2NoYW5nZScpO1xyXG4gICAgICAgIGpRdWVyeSggJ2lucHV0W25hbWU9XCInICsgc2hvcnRjb2RlX3ZhbCArICdfd3BiY192aWV3X21vZGVfdGltZWxpbmVfbW9udGhzX251bV9pbl9yb3dcIl1bdmFsdWU9XCIzMFwiXScgKS5wcm9wKCAnY2hlY2tlZCcsIHRydWUgKS50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuICAgICAgICBqUXVlcnkoICcjJyArIHNob3J0Y29kZV92YWwgKyAnX3dwYmNfc3RhcnRfZGF0ZV90aW1lbGluZV95ZWFyIG9wdGlvblt2YWx1ZT1cIicgKyAobmV3IERhdGUoKS5nZXRGdWxsWWVhcigpKSArICdcIl0nICkucHJvcCggJ3NlbGVjdGVkJywgdHJ1ZSApLnRyaWdnZXIoICdjaGFuZ2UnICk7XHJcbiAgICAgICAgalF1ZXJ5KCAnIycgKyBzaG9ydGNvZGVfdmFsICsgJ193cGJjX3N0YXJ0X2RhdGVfdGltZWxpbmVfbW9udGggb3B0aW9uW3ZhbHVlPVwiJyArICgobmV3IERhdGUoKS5nZXRNb250aCgpKSArIDEpICsgJ1wiXScgKS5wcm9wKCAnc2VsZWN0ZWQnLCB0cnVlICkudHJpZ2dlcignY2hhbmdlJyk7XHJcbiAgICAgICAgalF1ZXJ5KCAnIycgKyBzaG9ydGNvZGVfdmFsICsgJ193cGJjX3N0YXJ0X2RhdGVfdGltZWxpbmVfZGF5IG9wdGlvblt2YWx1ZT1cIicgKyAobmV3IERhdGUoKS5nZXREYXRlKCkpICsgJ1wiXScgKS5wcm9wKCAnc2VsZWN0ZWQnLCB0cnVlICkudHJpZ2dlcignY2hhbmdlJyk7XHJcblxyXG4gICAgICAgIC8vIFJlc2V0ICBmb3IgW2Jvb2tpbmdmb3JtXSBzaG9ydGNvZGUgcGFyYW1zXHJcbiAgICAgICAgalF1ZXJ5KCAnIycgKyBzaG9ydGNvZGVfdmFsICsgJ193cGJjX2Jvb2tpbmdfZGF0ZV95ZWFyIG9wdGlvblt2YWx1ZT1cIicgKyAobmV3IERhdGUoKS5nZXRGdWxsWWVhcigpKSArICdcIl0nICkucHJvcCggJ3NlbGVjdGVkJywgdHJ1ZSApLnRyaWdnZXIoICdjaGFuZ2UnICk7XHJcbiAgICAgICAgalF1ZXJ5KCAnIycgKyBzaG9ydGNvZGVfdmFsICsgJ193cGJjX2Jvb2tpbmdfZGF0ZV9tb250aCBvcHRpb25bdmFsdWU9XCInICsgKChuZXcgRGF0ZSgpLmdldE1vbnRoKCkpICsgMSkgKyAnXCJdJyApLnByb3AoICdzZWxlY3RlZCcsIHRydWUgKS50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuICAgICAgICBqUXVlcnkoICcjJyArIHNob3J0Y29kZV92YWwgKyAnX3dwYmNfYm9va2luZ19kYXRlX2RheSBvcHRpb25bdmFsdWU9XCInICsgKG5ldyBEYXRlKCkuZ2V0RGF0ZSgpKSArICdcIl0nICkucHJvcCggJ3NlbGVjdGVkJywgdHJ1ZSApLnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cclxuICAgICAgICAvLyBSZXNldCAgZm9yIFtbYm9va2luZ3NlYXJjaCAuLi5dIHNob3J0Y29kZSBwYXJhbXNcclxuICAgICAgICBqUXVlcnkoICcjJyArIHNob3J0Y29kZV92YWwgKyAnX3dwYmNfc2VhcmNoX25ld19wYWdlX3VybCcgKS52YWwoICcnICkudHJpZ2dlcignY2hhbmdlJyk7XHJcbiAgICAgICAgalF1ZXJ5KCAnIycgKyBzaG9ydGNvZGVfdmFsICsgJ193cGJjX3NlYXJjaF9uZXdfcGFnZV9lbmFibGVkJyApLnByb3AoICdjaGVja2VkJywgZmFsc2UgKS50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuICAgICAgICAvLyBqUXVlcnkoICcjJyArIHNob3J0Y29kZV92YWwgKyAnX3dwYmNfc2VhcmNoX2hlYWRlcicgKS52YWwoICcnICkudHJpZ2dlcignY2hhbmdlJyk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9GaXhJbjogMTAuMC4wLjQxXHJcbiAgICAgICAgLy8galF1ZXJ5KCAnIycgKyBzaG9ydGNvZGVfdmFsICsgJ193cGJjX3NlYXJjaF9ub3RoaW5nX2ZvdW5kJyApLnZhbCggJycgKS50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuICAgICAgICBqUXVlcnkoICcjJyArIHNob3J0Y29kZV92YWwgKyAnX3dwYmNfc2VhcmNoX2Zvcl91c2VycycgKS52YWwoICcnICkudHJpZ2dlcignY2hhbmdlJyk7XHJcbiAgICAgICAgalF1ZXJ5KCAnaW5wdXRbbmFtZT1cIicgKyBzaG9ydGNvZGVfdmFsICsgJ193cGJjX3NlYXJjaF9mb3JtX3Jlc3VsdHNcIl1bdmFsdWU9XCJib29raW5nc2VhcmNoXCJdJyApLnByb3AoICdjaGVja2VkJywgdHJ1ZSApLnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cclxuICAgICAgICAvLyBSZXNldCAgZm9yIFtib29raW5nZWRpdF0gLCBbYm9va2luZ2N1c3RvbWVybGlzdGluZ10gLCBbYm9va2luZ3Jlc291cmNlIHR5cGU9NiBzaG93PSdjYXBhY2l0eSddICwgW2Jvb2tpbmdfY29uZmlybV1cclxuICAgICAgICBqUXVlcnkoICdpbnB1dFtuYW1lPVwiJyArIHNob3J0Y29kZV92YWwgKyAnX3dwYmNfc2hvcnRjb2RlX3R5cGVcIl1bdmFsdWU9XCJib29raW5nX2NvbmZpcm1cIl0nICkucHJvcCggJ2NoZWNrZWQnLCB0cnVlICkudHJpZ2dlcignY2hhbmdlJyk7XHJcblxyXG5cclxuICAgICAgICAvLyBib29raW5nX2ltcG9ydF9pY3MgLCBib29raW5nX2xpc3RpbmdfaWNzXHJcbiAgICAgICAgalF1ZXJ5KCAnIycgKyBzaG9ydGNvZGVfdmFsICsgJ193cGJjX3VybCcgKS52YWwoICcnICkudHJpZ2dlciggJ2NoYW5nZScgKTtcclxuICAgICAgICBqUXVlcnkoICcjJyArIHNob3J0Y29kZV92YWwgKyAnX2Zyb20gb3B0aW9uW3ZhbHVlPVwidG9kYXlcIl0nICkucHJvcCggJ3NlbGVjdGVkJywgdHJ1ZSApLnRyaWdnZXIoICdjaGFuZ2UnICk7XHJcbiAgICAgICAgalF1ZXJ5KCAnIycgKyBzaG9ydGNvZGVfdmFsICsgJ19mcm9tX29mZnNldCcgKS52YWwoICcnICkudHJpZ2dlciggJ2NoYW5nZScgKTtcclxuICAgICAgICBqUXVlcnkoICcjJyArIHNob3J0Y29kZV92YWwgKyAnX2Zyb21fb2Zmc2V0X3R5cGUgb3B0aW9uOmVxKDApJyApLnByb3AoICdzZWxlY3RlZCcsIHRydWUgKS50cmlnZ2VyKCAnY2hhbmdlJyApO1xyXG4gICAgICAgIGpRdWVyeSggJyMnICsgc2hvcnRjb2RlX3ZhbCArICdfdW50aWwgb3B0aW9uW3ZhbHVlPVwiYW55XCJdJyApLnByb3AoICdzZWxlY3RlZCcsIHRydWUgKS50cmlnZ2VyKCAnY2hhbmdlJyApO1xyXG4gICAgICAgIGpRdWVyeSggJyMnICsgc2hvcnRjb2RlX3ZhbCArICdfdW50aWxfb2Zmc2V0JyApLnZhbCggJycgKS50cmlnZ2VyKCAnY2hhbmdlJyApO1xyXG4gICAgICAgIGpRdWVyeSggJyMnICsgc2hvcnRjb2RlX3ZhbCArICdfdW50aWxfb2Zmc2V0X3R5cGUgb3B0aW9uOmVxKDApJyApLnByb3AoICdzZWxlY3RlZCcsIHRydWUgKS50cmlnZ2VyKCAnY2hhbmdlJyApO1xyXG4gICAgICAgIGpRdWVyeSggJyMnICsgc2hvcnRjb2RlX3ZhbCArICdfY29uZGl0aW9uc19pbXBvcnQgb3B0aW9uOmVxKDApJyApLnByb3AoICdzZWxlY3RlZCcsIHRydWUgKS50cmlnZ2VyKCAnY2hhbmdlJyApO1xyXG4gICAgICAgIGpRdWVyeSggJyMnICsgc2hvcnRjb2RlX3ZhbCArICdfY29uZGl0aW9uc19ldmVudHMgb3B0aW9uW3ZhbHVlPVwiMVwiXScgKS5wcm9wKCAnc2VsZWN0ZWQnLCB0cnVlICkudHJpZ2dlciggJ2NoYW5nZScgKTtcclxuICAgICAgICBqUXVlcnkoICcjJyArIHNob3J0Y29kZV92YWwgKyAnX2NvbmRpdGlvbnNfbWF4X251bSBvcHRpb25bdmFsdWU9XCIwXCJdJyApLnByb3AoICdzZWxlY3RlZCcsIHRydWUgKS50cmlnZ2VyKCAnY2hhbmdlJyApO1xyXG4gICAgICAgIGpRdWVyeSggJyMnICsgc2hvcnRjb2RlX3ZhbCArICdfc2lsZW5jZSBvcHRpb25bdmFsdWU9XCIwXCJdJyApLnByb3AoICdzZWxlY3RlZCcsIHRydWUgKS50cmlnZ2VyKCAnY2hhbmdlJyApO1xyXG4gICAgfVxyXG5cclxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcbi8qKlxyXG4gKiAgU0hPUlRDT0RFX0NPTkZJR1xyXG4gKiAqL1xyXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuXHJcbi8qKlxyXG4gKiBXaGVuIGNsaWNrIG9uIG1lbnUgaXRlbSBpbiBcIkxlZnQgVmVydGljYWwgTmF2aWdhdGlvblwiIHBhbmVsICBpbiBzaG9ydGNvZGUgY29uZmlnIHBvcHVwXHJcbiAqL1xyXG5mdW5jdGlvbiB3cGJjX3Nob3J0Y29kZV9jb25maWdfY2xpY2tfc2hvd19zZWN0aW9uKCBfdGhpcywgc2VjdGlvbl9pZF90b19zaG93LCBzaG9ydGNvZGVfbmFtZSApe1xyXG5cclxuICAgIC8vIE1lbnVcclxuICAgIGpRdWVyeSggX3RoaXMgKS5wYXJlbnRzKCAnLndwYmNfc2V0dGluZ3NfZmxleF9jb250YWluZXInICkuZmluZCggJy53cGJjX3NldHRpbmdzX25hdmlnYXRpb25faXRlbV9hY3RpdmUnICkucmVtb3ZlQ2xhc3MoICd3cGJjX3NldHRpbmdzX25hdmlnYXRpb25faXRlbV9hY3RpdmUnICk7XHJcbiAgICBqUXVlcnkoIF90aGlzICkucGFyZW50cyggJy53cGJjX3NldHRpbmdzX25hdmlnYXRpb25faXRlbScgKS5hZGRDbGFzcyggJ3dwYmNfc2V0dGluZ3NfbmF2aWdhdGlvbl9pdGVtX2FjdGl2ZScgKTtcclxuXHJcbiAgICAvLyBDb250ZW50XHJcbiAgICBqUXVlcnkoIF90aGlzICkucGFyZW50cyggJy53cGJjX3NldHRpbmdzX2ZsZXhfY29udGFpbmVyJyApLmZpbmQoICcud3BiY19zY19jb250YWluZXJfX3Nob3J0Y29kZScgKS5oaWRlKCk7XHJcbiAgICBqUXVlcnkoIHNlY3Rpb25faWRfdG9fc2hvdyApLnNob3coKTtcclxuXHJcbiAgICAvLyBTY3JvbGxcclxuICAgIGlmICggJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mICh3cGJjX3Njcm9sbF90bykgKXtcclxuICAgICAgICB3cGJjX3Njcm9sbF90byggc2VjdGlvbl9pZF90b19zaG93ICk7XHJcbiAgICB9XHJcbiAgICAvLyBTZXQgLSBTaG9ydGNvZGUgVHlwZVxyXG4gICAgalF1ZXJ5KCAnI3dwYmNfc2hvcnRjb2RlX3R5cGUnKS52YWwoIHNob3J0Y29kZV9uYW1lICk7XHJcblxyXG4gICAgLy8gUGFyc2Ugc2hvcnRjb2RlIHBhcmFtc1xyXG4gICAgd3BiY19zZXRfc2hvcnRjb2RlKCk7XHJcbn1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEbyBOZXh0IC8gUHJpb3Igc3RlcFxyXG4gICAgICogQHBhcmFtIF90aGlzXHRcdGJ1dHRvbiAgdGhpc1xyXG4gICAgICogQHBhcmFtIHN0ZXBcdFx0J3ByaW9yJyB8ICduZXh0J1xyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiB3cGJjX3Nob3J0Y29kZV9jb25maWdfY29udGVudF90b29sYmFyX19uZXh0X3ByaW9yKCBfdGhpcywgc3RlcCApe1xyXG5cclxuICAgICAgICB2YXIgal93b3JrX25hdl90YWI7XHJcblxyXG4gICAgICAgIHZhciBzdWJtZW51X3NlbGVjdGVkID0galF1ZXJ5KCBfdGhpcyApLnBhcmVudHMoICcud3BiY19zY19jb250YWluZXJfX3Nob3J0Y29kZScgKS5maW5kKCAnLndwYmNfc2NfY29udGFpbmVyX19zaG9ydGNvZGVfc2VjdGlvbjp2aXNpYmxlJyApLmZpbmQoICcud3BkZXZlbG9wLXN1Ym1lbnUtdGFiLXNlbGVjdGVkOnZpc2libGUnICk7XHJcbiAgICAgICAgaWYgKCBzdWJtZW51X3NlbGVjdGVkLmxlbmd0aCApe1xyXG4gICAgICAgICAgICBpZiAoICduZXh0JyA9PT0gc3RlcCApe1xyXG4gICAgICAgICAgICAgICAgal93b3JrX25hdl90YWIgPSBzdWJtZW51X3NlbGVjdGVkLm5leHRBbGwoICdhLm5hdi10YWI6dmlzaWJsZScgKS5maXJzdCgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgal93b3JrX25hdl90YWIgPSBzdWJtZW51X3NlbGVjdGVkLnByZXZBbGwoICdhLm5hdi10YWI6dmlzaWJsZScgKS5maXJzdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICggal93b3JrX25hdl90YWIubGVuZ3RoICl7XHJcbiAgICAgICAgICAgICAgICBqX3dvcmtfbmF2X3RhYi50cmlnZ2VyKCAnY2xpY2snICk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICggJ25leHQnID09PSBzdGVwICl7XHJcbiAgICAgICAgICAgIGpfd29ya19uYXZfdGFiID0galF1ZXJ5KCBfdGhpcyApLnBhcmVudHMoICcud3BiY19zY19jb250YWluZXJfX3Nob3J0Y29kZScgKS5maW5kKCAnLm5hdi10YWIubmF2LXRhYi1hY3RpdmU6dmlzaWJsZScgKS5uZXh0QWxsKCAnYS5uYXYtdGFiOnZpc2libGUnICkuZmlyc3QoKTtcclxuICAgICAgICB9IGVsc2V7XHJcbiAgICAgICAgICAgIGpfd29ya19uYXZfdGFiID0galF1ZXJ5KCBfdGhpcyApLnBhcmVudHMoICcud3BiY19zY19jb250YWluZXJfX3Nob3J0Y29kZScgKS5maW5kKCAnLm5hdi10YWIubmF2LXRhYi1hY3RpdmU6dmlzaWJsZScgKS5wcmV2QWxsKCAnYS5uYXYtdGFiOnZpc2libGUnICkuZmlyc3QoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICggal93b3JrX25hdl90YWIubGVuZ3RoICl7XHJcbiAgICAgICAgICAgIGpfd29ya19uYXZfdGFiLnRyaWdnZXIoICdjbGljaycgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbmRpdGlvbjogICB7c2VsZWN0LWRheSBjb25kaXRpb249XCJ3ZWVrZGF5XCIgZm9yPVwiNVwiIHZhbHVlPVwiM1wifVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiB3cGJjX3Nob3J0Y29kZV9jb25maWdfX3NlbGVjdF9kYXlfd2Vla2RheV9fYWRkKGlkKXtcclxuICAgICAgICB2YXIgY29uZGl0aW9uX3J1bGVfYXJyID0gW107XHJcbiAgICAgICAgZm9yICggdmFyIHdlZWtkYXlfbnVtID0gMDsgd2Vla2RheV9udW0gPCA4OyB3ZWVrZGF5X251bSsrICl7XHJcbiAgICAgICAgICAgIGlmICggalF1ZXJ5KCAnIycgKyBpZCArICdfX3dlZWtkYXlfJyArIHdlZWtkYXlfbnVtICkuaXMoICc6Y2hlY2tlZCcgKSApe1xyXG4gICAgICAgICAgICAgICAgdmFyIGRheXNfdG9fc2VsZWN0ID0galF1ZXJ5KCAnIycgKyBpZCArICdfX2RheXNfbnVtYmVyXycgKyB3ZWVrZGF5X251bSApLnZhbCgpLnRyaW0oKTtcclxuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBhbGwgd29yZHMgZXhjZXB0IGRpZ2l0cyBhbmQgLCBhbmQgLVxyXG4gICAgICAgICAgICAgICAgZGF5c190b19zZWxlY3QgPSBkYXlzX3RvX3NlbGVjdC5yZXBsYWNlKC9bXjAtOSwtXS9nLCAnJyk7XHJcbiAgICAgICAgICAgICAgICBkYXlzX3RvX3NlbGVjdCA9IGRheXNfdG9fc2VsZWN0LnJlcGxhY2UoL1ssXXsyLH0vZywgJywnKTtcclxuICAgICAgICAgICAgICAgIGRheXNfdG9fc2VsZWN0ID0gZGF5c190b19zZWxlY3QucmVwbGFjZSgvWy1dezIsfS9nLCAnLScpO1xyXG4gICAgICAgICAgICAgICAgalF1ZXJ5KCAnIycgKyBpZCArICdfX2RheXNfbnVtYmVyXycgKyB3ZWVrZGF5X251bSApLnZhbCggZGF5c190b19zZWxlY3QgKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoICcnICE9PSBkYXlzX3RvX3NlbGVjdCApe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbmRpdGlvbl9ydWxlX2Fyci5wdXNoKCAne3NlbGVjdC1kYXkgY29uZGl0aW9uPVwid2Vla2RheVwiIGZvcj1cIicgKyB3ZWVrZGF5X251bSArICdcIiB2YWx1ZT1cIicgKyBkYXlzX3RvX3NlbGVjdCArICdcIn0nICk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlZCBoaWdobGlnaHQgZmllbGRzLCAgaWYgc29tZSByZXF1aXJlZCBmaWVsZHMgYXJlIGVtcHR5XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mICh3cGJjX2ZpZWxkX2hpZ2hsaWdodCkpICYmICgnJyA9PT0galF1ZXJ5KCAnIycgKyBpZCArICdfX2RheXNfbnVtYmVyXycgKyB3ZWVrZGF5X251bSApLnZhbCgpKSApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3cGJjX2ZpZWxkX2hpZ2hsaWdodCggJyMnICsgaWQgKyAnX19kYXlzX251bWJlcl8nICsgd2Vla2RheV9udW0gKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGNvbmRpdGlvbl9ydWxlID0gY29uZGl0aW9uX3J1bGVfYXJyLmpvaW4oICcsJyApO1xyXG4gICAgICAgIGpRdWVyeSggJyMnICsgaWQgKyAnX3RleHRhcmVhJyApLnZhbCggY29uZGl0aW9uX3J1bGUgKTtcclxuICAgICAgICB3cGJjX3NldF9zaG9ydGNvZGUoKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHdwYmNfc2hvcnRjb2RlX2NvbmZpZ19fc2VsZWN0X2RheV93ZWVrZGF5X19yZXNldChpZCl7XHJcblxyXG4gICAgICAgIGZvciAoIHZhciB3ZWVrZGF5X251bSA9IDA7IHdlZWtkYXlfbnVtIDwgODsgd2Vla2RheV9udW0rKyApe1xyXG4gICAgICAgICAgICBqUXVlcnkoICcjJyArIGlkICsgJ19fZGF5c19udW1iZXJfJyArIHdlZWtkYXlfbnVtICkudmFsKCAnJyApO1xyXG4gICAgICAgICAgICBpZiAoIGpRdWVyeSggJyMnICsgaWQgKyAnX193ZWVrZGF5XycgKyB3ZWVrZGF5X251bSApLmlzKCAnOmNoZWNrZWQnICkgKXtcclxuICAgICAgICAgICAgICAgIGpRdWVyeSggJyMnICsgaWQgKyAnX193ZWVrZGF5XycgKyB3ZWVrZGF5X251bSApLnByb3AoICdjaGVja2VkJywgZmFsc2UgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBqUXVlcnkoICcjJyArIGlkICsgJ190ZXh0YXJlYScgKS52YWwoICcnICk7XHJcbiAgICAgICAgd3BiY19zZXRfc2hvcnRjb2RlKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uZGl0aW9uOiAgIHtzZWxlY3QtZGF5IGNvbmRpdGlvbj1cInNlYXNvblwiIGZvcj1cIkhpZ2ggc2Vhc29uXCIgdmFsdWU9XCI3LTE0LDIwXCJ9XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHdwYmNfc2hvcnRjb2RlX2NvbmZpZ19fc2VsZWN0X2RheV9zZWFzb25fX2FkZChpZCl7XHJcblxyXG4gICAgICAgIHZhciBzZWFzb25fZmlsdGVyX25hbWUgPSBqUXVlcnkoICcjJyArIGlkICsgJ19fc2Vhc29uX2ZpbHRlcl9uYW1lIG9wdGlvbjpzZWxlY3RlZCcgKS50ZXh0KCkudHJpbSgpO1xyXG4gICAgICAgIC8vIEVzY2FwZSBxdW90ZSBzeW1ib2xzXHJcbiAgICAgICAgc2Vhc29uX2ZpbHRlcl9uYW1lID0gc2Vhc29uX2ZpbHRlcl9uYW1lLnJlcGxhY2UoL1tcXFwiXCJdL2csICdcXFxcXCInKTtcclxuXHJcbiAgICAgICAgdmFyIGRheXNfbnVtYmVyID0galF1ZXJ5KCAnIycgKyBpZCArICdfX2RheXNfbnVtYmVyJyApLnZhbCgpLnRyaW0oKTtcclxuICAgICAgICAvLyBSZW1vdmUgYWxsIHdvcmRzIGV4Y2VwdCBkaWdpdHMgYW5kICwgYW5kIC1cclxuICAgICAgICBkYXlzX251bWJlciA9IGRheXNfbnVtYmVyLnJlcGxhY2UoIC9bXjAtOSwtXS9nLCAnJyApO1xyXG4gICAgICAgIGRheXNfbnVtYmVyID0gZGF5c19udW1iZXIucmVwbGFjZSggL1ssXXsyLH0vZywgJywnICk7XHJcbiAgICAgICAgZGF5c19udW1iZXIgPSBkYXlzX251bWJlci5yZXBsYWNlKCAvWy1dezIsfS9nLCAnLScgKTtcclxuICAgICAgICBqUXVlcnkoICcjJyArIGlkICsgJ19fZGF5c19udW1iZXInICkudmFsKCBkYXlzX251bWJlciApO1xyXG5cclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICgnJyAhPSBkYXlzX251bWJlcilcclxuICAgICAgICAgICAgJiYgKCcnICE9IHNlYXNvbl9maWx0ZXJfbmFtZSlcclxuICAgICAgICAgICAgJiYgKDAgIT0galF1ZXJ5KCAnIycgKyBpZCArICdfX3NlYXNvbl9maWx0ZXJfbmFtZScgKS52YWwoKSlcclxuXHJcbiAgICAgICAgKXtcclxuICAgICAgICAgICAgdmFyIGV4aXN0X2NvbmZpZ3VyYXRpb24gPSBqUXVlcnkoICcjJyArIGlkICsgJ190ZXh0YXJlYScgKS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgIGV4aXN0X2NvbmZpZ3VyYXRpb24gPSBleGlzdF9jb25maWd1cmF0aW9uLnJlcGxhY2VBbGwoXCJ9LHtcIiwgJ31+fnsnKVxyXG4gICAgICAgICAgICB2YXIgY29uZGl0aW9uX3J1bGVfYXJyID0gZXhpc3RfY29uZmlndXJhdGlvbi5zcGxpdCggJ35+JyApO1xyXG5cclxuICAgICAgICAgICAgLy8gUmVtb3ZlIGVtcHR5IHNwYWNlcyBmcm9tICBhcnJheSA6ICcnIHwgXCJcIlxyXG4gICAgICAgICAgICBjb25kaXRpb25fcnVsZV9hcnIgPSBjb25kaXRpb25fcnVsZV9hcnIuZmlsdGVyKGZ1bmN0aW9uKG4pe3JldHVybiBuOyB9KTtcclxuXHJcbiAgICAgICAgICAgIGNvbmRpdGlvbl9ydWxlX2Fyci5wdXNoKCAne3NlbGVjdC1kYXkgY29uZGl0aW9uPVwic2Vhc29uXCIgZm9yPVwiJyArIHNlYXNvbl9maWx0ZXJfbmFtZSArICdcIiB2YWx1ZT1cIicgKyBkYXlzX251bWJlciArICdcIn0nICk7XHJcblxyXG4gICAgICAgICAgICAvLyBSZW1vdmUgZHVwbGljYXRlcyBmcm9tICB0aGUgYXJyYXlcclxuICAgICAgICAgICAgY29uZGl0aW9uX3J1bGVfYXJyID0gY29uZGl0aW9uX3J1bGVfYXJyLmZpbHRlciggZnVuY3Rpb24gKCBpdGVtLCBwb3MgKXsgcmV0dXJuIGNvbmRpdGlvbl9ydWxlX2Fyci5pbmRleE9mKCBpdGVtICkgPT09IHBvczsgfSApO1xyXG4gICAgICAgICAgICB2YXIgY29uZGl0aW9uX3J1bGUgPSBjb25kaXRpb25fcnVsZV9hcnIuam9pbiggJywnICk7XHJcbiAgICAgICAgICAgIGpRdWVyeSggJyMnICsgaWQgKyAnX3RleHRhcmVhJyApLnZhbCggY29uZGl0aW9uX3J1bGUgKTtcclxuXHJcbiAgICAgICAgICAgIHdwYmNfc2V0X3Nob3J0Y29kZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVkIGhpZ2hsaWdodCBmaWVsZHMsICBpZiBzb21lIHJlcXVpcmVkIGZpZWxkcyBhcmUgZW1wdHlcclxuICAgICAgICBpZiAoICgnZnVuY3Rpb24nID09PSB0eXBlb2YgKHdwYmNfZmllbGRfaGlnaGxpZ2h0KSkgJiYgKCcnID09PSBqUXVlcnkoICcjJyArIGlkICsgJ19fZGF5c19udW1iZXInICkudmFsKCkpICl7XHJcbiAgICAgICAgICAgIHdwYmNfZmllbGRfaGlnaGxpZ2h0KCAnIycgKyBpZCArICdfX2RheXNfbnVtYmVyJyApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoICgnZnVuY3Rpb24nID09PSB0eXBlb2YgKHdwYmNfZmllbGRfaGlnaGxpZ2h0KSkgJiYgKCcwJyA9PT0galF1ZXJ5KCAnIycgKyBpZCArICdfX3NlYXNvbl9maWx0ZXJfbmFtZScgKS52YWwoKSkgKXtcclxuICAgICAgICAgICAgd3BiY19maWVsZF9oaWdobGlnaHQoICcjJyArIGlkICsgJ19fc2Vhc29uX2ZpbHRlcl9uYW1lJyApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiB3cGJjX3Nob3J0Y29kZV9jb25maWdfX3NlbGVjdF9kYXlfc2Vhc29uX19yZXNldChpZCl7XHJcbiAgICAgICAgalF1ZXJ5KCAnIycgKyBpZCArICdfX3NlYXNvbl9maWx0ZXJfbmFtZSBvcHRpb246ZXEoMCknICkucHJvcCggJ3NlbGVjdGVkJywgdHJ1ZSApO1xyXG4gICAgICAgIGpRdWVyeSggJyMnICsgaWQgKyAnX19kYXlzX251bWJlcicgKS52YWwoICcnICk7XHJcbiAgICAgICAgalF1ZXJ5KCAnIycgKyBpZCArICdfdGV4dGFyZWEnICkudmFsKCAnJyApO1xyXG4gICAgICAgIHdwYmNfc2V0X3Nob3J0Y29kZSgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbmRpdGlvbjogICB7c3RhcnQtZGF5IGNvbmRpdGlvbj1cInNlYXNvblwiIGZvcj1cIkxvdyBzZWFzb25cIiB2YWx1ZT1cIjAsMSw1XCJ9XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHdwYmNfc2hvcnRjb2RlX2NvbmZpZ19fc3RhcnRfZGF5X3NlYXNvbl9fYWRkKCBpZCApe1xyXG5cclxuICAgICAgICB2YXIgc2Vhc29uX2ZpbHRlcl9uYW1lID0galF1ZXJ5KCAnIycgKyBpZCArICdfX3NlYXNvbl9maWx0ZXJfbmFtZSBvcHRpb246c2VsZWN0ZWQnICkudGV4dCgpLnRyaW0oKTtcclxuICAgICAgICAvLyBFc2NhcGUgcXVvdGUgc3ltYm9sc1xyXG4gICAgICAgIHNlYXNvbl9maWx0ZXJfbmFtZSA9IHNlYXNvbl9maWx0ZXJfbmFtZS5yZXBsYWNlKC9bXFxcIlwiXS9nLCAnXFxcXFwiJyk7XHJcblxyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgKCcnICE9IHNlYXNvbl9maWx0ZXJfbmFtZSlcclxuICAgICAgICAgICAgJiYgKDAgIT0galF1ZXJ5KCAnIycgKyBpZCArICdfX3NlYXNvbl9maWx0ZXJfbmFtZScgKS52YWwoKSlcclxuXHJcbiAgICAgICAgKXtcclxuICAgICAgICAgICAgdmFyIGFjdGl2YXRlZF93ZWVrZGF5cyA9W107XHJcbiAgICAgICAgICAgIGZvciAoIHZhciB3ZWVrZGF5X251bSA9IDA7IHdlZWtkYXlfbnVtIDwgODsgd2Vla2RheV9udW0rKyApe1xyXG4gICAgICAgICAgICAgICAgaWYgKCBqUXVlcnkoICcjJyArIGlkICsgJ19fd2Vla2RheV8nICsgd2Vla2RheV9udW0gKS5pcyggJzpjaGVja2VkJyApICl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2YXRlZF93ZWVrZGF5cy5wdXNoKCB3ZWVrZGF5X251bSApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFjdGl2YXRlZF93ZWVrZGF5cyA9IGFjdGl2YXRlZF93ZWVrZGF5cy5qb2luKCAnLCcgKTtcclxuXHJcbiAgICAgICAgICAgIGlmICggJycgIT0gYWN0aXZhdGVkX3dlZWtkYXlzICl7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGV4aXN0X2NvbmZpZ3VyYXRpb24gPSBqUXVlcnkoICcjJyArIGlkICsgJ190ZXh0YXJlYScgKS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBleGlzdF9jb25maWd1cmF0aW9uID0gZXhpc3RfY29uZmlndXJhdGlvbi5yZXBsYWNlQWxsKCBcIn0se1wiLCAnfX5+eycgKVxyXG4gICAgICAgICAgICAgICAgdmFyIGNvbmRpdGlvbl9ydWxlX2FyciA9IGV4aXN0X2NvbmZpZ3VyYXRpb24uc3BsaXQoICd+ficgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgZW1wdHkgc3BhY2VzIGZyb20gIGFycmF5IDogJycgfCBcIlwiXHJcbiAgICAgICAgICAgICAgICBjb25kaXRpb25fcnVsZV9hcnIgPSBjb25kaXRpb25fcnVsZV9hcnIuZmlsdGVyKCBmdW5jdGlvbiAoIG4gKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbjtcclxuICAgICAgICAgICAgICAgIH0gKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25kaXRpb25fcnVsZV9hcnIucHVzaCggJ3tzdGFydC1kYXkgY29uZGl0aW9uPVwic2Vhc29uXCIgZm9yPVwiJyArIHNlYXNvbl9maWx0ZXJfbmFtZSArICdcIiB2YWx1ZT1cIicgKyBhY3RpdmF0ZWRfd2Vla2RheXMgKyAnXCJ9JyApO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBkdXBsaWNhdGVzIGZyb20gIHRoZSBhcnJheVxyXG4gICAgICAgICAgICAgICAgY29uZGl0aW9uX3J1bGVfYXJyID0gY29uZGl0aW9uX3J1bGVfYXJyLmZpbHRlciggZnVuY3Rpb24gKCBpdGVtLCBwb3MgKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29uZGl0aW9uX3J1bGVfYXJyLmluZGV4T2YoIGl0ZW0gKSA9PT0gcG9zO1xyXG4gICAgICAgICAgICAgICAgfSApO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbmRpdGlvbl9ydWxlID0gY29uZGl0aW9uX3J1bGVfYXJyLmpvaW4oICcsJyApO1xyXG4gICAgICAgICAgICAgICAgalF1ZXJ5KCAnIycgKyBpZCArICdfdGV4dGFyZWEnICkudmFsKCBjb25kaXRpb25fcnVsZSApO1xyXG5cclxuICAgICAgICAgICAgICAgIHdwYmNfc2V0X3Nob3J0Y29kZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZWQgaGlnaGxpZ2h0IGZpZWxkcywgIGlmIHNvbWUgcmVxdWlyZWQgZmllbGRzIGFyZSBlbXB0eVxyXG4gICAgICAgIGlmICggKCdmdW5jdGlvbicgPT09IHR5cGVvZiAod3BiY19maWVsZF9oaWdobGlnaHQpKSAmJiAoJzAnID09PSBqUXVlcnkoICcjJyArIGlkICsgJ19fc2Vhc29uX2ZpbHRlcl9uYW1lJyApLnZhbCgpKSApe1xyXG4gICAgICAgICAgICB3cGJjX2ZpZWxkX2hpZ2hsaWdodCggJyMnICsgaWQgKyAnX19zZWFzb25fZmlsdGVyX25hbWUnICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gd3BiY19zaG9ydGNvZGVfY29uZmlnX19zdGFydF9kYXlfc2Vhc29uX19yZXNldChpZCl7XHJcbiAgICAgICAgalF1ZXJ5KCAnIycgKyBpZCArICdfX3NlYXNvbl9maWx0ZXJfbmFtZSBvcHRpb246ZXEoMCknICkucHJvcCggJ3NlbGVjdGVkJywgdHJ1ZSApO1xyXG4gICAgICAgIGZvciAoIHZhciB3ZWVrZGF5X251bSA9IDA7IHdlZWtkYXlfbnVtIDwgODsgd2Vla2RheV9udW0rKyApe1xyXG4gICAgICAgICAgICBpZiAoIGpRdWVyeSggJyMnICsgaWQgKyAnX193ZWVrZGF5XycgKyB3ZWVrZGF5X251bSApLmlzKCAnOmNoZWNrZWQnICkgKXtcclxuICAgICAgICAgICAgICAgIGpRdWVyeSggJyMnICsgaWQgKyAnX193ZWVrZGF5XycgKyB3ZWVrZGF5X251bSApLnByb3AoICdjaGVja2VkJywgZmFsc2UgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBqUXVlcnkoICcjJyArIGlkICsgJ190ZXh0YXJlYScgKS52YWwoICcnICk7XHJcbiAgICAgICAgd3BiY19zZXRfc2hvcnRjb2RlKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uZGl0aW9uOiAgIHtzZWxlY3QtZGF5IGNvbmRpdGlvbj1cImRhdGVcIiBmb3I9XCIyMDIzLTEwLTAxXCIgdmFsdWU9XCIyMCwyNSwzMC0zNVwifVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiB3cGJjX3Nob3J0Y29kZV9jb25maWdfX3NlbGVjdF9kYXlfZm9yZGF0ZV9fYWRkKGlkKXtcclxuXHJcbiAgICAgICAgdmFyIHN0YXJ0X2RhdGVfX2ZvcmRhdGUgPSBqUXVlcnkoICcjJyArIGlkICsgJ19fZGF0ZScgKS52YWwoKS50cmltKCk7XHJcbiAgICAgICAgLy8gUmVtb3ZlIGFsbCB3b3JkcyBleGNlcHQgZGlnaXRzIGFuZCAsIGFuZCAtXHJcbiAgICAgICAgc3RhcnRfZGF0ZV9fZm9yZGF0ZSA9IHN0YXJ0X2RhdGVfX2ZvcmRhdGUucmVwbGFjZSggL1teMC05LV0vZywgJycgKTtcclxuXHJcbiAgICAgICAgdmFyIGdsb2JhbFJlZ2V4ID0gbmV3IFJlZ0V4cCggL15cXGR7NH0tWzAxXXsxfVxcZHsxfS1bMDEyM117MX1cXGR7MX0kLywgJ2cnICk7XHJcbiAgICAgICAgdmFyIGlzX3ZhbGlkX2RhdGUgPSBnbG9iYWxSZWdleC50ZXN0KCBzdGFydF9kYXRlX19mb3JkYXRlICk7XHJcbiAgICAgICAgaWYgKCAhaXNfdmFsaWRfZGF0ZSApe1xyXG4gICAgICAgICAgICBzdGFydF9kYXRlX19mb3JkYXRlID0gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGpRdWVyeSggJyMnICsgaWQgKyAnX19kYXRlJyApLnZhbCggc3RhcnRfZGF0ZV9fZm9yZGF0ZSApO1xyXG5cclxuICAgICAgICB2YXIgZGF5c19udW1iZXIgPSBqUXVlcnkoICcjJyArIGlkICsgJ19fZGF5c19udW1iZXInICkudmFsKCkudHJpbSgpO1xyXG4gICAgICAgIC8vIFJlbW92ZSBhbGwgd29yZHMgZXhjZXB0IGRpZ2l0cyBhbmQgLCBhbmQgLVxyXG4gICAgICAgIGRheXNfbnVtYmVyID0gZGF5c19udW1iZXIucmVwbGFjZSggL1teMC05LC1dL2csICcnICk7XHJcbiAgICAgICAgZGF5c19udW1iZXIgPSBkYXlzX251bWJlci5yZXBsYWNlKCAvWyxdezIsfS9nLCAnLCcgKTtcclxuICAgICAgICBkYXlzX251bWJlciA9IGRheXNfbnVtYmVyLnJlcGxhY2UoIC9bLV17Mix9L2csICctJyApO1xyXG4gICAgICAgIGpRdWVyeSggJyMnICsgaWQgKyAnX19kYXlzX251bWJlcicgKS52YWwoIGRheXNfbnVtYmVyICk7XHJcblxyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgKCcnICE9IGRheXNfbnVtYmVyKVxyXG4gICAgICAgICAgICAmJiAoJycgIT0gc3RhcnRfZGF0ZV9fZm9yZGF0ZSlcclxuICAgICAgICAgICAgJiYgKDAgIT0galF1ZXJ5KCAnIycgKyBpZCArICdfX3NlYXNvbl9maWx0ZXJfbmFtZScgKS52YWwoKSlcclxuXHJcbiAgICAgICAgKXtcclxuICAgICAgICAgICAgdmFyIGV4aXN0X2NvbmZpZ3VyYXRpb24gPSBqUXVlcnkoICcjJyArIGlkICsgJ190ZXh0YXJlYScgKS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgIGV4aXN0X2NvbmZpZ3VyYXRpb24gPSBleGlzdF9jb25maWd1cmF0aW9uLnJlcGxhY2VBbGwoXCJ9LHtcIiwgJ31+fnsnKVxyXG4gICAgICAgICAgICB2YXIgY29uZGl0aW9uX3J1bGVfYXJyID0gZXhpc3RfY29uZmlndXJhdGlvbi5zcGxpdCggJ35+JyApO1xyXG5cclxuICAgICAgICAgICAgLy8gUmVtb3ZlIGVtcHR5IHNwYWNlcyBmcm9tICBhcnJheSA6ICcnIHwgXCJcIlxyXG4gICAgICAgICAgICBjb25kaXRpb25fcnVsZV9hcnIgPSBjb25kaXRpb25fcnVsZV9hcnIuZmlsdGVyKGZ1bmN0aW9uKG4pe3JldHVybiBuOyB9KTtcclxuXHJcbiAgICAgICAgICAgIGNvbmRpdGlvbl9ydWxlX2Fyci5wdXNoKCAne3NlbGVjdC1kYXkgY29uZGl0aW9uPVwiZGF0ZVwiIGZvcj1cIicgKyBzdGFydF9kYXRlX19mb3JkYXRlICsgJ1wiIHZhbHVlPVwiJyArIGRheXNfbnVtYmVyICsgJ1wifScgKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlbW92ZSBkdXBsaWNhdGVzIGZyb20gIHRoZSBhcnJheVxyXG4gICAgICAgICAgICBjb25kaXRpb25fcnVsZV9hcnIgPSBjb25kaXRpb25fcnVsZV9hcnIuZmlsdGVyKCBmdW5jdGlvbiAoIGl0ZW0sIHBvcyApeyByZXR1cm4gY29uZGl0aW9uX3J1bGVfYXJyLmluZGV4T2YoIGl0ZW0gKSA9PT0gcG9zOyB9ICk7XHJcbiAgICAgICAgICAgIHZhciBjb25kaXRpb25fcnVsZSA9IGNvbmRpdGlvbl9ydWxlX2Fyci5qb2luKCAnLCcgKTtcclxuICAgICAgICAgICAgalF1ZXJ5KCAnIycgKyBpZCArICdfdGV4dGFyZWEnICkudmFsKCBjb25kaXRpb25fcnVsZSApO1xyXG5cclxuICAgICAgICAgICAgICAgICB3cGJjX3NldF9zaG9ydGNvZGUoKTtcclxuICAgICAgICB9IGVsc2VcclxuXHJcbiAgICAgICAgLy8gUmVkIGhpZ2hsaWdodCBmaWVsZHMsICBpZiBzb21lIHJlcXVpcmVkIGZpZWxkcyBhcmUgZW1wdHlcclxuICAgICAgICBpZiAoICgnZnVuY3Rpb24nID09PSB0eXBlb2YgKHdwYmNfZmllbGRfaGlnaGxpZ2h0KSkgJiYgKCcnID09PSBqUXVlcnkoICcjJyArIGlkICsgJ19fZGF0ZScgKS52YWwoKSkgKXtcclxuICAgICAgICAgICAgd3BiY19maWVsZF9oaWdobGlnaHQoICcjJyArIGlkICsgJ19fZGF0ZScgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mICh3cGJjX2ZpZWxkX2hpZ2hsaWdodCkpICYmICgnJyA9PT0galF1ZXJ5KCAnIycgKyBpZCArICdfX2RheXNfbnVtYmVyJyApLnZhbCgpKSApe1xyXG4gICAgICAgICAgICB3cGJjX2ZpZWxkX2hpZ2hsaWdodCggJyMnICsgaWQgKyAnX19kYXlzX251bWJlcicgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiB3cGJjX3Nob3J0Y29kZV9jb25maWdfX3NlbGVjdF9kYXlfZm9yZGF0ZV9fcmVzZXQoaWQpe1xyXG4gICAgICAgIGpRdWVyeSggJyMnICsgaWQgKyAnX19kYXRlJyApLnZhbCggJycgKTtcclxuICAgICAgICBqUXVlcnkoICcjJyArIGlkICsgJ19fZGF5c19udW1iZXInICkudmFsKCAnJyApO1xyXG4gICAgICAgIGpRdWVyeSggJyMnICsgaWQgKyAnX3RleHRhcmVhJyApLnZhbCggJycgKTtcclxuICAgICAgICB3cGJjX3NldF9zaG9ydGNvZGUoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgXHJcbmZ1bmN0aW9uIHdwYmNfc2hvcnRjb2RlX2NvbmZpZ19fdXBkYXRlX2VsZW1lbnRzX2luX3RpbWVsaW5lKCl7XHJcblxyXG4gICAgdmFyIHdwYmNfaXNfbWF0cml4ID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKCBqUXVlcnkoICcjYm9va2luZ3RpbWVsaW5lX3dwYmNfbXVsdGlwbGVfcmVzb3VyY2VzJyApLmxlbmd0aCA+IDAgKSB7XHJcblxyXG4gICAgICAgIHZhciBib29raW5ndGltZWxpbmVfd3BiY19tdWx0aXBsZV9yZXNvdXJjZXNfdGVtcCA9IGpRdWVyeSggJyNib29raW5ndGltZWxpbmVfd3BiY19tdWx0aXBsZV9yZXNvdXJjZXMnICkudmFsKCk7XHJcblxyXG4gICAgICAgIGlmICggKCBib29raW5ndGltZWxpbmVfd3BiY19tdWx0aXBsZV9yZXNvdXJjZXNfdGVtcCAhPSBudWxsICkgJiYgKCBib29raW5ndGltZWxpbmVfd3BiY19tdWx0aXBsZV9yZXNvdXJjZXNfdGVtcC5sZW5ndGggPiAwICkgICl7XHJcblxyXG4gICAgICAgICAgICBqUXVlcnkoIFwiaW5wdXRbbmFtZT0nYm9va2luZ3RpbWVsaW5lX3dwYmNfdmlld19tb2RlX3RpbWVsaW5lX21vbnRoc19udW1faW5fcm93J11cIiApLnByb3AoIFwiZGlzYWJsZWRcIiwgZmFsc2UgKTtcclxuICAgICAgICAgICAgalF1ZXJ5KCBcIi53cGJjX3NjX2NvbnRhaW5lcl9fc2hvcnRjb2RlX2Jvb2tpbmd0aW1lbGluZSBsYWJlbC53cGJjLWZvcm0tcmFkaW9cIiApLnNob3coKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAoIGJvb2tpbmd0aW1lbGluZV93cGJjX211bHRpcGxlX3Jlc291cmNlc190ZW1wLmxlbmd0aCA+IDEgKVxyXG4gICAgICAgICAgICAgICAgfHwgICggKGJvb2tpbmd0aW1lbGluZV93cGJjX211bHRpcGxlX3Jlc291cmNlc190ZW1wLmxlbmd0aCA9PSAxKSAmJiAoYm9va2luZ3RpbWVsaW5lX3dwYmNfbXVsdGlwbGVfcmVzb3VyY2VzX3RlbXBbIDAgXSA9PSAnMCcpKVxyXG4gICAgICAgICAgICApeyAgLy8gTWF0cml4XHJcbiAgICAgICAgICAgICAgICB3cGJjX2lzX21hdHJpeCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBqUXVlcnkoIFwiaW5wdXRbbmFtZT0nYm9va2luZ3RpbWVsaW5lX3dwYmNfdmlld19tb2RlX3RpbWVsaW5lX21vbnRoc19udW1faW5fcm93J11bdmFsdWU9JzkwJ11cIiApLnByb3AoIFwiZGlzYWJsZWRcIiwgdHJ1ZSApO1xyXG4gICAgICAgICAgICAgICAgalF1ZXJ5KCBcImlucHV0W25hbWU9J2Jvb2tpbmd0aW1lbGluZV93cGJjX3ZpZXdfbW9kZV90aW1lbGluZV9tb250aHNfbnVtX2luX3JvdyddW3ZhbHVlPSc5MCddXCIgKS5wYXJlbnRzKCcud3BiYy1mb3JtLXJhZGlvJykuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgalF1ZXJ5KCBcImlucHV0W25hbWU9J2Jvb2tpbmd0aW1lbGluZV93cGJjX3ZpZXdfbW9kZV90aW1lbGluZV9tb250aHNfbnVtX2luX3JvdyddW3ZhbHVlPSczNjUnXVwiICkucHJvcCggXCJkaXNhYmxlZFwiLCB0cnVlICk7XHJcbiAgICAgICAgICAgICAgICBqUXVlcnkoIFwiaW5wdXRbbmFtZT0nYm9va2luZ3RpbWVsaW5lX3dwYmNfdmlld19tb2RlX3RpbWVsaW5lX21vbnRoc19udW1faW5fcm93J11bdmFsdWU9JzM2NSddXCIgKS5wYXJlbnRzKCcud3BiYy1mb3JtLXJhZGlvJykuaGlkZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2luZ2xlXHJcbiAgICAgICAgICAgICAgICBqUXVlcnkoIFwiaW5wdXRbbmFtZT0nYm9va2luZ3RpbWVsaW5lX3dwYmNfdmlld19tb2RlX3RpbWVsaW5lX21vbnRoc19udW1faW5fcm93J11bdmFsdWU9JzEnXVwiICkucHJvcCggXCJkaXNhYmxlZFwiLCB0cnVlICk7XHJcbiAgICAgICAgICAgICAgICBqUXVlcnkoIFwiaW5wdXRbbmFtZT0nYm9va2luZ3RpbWVsaW5lX3dwYmNfdmlld19tb2RlX3RpbWVsaW5lX21vbnRoc19udW1faW5fcm93J11bdmFsdWU9JzEnXVwiICkucGFyZW50cygnLndwYmMtZm9ybS1yYWRpbycpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIGpRdWVyeSggXCJpbnB1dFtuYW1lPSdib29raW5ndGltZWxpbmVfd3BiY192aWV3X21vZGVfdGltZWxpbmVfbW9udGhzX251bV9pbl9yb3cnXVt2YWx1ZT0nNyddXCIgKS5wcm9wKCBcImRpc2FibGVkXCIsIHRydWUgKTtcclxuICAgICAgICAgICAgICAgIGpRdWVyeSggXCJpbnB1dFtuYW1lPSdib29raW5ndGltZWxpbmVfd3BiY192aWV3X21vZGVfdGltZWxpbmVfbW9udGhzX251bV9pbl9yb3cnXVt2YWx1ZT0nNyddXCIgKS5wYXJlbnRzKCcud3BiYy1mb3JtLXJhZGlvJykuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgalF1ZXJ5KCBcImlucHV0W25hbWU9J2Jvb2tpbmd0aW1lbGluZV93cGJjX3ZpZXdfbW9kZV90aW1lbGluZV9tb250aHNfbnVtX2luX3JvdyddW3ZhbHVlPSc2MCddXCIgKS5wcm9wKCBcImRpc2FibGVkXCIsIHRydWUgKTtcclxuICAgICAgICAgICAgICAgIGpRdWVyeSggXCJpbnB1dFtuYW1lPSdib29raW5ndGltZWxpbmVfd3BiY192aWV3X21vZGVfdGltZWxpbmVfbW9udGhzX251bV9pbl9yb3cnXVt2YWx1ZT0nNjAnXVwiICkucGFyZW50cygnLndwYmMtZm9ybS1yYWRpbycpLmhpZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIGlmICggalF1ZXJ5KCBcImlucHV0W25hbWU9J2Jvb2tpbmd0aW1lbGluZV93cGJjX3ZpZXdfbW9kZV90aW1lbGluZV9tb250aHNfbnVtX2luX3JvdyddOmNoZWNrZWRcIiApLmlzKCc6ZGlzYWJsZWQnKSApIHtcclxuICAgICAgICAgICAgICAgIGpRdWVyeSggXCJpbnB1dFtuYW1lPSdib29raW5ndGltZWxpbmVfd3BiY192aWV3X21vZGVfdGltZWxpbmVfbW9udGhzX251bV9pbl9yb3cnXVt2YWx1ZT0nMzAnXVwiICkucHJvcCggXCJjaGVja2VkXCIsIHRydWUgKTtcclxuICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciB2aWV3X2RheXNfbnVtX3RlbXAgPSAzMDtcclxuICAgIGlmICggalF1ZXJ5KCBcImlucHV0W25hbWU9J2Jvb2tpbmd0aW1lbGluZV93cGJjX3ZpZXdfbW9kZV90aW1lbGluZV9tb250aHNfbnVtX2luX3JvdyddOmNoZWNrZWRcIiApLmxlbmd0aCA+IDAgKXtcclxuICAgICAgICB2YXIgdmlld19kYXlzX251bV90ZW1wID0gcGFyc2VJbnQoIGpRdWVyeSggXCJpbnB1dFtuYW1lPSdib29raW5ndGltZWxpbmVfd3BiY192aWV3X21vZGVfdGltZWxpbmVfbW9udGhzX251bV9pbl9yb3cnXTpjaGVja2VkXCIgKS52YWwoKS50cmltKCkgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyBIaWRlIG9yIFNob3cgU2Nyb2xsaW5nIERheXMgYW5kIE1vbnRocywgZGVwZW5kaW5nIG9uIGZyb20gdHlwZSBvZiB2aWV3IGFuZCBudW1iZXIgb2YgYm9va2luZyByZXNvdXJjZXNcclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIGpRdWVyeSggXCIjd3BiY19ib29raW5ndGltZWxpbmVfc2Nyb2xsX21vbnRoLCN3cGJjX2Jvb2tpbmd0aW1lbGluZV9zY3JvbGxfZGF5XCIgKS5wcm9wKCBcImRpc2FibGVkXCIsIGZhbHNlICk7XHJcbiAgICBqUXVlcnkoIFwiLndwYmNfYm9va2luZ3RpbWVsaW5lX3Njcm9sbF9tb250aCwud3BiY19ib29raW5ndGltZWxpbmVfc2Nyb2xsX2RheVwiICkuc2hvdygpO1xyXG4gICAgLy8gTWF0cml4IC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIGlmIChcclxuICAgICAgICAgICggd3BiY19pc19tYXRyaXggKSAmJiAoICggdmlld19kYXlzX251bV90ZW1wID09IDEgKSB8fCAoIHZpZXdfZGF5c19udW1fdGVtcCA9PSA3ICkgKSAvLyBEYXkgfCBXZWVrIHZpZXdcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgalF1ZXJ5KCBcIiN3cGJjX2Jvb2tpbmd0aW1lbGluZV9zY3JvbGxfbW9udGhcIiApLnByb3AoIFwiZGlzYWJsZWRcIiwgdHJ1ZSApOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTY3JvbGwgTW9udGggTk9UIHdvcmtpbmdcclxuICAgICAgICAgICAgalF1ZXJ5KCAnLndwYmNfYm9va2luZ3RpbWVsaW5lX3Njcm9sbF9tb250aCcgKS5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgaWYgKFxyXG4gICAgICAgICAgKCB3cGJjX2lzX21hdHJpeCApJiYgKCAoIHZpZXdfZGF5c19udW1fdGVtcCA9PSAzMCApIHx8ICggdmlld19kYXlzX251bV90ZW1wID09IDYwICkgKSAvLyBNb250aCB2aWV3XHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIGpRdWVyeSggXCIjd3BiY19ib29raW5ndGltZWxpbmVfc2Nyb2xsX2RheVwiICkucHJvcCggXCJkaXNhYmxlZFwiLCB0cnVlICk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2Nyb2xsIERheXMgTk9UIHdvcmtpbmdcclxuICAgICAgICAgICAgalF1ZXJ5KCAnLndwYmNfYm9va2luZ3RpbWVsaW5lX3Njcm9sbF9kYXknICkuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgIC8vIFNpbmdsZSAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICBpZiAoXHJcbiAgICAgICAgICAoICEgd3BiY19pc19tYXRyaXggKSAmJiAoICggdmlld19kYXlzX251bV90ZW1wID09IDMwICkgfHwgKCB2aWV3X2RheXNfbnVtX3RlbXAgPT0gOTAgKSApICAvLyBNb250aCB8IDMgTW9udGhzIHZpZXcgKGxpa2Ugd2VlayB2aWV3KVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBqUXVlcnkoIFwiI3dwYmNfYm9va2luZ3RpbWVsaW5lX3Njcm9sbF9tb250aFwiICkucHJvcCggXCJkaXNhYmxlZFwiLCB0cnVlICk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNjcm9sbCBNb250aCBOT1Qgd29ya2luZ1xyXG4gICAgICAgICAgICBqUXVlcnkoICcud3BiY19ib29raW5ndGltZWxpbmVfc2Nyb2xsX21vbnRoJyApLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICBpZiAoXHJcbiAgICAgICAgICAoICEgd3BiY19pc19tYXRyaXggKSYmICggKCB2aWV3X2RheXNfbnVtX3RlbXAgPT0gMzY1ICkgKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFllYXIgdmlld1xyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBqUXVlcnkoIFwiI3dwYmNfYm9va2luZ3RpbWVsaW5lX3Njcm9sbF9kYXlcIiApLnByb3AoIFwiZGlzYWJsZWRcIiwgdHJ1ZSApOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNjcm9sbCBEYXlzIE5PVCB3b3JraW5nXHJcbiAgICAgICAgICAgIGpRdWVyeSggJy53cGJjX2Jvb2tpbmd0aW1lbGluZV9zY3JvbGxfZGF5JyApLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5cclxuICAgIHJldHVybiBbIHdwYmNfaXNfbWF0cml4LCB2aWV3X2RheXNfbnVtX3RlbXAgXTtcclxufSAgICBcclxuXHJcbiAgICBcclxualF1ZXJ5KCBkb2N1bWVudCApLnJlYWR5KCBmdW5jdGlvbiAoKXtcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyBbYm9va2luZyAuLi4gXVxyXG5cclxuICAgIHZhciBzaG9ydGNvZGVfYXJyID0gWydib29raW5nJywgJ2Jvb2tpbmdjYWxlbmRhcicsICdib29raW5nc2VsZWN0JywgJ2Jvb2tpbmd0aW1lbGluZScsICdib29raW5nZm9ybScsICdib29raW5nc2VhcmNoJywgJ2Jvb2tpbmdvdGhlcicsICdib29raW5nX2ltcG9ydF9pY3MnICwgJ2Jvb2tpbmdfbGlzdGluZ19pY3MnXTtcclxuXHJcbiAgICBmb3IgKCB2YXIgc2hvcnRjZGVfa2V5IGluIHNob3J0Y29kZV9hcnIgKXtcclxuXHJcbiAgICAgICAgdmFyIGlkID0gc2hvcnRjb2RlX2Fyclsgc2hvcnRjZGVfa2V5IF07XHJcblxyXG4gICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAvLyBIaWRlIGJ5IFNpemUgc2VjdGlvbnNcclxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgalF1ZXJ5KCAnLicgKyBpZCArICdfd3BiY19zaXplX3dwYmNfc2NfY2FsZW5kYXJfc2l6ZScgKS5oaWRlKCk7XHJcblxyXG4gICAgICAgIC8vIG9wdGlvbnMgOjogU2hvdyAvIEhpZGUgU0laRSBjYWxlbmRhciAgc2VjdGlvblxyXG4gICAgICAgIGpRdWVyeSggJyMnICsgaWQgKyAnX3dwYmNfc2l6ZV9lbmFibGVkJyApLm9uKCAnY2hhbmdlJywgeydpZCc6IGlkfSwgZnVuY3Rpb24oIGV2ZW50ICl7XHJcbiAgICAgICAgICAgIGlmICggalF1ZXJ5KCAnIycgKyBldmVudC5kYXRhLmlkICsgJ193cGJjX3NpemVfZW5hYmxlZCcgKS5pcyggJzpjaGVja2VkJyApICl7XHJcbiAgICAgICAgICAgICAgICBqUXVlcnkoICcuJyArIGV2ZW50LmRhdGEuaWQgKyAnX3dwYmNfc2l6ZV93cGJjX3NjX2NhbGVuZGFyX3NpemUnICkuc2hvdygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgalF1ZXJ5KCAnLicgKyBldmVudC5kYXRhLmlkICsgJ193cGJjX3NpemVfd3BiY19zY19jYWxlbmRhcl9zaXplJyApLmhpZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gKTtcclxuXHJcbiAgICAgICAgLy8gSWYgd2UgY2hhbmdlZCBudW1iZXIgb2YgbW9udGhzIGluICdTZXR1cCBTaXplICYgU3RydWN0dXJlJyB0aGVuICBjaGFuZ2UgZ2VuZXJhbCAnVmlzaWJsZSBtb250aHMnIG51bWJlciAgICAgIC8vRml4SW46IDEwLjAuMC40XHJcbiAgICAgICAgalF1ZXJ5KCAgJyMnICsgaWQgKyAnX3dwYmNfc2l6ZV9tb250aHNfbnVtX2luX3JvdycgICAgICAgICAgICAgICAgICAgLy8gLSBNb250aCBOdW0gaW4gUm93XHJcbiAgICAgICAgICAgICAgICAgICAgKS5vbiggJ2NoYW5nZScsIHsnaWQnOiBpZH0sIGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICAgICAgalF1ZXJ5KCAnIycgKyBldmVudC5kYXRhLmlkICsgJ193cGJjX251bW1vbnRocyBvcHRpb25bdmFsdWU9XCInICsgcGFyc2VJbnQoIGpRdWVyeSggJyMnICsgZXZlbnQuZGF0YS5pZCArICdfd3BiY19zaXplX21vbnRoc19udW1faW5fcm93JyApLnZhbCgpLnRyaW0oKSApICsgJ1wiXScgKS5wcm9wKCAnc2VsZWN0ZWQnLCB0cnVlICk7Ly8udHJpZ2dlcignY2hhbmdlJyk7XHJcbiAgICAgICAgICAgIGlmICggJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mICh3cGJjX2ZpZWxkX2hpZ2hsaWdodCkgKXtcclxuICAgICAgICAgICAgICAgIHdwYmNfZmllbGRfaGlnaGxpZ2h0KCAnIycgKyBldmVudC5kYXRhLmlkICsgJ193cGJjX251bW1vbnRocycgKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vIFVwZGF0ZSBTaG9ydGNvZGUgb24gY2hhbmdpbmc6IFNpemVcclxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgalF1ZXJ5KCAgICcjJyArIGlkICsgJ193cGJjX3NpemVfZW5hYmxlZCcgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNpemUgT24gfCBPZmZcclxuICAgICAgICAgICAgICAgICsnLCMnICsgaWQgKyAnX3dwYmNfc2l6ZV9tb250aHNfbnVtX2luX3JvdycgICAgICAgICAgICAgICAgICAgLy8gLSBNb250aCBOdW0gaW4gUm93XHJcbiAgICAgICAgICAgICAgICArJywjJyArIGlkICsgJ193cGJjX3NpemVfY2FsZW5kYXJfd2lkdGgnICAgICAgICAgICAgICAgICAgICAgIC8vIC0gV2lkdGhcclxuICAgICAgICAgICAgICAgICsnLCMnICsgaWQgKyAnX3dwYmNfc2l6ZV9jYWxlbmRhcl93aWR0aF9weF9wcicgICAgICAgICAgICAgICAgLy8gLSBXaWR0aCBQUyB8ICVcclxuICAgICAgICAgICAgICAgICsnLCMnICsgaWQgKyAnX3dwYmNfc2l6ZV9jYWxlbmRhcl9jZWxsX2hlaWdodCcgICAgICAgICAgICAgICAgLy8gLSBDZWxsIEhlaWdodFxyXG5cclxuICAgICAgICAgICAgICAgICsnLCMnICsgaWQgKyAnd3BiY19zZWxlY3RfZGF5X3dlZWtkYXlfdGV4dGFyZWEnICAgICAgICAgICAgICAgLy8gUnVsZSBXZWVrZGF5XHJcbiAgICAgICAgICAgICAgICArJywjJyArIGlkICsgJ3dwYmNfc2VsZWN0X2RheV9zZWFzb25fdGV4dGFyZWEnICAgICAgICAgICAgICAgIC8vIFJ1bGUgU2Vhc29uXHJcbiAgICAgICAgICAgICAgICArJywjJyArIGlkICsgJ3dwYmNfc3RhcnRfZGF5X3NlYXNvbl90ZXh0YXJlYScgICAgICAgICAgICAgICAgIC8vIFJ1bGUgU2Vhc29uIC0gU3RhcnQgZGF5XHJcbiAgICAgICAgICAgICAgICArJywjJyArIGlkICsgJ3dwYmNfc2VsZWN0X2RheV9mb3JkYXRlX3RleHRhcmVhJyAgICAgICAgICAgICAgIC8vIFJ1bGUgRGF0ZVxyXG5cclxuICAgICAgICAgICAgICAgICsnLCMnICsgaWQgKyAnX3dwYmNfcmVzb3VyY2VfaWQnICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVzb3VyY2UgSURcclxuICAgICAgICAgICAgICAgICsnLCMnICsgaWQgKyAnX3dwYmNfY3VzdG9tX2Zvcm0nICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ3VzdG9tIEZvcm1cclxuICAgICAgICAgICAgICAgICsnLCMnICsgaWQgKyAnX3dwYmNfbnVtbW9udGhzJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTnVtIE1vbnRoc1xyXG5cclxuICAgICAgICAgICAgICAgICsnLCMnICsgaWQgKyAnX3dwYmNfc3RhcnRtb250aF9hY3RpdmUnICAgICAgICAgICAgICAgICAgICAgICAvLyBTdGFydCBNb250aCBFbmFibGVcclxuICAgICAgICAgICAgICAgICsnLCMnICsgaWQgKyAnX3dwYmNfc3RhcnRtb250aF95ZWFyJyAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgLSBZZWFyXHJcbiAgICAgICAgICAgICAgICArJywjJyArIGlkICsgJ193cGJjX3N0YXJ0bW9udGhfbW9udGgnICAgICAgICAgICAgICAgICAgICAgICAgLy8gIC0gTW9udGhcclxuXHJcbiAgICAgICAgICAgICAgICArJywjJyArIGlkICsgJ193cGJjX2FnZ3JlZ2F0ZScgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWdncmVnYXRlXHJcbiAgICAgICAgICAgICAgICArJywjJyArIGlkICsgJ193cGJjX2FnZ3JlZ2F0ZV9fYm9va2luZ3Nfb25seScgICAgICAgICAgICAgICAgLy8gYWdncmVnYXRlIG9wdGlvblxyXG5cclxuICAgICAgICAgICAgICAgICsnLCMnICsgaWQgKyAnX3dwYmNfbXVsdGlwbGVfcmVzb3VyY2VzJyAgICAgICAgICAgICAgICAgICAgIC8vIFtib29raW5nc2VsZWN0XSAtIE11bHRpcGxlIFJlc291cmNlc1xyXG4gICAgICAgICAgICAgICAgKycsIycgKyBpZCArICdfd3BiY19zZWxlY3RlZF9yZXNvdXJjZScgICAgICAgICAgICAgICAgICAgICAgLy8gW2Jvb2tpbmdzZWxlY3RdIC0gU2VsZWN0ZWQgUmVzb3VyY2VcclxuICAgICAgICAgICAgICAgICsnLCMnICsgaWQgKyAnX3dwYmNfdGV4dF9sYWJlbCcgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFtib29raW5nc2VsZWN0XSAtIExhYmVsXHJcbiAgICAgICAgICAgICAgICArJywjJyArIGlkICsgJ193cGJjX2ZpcnN0X29wdGlvbl90aXRsZScgICAgICAgICAgICAgICAgICAgICAvLyBbYm9va2luZ3NlbGVjdF0gLSBGaXJzdCAgT3B0aW9uXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVGltZUxpbmVcclxuICAgICAgICAgICAgICAgICtcIixpbnB1dFtuYW1lPSdcIisgaWQgK1wiX3dwYmNfdmlld19tb2RlX3RpbWVsaW5lX21vbnRoc19udW1faW5fcm93J11cIlxyXG4gICAgICAgICAgICAgICAgKycsIycgKyBpZCArICdfd3BiY190ZXh0X2xhYmVsX3RpbWVsaW5lJ1xyXG4gICAgICAgICAgICAgICAgKycsIycgKyBpZCArICdfd3BiY19zY3JvbGxfdGltZWxpbmVfc2Nyb2xsX2RheXMnXHJcbiAgICAgICAgICAgICAgICArJywjJyArIGlkICsgJ193cGJjX3Njcm9sbF90aW1lbGluZV9zY3JvbGxfbW9udGgnXHJcbiAgICAgICAgICAgICAgICArJywjJyArIGlkICsgJ193cGJjX3N0YXJ0X2RhdGVfdGltZWxpbmVfYWN0aXZlJ1xyXG4gICAgICAgICAgICAgICAgKycsIycgKyBpZCArICdfd3BiY19zdGFydF9kYXRlX3RpbWVsaW5lX3llYXInXHJcbiAgICAgICAgICAgICAgICArJywjJyArIGlkICsgJ193cGJjX3N0YXJ0X2RhdGVfdGltZWxpbmVfbW9udGgnXHJcbiAgICAgICAgICAgICAgICArJywjJyArIGlkICsgJ193cGJjX3N0YXJ0X2RhdGVfdGltZWxpbmVfZGF5J1xyXG4gICAgICAgICAgICAgICAgKycsIycgKyBpZCArICdfd3BiY19zdGFydF9lbmRfdGltZV90aW1lbGluZV9zdGFydHRpbWUnXHJcbiAgICAgICAgICAgICAgICArJywjJyArIGlkICsgJ193cGJjX3N0YXJ0X2VuZF90aW1lX3RpbWVsaW5lX2VuZHRpbWUnXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRm9ybSBPbmx5XHJcbiAgICAgICAgICAgICAgICArJywjJyArIGlkICsgJ193cGJjX2Jvb2tpbmdfZGF0ZV95ZWFyJ1xyXG4gICAgICAgICAgICAgICAgKycsIycgKyBpZCArICdfd3BiY19ib29raW5nX2RhdGVfbW9udGgnXHJcbiAgICAgICAgICAgICAgICArJywjJyArIGlkICsgJ193cGJjX2Jvb2tpbmdfZGF0ZV9kYXknXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gW2Jvb2tpbmdzZWFyY2ggLi4uXVxyXG4gICAgICAgICAgICAgICAgK1wiLGlucHV0W25hbWU9J1wiKyBpZCArXCJfd3BiY19zZWFyY2hfZm9ybV9yZXN1bHRzJ11cIlxyXG4gICAgICAgICAgICAgICAgKycsIycgKyBpZCArICdfd3BiY19zZWFyY2hfbmV3X3BhZ2VfZW5hYmxlZCdcclxuICAgICAgICAgICAgICAgICsnLCMnICsgaWQgKyAnX3dwYmNfc2VhcmNoX25ld19wYWdlX3VybCdcclxuICAgICAgICAgICAgICAgIC8vICsnLCMnICsgaWQgKyAnX3dwYmNfc2VhcmNoX2hlYWRlcicgICAgICAgICAgICAgICAgICAgICAgIC8vRml4SW46IDEwLjAuMC40MVxyXG4gICAgICAgICAgICAgICAgLy8gKycsIycgKyBpZCArICdfd3BiY19zZWFyY2hfbm90aGluZ19mb3VuZCdcclxuICAgICAgICAgICAgICAgICsnLCMnICsgaWQgKyAnX3dwYmNfc2VhcmNoX2Zvcl91c2VycydcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBbYm9va2luZ290aGVyIC4uLiBdXHJcbiAgICAgICAgICAgICAgICArXCIsaW5wdXRbbmFtZT0nXCIrIGlkICtcIl93cGJjX3Nob3J0Y29kZV90eXBlJ11cIlxyXG4gICAgICAgICAgICAgICAgKycsIycgKyBpZCArICdfd3BiY19yZXNvdXJjZV9zaG93J1xyXG5cclxuICAgICAgICAgICAgICAgIC8vYm9va2luZ19pbXBvcnRfaWNzICwgYm9va2luZ19saXN0aW5nX2ljc1xyXG4gICAgICAgICAgICAgICAgKycsIycgKyBpZCArICdfd3BiY191cmwnXHJcbiAgICAgICAgICAgICAgICArJywjJyArIGlkICsgJ19mcm9tJ1xyXG4gICAgICAgICAgICAgICAgKycsIycgKyBpZCArICdfZnJvbV9vZmZzZXQnXHJcbiAgICAgICAgICAgICAgICArJywjJyArIGlkICsgJ19mcm9tX29mZnNldF90eXBlJ1xyXG4gICAgICAgICAgICAgICAgKycsIycgKyBpZCArICdfdW50aWwnXHJcbiAgICAgICAgICAgICAgICArJywjJyArIGlkICsgJ191bnRpbF9vZmZzZXQnXHJcbiAgICAgICAgICAgICAgICArJywjJyArIGlkICsgJ191bnRpbF9vZmZzZXRfdHlwZSdcclxuICAgICAgICAgICAgICAgICsnLCMnICsgaWQgKyAnX2NvbmRpdGlvbnNfaW1wb3J0J1xyXG4gICAgICAgICAgICAgICAgKycsIycgKyBpZCArICdfY29uZGl0aW9uc19ldmVudHMnXHJcbiAgICAgICAgICAgICAgICArJywjJyArIGlkICsgJ19jb25kaXRpb25zX21heF9udW0nXHJcbiAgICAgICAgICAgICAgICArJywjJyArIGlkICsgJ19zaWxlbmNlJ1xyXG4gICAgICAgICAgICApLm9uKCAnY2hhbmdlJywgeydpZCc6IGlkfSwgZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coICdvbiBjaGFuZ2Ugd3BiY19zZXRfc2hvcnRjb2RlJywgZXZlbnQuZGF0YS5pZCApO1xyXG4gICAgICAgICAgICAgICAgICAgIHdwYmNfc2V0X3Nob3J0Y29kZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICB3cGJjX3NldF9zaG9ydGNvZGUoKTtcclxufSk7XHJcbiJdLCJmaWxlIjoiaW5jbHVkZXMvdWlfbW9kYWxfX3Nob3J0Y29kZXMvX291dC93cGJjX3Nob3J0Y29kZV9wb3B1cC5qcyJ9
