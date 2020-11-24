import { JsonRpc } from 'eosjs'

var api = new JsonRpc('https://eos.greymass.com')
if (api.fetchBuiltin === undefined) {
    const fetch = require('node-fetch'); //node only
    api = new JsonRpc('https://eos.greymass.com', {fetch})
}

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms))

async function delay(fn, ...args) {
  await timeout(1000)
  return fn(...args)
}

async function getBlockId() {
  try {
    const blockInfo = await api.get_info()
    console.log(blockInfo.head_block_id)
    return blockInfo.head_block_id
  } catch (err) {
    throw err.message
  }
}

async function getBlockInfo(blockId) {
  try {
    const blocks = await api.get_block(blockId)
    return blocks
  } catch (err) {
    throw err.message
  }
}

export async function fetchBlockData(length) {
    console.log("fetching data")
    let data = []
  
    let blkId;
    while (length--) {
      await delay(async () => {
        //let blkId;
        if (!data.length) {
          blkId = await getBlockId()
          const block = await getBlockInfo(blkId)
          data.unshift(block)
          console.log(data)
        }
        else {
          blkId = data[data.length - 1].previous
          const block = await getBlockInfo(blkId)
          data.push(block)
        }
      })
    }
  
    return data;
}
