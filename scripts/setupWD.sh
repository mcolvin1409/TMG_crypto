# setup the Sequent Micro IA and RTD hats with delay on power on and how long to keep power off
# production mode - wait for 200 seconds after power on before WD kicks in
megaind 0 wdtipwr 200
rtd 0 wdtipwr 200
# production mode - wait for 20 seconds after watchdog barks, then turns power back on.
megaind 0 wdtopwr 20
rtd 0 wdtopwr 20
# production mode - this is the normal WD time
megaind 0 wdtpwr 60
rtd 0 wdtpwr 60

