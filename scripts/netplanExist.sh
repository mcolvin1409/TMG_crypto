#!/bin/bash

# filename="/etc/netplan/99-net-config.yaml"

ipAddress=$1
gateway=$2
subnetMask=$3
dns1=$4
dns2=$5

cat <<EOF >>/etc/netplan/99-net-config.yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    eth0:
      dhcp4: no
      addresses:
        - $ipAddress/$subnetMask
      gateway4: $gateway
      nameservers:
          addresses: [$dns1, $dns2]
EOF