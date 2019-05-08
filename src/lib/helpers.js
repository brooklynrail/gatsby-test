// for some reason the `id`s always come back as `Something_Something_NNN` - we just want the last part
export const graphqlLongIdToShort = long => parseInt(long.split(`__`)[2])
