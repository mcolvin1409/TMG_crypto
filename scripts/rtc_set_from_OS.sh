# TMGcore Cryptocore - #1534
# script to set the Sequent Microsystems RTC on the IA hat - Raspberry Pi controller
# from the OS date/time settings
# March 31, 2022 - mac
#
# this needs to be done after the Cryptocontrol web page has set the manual date/time settings
# from the Express server (from changes done the System Properties dialog)
shopt -s lastpipe
# to set the SM RTC, each date and time element should be captured into environment variables
date +"%m" | read TMGM1
#echo "$TMGM1"
date +"%d" | read TMGD1
#echo "$TMGD1"
date +"%y" | read TMGY1
#echo "$TMGY1"
date +"%H" | read TMGH1
#echo "$TMGH1"
date +"%M" | read TMGM2
#echo "$TMGM2"
date +"%S" | read TMGS1
#echo "$TMGS1"
#echo 
#echo "$TMGM1" "$TMGD1" "$TMGY1" "$TMGH1" "$TMGM2" "$TMGS1"
# now set the RTC data from the environment varaibles
megaind 0 rtcwr "$TMGM1" "$TMGD1" "$TMGY1" "$TMGH1" "$TMGM2" "$TMGS1"


