#!/bin/sh
cd ./nodeRED

sudo npm install -g --unsafe-perm node-red && node-red

###### YES YOU CANT USE ANY DOCKER CONTAINERS LOL
# docker run -it --network host -p 1880:1880 -v $(pwd)/data:/data -e FLOWS=flows.json --name nodered nodered/node-red:2.1.5
# docker run -it --network host -p 1880:1880 -v /home/pi/.node-red:/data -e FLOWS=flows.json --name nodered nodered/node-red:2.1.5
# docker run -it -p 1880:1880 -v $(pwd):/data -e FLOWS=flows.json --name nodered nodered/node-red:2.1.5
# docker run -it -p 1880:1880 -v node_red_data:/data --name mynodered nodered/node-red

# docker build -t=crytpocontrol:latest . && docker run --rm -v -p 1880:1880 --name crytpocontrol crytpocontrol:latest




