#!/bin/sh

FILE=/etc/netplan/99-net-config.yaml
if [ -f "$FILE" ]; then
    echo "$FILE exists."
else 
    echo "Creating netplan configuration"
cat << EOF > $FILE
network:
  version: 2
  renderer: networkd
  ethernets:
    eth0:
      dhcp4: no
      addresses:
        - 192.168.1.220/24
      gateway4: 192.168.1.1
      nameservers:
          addresses: [8.8.8.8, 1.1.1.1]
EOF
    chmod 666 $FILE
    echo "$FILE has been created!"
fi