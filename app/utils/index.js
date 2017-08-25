import * as reactCssModules from './react-css-moudules-utility'

import rating from './movie-rating'
import resolveUrl from './url-resolver'
import { encode, decode } from './encode-decode-string'

const { allowMultiple } = reactCssModules
const { noErrorWhenNotFound } = reactCssModules
export {
  allowMultiple,
  noErrorWhenNotFound,
  rating,
  resolveUrl,
  encode,
  decode,
}
