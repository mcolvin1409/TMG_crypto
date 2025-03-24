# Services [Redis, Node-RED]

### Table of Contents

- [Install on Sequent Microsystems for megaind-rpi & rtd-rpi](https://github.com/SequentMicrosystems)
- [Install Mosquitto on Raspi](https://youtu.be/AsDHEDbyLfg?t=71)

## Run Express Server Locally - Available on http://localhost:5000

<pre>
cd server
npm install
npm run dev
</pre>

## Build and run the Frontend - Avaiable on http://localhost:8080

<pre>
cd frontend
yarn
yarn serve
</pre>

## Node-RED Data Agent: Sends and receives data every second to broker - Available on http://localhost:1880

<pre>
<b>Build Agent: Node-RED, Redis (Will need to import flows)</b>
bash scripts/nodeRED.sh
</pre>

## Redis Sensor Cache: Persists state from Raspi sensors to cache (To run standalone Redis)

<pre>
<b>Build Redis Cache</b>
bash scripts/redis.sh
</pre>

## Backend Configuration: Provisioning CryptoCore, initial Password and Netplan settings

<pre>
<b>Provision Backend for CryptoCore</b>
bash scripts/genCrypto.sh -s A000-1234-5678 -h "CryptoCore - 140kW" -v 1.0.0 -r "A" -t 9
</pre>

<pre>
<b>Set Initial Password</b>
bash scripts/setPassword.sh
</pre>

<pre>
<b>Create netplan file</b>
bash scripts/genNetplanSettings.sh
</pre>
