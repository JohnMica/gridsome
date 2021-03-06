const utils = require('loader-utils')

module.exports = async function (source, map) {
  const callback = this.async()

  const { queue } = process.GRIDSOME
  const options = utils.parseQuery(this.query || '?')
  const asset = await queue.add(this.resourcePath, options)

  this.dependency(this.resourcePath)

  const res = {
    mimeType: asset.mimeType,
    src: asset.src
  }

  if (asset.type === 'image') {
    res.sets = asset.sets
    res.size = asset.size
    res.sizes = asset.sizes
    res.srcset = asset.srcset
    res.dataUri = asset.dataUri
  }

  callback(null, `module.exports = ${JSON.stringify(res)}`)
}
