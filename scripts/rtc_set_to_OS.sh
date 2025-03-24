# TMGcore Cryptocore - #1534
# script to set  the OS date/time settings from the Sequent Microsystems RTC on the IA hat - Raspberry Pi controller
# March 31, 2022 - mac
# this needs to be done on system startup. This script needs permission to set the OS date/time function.
shopt -s lastpipe
# read the RTC data into variable TMGTIME
megaind 0 rtcrd | read TMGTIME
#"$TMGM1" "$TMGD1" "$TMGY1" "$TMGH1" "$TMGM2" "$TMGS1"
# update the OS date/time here
sudo date --set="$TMGTIME"



