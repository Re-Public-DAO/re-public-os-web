import React, { Fragment, FunctionComponent, HTMLAttributes, useState, } from 'react'
import Logo                                                              from '../assets/icon_dark_no_background_150.png'
import Image                                                             from 'next/image'
import { TopNavDropdownItem, }                                           from '@/types'
import Link                                                              from 'next/link'
import { Menu, Transition, }                                             from '@headlessui/react'
import { useLoggedInUser, }                                              from '@/utils/users'

const dropdownItemsOne: TopNavDropdownItem[] = [
  {
    title       : 'Analytics',
    description : 'Get a better understanding of where your traffic is coming from.',
    icon        : <svg className={'flex-shrink-0 h-6 w-6 text-blue-900'} xmlns={'http://www.w3.org/2000/svg'}
      fill={'none'} viewBox={'0 0 24 24'} stroke={'currentColor'} aria-hidden={'true'}>
      <path strokeLinecap={'round'} strokeLinejoin={'round'} strokeWidth={'2'}
        d={'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'}/>
    </svg>,
    href : '#',
  },
  {
    title       : 'Engagement',
    description : 'Speak directly to your customers in a more meaningful way.',
    icon        : <svg className={'flex-shrink-0 h-6 w-6 text-blue-900'} xmlns={'http://www.w3.org/2000/svg'}
      fill={'none'} viewBox={'0 0 24 24'} stroke={'currentColor'} aria-hidden={'true'}>
      <path strokeLinecap={'round'} strokeLinejoin={'round'} strokeWidth={'2'}
        d={'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122'}/>
    </svg>,
    href : '',
  },
  {
    title       : 'Security',
    description : 'Your customers&#039; data will be safe and secure.',
    icon        : <svg className={'flex-shrink-0 h-6 w-6 text-blue-900'} xmlns={'http://www.w3.org/2000/svg'}
      fill={'none'} viewBox={'0 0 24 24'} stroke={'currentColor'} aria-hidden={'true'}>
      <path strokeLinecap={'round'} strokeLinejoin={'round'} strokeWidth={'2'}
        d={'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'}/>
    </svg>,
    href : '',
  },
]

type Props = HTMLAttributes<HTMLDivElement> & {}

const TopNav: FunctionComponent<Props> = ({ className, },) => {

  const { user, } = useLoggedInUser()

  const [ isMenuOpen, setIsMenuOpen, ] = useState(false,)

  const handleMenuClose = () => {
    setIsMenuOpen(false,)
  }

  return (
    <div className={`relative bg-transparent ${className}`}>
      <div className={'max-w-7xl mx-auto px-4 sm:px-6'}>
        <div
          className={'flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10'}>
          <div className={'flex justify-start lg:w-0 lg:flex-1'}>
            <a href={'#'}>
              <span className={'sr-only'}>Workflow</span>
              <div
                className={'h-8 w-8 sm:h-10 sm:w-10'}
              >
                <Image src={Logo} alt={'Re-Public logo'} />
              </div>
            </a>
          </div>
          <Menu as={'div'} className={'-mr-2 -my-2 md:hidden'}>
            <Menu.Button
              type={'button'}
              className={'bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none'}
              aria-expanded={'false'}
              // onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className={'sr-only'}>Open menu</span>
              <svg className={'h-6 w-6'} xmlns={'http://www.w3.org/2000/svg'} fill={'none'} viewBox={'0 0 24 24'}
                stroke={'currentColor'} aria-hidden={'true'}>
                <path strokeLinecap={'round'} strokeLinejoin={'round'} strokeWidth={'2'} d={'M4 6h16M4 12h16M4 18h16'}/>
              </svg>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter={'transition ease-out duration-100'}
              enterFrom={'transform opacity-0 scale-95'}
              enterTo={'transform opacity-100 scale-100'}
              leave={'transition ease-in duration-75'}
              leaveFrom={'transform opacity-100 scale-100'}
              leaveTo={'transform opacity-0 scale-95'}
            >
              <Menu.Items className={'absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10'}>
                <div className={'px-1 py-1 '}>
                  <Menu.Item>
                    {({ active, },) => (
                      <Link
                        href={'/apps'}
                        className={`${
                          active ? 'bg-blue-900 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                    My Apps
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active, },) => (
                      <Link
                        href={'/store'}
                        className={`${
                          active ? 'bg-blue-900 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                    App Store
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active, },) => (
                      <Link
                        href={'/connectors'}
                        className={`${
                          active ? 'bg-blue-900 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                    Connectors
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active, },) => (
                      <Link
                        href={'/devices'}
                        className={`${
                          active ? 'bg-blue-900 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                    Devices
                      </Link>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          <nav className={'hidden md:flex space-x-10'}>
            {/*<TopNavDropdown label={'Solutions'} items={dropdownItemsOne} />*/}

            <Link
              href={'/apps'}
              className={'text-base font-medium text-gray-500 hover:text-gray-900'}
            >
              My Apps
            </Link>
            <Link
              href={'/store'}
              className={'text-base font-medium text-gray-500 hover:text-gray-900'}
            >
              App Store
            </Link>
            <Link
              href={'/connectors'}
              className={'text-base font-medium text-gray-500 hover:text-gray-900'}
            >
              Connectors
            </Link>
            <Link
              href={'/devices'}
              className={'text-base font-medium text-gray-500 hover:text-gray-900'}
            >
              Devices
            </Link>
            <Link
              href={'/network'}
              className={'text-base font-medium text-gray-500 hover:text-gray-900'}
            >
              Network
            </Link>

            <div className={'relative'}>
              {/*<button type='button'*/}
              {/*        className='text-gray-500 group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'*/}
              {/*        aria-expanded='false'>*/}
              {/*  <span>More</span>*/}
              {/*  <svg className='text-gray-400 ml-2 h-5 w-5 group-hover:text-gray-500' xmlns='http://www.w3.org/2000/svg'*/}
              {/*       viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>*/}
              {/*    <path fillRule='evenodd'*/}
              {/*          d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'*/}
              {/*          clipRule='evenodd'/>*/}
              {/*  </svg>*/}
              {/*</button>*/}

              {/*<div className='absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0 opacity-0'>*/}
              {/*  <div className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden'>*/}
              {/*    <div className='relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8'>*/}
              {/*      <a href='#' className='-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50'>*/}
              {/*        <svg className='flex-shrink-0 h-6 w-6 text-blue-900' xmlns='http://www.w3.org/2000/svg'*/}
              {/*             fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>*/}
              {/*          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'*/}
              {/*                d='M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z'/>*/}
              {/*        </svg>*/}
              {/*        <div className='ml-4'>*/}
              {/*          <p className='text-base font-medium text-gray-900'>*/}
              {/*            Help Center*/}
              {/*          </p>*/}
              {/*          <p className='mt-1 text-sm text-gray-500'>*/}
              {/*            Get all of your questions answered in our forums or contact support.*/}
              {/*          </p>*/}
              {/*        </div>*/}
              {/*      </a>*/}

              {/*      <a href='#' className='-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50'>*/}
              {/*        <svg className='flex-shrink-0 h-6 w-6 text-blue-900' xmlns='http://www.w3.org/2000/svg'*/}
              {/*             fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>*/}
              {/*          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'*/}
              {/*                d='M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'/>*/}
              {/*        </svg>*/}
              {/*        <div className='ml-4'>*/}
              {/*          <p className='text-base font-medium text-gray-900'>*/}
              {/*            Guides*/}
              {/*          </p>*/}
              {/*          <p className='mt-1 text-sm text-gray-500'>*/}
              {/*            Learn how to maximize our platform to get the most out of it.*/}
              {/*          </p>*/}
              {/*        </div>*/}
              {/*      </a>*/}

              {/*      <a href='#' className='-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50'>*/}
              {/*        <svg className='flex-shrink-0 h-6 w-6 text-blue-900' xmlns='http://www.w3.org/2000/svg'*/}
              {/*             fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>*/}
              {/*          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'*/}
              {/*                d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'/>*/}
              {/*        </svg>*/}
              {/*        <div className='ml-4'>*/}
              {/*          <p className='text-base font-medium text-gray-900'>*/}
              {/*            Events*/}
              {/*          </p>*/}
              {/*          <p className='mt-1 text-sm text-gray-500'>*/}
              {/*            See what meet-ups and other events we might be planning near you.*/}
              {/*          </p>*/}
              {/*        </div>*/}
              {/*      </a>*/}

              {/*      <a href='#' className='-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50'>*/}
              {/*        <svg className='flex-shrink-0 h-6 w-6 text-blue-900' xmlns='http://www.w3.org/2000/svg'*/}
              {/*             fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>*/}
              {/*          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'*/}
              {/*                d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'/>*/}
              {/*        </svg>*/}
              {/*        <div className='ml-4'>*/}
              {/*          <p className='text-base font-medium text-gray-900'>*/}
              {/*            Security*/}
              {/*          </p>*/}
              {/*          <p className='mt-1 text-sm text-gray-500'>*/}
              {/*            Understand how we take your privacy seriously.*/}
              {/*          </p>*/}
              {/*        </div>*/}
              {/*      </a>*/}
              {/*    </div>*/}
              {/*    <div className='px-5 py-5 bg-gray-50 sm:px-8 sm:py-8'>*/}
              {/*      <div>*/}
              {/*        <h3 className='text-sm tracking-wide font-medium text-gray-500 uppercase'>*/}
              {/*          Recent Posts*/}
              {/*        </h3>*/}
              {/*        <ul role='list' className='mt-4 space-y-4'>*/}
              {/*          <li className='text-base truncate'>*/}
              {/*            <a href='#' className='font-medium text-gray-900 hover:text-gray-700'>*/}
              {/*              Boost your conversion rate*/}
              {/*            </a>*/}
              {/*          </li>*/}

              {/*          <li className='text-base truncate'>*/}
              {/*            <a href='#' className='font-medium text-gray-900 hover:text-gray-700'>*/}
              {/*              How to use search engine optimization to drive traffic to your site*/}
              {/*            </a>*/}
              {/*          </li>*/}

              {/*          <li className='text-base truncate'>*/}
              {/*            <a href='#' className='font-medium text-gray-900 hover:text-gray-700'>*/}
              {/*              Improve your customer experience*/}
              {/*            </a>*/}
              {/*          </li>*/}
              {/*        </ul>*/}
              {/*      </div>*/}
              {/*      <div className='mt-5 text-sm'>*/}
              {/*        <a href='#' className='font-medium text-blue-900 hover:text-indigo-500'> View all posts <span*/}
              {/*          aria-hidden='true'>&rarr;</span></a>*/}
              {/*      </div>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*</div>*/}
            </div>
          </nav>
          <div className={'hidden md:flex items-center justify-end md:flex-1 lg:w-0'}>
            {
              user && (
                <div className={'flex items-center justify-end md:flex-1 lg:w-0'}>
                  <Menu>
                    <Menu.Button>
                      <span>{user.username}</span>
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
                        className={'absolute right-0 mt-5 w-48 bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'}
                      >
                        <Menu.Item>
                          <Link
                            className={'px-4 py-3 hover:bg-gray-100 w-full block'}
                            href={'/apps'}
                          >
                            Account
                          </Link>
                        </Menu.Item>
                        <Menu.Item>
                          <Link
                            className={'px-4 py-3 hover:bg-gray-100 w-full block'}
                            href={'/apps'}
                          >
                            Logout
                          </Link>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              )
            }
            {/*<a href='#' className='whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900'>*/}
            {/*  Sign in*/}
            {/*</a>*/}
            {/*<a href='#'*/}
            {/*   className='ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-900 hover:bg-indigo-700'>*/}
            {/*  Sign up*/}
            {/*</a>*/}
          </div>
        </div>
      </div>

      <Menu>
        <Menu.Items>
          <Menu.Item>
            <Link
              href={'/apps'}
            >
              My Apps
            </Link>
          </Menu.Item>
        </Menu.Items>
      </Menu>

      {
        isMenuOpen && (
          <div className={'absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-10'}>
            <div className={'rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50'}>
              <div className={'pt-5 pb-6 px-5'}>
                <div className={'flex items-center justify-between'}>
                  <div>
                    <img className={'h-8 w-auto'} src={'https://tailwindui.com/img/logos/workflow-mark-blue-900.svg'}
                      alt={'Workflow'} />
                  </div>
                  <div className={'-mr-2'}>
                    <button
                      type={'button'}
                      className={'bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'}
                      onClick={handleMenuClose}
                    >
                      <span className={'sr-only'}>Close menu</span>
                      <svg className={'h-6 w-6'} xmlns={'http://www.w3.org/2000/svg'} fill={'none'} viewBox={'0 0 24 24'}
                        stroke={'currentColor'} aria-hidden={'true'}>
                        <path strokeLinecap={'round'} strokeLinejoin={'round'} strokeWidth={'2'} d={'M6 18L18 6M6 6l12 12'}/>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className={'mt-6'}>
                  <nav className={'grid gap-y-8'}>
                    <a href={'#'} className={'-m-3 p-3 flex items-center rounded-md hover:bg-gray-50'}>
                      <svg className={'flex-shrink-0 h-6 w-6 text-blue-900'} xmlns={'http://www.w3.org/2000/svg'} fill={'none'}
                        viewBox={'0 0 24 24'} stroke={'currentColor'} aria-hidden={'true'}>
                        <path strokeLinecap={'round'} strokeLinejoin={'round'} strokeWidth={'2'}
                          d={'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'}/>
                      </svg>
                      <span className={'ml-3 text-base font-medium text-gray-900'}>
                    Analytics
                      </span>
                    </a>

                    <a href={'#'} className={'-m-3 p-3 flex items-center rounded-md hover:bg-gray-50'}>
                      <svg className={'flex-shrink-0 h-6 w-6 text-blue-900'} xmlns={'http://www.w3.org/2000/svg'} fill={'none'}
                        viewBox={'0 0 24 24'} stroke={'currentColor'} aria-hidden={'true'}>
                        <path strokeLinecap={'round'} strokeLinejoin={'round'} strokeWidth={'2'}
                          d={'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122'}/>
                      </svg>
                      <span className={'ml-3 text-base font-medium text-gray-900'}>
                    Engagement
                      </span>
                    </a>

                    <a href={'#'} className={'-m-3 p-3 flex items-center rounded-md hover:bg-gray-50'}>
                      <svg className={'flex-shrink-0 h-6 w-6 text-blue-900'} xmlns={'http://www.w3.org/2000/svg'} fill={'none'}
                        viewBox={'0 0 24 24'} stroke={'currentColor'} aria-hidden={'true'}>
                        <path strokeLinecap={'round'} strokeLinejoin={'round'} strokeWidth={'2'}
                          d={'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'}/>
                      </svg>
                      <span className={'ml-3 text-base font-medium text-gray-900'}>
                    Security
                      </span>
                    </a>

                    <a href={'#'} className={'-m-3 p-3 flex items-center rounded-md hover:bg-gray-50'}>
                      <svg className={'flex-shrink-0 h-6 w-6 text-blue-900'} xmlns={'http://www.w3.org/2000/svg'} fill={'none'}
                        viewBox={'0 0 24 24'} stroke={'currentColor'} aria-hidden={'true'}>
                        <path strokeLinecap={'round'} strokeLinejoin={'round'} strokeWidth={'2'}
                          d={'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'}/>
                      </svg>
                      <span className={'ml-3 text-base font-medium text-gray-900'}>
                    Integrations
                      </span>
                    </a>

                    <a href={'#'} className={'-m-3 p-3 flex items-center rounded-md hover:bg-gray-50'}>
                      <svg className={'flex-shrink-0 h-6 w-6 text-blue-900'} xmlns={'http://www.w3.org/2000/svg'} fill={'none'}
                        viewBox={'0 0 24 24'} stroke={'currentColor'} aria-hidden={'true'}>
                        <path strokeLinecap={'round'} strokeLinejoin={'round'} strokeWidth={'2'}
                          d={'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'}/>
                      </svg>
                      <span className={'ml-3 text-base font-medium text-gray-900'}>
                    Automations
                      </span>
                    </a>
                  </nav>
                </div>
              </div>
              <div className={'py-6 px-5 space-y-6'}>
                <div className={'grid grid-cols-2 gap-y-4 gap-x-8'}>
                  <a href={'#'} className={'text-base font-medium text-gray-900 hover:text-gray-700'}>
                    Pricing
                  </a>

                  <a href={'#'} className={'text-base font-medium text-gray-900 hover:text-gray-700'}>
                    Docs
                  </a>

                  <a href={'#'} className={'text-base font-medium text-gray-900 hover:text-gray-700'}>
                    Help Center
                  </a>

                  <a href={'#'} className={'text-base font-medium text-gray-900 hover:text-gray-700'}>
                    Guides
                  </a>

                  <a href={'#'} className={'text-base font-medium text-gray-900 hover:text-gray-700'}>
                    Events
                  </a>

                  <a href={'#'} className={'text-base font-medium text-gray-900 hover:text-gray-700'}>
                    Security
                  </a>
                </div>
                <div>
                  <a href={'#'}
                    className={'w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-900 hover:bg-indigo-700'}>
                    Sign up
                  </a>
                  <p className={'mt-6 text-center text-base font-medium text-gray-500'}>
                    Existing customer?
                    <a href={'#'} className={'text-blue-900 hover:text-indigo-500'}>
                      Sign in
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      }

    </div>
  )
}

export default TopNav
