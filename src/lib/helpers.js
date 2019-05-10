exports.getNodes = (data, block) => data[block].edges.map(e => e.node)

// for some reason the `id`s always come back as `Something_Something_NNN` - we just want the last part
exports.graphqlLongIdToShort = long => parseInt(long.split(`__`)[2])
