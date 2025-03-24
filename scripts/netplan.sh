#!/bin/bash -e

if [ "$1" == "dhcp" ];
then
  cat <<EOF >/etc/netplan/99-net-config.yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    eth0:
      dhcp4: yes
EOF

  netplan apply
  exit 0
fi

## Map args to vars
ipAddress=$1
gateway=$2
subnetMask=$3
dnsString="$4, $5"

## Output data to file
cat <<EOF >/etc/netplan/99-net-config.yaml
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
          addresses: [$(echo $dnsString | grep -o '[0-9].*[0-9]')]
EOF

## Apply the config
netplan apply
