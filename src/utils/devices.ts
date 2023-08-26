import useSWR from 'swr'

export type DeviceConnection = {
  network_id: string
  node_id: string
  ip_address: string
  device_id: string
}

export type Device = {
  uuid: string
  name_on_device: string
  name_in_os: string
  connection: DeviceConnection
}



export const useDevices = () => {

  const fetcherDevices = async (): Promise<Device[]> => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/devices/`, {
      method  : 'GET',
      headers : {
        'Content-Type' : 'application/json',
      },
      credentials : 'include',
    },)
    const json = await res.json()
    console.log(json,)
    return json
  }

  const { data: devices, isLoading, mutate, } = useSWR({
    key : 'devices',
  }, fetcherDevices, )

  return {
    isLoading,
    devices,
    mutate,
  }
}

