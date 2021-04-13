var i18n = jQuery.extend({}, i18n || {}, {
    dcmvcal: {
        dateformat: {
            "fulldaykey": "ddMMyyyy",
            "fulldayshow": "d. L yyyy",
            "fulldayvalue": "d/M/yyyy", 
            "Md": "W d.M.",
            "nDaysView": "d. M",
            "listViewDate": "d. L yyyy",
            "Md3": "d. L",
            "separator": "/",
            "year_index": 2,
            "month_index": 1,
            "day_index": 0,
            "day": "d",
            "sun2": "So",
            "mon2": "Mo",
            "tue2": "Di",
            "wed2": "Mi",
            "thu2": "Do",
            "fri2": "Fr",
            "sat2": "Sa",
            "sun": "Son",
            "mon": "Mon",
            "tue": "Die",
            "wed": "Mit",
            "thu": "Don",
            "fri": "Fre",
            "sat": "Sam",
            "sunday": "Sonntag",
            "monday": "Montag",
            "tuesday": "Dienstag",
            "wednesday": "Mittwoch",
            "thursday": "Donnerstag",
            "friday": "Freitag",
            "saturday": "Samstag",
            "jan": "Jan",
            "feb": "Feb",
            "mar": "Mär",
            "apr": "Apr",
            "may": "Mai",
            "jun": "Jun",
            "jul": "Jul",
            "aug": "Aug",
            "sep": "Sep",
            "oct": "Okt",
            "nov": "Nov",
            "dec": "Dez",
            "l_jan": "Januar",
            "l_feb": "Februar",
            "l_mar": "März",
            "l_apr": "April",
            "l_may": "Mai",
            "l_jun": "Juni",
            "l_jul": "Juli",
            "l_aug": "August",
            "l_sep": "September",
            "l_oct": "Oktober",
            "l_nov": "November",
            "l_dec": "Dezember"
        },
        "no_implemented": "nicht verf&uuml;gbar", //"No implemented yet",
        "to_date_view": "Diesen Tag anzeigen", //"Click to the view of current date",
        "i_undefined": "undefiniert", //"Undefined",
        "allday_event": "Ganzt&auml;gig", //
        "repeat_event": "Termin wiederholen", //"Repeat event",
        "time": "Zeit", //"Time",
        "event": "Termin", //"Event",
        "location": "Ort", //"Location",
        "participant": "Teilnehmer", //"Participant",
        "get_data_exception": "Fehler beim Abrufen der Daten", //"Exception when getting data",
        "new_event": "Neuer Termin", //"New event",
        "confirm_delete_event": "Wollen Sie diesen Termin l&ouml;schen?", //"Do you confirm to delete this event? ",
        "confrim_delete_event_or_all": "Wollen Sie die ganze Terminserie oder nur diesen einen Termin l&ouml;schen? \ r \ n[OK], um nur diesen Termin zu l&ouml;schen, mit [alle] l&ouml;schen Sie alle Termine der Serie", //"Do you want to delete all repeat events or only this event? \r\nClick [OK] to delete only this event, click [Cancel] delete all events",
        "data_format_error": "Falsches Datenformat!", //"Data format error! ",
        "invalid_title": "Titel darf nicht leer sein oder ($<>) enthalten.", //"Event title can not be blank or contains ($<>)",
        "view_no_ready": "View ist nicht bereit", //"View is not ready",
        "example": "z. B. auf seiner Tagung in Raum 107", //"e.g., meeting at room 107",
        "content": "Thema", //"What",
        "create_event": "Neuer Termin", //"Create event",
        "update_detail": "Bearbeiten", //"Edit details",
        "click_to_detail": "Details anzeigen", //"View details",
        "i_delete": "L&ouml;schen", //"Delete",
        "i_save": "Speichern", //"Save",
        "i_close": "Schliessen", //"Close",
        "day_plural": "Tage", //"days",
        "others": "andere", //"Others",
        "item": "", //"",
        "loading_data":"Daten werden geladen ...", //"Loading data...",
        "request_processed":"Die Anfrage wird bearbeitet ...", //"The request is being processed ...",
        "success":"Erfolgreich!", //"Success!",
        "are_you_sure_delete":"Wollen Sie diesen Termin wirklich löschen?", //"Are you sure to delete this event",
        "ok":"Ok", //"Ok",
        "cancel":"abbrechen", //"Cancel",
        "manage_the_calendar":"Verwalten Sie die Kalender", //"Manage The Calendar",
        "error_occurs":"Fehler tritt auf", //"Error occurs",
        "color":"Farbe", //"Color",
        "invalid_date_format":"Ung&uuml;ltiges Datumsformat", //"Invalid date format",
        "invalid_time_format":"Ung&uuml;ltige Zeit-Format", //"Invalid time format",
        "_simbol_not_allowed":"$<> Nicht erlaubt", //"$<> not allowed",
        "subject":"Thema", //"Subject",
        "time":"Zeit", //"Time",
        "to":"bis", //"To",
        "all_day_event":"Ganzt&auml;gig", //"All Day Event",
        "location":"Ort", //"Location",
        "remark":"Beschreibung", //"Description",
        "click_to_create_new_event":"Klicken Sie auf neuer Termin", //"Click to Create New Event",
        "new_event":"neuer Termin", //"New Event",
        "click_to_back_to_today":"zum heutigen Datum", //"Click to back to today",
        "today":"heute", //"Today",
        "sday":"Tag", //"Day",
        "week":"Woche", //"Week",
        "month":"Monat", //"Month",
        "ndays":"Tage",
        "list":"Liste",
        "nmonth":"Kalender", //"nMonth",
        "refresh_view":"Ansicht aktualisieren", //"Refresh view",
        "refresh":"aktualisieren", //"Refresh",
        "prev":"Zur&uuml;ck", //"Prev",
        "next":"weiter", //"Next",
        "loading":"Laden", //"Loading",
        "error_overlapping":"Dieser Termin &uuml;berlappt mit einem anderen",
        "sorry_could_not_load_your_data":"Die Daten konnten nicht geladen werden. Versuchen Sie es sp&auml;ter erneut", //"Sorry, could not load your data, please try again later",
        "first":"Erster",
        "second":"Zweiter",
        "third":"Dritter",
        "fourth":"Vierter",
        "last":"Letzter",
        "repeat":"Wiederholen",
        "edit":"Bearbeiten",
        "edit_recurring_event":"Terminserie bearbeiten",
        "would_you_like_to_change_only_this_event_all_events_in_the_series_or_this_and_all_following_events_in_the_series":"Wollen Sie nur diesen Termin ändern, die ganze Terminserie oder diesen Termin und alle darauf folgenden der Terminserie?",
        "only_this_event":"Nur diesen Termin",
        "all_other_events_in_the_series_will_remain_the_same":"Alle anderen Termine der Serie bleiben erhalten.",
        "following_events":"Folgende Termine",
        "this_and_all_the_following_events_will_be_changed":"Dieser Termin und alle folgenden werden geändert.",
        "any_changes_to_future_events_will_be_lost":"",
        "all_events":"Alle Termine",
        "all_events_in_the_series_will_be_changed":"Alle Termine der Serie werden geändert.",
        "any_changes_made_to_other_events_will_be_kept":"",
        "cancel_this_change":"Abbrechen",
        "delete_recurring_event":"Terminserie löschen",
        "would_you_like_to_delete_only_this_event_all_events_in_the_series_or_this_and_all_future_events_in_the_series":"Wollen Sie nur diesen Termin löschen, die ganze Terminserie oder diesen Termin und alle darauf folgenden der Terminserie?",
        "only_this_instance":"Nur diesen Termin",
        "all_other_events_in_the_series_will_remain":"Alle anderen Termine dieser Serie bleiben erhalten.",
        "all_following":"Alle folgenden",
        "this_and_all_the_following_events_will_be_deleted":"Dieser Termin und alle folgenden werden gelöscht.",
        "all_events_in_the_series":"Ganze Terminserie",
        "all_events_in_the_series_will_be_deleted":"Alle Termine der Serie werden gelöscht.",
        "repeats":"Wiederholung",
        "daily":"Täglich",
        "every_weekday_monday_to_friday":"Jeden Werktag (Montag bis Freitag)",
        "every_monday_wednesday_and_friday":"Jeden Montag, Mittwoch und Freitag",
        "every_tuesday_and_thursday":"Jeden Dienstag und Donnerstag",
        "weekly":"Wöchentlich",
        "monthly":"Monatlich",
        "yearly":"Jährlich",
        "repeat_every":"Wiederholen alle:",
        "weeks":"Wochen",
        "repeat_on":"Wiederholen",
        "repeat_by":"Wiederholen am:",
        "day_of_the_month":"Tag des Monats",
        "day_of_the_week":"Tag der Woche",
        "starts_on":"Beginnt am:",
        "ends":"Endet:",
        "never":" Nie",
        "after":"Nach",
        "occurrences":"Mal",
        "summary":"Überblick:",
        "every":"Alle",
        "weekly_on_weekdays":"Wöchentlich an Werktagen",
        "weekly_on_monday_wednesday_friday":"Wöchentlich Montags, Mittwochs und Freitags",
        "weekly_on_tuesday_thursday":"Wöchentlich Dienstags und Donnerstags",
        "on":"am",
        "on_day":"am Tag",
        "on_the":"am",
        "months":"Monate",
        "annually":"Jährlich",
        "years":"Jahre",
        "once":"einmal",
        "times":"Mal",
        "readmore":"weiter lesen",
        "readmore_less":"weniger",
        "readmore":"weiter lesen",
        "readmore_less":"weniger",
        "reminder_to":"Erinnerung an",
        "reminder_before":"vorher",
        "reminder_days":"Tage",
        "reminder_hours":"Stunden",
        "reminder_minutes":"Minuten",
        "until":"bis"
    }
});
