let express = require('express')
let router = express.Router()

let Client = require('bitcoin-core')
const client = new Client({port: 7313, username: 'user', password: 'pass'})

let getBlockchainInfo = {
  // placeholders so it doesn't crash on startup before the first rpc call
  'blocks': 2703319,
  'bip9_softforks': {
    'segwit': {
      'statistics': {
        'period': 8064,
        'threshold': 6048,
        'elapsed': 1880,
        'count': 16,
        'possible': true
      }
    }
  }
}

function updateInfo () {
  client.getBlockchainInfo().then((info) => getBlockchainInfo = info).catch((err) => console.log(err))
}

setInterval(updateInfo, 10 * 1000)

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Flo Segwit', getBlockchainInfo: getBlockchainInfo})
})

module.exports = router
