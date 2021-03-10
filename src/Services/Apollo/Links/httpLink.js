import { HttpLink } from '@apollo/client'

export default function httpLink() {
  return new HttpLink({
    uri: 'https://graphqlzero.almansi.me/api',
  })
}
