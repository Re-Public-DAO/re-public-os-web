import Parse from 'parse'

if ( typeof window !== 'undefined' && process.env.NEXT_PUBLIC_PARSE_APP_ID ) {
  Parse.initialize(process.env.NEXT_PUBLIC_PARSE_APP_ID, process.env.NEXT_PUBLIC_PARSE_JAVASCRIPT_ID)
}

Parse.serverURL = process.env.NEXT_PUBLIC_PARSE_SERVER_URL

export default Parse


export const getSchemaFields = async ( className ) => {
  const res = await fetch('/api/schema', {
    method: 'POST',
    body: JSON.stringify({
      className,
    })
  })

  const {fields} = await res.json()

  return fields
}
