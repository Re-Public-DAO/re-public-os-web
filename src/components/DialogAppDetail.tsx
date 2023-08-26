import { Dialog, Transition }             from '@headlessui/react'
import { Fragment, useState }             from 'react'
import { useSelector }                    from 'react-redux'
import { selectApp, updateActiveApp }     from '@/redux/slices/app'
import { useAppDispatch, useAppSelector } from '@/utils'
import { useApp }                         from '@/utils/apps'
import Image                              from 'next/image'

const DialogAppDetail = ({className='', ...props}) => {

  let [isOpen, setIsOpen] = useState(false)

  const {activeApp} = useAppSelector(selectApp)

  // console.log(activeApp)

  const dispatch = useAppDispatch()

  const {isLoading, app} = useApp(activeApp)

  const handleInstallClick = (appStoreId: string) => {
    // console.log('install')

    const _install = async (): Promise<void> => {

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/apps/install/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${process.env.NEXT_PUBLIC_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          app_store_id: appStoreId,
        }),
      })

      const json = await res.json()

      // console.log(json)

    }

    _install()
  }

  const closeModal = () => {
    dispatch(updateActiveApp(null))
  }

  return (
    <Transition appear show={!!activeApp} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {
                    !isLoading && app && (
                      <>
                        {
                          !!app.image &&
                          app.image.url && (
                            <div
                              className={'relative w-full h-32 mb-5'}
                            >
                              <Image
                                alt={`Image for Streamr`}
                                src={app.image.url}
                                fill={true}
                                className={'w-full h-full object-contain'}
                              />
                            </div>
                          )
                        }
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          {app.name}
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            {app.description}
                          </p>
                        </div>
                        <div className="mt-4">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={() => handleInstallClick(app.appStoreId)}
                          >
                            Install
                          </button>
                        </div>
                      </>
                    )
                  }



                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
  )
}

export default DialogAppDetail
