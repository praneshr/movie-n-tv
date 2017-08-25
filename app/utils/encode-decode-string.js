const encode = str => btoa(unescape(encodeURIComponent(str)))
const decode = str => decodeURIComponent(atob(str))

export {
  encode,
  decode,
}
