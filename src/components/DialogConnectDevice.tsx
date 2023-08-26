import { FC, useEffect, useState, }            from 'react'
import Dialog                                  from '@/components/Dialog'
import { useAppDispatch, useAppSelector, }     from '@/utils'
import {
  selectApp,
  updateIsConnectingDevice, updateQrCodeKey,
} from '@/redux/slices/app'
import QRCodeDisplay      from '@/components/QRCodeDisplay'
import { clearInterval, } from 'timers'
import { useDevices, }    from '@/utils/devices'


type Props = {}


const DialogConnectDevice: FC<Props> = () => {

  const [ pollingIntervalId, setPollingIntervalId, ] = useState<number | null>(null,)

  const { isConnectingDevice, qrCodeKey, } = useAppSelector(selectApp,)

  const { mutate, } = useDevices()

  const dispatch = useAppDispatch()


  useEffect(() => {
    if (!isConnectingDevice && pollingIntervalId) {
      console.log('clearing interval',)
      console.log(pollingIntervalId,)
      window.clearInterval(pollingIntervalId,)
    }

    if (qrCodeKey && isConnectingDevice && !pollingIntervalId) {
      const _startPolling = async (): Promise<void> => {
        console.log('starting polling',)
        const id = window.setInterval(async () => {
          if (pollingIntervalId) {
            window.clearInterval(pollingIntervalId,)
          }
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/devices/check/`, {
            method  : 'POST',
            headers : {
              'Content-Type' : 'application/json',
            },
            body : JSON.stringify({
              qr_code_key : qrCodeKey,
            },),
            credentials : 'include',
          },)
          if (response.status === 200) {
            // Stop polling
            window.clearInterval(id,)
            // Clear redux state
            dispatch(updateIsConnectingDevice(false,),)
            dispatch(updateQrCodeKey(null,),)
            // Update device list
            await mutate()
            // Start ZeroTier tutorial
          }
        }, 1000,)
        setPollingIntervalId(id,)
      }

      _startPolling()
    }
  }, [ pollingIntervalId, isConnectingDevice, qrCodeKey, dispatch, mutate, ],)

  const handleClose = () => {
    if (pollingIntervalId) {
      window.clearInterval(pollingIntervalId,)
    }
    dispatch(updateIsConnectingDevice(false,),)
  }

  return (
    <Dialog
      show={isConnectingDevice}
      onClose={handleClose}
    >
      <h3 tabIndex={0}>Connect Mobile</h3>
      <QRCodeDisplay />
    </Dialog>
  )
}

export default DialogConnectDevice
