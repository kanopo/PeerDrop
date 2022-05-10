# PeerDrop
- [PeerDrop](#peerdrop)
  - [Involved technology](#involved-technology)
  - [The idea](#the-idea)
  - [NAT](#nat)
    - [STUN](#stun)
    - [TURN](#turn)
    - [Coturn](#coturn)
  - [Backend](#backend)
    - [Docker](#docker)
  - [Frontend](#frontend)
  - [PeerJS](#peerjs)
  - [Deployment](#deployment)
  - [Demo](#demo)

## 	Involved technology
PerDrop is a "*webapp*" built using:
- [ReactJS](https://reactjs.org/)
- [PeerJS](https://peerjs.com/)
- [SocketIO](https://socket.io/)
- [Tailwindcss](https://tailwindcss.com/)
- [Coturn](https://github.com/coturn/coturn)
- [Nord theme](https://www.nordtheme.com/)


## The idea
I really love the AirDrop functionality from Apple, but that functionality have some limitations:
- devices need to be fisically close
- work only with Apple devices

AirDrop can send really big file without noticeable compression by the final user.


Other alternative for sending file to ather people are:
- if you are close
  - usb stick
- if you are not close:
  - small file
    - mail
    - telegram
    - whatsapp
  - big file
    - upload on google drive or similar
    - seeding a torrent or similar


The idea is that i need:
- simple ui
- large availability in terms of devices supported(WebRTC support lot's of devices)
- fast sending and reciving process(Cloud storage frequently have band limitations)


## NAT

![ivrpowers-turn-stun-screen 005](https://user-images.githubusercontent.com/101810067/167648785-4202639f-534b-40aa-840e-c9218140a007.jpeg)

Some users try to connect through different IP networks where Firewalls and NATs (Network Address Translators) could include specific policies that do not allow any kind of RTC communications.

### STUN
Sometimes, you can use a protocol called STUN (Session Traversal Utilities for NAT) that allows clients to discover their public IP address and the type of NAT they are behind.

### TURN
However, even if we setup properly a STUN server, there are very restrictive corporate networks (e.g: UDP traffic forbidden, only 443 TCP allowed…), which will require clients to use a TURN (Traversal Using Relays around NAT) server to relay traffic if direct (peer to Video Gateway) connection fails.



### Coturn
Fot the networking around NATs I used a open source project colled coturn with this configs:
```
# /etc/turnserver.conf

listening-port=3478

fingerprint

lt-cred-mech

server-name=coturn.kanopo.org

realm=coturn.kanopo.org

user=dmodmo:password

total-quota=100

stale-nonce=600
```

## Backend

PeerJS has a included signaling server, a service that allow peers to find each others and enstablish a connection.

I prefered using a express server for signaling with socket.io, this way the sender peer can have a list of the online users and avoiding copy and paistng the uuid.

### Docker
The backend express server was deployed usign docker and docker-compose.

## Frontend 
The frontend is a simple multi page react app where the css part was done with tailwindcss library and some animations are done with motion library by framer.

## PeerJS

PeerJS is a library that wrap WebRTC protocol allowing the use of peer-to-peer connections in the browser.

## Deployment
The final step was to deply on a vps the web app, I usally chose nginx for this part becouse makes the routing and hosting multiple page on the same VPS really easy.



## Demo

![out](https://user-images.githubusercontent.com/101810067/167640419-1b6a0845-ffb6-4fe8-8c53-4f33bf63a212.gif)
