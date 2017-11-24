'use strict'

const Store = require('orbit-db-store')
const ChannelIndex = require('./ChannelIndex')

class ChannelStore extends Store {
  constructor(ipfs, id, dbname, options) {
    let opts = Object.assign({}, { Index: ChannelIndex })
    Object.assign(opts, options)
    super(ipfs, id, dbname, opts)
    this._type = 'channel'
  }

  get state () {
    return this._index
  }

  create (origin, source, max) {
    return this._addOperation({
      op: 'CREATE',
      key: null,
      value: {
        origin: origin,
        source: source,
        max: max,
      }
    })
  }

  close (final, finalAmount) {
    return this._addOperation({
      op: 'CLOSE',
      key: null,
      value: {
        finalHash: final,
        finalAmount: finalAmount,
      }
    })
  }

  send (amount) {
    return this._addOperation({
      op: 'SEND',
      key: null,
      value: {
        amount: amount,
      }
    })
  }
}

module.exports = ChannelStore
