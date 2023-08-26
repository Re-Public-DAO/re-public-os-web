import { AppDispatch, RootState, }                         from '@/redux'
import { TypedUseSelectorHook, useDispatch, useSelector, } from 'react-redux'
import { useEffect, useState, }                            from 'react'
import dayJsOriginal                                       from 'dayjs'
import relativeTime                                        from 'dayjs/plugin/relativeTime'
import duration                                            from 'dayjs/plugin/duration'

dayJsOriginal.extend(relativeTime,)
dayJsOriginal.extend(duration,)

export const dayjs = dayJsOriginal

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const capitalize = (word: string,) => {
  return word[0].toUpperCase() + word.substring(1,).toLowerCase()
}

export const isBrowser = () => {
  return typeof window !== 'undefined'
}

export const wait = async (ms: number,): Promise<void> => {
  return new Promise((resolve,) => {
    setTimeout(resolve, ms,)
  },)
}

export const useIsMounted = () => {
  const [ isMounted, setIsMounted, ] = useState(false,)
  useEffect(() => {
    setIsMounted(true,)
  }, [],)
  return isMounted
}

export const fetcherGetUrl = async <T>({ key, responseKey, },): Promise<T> => {
  const res = await fetch(key, {
    method  : 'GET',
    headers : {
      'Content-Type' : 'application/json',
    },
    credentials : 'include',
  },)

  const obj = await res.json()

  return obj[responseKey]
}
