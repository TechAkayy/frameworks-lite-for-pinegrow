function toUpper(_, c) {
  return c ? c.toUpperCase() : ''
}

const camelizeRE = /-(\w)/g
export const camelize = (str) => {
  return str && str.replace(camelizeRE, toUpper)
}

export const kebabize = (text) => {
  const hyphenated = text.split('').map((letter, idx) => {
    return letter.toUpperCase() === letter
      ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
      : letter
  })
  const kebabized = hyphenated.map((token) =>
    token.startsWith('-') && !isNaN(+token[1]) ? token.replace('-', '') : token,
  )
  return kebabized.join('')
}
