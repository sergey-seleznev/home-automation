# Home Automation

## Goals

* Improve smart home routines usability by integrating different services together
* Play around Raspberry Pi and smart home hardware and software


## Functions

* Switch [TP-Link smart plug](https://www.tp-link.com/en/home-networking/smart-plug/hs100) ON/OFF together with [Philips Hue lights](https://www2.meethue.com/en-us/starter-kits)  

  Christmas lights powered through a smart plug are now synchronized with room lights, which are controlled with a remote. No more smartphone app usage needed

* Switch both [TP-Link smart plug](https://www.tp-link.com/en/home-networking/smart-plug/hs100) and [Philips Hue lights](https://www2.meethue.com/en-us/starter-kits) ON/OFF when registered devices are joining/leaving [Mikrotik Wi-Fi hotspot](https://mikrotik.com/products)  

  All the lights respond to phone existence

## Installation

The application is designed to run as a [Raspberry Pi](https://www.raspberrypi.org) service.

* Install Node.js ([for Raspberry Pi zero](https://www.thepolyglotdeveloper.com/2018/03/install-nodejs-raspberry-pi-zero-w-nodesource))

* Populate `.env` configuration file with the relevant environment settings

* Deploy the application using `run.ps1` debug/deployment script or manually

* Use `home-automation.service` file to register application as a service
