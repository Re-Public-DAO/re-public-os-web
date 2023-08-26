import Button                                   from '@/components/Button'
import { useAppDispatch, useAppSelector, }      from '@/utils'
import { selectApp, updateIsConnectingDevice, } from '@/redux/slices/app'
import PageContainer                            from '@/components/PageContainer'
import { useDevices, }                          from '@/utils/devices'
import { FC, }                                  from 'react'
import DeviceListItem                           from '@/components/Device/DeviceListItem'


type Props = {}

const Devices: FC<Props> = () => {

  const { devices, mutate, } = useDevices()

  const dispatch = useAppDispatch()

  // TODO: Poll server looking for a Device with a DeviceConnection that
  // has a matching QR Code Key. If found, refresh the device resulsts so
  // that the new device is shown in the list.

  const handleConnectDeviceClick = () => {
    dispatch(updateIsConnectingDevice(true,),)
  }

  return (
    <PageContainer>
      <h1>My Devices</h1>
      <section>
        {
          (
            !devices ||
            devices.length === 0
          ) && (
            <p className={'italic text-gray-400'}>No devices found.</p>
          )
        }
        {
          devices &&
          devices.length > 0 &&
          devices.map((device,) => (
            <DeviceListItem device={device} key={device.uuid} mutate={mutate} />
          ),)
        }
      </section>
      {/*<p>To connect a laptop or desktop, download the Re-Public app for your OS:</p>*/}
      {/*<p>To connect a mobile device, download the Re-Public app for your OS:</p>*/}
      <div
        className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-5'}
      >
        <Button
          className={'w-full max-w-md'}
          onClick={handleConnectDeviceClick}
        >
          Connect Mobile
        </Button>

      </div>
    </PageContainer>
  )
}

export default Devices
