import React, { FC, }                               from 'react'
import { EllipsisHorizontalIcon, ShieldCheckIcon, } from '@heroicons/react/24/outline'
import { Menu, Transition, }                        from '@headlessui/react'
import { dayjs, }                                   from '@/utils'
import { useZeroTierNodes, ZeroTierNode, }          from '@/utils/network'
import { useNodeInfo, }                             from '@/utils/node'


type Props = {
  node: ZeroTierNode
}

const NodeListItem: FC<Props> = ({
  node,
},) => {

  const { mutate, } = useZeroTierNodes()

  const {} = useNodeInfo(node.id,)

  const handleDelete = () => {
    console.log('delete',)
    const _deleteNode = async (): Promise<void> => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/network/nodes/${node.id}/disconnect/`, {
        method  : 'POST',
        headers : {
          'Content-Type' : 'application/json',
        },
        credentials : 'include',
      },)

      if (res.status !== 200) {
        throw new Error('Failed to delete node',)
      }

      const json = await res.json()

      console.log(json,)

      await mutate()
    }

    _deleteNode()
  }

  const handleEdit = () => {

  }

  return (
    <div
      className={'flex flex-row border border-gray-300 p-4 rounded-lg mb-5 max-w-md'}
    >
      <div className={'w-12 pt-1'}>
        {
          node.authorized && (
            <ShieldCheckIcon className={'w-6 h-6 text-green-600'} />
          )
        }
      </div>
      <div
        className={'flex flex-col w-full relative'}
      >
        <div
          className={'absolute right-0 top-0 w-6 h-6'}
        >
          <Menu>
            <Menu.Button>
              <EllipsisHorizontalIcon className={'w-full h-full text-gray-400'} />
            </Menu.Button>
            <Transition
              enter={'transition duration-100 ease-out'}
              enterFrom={'transform scale-95 opacity-0'}
              enterTo={'transform scale-100 opacity-100'}
              leave={'transition duration-75 ease-out'}
              leaveFrom={'transform scale-100 opacity-100'}
              leaveTo={'transform scale-95 opacity-0'}
            >
              <Menu.Items
                className={'absolute w-48 bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm'}
              >
                <Menu.Item>
                  <li
                    className={'px-4 py-3 hover:bg-gray-100 w-full block'}
                    onClick={handleEdit}
                  >
                                  Edit
                  </li>
                </Menu.Item>
                <Menu.Item>
                  <li
                    className={'px-4 py-3 hover:bg-red-100 text-red-400 w-full block cursor-pointer'}
                    onClick={handleDelete}
                  >
                                  Disconnect
                  </li>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>

        </div>
        <h2 className={'font-mono text-xl'}>{node.id}</h2>
        <span className={'text-gray-400 text-sm mb-3'}>Joined {dayjs(node.creationTime,).fromNow()}</span>
        {
          node.ipAssignments &&
                        node.ipAssignments.length > 0 &&
                        node.ipAssignments.map((ip,) => (
                          <span key={ip} className={'font-mono text-gray-400 text-sm'}>{ip}</span>
                        ),)
        }
        {
          (
            !node.ipAssignments ||
                          node.ipAssignments.length === 0
          ) && (
            <span className={'font-mono text-gray-400 text-sm'}>No IP addresses</span>
          )
        }

      </div>
    </div>
  )
}

export default NodeListItem
