export default {
  data() {
    return {
      timeZones: [
        { text: "Africa/Abidjan" },
        { text: "Africa/Accra" },
        { text: "Africa/Addis_Ababa" },
        { text: "Africa/Algiers" },
        { text: "Africa/Asmara" },
        { text: "Africa/Bamako" },
        { text: "Africa/Bangui" },
        { text: "Africa/Banjul" },
        { text: "Africa/Bissau" },
        { text: "Africa/Blantyre" },
        { text: "Africa/Brazzaville" },
        { text: "Africa/Bujumbura" },
        { text: "Africa/Cairo" },
        { text: "Africa/Casablanca" },
        { text: "Africa/Ceuta" },
        { text: "Africa/Conakry" },
        { text: "Africa/Dakar" },
        { text: "Africa/Dar_es_Salaam" },
        { text: "Africa/Djibouti" },
        { text: "Africa/Douala" },
        { text: "Africa/El_Aaiun" },
        { text: "Africa/Freetown" },
        { text: "Africa/Gaborone" },
        { text: "Africa/Harare" },
        { text: "Africa/Johannesburg" },
        { text: "Africa/Juba" },
        { text: "Africa/Kampala" },
        { text: "Africa/Khartoum" },
        { text: "Africa/Kigali" },
        { text: "Africa/Kinshasa" },
        { text: "Africa/Lagos" },
        { text: "Africa/Libreville" },
        { text: "Africa/Lome" },
        { text: "Africa/Luanda" },
        { text: "Africa/Lubumbashi" },
        { text: "Africa/Lusaka" },
        { text: "Africa/Malabo" },
        { text: "Africa/Maputo" },
        { text: "Africa/Maseru" },
        { text: "Africa/Mbabane" },
        { text: "Africa/Mogadishu" },
        { text: "Africa/Monrovia" },
        { text: "Africa/Nairobi" },
        { text: "Africa/Ndjamena" },
        { text: "Africa/Niamey" },
        { text: "Africa/Nouakchott" },
        { text: "Africa/Ouagadougou" },
        { text: "Africa/Porto-Novo" },
        { text: "Africa/Sao_Tome" },
        { text: "Africa/Tripoli" },
        { text: "Africa/Tunis" },
        { text: "Africa/Windhoek" },
        { text: "America/Adak" },
        { text: "America/Anchorage" },
        { text: "America/Anguilla" },
        { text: "America/Antigua" },
        { text: "America/Araguaina" },
        { text: "America/Argentina/Buenos_Aires" },
        { text: "America/Argentina/Catamarca" },
        { text: "America/Argentina/Cordoba" },
        { text: "America/Argentina/Jujuy" },
        { text: "America/Argentina/La_Rioja" },
        { text: "America/Argentina/Mendoza" },
        { text: "America/Argentina/Rio_Gallegos" },
        { text: "America/Argentina/Salta" },
        { text: "America/Argentina/San_Juan" },
        { text: "America/Argentina/San_Luis" },
        { text: "America/Argentina/Tucuman" },
        { text: "America/Argentina/Ushuaia" },
        { text: "America/Aruba" },
        { text: "America/Asuncion" },
        { text: "America/Atikokan" },
        { text: "America/Bahia" },
        { text: "America/Bahia_Banderas" },
        { text: "America/Barbados" },
        { text: "America/Belem" },
        { text: "America/Belize" },
        { text: "America/Blanc-Sablon" },
        { text: "America/Boa_Vista" },
        { text: "America/Bogota" },
        { text: "America/Boise" },
        { text: "America/Cambridge_Bay" },
        { text: "America/Campo_Grande" },
        { text: "America/Cancun" },
        { text: "America/Caracas" },
        { text: "America/Cayenne" },
        { text: "America/Cayman" },
        { text: "America/Chicago" },
        { text: "America/Chihuahua" },
        { text: "America/Costa_Rica" },
        { text: "America/Creston" },
        { text: "America/Cuiaba" },
        { text: "America/Curacao" },
        { text: "America/Danmarkshavn" },
        { text: "America/Dawson" },
        { text: "America/Dawson_Creek" },
        { text: "America/Denver" },
        { text: "America/Detroit" },
        { text: "America/Dominica" },
        { text: "America/Edmonton" },
        { text: "America/Eirunepe" },
        { text: "America/El_Salvador" },
        { text: "America/Fort_Nelson" },
        { text: "America/Fortaleza" },
        { text: "America/Glace_Bay" },
        { text: "America/Godthab" },
        { text: "America/Goose_Bay" },
        { text: "America/Grand_Turk" },
        { text: "America/Grenada" },
        { text: "America/Guadeloupe" },
        { text: "America/Guatemala" },
        { text: "America/Guayaquil" },
        { text: "America/Guyana" },
        { text: "America/Halifax" },
        { text: "America/Havana" },
        { text: "America/Hermosillo" },
        { text: "America/Indiana/Indianapolis" },
        { text: "America/Indiana/Knox" },
        { text: "America/Indiana/Marengo" },
        { text: "America/Indiana/Petersburg" },
        { text: "America/Indiana/Tell_City" },
        { text: "America/Indiana/Vevay" },
        { text: "America/Indiana/Vincennes" },
        { text: "America/Indiana/Winamac" },
        { text: "America/Inuvik" },
        { text: "America/Iqaluit" },
        { text: "America/Jamaica" },
        { text: "America/Juneau" },
        { text: "America/Kentucky/Louisville" },
        { text: "America/Kentucky/Monticello" },
        { text: "America/Kralendijk" },
        { text: "America/La_Paz" },
        { text: "America/Lima" },
        { text: "America/Los_Angeles" },
        { text: "America/Lower_Princes" },
        { text: "America/Maceio" },
        { text: "America/Managua" },
        { text: "America/Manaus" },
        { text: "America/Marigot" },
        { text: "America/Martinique" },
        { text: "America/Matamoros" },
        { text: "America/Mazatlan" },
        { text: "America/Menominee" },
        { text: "America/Merida" },
        { text: "America/Metlakatla" },
        { text: "America/Mexico_City" },
        { text: "America/Miquelon" },
        { text: "America/Moncton" },
        { text: "America/Monterrey" },
        { text: "America/Montevideo" },
        { text: "America/Montserrat" },
        { text: "America/Nassau" },
        { text: "America/New_York" },
        { text: "America/Nipigon" },
        { text: "America/Nome" },
        { text: "America/Noronha" },
        { text: "America/North_Dakota/Beulah" },
        { text: "America/North_Dakota/Center" },
        { text: "America/North_Dakota/New_Salem" },
        { text: "America/Ojinaga" },
        { text: "America/Panama" },
        { text: "America/Pangnirtung" },
        { text: "America/Paramaribo" },
        { text: "America/Phoenix" },
        { text: "America/Port-au-Prince" },
        { text: "America/Port_of_Spain" },
        { text: "America/Porto_Velho" },
        { text: "America/Puerto_Rico" },
        { text: "America/Rainy_River" },
        { text: "America/Rankin_Inlet" },
        { text: "America/Recife" },
        { text: "America/Regina" },
        { text: "America/Resolute" },
        { text: "America/Rio_Branco" },
        { text: "America/Santarem" },
        { text: "America/Santiago" },
        { text: "America/Santo_Domingo" },
        { text: "America/Sao_Paulo" },
        { text: "America/Scoresbysund" },
        { text: "America/Sitka" },
        { text: "America/St_Barthelemy" },
        { text: "America/St_Johns" },
        { text: "America/St_Kitts" },
        { text: "America/St_Lucia" },
        { text: "America/St_Thomas" },
        { text: "America/St_Vincent" },
        { text: "America/Swift_Current" },
        { text: "America/Tegucigalpa" },
        { text: "America/Thule" },
        { text: "America/Thunder_Bay" },
        { text: "America/Tijuana" },
        { text: "America/Toronto" },
        { text: "America/Tortola" },
        { text: "America/Vancouver" },
        { text: "America/Whitehorse" },
        { text: "America/Winnipeg" },
        { text: "America/Yakutat" },
        { text: "America/Yellowknife" },
        { text: "Antarctica/Casey" },
        { text: "Antarctica/Davis" },
        { text: "Antarctica/DumontDUrville" },
        { text: "Antarctica/Macquarie" },
        { text: "Antarctica/Mawson" },
        { text: "Antarctica/McMurdo" },
        { text: "Antarctica/Palmer" },
        { text: "Antarctica/Rothera" },
        { text: "Antarctica/Syowa" },
        { text: "Antarctica/Troll" },
        { text: "Antarctica/Vostok" },
        { text: "Arctic/Longyearbyen" },
        { text: "Asia/Aden" },
        { text: "Asia/Almaty" },
        { text: "Asia/Amman" },
        { text: "Asia/Anadyr" },
        { text: "Asia/Aqtau" },
        { text: "Asia/Aqtobe" },
        { text: "Asia/Ashgabat" },
        { text: "Asia/Atyrau" },
        { text: "Asia/Baghdad" },
        { text: "Asia/Bahrain" },
        { text: "Asia/Baku" },
        { text: "Asia/Bangkok" },
        { text: "Asia/Barnaul" },
        { text: "Asia/Beirut" },
        { text: "Asia/Bishkek" },
        { text: "Asia/Brunei" },
        { text: "Asia/Chita" },
        { text: "Asia/Choibalsan" },
        { text: "Asia/Colombo" },
        { text: "Asia/Damascus" },
        { text: "Asia/Dhaka" },
        { text: "Asia/Dili" },
        { text: "Asia/Dubai" },
        { text: "Asia/Dushanbe" },
        { text: "Asia/Famagusta" },
        { text: "Asia/Gaza" },
        { text: "Asia/Hebron" },
        { text: "Asia/Ho_Chi_Minh" },
        { text: "Asia/Hong_Kong" },
        { text: "Asia/Hovd" },
        { text: "Asia/Irkutsk" },
        { text: "Asia/Jakarta" },
        { text: "Asia/Jayapura" },
        { text: "Asia/Jerusalem" },
        { text: "Asia/Kabul" },
        { text: "Asia/Kamchatka" },
        { text: "Asia/Karachi" },
        { text: "Asia/Kathmandu" },
        { text: "Asia/Khandyga" },
        { text: "Asia/Kolkata" },
        { text: "Asia/Krasnoyarsk" },
        { text: "Asia/Kuala_Lumpur" },
        { text: "Asia/Kuching" },
        { text: "Asia/Kuwait" },
        { text: "Asia/Macau" },
        { text: "Asia/Magadan" },
        { text: "Asia/Makassar" },
        { text: "Asia/Manila" },
        { text: "Asia/Muscat" },
        { text: "Asia/Nicosia" },
        { text: "Asia/Novokuznetsk" },
        { text: "Asia/Novosibirsk" },
        { text: "Asia/Omsk" },
        { text: "Asia/Oral" },
        { text: "Asia/Phnom_Penh" },
        { text: "Asia/Pontianak" },
        { text: "Asia/Pyongyang" },
        { text: "Asia/Qatar" },
        { text: "Asia/Qyzylorda" },
        { text: "Asia/Riyadh" },
        { text: "Asia/Sakhalin" },
        { text: "Asia/Samarkand" },
        { text: "Asia/Seoul" },
        { text: "Asia/Shanghai" },
        { text: "Asia/Singapore" },
        { text: "Asia/Srednekolymsk" },
        { text: "Asia/Taipei" },
        { text: "Asia/Tashkent" },
        { text: "Asia/Tbilisi" },
        { text: "Asia/Tehran" },
        { text: "Asia/Thimphu" },
        { text: "Asia/Tokyo" },
        { text: "Asia/Tomsk" },
        { text: "Asia/Ulaanbaatar" },
        { text: "Asia/Urumqi" },
        { text: "Asia/Ust-Nera" },
        { text: "Asia/Vientiane" },
        { text: "Asia/Vladivostok" },
        { text: "Asia/Yakutsk" },
        { text: "Asia/Yangon" },
        { text: "Asia/Yekaterinburg" },
        { text: "Asia/Yerevan" },
        { text: "Atlantic/Azores" },
        { text: "Atlantic/Bermuda" },
        { text: "Atlantic/Canary" },
        { text: "Atlantic/Cape_Verde" },
        { text: "Atlantic/Faroe" },
        { text: "Atlantic/Madeira" },
        { text: "Atlantic/Reykjavik" },
        { text: "Atlantic/South_Georgia" },
        { text: "Atlantic/St_Helena" },
        { text: "Atlantic/Stanley" },
        { text: "Australia/Adelaide" },
        { text: "Australia/Brisbane" },
        { text: "Australia/Broken_Hill" },
        { text: "Australia/Currie" },
        { text: "Australia/Darwin" },
        { text: "Australia/Eucla" },
        { text: "Australia/Hobart" },
        { text: "Australia/Lindeman" },
        { text: "Australia/Lord_Howe" },
        { text: "Australia/Melbourne" },
        { text: "Australia/Perth" },
        { text: "Australia/Sydney" },
        { text: "Europe/Amsterdam" },
        { text: "Europe/Andorra" },
        { text: "Europe/Astrakhan" },
        { text: "Europe/Athens" },
        { text: "Europe/Belgrade" },
        { text: "Europe/Berlin" },
        { text: "Europe/Bratislava" },
        { text: "Europe/Brussels" },
        { text: "Europe/Bucharest" },
        { text: "Europe/Budapest" },
        { text: "Europe/Busingen" },
        { text: "Europe/Chisinau" },
        { text: "Europe/Copenhagen" },
        { text: "Europe/Dublin" },
        { text: "Europe/Gibraltar" },
        { text: "Europe/Guernsey" },
        { text: "Europe/Helsinki" },
        { text: "Europe/Isle_of_Man" },
        { text: "Europe/Istanbul" },
        { text: "Europe/Jersey" },
        { text: "Europe/Kaliningrad" },
        { text: "Europe/Kiev" },
        { text: "Europe/Kirov" },
        { text: "Europe/Lisbon" },
        { text: "Europe/Ljubljana" },
        { text: "Europe/London" },
        { text: "Europe/Luxembourg" },
        { text: "Europe/Madrid" },
        { text: "Europe/Malta" },
        { text: "Europe/Mariehamn" },
        { text: "Europe/Minsk" },
        { text: "Europe/Monaco" },
        { text: "Europe/Moscow" },
        { text: "Europe/Oslo" },
        { text: "Europe/Paris" },
        { text: "Europe/Podgorica" },
        { text: "Europe/Prague" },
        { text: "Europe/Riga" },
        { text: "Europe/Rome" },
        { text: "Europe/Samara" },
        { text: "Europe/San_Marino" },
        { text: "Europe/Sarajevo" },
        { text: "Europe/Saratov" },
        { text: "Europe/Simferopol" },
        { text: "Europe/Skopje" },
        { text: "Europe/Sofia" },
        { text: "Europe/Stockholm" },
        { text: "Europe/Tallinn" },
        { text: "Europe/Tirane" },
        { text: "Europe/Ulyanovsk" },
        { text: "Europe/Uzhgorod" },
        { text: "Europe/Vaduz" },
        { text: "Europe/Vatican" },
        { text: "Europe/Vienna" },
        { text: "Europe/Vilnius" },
        { text: "Europe/Volgograd" },
        { text: "Europe/Warsaw" },
        { text: "Europe/Zagreb" },
        { text: "Europe/Zaporozhye" },
        { text: "Europe/Zurich" },
        { text: "Indian/Antananarivo" },
        { text: "Indian/Chagos" },
        { text: "Indian/Christmas" },
        { text: "Indian/Cocos" },
        { text: "Indian/Comoro" },
        { text: "Indian/Kerguelen" },
        { text: "Indian/Mahe" },
        { text: "Indian/Maldives" },
        { text: "Indian/Mauritius" },
        { text: "Indian/Mayotte" },
        { text: "Indian/Reunion" },
        { text: "Pacific/Apia" },
        { text: "Pacific/Auckland" },
        { text: "Pacific/Bougainville" },
        { text: "Pacific/Chatham" },
        { text: "Pacific/Chuuk" },
        { text: "Pacific/Easter" },
        { text: "Pacific/Efate" },
        { text: "Pacific/Enderbury" },
        { text: "Pacific/Fakaofo" },
        { text: "Pacific/Fiji" },
        { text: "Pacific/Funafuti" },
        { text: "Pacific/Galapagos" },
        { text: "Pacific/Gambier" },
        { text: "Pacific/Guadalcanal" },
        { text: "Pacific/Guam" },
        { text: "Pacific/Honolulu" },
        { text: "Pacific/Johnston" },
        { text: "Pacific/Kiritimati" },
        { text: "Pacific/Kosrae" },
        { text: "Pacific/Kwajalein" },
        { text: "Pacific/Majuro" },
        { text: "Pacific/Marquesas" },
        { text: "Pacific/Midway" },
        { text: "Pacific/Nauru" },
        { text: "Pacific/Niue" },
        { text: "Pacific/Norfolk" },
        { text: "Pacific/Noumea" },
        { text: "Pacific/Pago_Pago" },
        { text: "Pacific/Palau" },
        { text: "Pacific/Pitcairn" },
        { text: "Pacific/Pohnpei" },
        { text: "Pacific/Port_Moresby" },
        { text: "Pacific/Rarotonga" },
        { text: "Pacific/Saipan" },
        { text: "Pacific/Tahiti" },
        { text: "Pacific/Tarawa" },
        { text: "Pacific/Tongatapu" },
        { text: "Pacific/Wake" },
        { text: "Pacific/Wallis" },
        { text: "UTC" },
      ],
    };
  },
};
