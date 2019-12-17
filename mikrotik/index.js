const Router = require('routeros-client').RouterOSClient

class Mikrotik {

  constructor(router, user, password) {
    this.router = new Router({ host: router, user, password })
  }

  streamWirelessDevices(handler, interval) {
    this.router.connect()
      .then(router => router
        .menu('/interface/wireless/registration-table')
        .query({ interval: interval / 1000 })
        .stream('print', (err, data, stream) => {
          if (err) {
            console.error(err)
            stream.stop()
            return
          }
          handler(data.map(c => c.macAddress))
        })
      )
  }

}

module.exports = Mikrotik
