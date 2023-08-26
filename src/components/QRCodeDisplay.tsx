import { FC, useState, useEffect, } from 'react'
import { useAppDispatch, }          from '@/utils'
import { updateQrCodeKey, }         from '@/redux/slices/app'

type Props = {}

const QRCodeDisplay: FC<Props> = () => {
  const [ qrDataUrl, setQrDataUrl, ] = useState<string | null>(null,)

  const dispatch = useAppDispatch()

  useEffect(() => {
    const _fetchQRCode = async (): Promise<void> => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/devices/generate-qr-code`, {
          method  : 'GET',
          headers : {
            'Content-Type' : 'application/json',
          },
          credentials : 'include',
        },)
        const data = await response.json()
        setQrDataUrl(data.dataUrl,)
        console.log(data.qrCodeKey,)
        dispatch(updateQrCodeKey(data.qrCodeKey,),)
      } catch (error) {
        console.error('Error fetching QR code:', error,)
      }
    }

    _fetchQRCode()
  }, [],)

  return (
    <div>
      {qrDataUrl ? (
        <img src={qrDataUrl} alt={'QR Code'} />
      ) : (
        <p>Loading QR code...</p>
      )}
    </div>
  )
}

export default QRCodeDisplay
