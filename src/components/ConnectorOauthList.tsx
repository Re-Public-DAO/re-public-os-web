import { FC, }               from 'react'
import { Oauth, }            from '@/utils/connectors'
import ConnectorOauthOptions from '@/components/ConnectorOauthOptions'

type ConnectorOauthListProps = {
  oauths: Oauth[]
}

const ConnectorOauthList: FC<ConnectorOauthListProps> = ({ oauths, },) => {
  return (
    <div>
      {
        oauths.map((oauth,) => (
          <div
            key={oauth.id}
            className={'p-2 border border-stone-100 rounded mb-2'}
          >
            <span className={'font-bold'}>Auth {oauth.id}</span>
            <ConnectorOauthOptions oauth={oauth} />
          </div>
        ),)
      }
    </div>
  )
}

export default ConnectorOauthList
