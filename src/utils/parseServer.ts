import Parse from 'parse/node'

if ( typeof window === 'undefined' && process.env.NEXT_PUBLIC_PARSE_APP_ID ) {
  Parse.initialize(process.env.NEXT_PUBLIC_PARSE_APP_ID, process.env.NEXT_PUBLIC_PARSE_JAVASCRIPT_ID)
  Parse.masterKey = process.env.PARSE_MASTER_KEY
}

if ( typeof window !== 'undefined' && !process.env.NEXT_PUBLIC_PARSE_APP_ID ) {
  Parse.initialize(process.env.NEXT_PUBLIC_PARSE_APP_ID, process.env.NEXT_PUBLIC_PARSE_JAVASCRIPT_ID)
}

Parse.serverURL = process.env.NEXT_PUBLIC_PARSE_SERVER_URL

export const CloudInstall = Parse.Object.extend('CloudInstall')

export default Parse

