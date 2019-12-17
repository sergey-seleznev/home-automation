const axios = require('axios')

class Hue {

  constructor(host, username) {
    this.host = host
    this.username = username
  }

  groupState(id) {
    return axios
      .get(this.groupUrl(id))
      .then(resp => Promise.resolve(resp.data.action.on))
  }

  setGroupState(id, on) {
    return axios
      .put(this.groupActionUrl(id), { on })
  }

  groupUrl(id) {
    return this.apiUrl(`/groups/${id}`)
  }

  groupActionUrl(id) {
    return `${this.groupUrl(id)}/action`
  }

  apiUrl(url) {
    return `http://${this.host}/api/${this.username}${url}`
  }

}

module.exports = Hue
