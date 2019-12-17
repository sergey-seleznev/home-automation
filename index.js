const Hue = require('./hue/')
const TPLink = require('./tp-link/')
const Mikrotik = require('./mikrotik')
const Monitor = require('./monitor')

require('dotenv-yaml').config({ path: '.env' })

const mikrotik = new Mikrotik(
  process.env.MIKROTIK_HOST,
  process.env.MIKROTIK_USER,
  process.env.MIKROTIK_PASSWORD,
)

const hue = new Hue(
  process.env.HUE_BRIDGE_HOST,
  process.env.HUE_USERNAME,
)

const tpLink = new TPLink(
  process.env.TPLINK_HOST,
)

const hueRoomGroupId = +process.env.SYNC_HUE_GROUP_ID
const phones = process.env.EXIST_DEVICES.split(',')

// turn smart plug on/off with lights
new Monitor().Promise(
  () => hue.groupState(hueRoomGroupId),
  state => {
    tpLink.setState(state)
  },
  +process.env.SYNC_INTERVAL,
)

// turn smart lights and plug on/off with device Wi-Fi registration
mikrotik.streamWirelessDevices(
  new Monitor().Callback(
    devices => phones.some(p => devices.includes(p)),
    state => {
      hue.setGroupState(hueRoomGroupId, state)
      tpLink.setState(state)
    },
  ),
  +process.env.EXIST_INTERVAL,
)
