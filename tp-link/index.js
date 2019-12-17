const net = require('net')

class TPLink {

  constructor(host) {
    this.host = host
  }

  send(data) {
    return new Promise((resolve, reject) => {
      
      const socket = new net.Socket()

      socket.on('connect', () => {
        socket.write(data) ? resolve() : reject()
        socket.end()
      })

      socket.connect({
        host: this.host,
        port: 9999
      })

    })
  }

  setState(on) {

    const cmd = on
      ? 'AAAAKtDygfiL/5r31e+UtsWg1Iv5nPCR6LfEsNGlwOLYo4HyhueT9tTu36Lfog=='
      : 'AAAAKtDygfiL/5r31e+UtsWg1Iv5nPCR6LfEsNGlwOLYo4HyhueT9tTu3qPeow=='

    return this.send(Buffer.from(cmd, 'base64'))
  }

}

module.exports = TPLink
