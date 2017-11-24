# Channel Database for OrbitDB

Channel primitive for OrbitDB that can be used to create 1-to-1 to 1-to-n State Channels, for example a Payment Channel.

Status: **Experimental**

```javascript
  // Create a state channel
  // <tx hash> is the blockchain transaction hash where the channel was created/announced
  // <creator id> is the ID of the node that created the channel, eg. the payer in case of Payment Channel
  // <max allowed spending> the maximum allowed amount of currency that can be spend in this channel
  await db.create(<tx hash>, <creator id>, <max allowed spending>)
  // Update the state
  const finalTx = await db.send({ amount: 1 })
  // Close the channel
  await db.close(finalTx)
```

See [ChannelIndex.js](https://github.com/haadcode/orbit-db-channelstore/blob/master/src/ChannelIndex.js#L12) for how the logic and verification of a (payment) channel **could** work and [ChannelStore](https://github.com/haadcode/orbit-db-channelstore/blob/master/src/ChannelStore.js) for the API. See also [OrbitDB Channel Tests](https://github.com/orbitdb/orbit-db/blob/feat/channel-store/test/channel.test.js).
