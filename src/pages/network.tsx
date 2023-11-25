import React, { FC, }        from 'react'
import PageContainer         from '@/components/PageContainer'
import { useZeroTierNodes, } from '@/utils/network'
import NodeListItem          from '@/components/Network/Node/NodeListItem'

type Props = {}

const Network: FC<Props> = () => {

  const { nodes, isLoading, } = useZeroTierNodes()

  console.log('nodes', nodes,)

  return (
    <PageContainer>
      <h1>Network</h1>
      <div>
        {
          isLoading && (
            <p>Loading...</p>
          )
        }
        {
          nodes &&
          nodes.length > 0 &&
          !isLoading && (
            <div>
              {
                nodes.map((node,) => (
                  <NodeListItem key={node.id} node={node} />
                ),)
              }
            </div>
          )
        }
      </div>
    </PageContainer>
  )
}

export default Network
