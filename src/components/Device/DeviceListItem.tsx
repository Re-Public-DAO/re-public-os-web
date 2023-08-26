import React, { FunctionComponent, }                      from 'react'
import { Device, }                                        from '@/utils/devices'
import { Menu, Transition, }                              from '@headlessui/react'
import { EllipsisHorizontalIcon, DevicePhoneMobileIcon, } from '@heroicons/react/24/outline'
import { KeyedMutator, }                                  from 'swr'

type Props = {
  device: Device
  mutate: KeyedMutator<Device[]>
}

const DeviceListItem: FunctionComponent<Props> = ({ device, mutate, },) => {

  const getDisplayName = (): string => {
    if (device.name_in_os) {
      return device.name_in_os
    }

    if (device.name_on_device) {
      return device.name_on_device
    }

    if (device.uuid) {
      return device.uuid
    }

    return 'Unknown device'
  }

  const handleRefresh = (): void => {
    const _refresh = async (): Promise<void> => {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/network/nodes/${device.connection.node_id}/`, {
        method  : 'GET',
        headers : {
          'Content-Type' : 'application/json',
        },
        credentials : 'include',
      },)

      await mutate()
    }

    _refresh()
  }

  return (
    <div
      className={'flex flex-row border border-gray-300 p-4 rounded-lg mb-5 max-w-md'}
    >
      <div className={'w-12 pt-1'}>
        <DevicePhoneMobileIcon className={'w-6 h-6 text-gray-600'} />
      </div>
      <div
        className={'flex flex-col w-full relative'}
      >
        <div
          className={'flex flex-row items-center absolute right-0 top-0 w-6 h-6'}
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
                    className={'px-4 py-3 hover:bg-gray-100 w-full block cursor-pointer'}
                    onClick={handleRefresh}
                  >
                      Refresh
                  </li>
                </Menu.Item>
                <Menu.Item>
                  <li
                    className={'px-4 py-3 hover:bg-red-100 text-red-400 w-full block cursor-pointer'}
                  >
                      Delete
                  </li>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>

        </div>
        <div
          className={'flex flex-row items-center justify-between pr-10'}
        >
          <h2 className={'font-mono text-xl'}>{getDisplayName()}</h2>
          <div
            className={'flex flex-row items-center'}
          >
            {
              (
                !device.connection ||
                !device.connection.ip_address
              ) && (
                <div className={'text-xs text-gray-400 font-mono bg-stone-200 w-3 h-3 rounded-full'}></div>
              )
            }
            {
              device.connection &&
              device.connection.ip_address && (
                <div className={'text-xs text-gray-400 font-mono bg-green-400 w-3 h-3 rounded-full'}></div>
              )
            }
          </div>
        </div>
        {/*<span className={'text-gray-400 text-sm mb-3'}>Joined {dayjs(node.creationTime,).fromNow()}</span>*/}
      </div>
    </div>
  )
}

export default DeviceListItem
