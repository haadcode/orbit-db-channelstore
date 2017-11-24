'use strict'

class ChannelIndex {
  constructor() {
    this._index = {}
    this.origin = null
    this.max = -1
    this.sent = -1
    this.final = null
  }

  updateIndex(oplog) {
    oplog.values
      .slice()
      .reduce((handled, item) => {
        if (item.payload.op === 'CREATE') {
          this.origin = item.payload.value.origin
          this.source = item.payload.value.source
          this.max = item.payload.value.max
          this.sent = 0
        } else if (item.payload.op === 'SEND') {
          if (!this.isInitialized())
            throw new Error('Channel is not initialized yet, can\'t send!')
          this.sent += item.payload.value.amount
        } else if (item.payload.op === 'CLOSE') {
          this.verify(oplog, item)
          this.final = item.payload.value.finalHash
        }
      }, {})
  }

  verify (oplog, item) {
    if (!this.isInitialized())
      throw new Error('Missing initialization!')

    if (!oplog.has(item.payload.value.finalHash))
      throw new Error('Final operation missing from log!')

    if (!item.payload.value.finalAmount)
      throw new Error('Final amount is missing from closing operation!')

    if (item.payload.value.finalAmount > this.max)
      throw new Error('Final amount is more than deposit!')
  }

  isInitialized () {
    return this.origin && this.source && this.max !== -1 && this.sent !== -1
  }
}

module.exports = ChannelIndex
