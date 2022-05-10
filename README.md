# PeerDrop
- [PeerDrop](#peerdrop)
  - [Involved technology](#involved-technology)
  - [The idea](#the-idea)
  - [NAT](#nat)
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
























## Demo

![out](https://user-images.githubusercontent.com/101810067/167640419-1b6a0845-ffb6-4fe8-8c53-4f33bf63a212.gif)
