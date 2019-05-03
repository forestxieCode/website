/**
 * 对象赋值
 * @param {Object} to = {}
 * @param {Object} from = {}
 * @param {Object} [options]
 *    extra: [] - to 对象本身没有但需要从 from 赋值的字段 key 数组
 *    onlyExtra: false - 是否只赋值 extra 内的字段
 * @returns {Object} - 赋值后的 to 对象
 */
export function assign (to = {}, from = {}, { extra = [], onlyExtra = false } = {}) {
  if (!onlyExtra) {
    for (const key of Object.keys(to)) {
      to[key] = from[key]
    }
  }

  extra.forEach(item => {
    (item.toKey && item.fromKey) ? to[item.toKey] = from[item.fromKey] : to[item] = from[item]
  })

  return to
}

export function getRangeRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

export function getRangeIntRandom (min = 0, max) {
  return Math.floor(Math.random() * (max - min) + min)
}
