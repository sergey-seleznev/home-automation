class Monitor {

  Promise(source, handler, interval) {
    source()
      .then(value => {
        if (value !== this.value) {
          handler(this.value = value)
        }
      })
      .then(() => setTimeout(() => 
        this.Promise(...arguments), interval)
      )
      .catch(err => console.error(err))
  }

  Callback(process, handler) {
    return value => {
      value = process(value)
      if (value !== this.value) {
        handler(this.value = value)
      }
    }
  }

}

module.exports = Monitor
