import React, { FunctionComponent, useEffect, useState, } from 'react'
import { TopNavDropdownItem }                                        from '../types'



type Props = {
  label: string
  items: TopNavDropdownItem[]

}



const TopNavDropdown: FunctionComponent<Props> = ({label, items}) => {

  const [isEntering, setIsEntering] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)
  const [animationClasses, setAnimationClasses, ] = useState('opacity-0 transition ease-out duration-200 translate-y-1')

  useEffect(() => {
    if (isEntering) {
      let updatedClasses = animationClasses
      // updatedClasses = updatedClasses.replace('duration-150', 'duration-200')
      updatedClasses = updatedClasses.replace('opacity-0', 'opacity-100')
      updatedClasses = updatedClasses.replace('translate-y-1', 'translate-y-0')
      updatedClasses = updatedClasses.replace('ease-in', 'ease-out')
      setAnimationClasses(updatedClasses)
      setIsEntering(false)
    }
    if ( isLeaving ) {
      let updatedClasses = animationClasses
      // updatedClasses     = updatedClasses.replace('duration-200', 'duration-150')
      updatedClasses     = updatedClasses.replace('opacity-100', 'opacity-0')
      updatedClasses     = updatedClasses.replace('translate-y-0', 'translate-y-1')
      updatedClasses     = updatedClasses.replace('ease-out', 'ease-in')
      setAnimationClasses(updatedClasses)
      setIsLeaving(false)
    }
  }, [isEntering, isLeaving])

  return (
    <div
      className="relative"
    >
      <button
        type="button"
        onMouseEnter={() => setIsEntering(true)}
        className={`text-gray-500 group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        aria-expanded="false"
      >
        <span>{label}</span>
        <svg className="text-gray-400 ml-2 h-5 w-5 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"/>
        </svg>
      </button>

      <div
        className={`absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2 ${animationClasses}`}
        onMouseLeave={() => setIsLeaving(true)}
      >
        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
          <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
            {
              items.map(({title, description, icon}, index) => (
                <a
                  key={index}
                  href="#" className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                >
                  {icon}
                  <div className="ml-4">
                    <p className="text-base font-medium text-gray-900">
                      {title}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {description}
                    </p>
                  </div>
                </a>
              ))
            }


          <div className="px-5 py-5 bg-gray-50 space-y-6 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
            <div className="flow-root">
              <a href="#"
                 className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-100">
                <svg className="flex-shrink-0 h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                     fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span className="ml-3">Watch Demo</span>
              </a>
            </div>

            <div className="flow-root">
              <a href="#"
                 className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-100">
                <svg className="flex-shrink-0 h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                     fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <span className="ml-3">Contact Sales</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default TopNavDropdown
