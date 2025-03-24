FROM nodered/node-red:1.1.3

USER root

COPY data/* /usr/src/node-red/
COPY data/settings.js /data/settings.js

RUN apk add --no-cache ipmitool net-snmp-tools jq \
 && chown -R node-red:node-red /usr/src/node-red/ \
 && chown node-red:node-red /data/settings.js

USER node-red

RUN npm install

ENV FLOWS=flows.json
ENTRYPOINT ["/bin/bash"]
