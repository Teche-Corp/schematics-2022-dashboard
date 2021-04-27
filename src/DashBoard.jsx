import React, { useState } from 'react';

export default function IndexPage() {
  const [show, setShow] = useState(null);
  const [profile, setProfile] = useState(false);
  const [menu, setMenu] = useState(false);
  return (
    <>
      <div className='w-full h-full bg-gray-200'>
        <div className='flex flex-no-wrap'>
          {/* Sidebar starts */}
          {/* Remove class [ hidden ] and replace [ sm:flex ] with [ flex ] */}
          <div className='absolute flex-col justify-between hidden pb-40 bg-black shadow w-72 lg:relative md:h-screen lg:flex'>
            <div>
              {/* logo */}
              <div className='flex items-center w-full h-16 px-8'>
                <h1 className='mx-auto font-bold text-white'>
                  Logo Schematics
                </h1>
              </div>
              {/* sidebar */}
              <ul className='mt-12'>
                <li className='items-center justify-between w-full px-8 mb-6 text-gray-300 cursor-pointer hover:text-gray-200'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                      <svg
                        class='mr-1 h-5 w-5 text-cyan-200'
                        x-description='Heroicon name: outline/home'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        aria-hidden='true'
                      >
                        <path
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          stroke-width='2'
                          d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                        ></path>
                      </svg>
                      <span className='mt-1 ml-1 text-sm'>Dashboard</span>
                    </div>

                    {show === 0 ? (
                      <div onClick={() => setShow(null)} className='ml-4 '>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='icon icon-tabler icon-tabler-chevron-up'
                          width={20}
                          height={20}
                          viewBox='0 0 24 24'
                          strokeWidth={1}
                          stroke='currentColor'
                          fill='none'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                          <polyline points='6 15 12 9 18 15' />
                        </svg>
                      </div>
                    ) : (
                      <div className='ml-4'>
                        <svg
                          onClick={() => setShow(0)}
                          xmlns='http://www.w3.org/2000/svg'
                          className='icon icon-tabler icon-tabler-chevron-down'
                          width={20}
                          height={20}
                          viewBox='0 0 24 24'
                          strokeWidth={1}
                          stroke='currentColor'
                          fill='none'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                          <polyline points='6 9 12 15 18 9' />
                        </svg>
                      </div>
                    )}
                  </div>
                  {show === 0 && (
                    <ul className='my-3 ' id='list'>
                      <li className='px-6 py-2 text-sm text-indigo-500 hover:text-gray-200'>
                        Best Sellers
                      </li>
                      <li className='px-6 py-2 text-sm text-gray-300 hover:text-indigo-500'>
                        Out of Stock
                      </li>
                      <li className='px-6 py-2 text-sm text-gray-300 hover:text-indigo-500'>
                        New Products
                      </li>
                    </ul>
                  )}
                </li>
                <li className='flex flex-col w-full px-8 text-gray-300 cursor-pointer hover:text-gray-200'>
                  <div className='flex items-center justify-between w-full'>
                    <div className='flex items-center'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='icon icon-tabler icon-tabler-puzzle'
                        width={18}
                        height={18}
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        fill='none'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <path stroke='none' d='M0 0h24v24H0z' />
                        <path d='M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1' />
                      </svg>
                      <span className='ml-2 text-sm'>Products</span>
                    </div>
                    {show === 1 ? (
                      <div className='ml-4 '>
                        <svg
                          onClick={() => setShow(null)}
                          xmlns='http://www.w3.org/2000/svg'
                          className='icon icon-tabler icon-tabler-chevron-up'
                          width={20}
                          height={20}
                          viewBox='0 0 24 24'
                          strokeWidth={1}
                          stroke='currentColor'
                          fill='none'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                          <polyline points='6 15 12 9 18 15' />
                        </svg>
                      </div>
                    ) : (
                      <div className='ml-4'>
                        <svg
                          onClick={() => setShow(1)}
                          xmlns='http://www.w3.org/2000/svg'
                          className='icon icon-tabler icon-tabler-chevron-down'
                          width={20}
                          height={20}
                          viewBox='0 0 24 24'
                          strokeWidth={1}
                          stroke='currentColor'
                          fill='none'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                          <polyline points='6 9 12 15 18 9' />
                        </svg>
                      </div>
                    )}
                  </div>
                  {show === 1 && (
                    <ul className='my-3 ' id='list1'>
                      <li className='px-6 py-2 text-sm text-indigo-500 hover:text-gray-200'>
                        Best Sellers
                      </li>
                      <li className='px-6 py-2 text-sm text-gray-300 hover:text-indigo-500'>
                        Out of Stock
                      </li>
                      <li className='px-6 py-2 text-sm text-gray-300 hover:text-indigo-500'>
                        New Products
                      </li>
                    </ul>
                  )}
                </li>
                <li className='items-center justify-between w-full px-8 my-6 text-gray-300 cursor-pointer hover:text-gray-200'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='icon icon-tabler icon-tabler-compass'
                        width={18}
                        height={18}
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        fill='none'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <path stroke='none' d='M0 0h24v24H0z' />
                        <polyline points='8 16 10 10 16 8 14 14 8 16' />
                        <circle cx={12} cy={12} r={9} />
                      </svg>
                      <span className='ml-2 text-sm'>Performance</span>
                    </div>
                    {show === 2 ? (
                      <div className='ml-4 '>
                        <svg
                          onClick={() => setShow(null)}
                          xmlns='http://www.w3.org/2000/svg'
                          className='icon icon-tabler icon-tabler-chevron-up'
                          width={20}
                          height={20}
                          viewBox='0 0 24 24'
                          strokeWidth={1}
                          stroke='currentColor'
                          fill='none'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                          <polyline points='6 15 12 9 18 15' />
                        </svg>
                      </div>
                    ) : (
                      <div className='ml-4'>
                        <svg
                          onClick={() => setShow(2)}
                          xmlns='http://www.w3.org/2000/svg'
                          className='icon icon-tabler icon-tabler-chevron-down'
                          width={20}
                          height={20}
                          viewBox='0 0 24 24'
                          strokeWidth={1}
                          stroke='currentColor'
                          fill='none'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                          <polyline points='6 9 12 15 18 9' />
                        </svg>
                      </div>
                    )}
                  </div>
                  {show === 2 && (
                    <ul className='my-3 ' id='list1'>
                      <li className='px-6 py-2 text-sm text-indigo-500 hover:text-gray-200'>
                        Best Sellers
                      </li>
                      <li className='px-6 py-2 text-sm text-gray-300 hover:text-indigo-500'>
                        Out of Stock
                      </li>
                      <li className='px-6 py-2 text-sm text-gray-300 hover:text-indigo-500'>
                        New Products
                      </li>
                    </ul>
                  )}
                </li>
                <li className='items-center justify-between w-full px-8 mb-6 text-gray-300 cursor-pointer hover:text-gray-200'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='icon icon-tabler icon-tabler-code'
                        width={20}
                        height={20}
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        fill='none'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <path stroke='none' d='M0 0h24v24H0z' />
                        <polyline points='7 8 3 12 7 16' />
                        <polyline points='17 8 21 12 17 16' />
                        <line x1={14} y1={4} x2={10} y2={20} />
                      </svg>
                      <span className='ml-2 text-sm'>Deliverables</span>
                    </div>
                    {show === 3 ? (
                      <div className='ml-4 '>
                        <svg
                          onClick={() => setShow(null)}
                          xmlns='http://www.w3.org/2000/svg'
                          className='icon icon-tabler icon-tabler-chevron-up'
                          width={20}
                          height={20}
                          viewBox='0 0 24 24'
                          strokeWidth={1}
                          stroke='currentColor'
                          fill='none'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                          <polyline points='6 15 12 9 18 15' />
                        </svg>
                      </div>
                    ) : (
                      <div className='ml-4'>
                        <svg
                          onClick={() => setShow(3)}
                          xmlns='http://www.w3.org/2000/svg'
                          className='icon icon-tabler icon-tabler-chevron-down'
                          width={20}
                          height={20}
                          viewBox='0 0 24 24'
                          strokeWidth={1}
                          stroke='currentColor'
                          fill='none'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                          <polyline points='6 9 12 15 18 9' />
                        </svg>
                      </div>
                    )}
                  </div>
                  {show === 3 && (
                    <ul className='my-3 ' id='list1'>
                      <li className='px-6 py-2 text-sm text-indigo-500 hover:text-gray-200'>
                        Best Sellers
                      </li>
                      <li className='px-6 py-2 text-sm text-gray-300 hover:text-indigo-500'>
                        Out of Stock
                      </li>
                      <li className='px-6 py-2 text-sm text-gray-300 hover:text-indigo-500'>
                        New Products
                      </li>
                    </ul>
                  )}
                </li>
                <li className='items-center justify-between w-full px-8 mb-6 text-gray-300 cursor-pointer hover:text-gray-200'>
                  <div className='flex justify-between itmes-center'>
                    <div className='flex items-center'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='icon icon-tabler icon-tabler-puzzle'
                        width={18}
                        height={18}
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        fill='none'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <path stroke='none' d='M0 0h24v24H0z' />
                        <path d='M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1' />
                      </svg>
                      <span className='ml-2 text-sm'>Invoices</span>
                    </div>
                    <div>
                      {show === 4 ? (
                        <div className='ml-4 '>
                          <svg
                            onClick={() => setShow(null)}
                            xmlns='http://www.w3.org/2000/svg'
                            className='icon icon-tabler icon-tabler-chevron-up'
                            width={20}
                            height={20}
                            viewBox='0 0 24 24'
                            strokeWidth={1}
                            stroke='currentColor'
                            fill='none'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          >
                            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                            <polyline points='6 15 12 9 18 15' />
                          </svg>
                        </div>
                      ) : (
                        <div className='ml-4'>
                          <svg
                            onClick={() => setShow(4)}
                            xmlns='http://www.w3.org/2000/svg'
                            className='icon icon-tabler icon-tabler-chevron-down'
                            width={20}
                            height={20}
                            viewBox='0 0 24 24'
                            strokeWidth={1}
                            stroke='currentColor'
                            fill='none'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          >
                            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                            <polyline points='6 9 12 15 18 9' />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                  {show === 4 && (
                    <ul className='my-3 ' id='list1'>
                      <li className='px-6 py-2 text-sm text-indigo-500 hover:text-gray-200'>
                        Best Sellers
                      </li>
                      <li className='px-6 py-2 text-sm text-gray-300 hover:text-indigo-500'>
                        Out of Stock
                      </li>
                      <li className='px-6 py-2 text-sm text-gray-300 hover:text-indigo-500'>
                        New Products
                      </li>
                    </ul>
                  )}
                </li>
                <li className='items-center justify-between w-full px-8 mb-6 text-gray-300 cursor-pointer hover:text-gray-200'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='icon icon-tabler icon-tabler-stack'
                        width={18}
                        height={18}
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        fill='none'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <path stroke='none' d='M0 0h24v24H0z' />
                        <polyline points='12 4 4 8 12 12 20 8 12 4' />
                        <polyline points='4 12 12 16 20 12' />
                        <polyline points='4 16 12 20 20 16' />
                      </svg>
                      <span className='ml-2 text-sm'>Inventory</span>
                    </div>
                    {show === 5 ? (
                      <div className='ml-4 '>
                        <svg
                          onClick={() => setShow(null)}
                          xmlns='http://www.w3.org/2000/svg'
                          className='icon icon-tabler icon-tabler-chevron-up'
                          width={20}
                          height={20}
                          viewBox='0 0 24 24'
                          strokeWidth={1}
                          stroke='currentColor'
                          fill='none'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                          <polyline points='6 15 12 9 18 15' />
                        </svg>
                      </div>
                    ) : (
                      <div className='ml-4'>
                        <svg
                          onClick={() => setShow(5)}
                          xmlns='http://www.w3.org/2000/svg'
                          className='icon icon-tabler icon-tabler-chevron-down'
                          width={20}
                          height={20}
                          viewBox='0 0 24 24'
                          strokeWidth={1}
                          stroke='currentColor'
                          fill='none'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                          <polyline points='6 9 12 15 18 9' />
                        </svg>
                      </div>
                    )}
                  </div>
                  {show === 5 && (
                    <ul className='my-3 ' id='list1'>
                      <li className='px-6 py-2 text-sm text-indigo-500 hover:text-gray-200'>
                        Best Sellers
                      </li>
                      <li className='px-6 py-2 text-sm text-gray-300 hover:text-indigo-500'>
                        Out of Stock
                      </li>
                      <li className='px-6 py-2 text-sm text-gray-300 hover:text-indigo-500'>
                        New Products
                      </li>
                    </ul>
                  )}
                </li>
                <li className='flex items-center justify-between w-full px-8 text-gray-300 cursor-pointer hover:text-gray-200'>
                  <div className='flex items-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='icon icon-tabler icon-tabler-settings'
                      width={18}
                      height={18}
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      fill='none'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <path stroke='none' d='M0 0h24v24H0z' />
                      <path d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' />
                      <circle cx={12} cy={12} r={3} />
                    </svg>
                    <span className='ml-2 text-sm'>Settings</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div
            className={
              menu
                ? 'w-full h-full absolute z-40  transform  translate-x-0 '
                : '   w-full h-full absolute z-40  transform -translate-x-full'
            }
            id='mobile-nav'
          >
            <div
              className='absolute w-full h-full bg-gray-800 opacity-50'
              onClick={() => setMenu(!menu)}
            />
            <div className='absolute z-40 flex-col justify-between w-64 h-full pb-4 overflow-y-auto transiti`on duration-150 ease-in-out bg-black shadow md:w-96 lg:relative lg:hidden'>
              <div className='flex flex-col justify-between h-full'>
                <div>
                  <div className='flex items-center justify-between px-8'>
                    <div className='flex items-center w-full h-16 text-white'>
                      <h1>Logo Schematics</h1>
                    </div>
                    <div
                      id='closeSideBar'
                      className='flex items-center justify-end w-10 h-10 text-white'
                      onClick={() => setMenu(!menu)}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='icon icon-tabler icon-tabler-x'
                        width={20}
                        height={20}
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        fill='none'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <path stroke='none' d='M0 0h24v24H0z' />
                        <line x1={18} y1={6} x2={6} y2={18} />
                        <line x1={6} y1={6} x2={18} y2={18} />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <ul className='mt-12'>
                      <li className='items-center justify-between w-full px-8 mb-6 text-gray-300 cursor-pointer hover:text-gray-200'>
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center'>
                            <div className='w-6 h-6 md:w-8 md:h-8'>
                              <svg
                                class='mr-1 h-5 w-5 text-cyan-200'
                                x-description='Heroicon name: outline/home'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                                aria-hidden='true'
                              >
                                <path
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  stroke-width='2'
                                  d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                                ></path>
                              </svg>
                            </div>
                            <span className='ml-2 text-base xl:text-base md:text-2xl'>
                              Dashboard
                            </span>
                          </div>
                          {show === 6 ? (
                            <div
                              className='ml-4 '
                              onClick={() => setShow(null)}
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='icon icon-tabler icon-tabler-chevron-up'
                                width={20}
                                height={20}
                                viewBox='0 0 24 24'
                                strokeWidth={1}
                                stroke='currentColor'
                                fill='none'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              >
                                <path
                                  stroke='none'
                                  d='M0 0h24v24H0z'
                                  fill='none'
                                />
                                <polyline points='6 15 12 9 18 15' />
                              </svg>
                            </div>
                          ) : (
                            <div className='ml-4' onClick={() => setShow(6)}>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='icon icon-tabler icon-tabler-chevron-down'
                                width={20}
                                height={20}
                                viewBox='0 0 24 24'
                                strokeWidth={1}
                                stroke='currentColor'
                                fill='none'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              >
                                <path
                                  stroke='none'
                                  d='M0 0h24v24H0z'
                                  fill='none'
                                />
                                <polyline points='6 9 12 15 18 9' />
                              </svg>
                            </div>
                          )}
                        </div>
                        {show === 6 && (
                          <ul className='my-3 '>
                            <li className='px-6 py-2 text-base text-indigo-500 xl:text-base md:text-2xl hover:text-gray-200'>
                              Best Sellers
                            </li>
                            <li className='px-6 py-2 text-base text-gray-300 xl:text-base md:text-2xl hover:text-indigo-500'>
                              Out of Stock
                            </li>
                            <li className='px-6 py-2 text-base text-gray-300 xl:text-base md:text-2xl hover:text-indigo-500'>
                              New Products
                            </li>
                          </ul>
                        )}
                      </li>
                      <li className='flex flex-col w-full px-8 text-gray-300 cursor-pointer hover:text-gray-200'>
                        <div className='flex items-center justify-between w-full'>
                          <div className='flex items-center'>
                            <div className='w-6 h-6 md:w-8 md:h-8'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='icon icon-tabler icon-tabler-puzzle'
                                viewBox='0 0 24 24'
                                strokeWidth='1.5'
                                stroke='currentColor'
                                fill='none'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              >
                                <path stroke='none' d='M0 0h24v24H0z' />
                                <path d='M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1' />
                              </svg>
                            </div>
                            <span className='ml-2 text-base xl:text-base md:text-2xl'>
                              Products
                            </span>
                          </div>
                          {show === 7 ? (
                            <div
                              className='ml-4 '
                              onClick={() => setShow(null)}
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='icon icon-tabler icon-tabler-chevron-up'
                                width={20}
                                height={20}
                                viewBox='0 0 24 24'
                                strokeWidth={1}
                                stroke='currentColor'
                                fill='none'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              >
                                <path
                                  stroke='none'
                                  d='M0 0h24v24H0z'
                                  fill='none'
                                />
                                <polyline points='6 15 12 9 18 15' />
                              </svg>
                            </div>
                          ) : (
                            <div className='ml-4' onClick={() => setShow(7)}>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='icon icon-tabler icon-tabler-chevron-down'
                                width={20}
                                height={20}
                                viewBox='0 0 24 24'
                                strokeWidth={1}
                                stroke='currentColor'
                                fill='none'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              >
                                <path
                                  stroke='none'
                                  d='M0 0h24v24H0z'
                                  fill='none'
                                />
                                <polyline points='6 9 12 15 18 9' />
                              </svg>
                            </div>
                          )}
                        </div>
                        {show === 7 && (
                          <ul className='my-3 '>
                            <li className='px-6 py-2 text-base text-indigo-500 xl:text-base md:text-2xl hover:text-gray-200'>
                              Best Sellers
                            </li>
                            <li className='px-6 py-2 text-base text-gray-300 xl:text-base md:text-2xl hover:text-indigo-500'>
                              Out of Stock
                            </li>
                            <li className='px-6 py-2 text-base text-gray-300 xl:text-base md:text-2xl hover:text-indigo-500'>
                              New Products
                            </li>
                          </ul>
                        )}
                      </li>
                      <li className='items-center justify-between w-full px-8 my-6 text-gray-300 cursor-pointer hover:text-gray-200'>
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center'>
                            <div className='w-6 h-6 md:w-8 md:h-8'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='icon icon-tabler icon-tabler-compass'
                                viewBox='0 0 24 24'
                                strokeWidth='1.5'
                                stroke='currentColor'
                                fill='none'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              >
                                <path stroke='none' d='M0 0h24v24H0z' />
                                <polyline points='8 16 10 10 16 8 14 14 8 16' />
                                <circle cx={12} cy={12} r={9} />
                              </svg>{' '}
                            </div>
                            <span className='ml-2 text-base xl:text-base md:text-2xl'>
                              Performance
                            </span>
                          </div>
                          {show === 8 ? (
                            <div
                              className='ml-4 '
                              onClick={() => setShow(null)}
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='icon icon-tabler icon-tabler-chevron-up'
                                width={20}
                                height={20}
                                viewBox='0 0 24 24'
                                strokeWidth={1}
                                stroke='currentColor'
                                fill='none'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              >
                                <path
                                  stroke='none'
                                  d='M0 0h24v24H0z'
                                  fill='none'
                                />
                                <polyline points='6 15 12 9 18 15' />
                              </svg>
                            </div>
                          ) : (
                            <div className='ml-4' onClick={() => setShow(8)}>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='icon icon-tabler icon-tabler-chevron-down'
                                width={20}
                                height={20}
                                viewBox='0 0 24 24'
                                strokeWidth={1}
                                stroke='currentColor'
                                fill='none'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              >
                                <path
                                  stroke='none'
                                  d='M0 0h24v24H0z'
                                  fill='none'
                                />
                                <polyline points='6 9 12 15 18 9' />
                              </svg>
                            </div>
                          )}
                        </div>
                        {show === 8 && (
                          <ul className='my-3 '>
                            <li className='px-6 py-2 text-base text-indigo-500 xl:text-base md:text-2xl hover:text-gray-200'>
                              Best Sellers
                            </li>
                            <li className='px-6 py-2 text-base text-gray-300 xl:text-base md:text-2xl hover:text-indigo-500'>
                              Out of Stock
                            </li>
                            <li className='px-6 py-2 text-base text-gray-300 xl:text-base md:text-2xl hover:text-indigo-500'>
                              New Products
                            </li>
                          </ul>
                        )}
                      </li>
                      <li className='items-center justify-between w-full px-8 mb-6 text-gray-300 cursor-pointer hover:text-gray-200'>
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center'>
                            <div className='w-6 h-6 md:w-8 md:h-8'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='icon icon-tabler icon-tabler-code'
                                viewBox='0 0 24 24'
                                strokeWidth='1.5'
                                stroke='currentColor'
                                fill='none'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              >
                                <path stroke='none' d='M0 0h24v24H0z' />
                                <polyline points='7 8 3 12 7 16' />
                                <polyline points='17 8 21 12 17 16' />
                                <line x1={14} y1={4} x2={10} y2={20} />
                              </svg>
                            </div>
                            <span className='ml-2 text-base xl:text-base md:text-2xl'>
                              Deliverables
                            </span>
                          </div>
                          {show === 9 ? (
                            <div
                              className='ml-4 '
                              onClick={() => setShow(null)}
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='icon icon-tabler icon-tabler-chevron-up'
                                width={20}
                                height={20}
                                viewBox='0 0 24 24'
                                strokeWidth={1}
                                stroke='currentColor'
                                fill='none'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              >
                                <path
                                  stroke='none'
                                  d='M0 0h24v24H0z'
                                  fill='none'
                                />
                                <polyline points='6 15 12 9 18 15' />
                              </svg>
                            </div>
                          ) : (
                            <div className='ml-4' onClick={() => setShow(9)}>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='icon icon-tabler icon-tabler-chevron-down'
                                width={20}
                                height={20}
                                viewBox='0 0 24 24'
                                strokeWidth={1}
                                stroke='currentColor'
                                fill='none'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              >
                                <path
                                  stroke='none'
                                  d='M0 0h24v24H0z'
                                  fill='none'
                                />
                                <polyline points='6 9 12 15 18 9' />
                              </svg>
                            </div>
                          )}
                        </div>
                        {show === 9 && (
                          <ul className='my-3 '>
                            <li className='px-6 py-2 text-base text-indigo-500 xl:text-base md:text-2xl hover:text-gray-200'>
                              Best Sellers
                            </li>
                            <li className='px-6 py-2 text-base text-gray-300 xl:text-base md:text-2xl hover:text-indigo-500'>
                              Out of Stock
                            </li>
                            <li className='px-6 py-2 text-base text-gray-300 xl:text-base md:text-2xl hover:text-indigo-500'>
                              New Products
                            </li>
                          </ul>
                        )}
                      </li>
                      <li className='items-center justify-between w-full px-8 mb-6 text-gray-300 cursor-pointer hover:text-gray-200'>
                        <div className='flex justify-between itmes-center'>
                          <div className='flex items-center'>
                            <div className='w-6 h-6 md:w-8 md:h-8'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='icon icon-tabler icon-tabler-puzzle'
                                viewBox='0 0 24 24'
                                strokeWidth='1.5'
                                stroke='currentColor'
                                fill='none'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              >
                                <path stroke='none' d='M0 0h24v24H0z' />
                                <path d='M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1' />
                              </svg>
                            </div>
                            <span className='ml-2 text-base xl:text-base md:text-2xl'>
                              Invoices
                            </span>
                          </div>
                          <div>
                            {show === 10 ? (
                              <div
                                className='ml-4 '
                                onClick={() => setShow(null)}
                              >
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  className='icon icon-tabler icon-tabler-chevron-up'
                                  width={20}
                                  height={20}
                                  viewBox='0 0 24 24'
                                  strokeWidth={1}
                                  stroke='currentColor'
                                  fill='none'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                >
                                  <path
                                    stroke='none'
                                    d='M0 0h24v24H0z'
                                    fill='none'
                                  />
                                  <polyline points='6 15 12 9 18 15' />
                                </svg>
                              </div>
                            ) : (
                              <div className='ml-4' onClick={() => setShow(10)}>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  className='icon icon-tabler icon-tabler-chevron-down'
                                  width={20}
                                  height={20}
                                  viewBox='0 0 24 24'
                                  strokeWidth={1}
                                  stroke='currentColor'
                                  fill='none'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                >
                                  <path
                                    stroke='none'
                                    d='M0 0h24v24H0z'
                                    fill='none'
                                  />
                                  <polyline points='6 9 12 15 18 9' />
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>
                        {show === 10 && (
                          <ul className='my-3 '>
                            <li className='px-6 py-2 text-base text-indigo-500 xl:text-base md:text-2xl hover:text-gray-200'>
                              Best Sellers
                            </li>
                            <li className='px-6 py-2 text-base text-gray-300 xl:text-base md:text-2xl hover:text-indigo-500'>
                              Out of Stock
                            </li>
                            <li className='px-6 py-2 text-base text-gray-300 xl:text-base md:text-2xl hover:text-indigo-500'>
                              New Products
                            </li>
                          </ul>
                        )}
                      </li>
                      <li className='items-center justify-between w-full px-8 mb-6 text-gray-300 cursor-pointer hover:text-gray-200'>
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center'>
                            <div className='w-6 h-6 md:w-8 md:h-8'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='icon icon-tabler icon-tabler-stack'
                                viewBox='0 0 24 24'
                                strokeWidth='1.5'
                                stroke='currentColor'
                                fill='none'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              >
                                <path stroke='none' d='M0 0h24v24H0z' />
                                <polyline points='12 4 4 8 12 12 20 8 12 4' />
                                <polyline points='4 12 12 16 20 12' />
                                <polyline points='4 16 12 20 20 16' />
                              </svg>
                            </div>
                            <span className='ml-2 text-base xl:text-base md:text-2xl'>
                              Inventory
                            </span>
                          </div>
                          {show === 11 ? (
                            <div
                              className='ml-4 '
                              onClick={() => setShow(null)}
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='icon icon-tabler icon-tabler-chevron-up'
                                width={20}
                                height={20}
                                viewBox='0 0 24 24'
                                strokeWidth={1}
                                stroke='currentColor'
                                fill='none'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              >
                                <path
                                  stroke='none'
                                  d='M0 0h24v24H0z'
                                  fill='none'
                                />
                                <polyline points='6 15 12 9 18 15' />
                              </svg>
                            </div>
                          ) : (
                            <div className='ml-4' onClick={() => setShow(11)}>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='icon icon-tabler icon-tabler-chevron-down'
                                width={20}
                                height={20}
                                viewBox='0 0 24 24'
                                strokeWidth={1}
                                stroke='currentColor'
                                fill='none'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              >
                                <path
                                  stroke='none'
                                  d='M0 0h24v24H0z'
                                  fill='none'
                                />
                                <polyline points='6 9 12 15 18 9' />
                              </svg>
                            </div>
                          )}
                        </div>
                        {show === 11 && (
                          <ul className='my-3 '>
                            <li className='px-6 py-2 text-base text-indigo-500 xl:text-base md:text-2xl hover:text-gray-200'>
                              Best Sellers
                            </li>
                            <li className='px-6 py-2 text-base text-gray-300 xl:text-base md:text-2xl hover:text-indigo-500'>
                              Out of Stock
                            </li>
                            <li className='px-6 py-2 text-base text-gray-300 xl:text-base md:text-2xl hover:text-indigo-500'>
                              New Products
                            </li>
                          </ul>
                        )}
                      </li>
                      <li className='flex items-center justify-between w-full px-8 text-gray-300 cursor-pointer hover:text-gray-200'>
                        <div className='flex items-center'>
                          <div className='w-6 h-6 md:w-8 md:h-8'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='icon icon-tabler icon-tabler-settings'
                              viewBox='0 0 24 24'
                              strokeWidth='1.5'
                              stroke='currentColor'
                              fill='none'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            >
                              <path stroke='none' d='M0 0h24v24H0z' />
                              <path d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' />
                              <circle cx={12} cy={12} r={3} />
                            </svg>
                          </div>
                          <span className='ml-2 text-base xl:text-base md:text-2xl'>
                            Settings
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*Mobile responsive sidebar*/}
          {/* Sidebar ends */}
          <div className='w-full'>
            <nav className='relative z-10 flex items-center justify-end h-16 bg-white shadow b lg:items-stretch lg:justify-between'>
              <div className='hidden w-full pr-6 lg:flex'>
                <div className='items-center hidden w-1/2 h-full pl-6 pr-24 lg:flex'>
                  <div className='relative w-full'>
                    <div className='absolute inset-0 w-4 h-4 m-auto ml-4 text-gray-500'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='icon icon-tabler icon-tabler-search'
                        width={16}
                        height={16}
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        fill='none'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <path stroke='none' d='M0 0h24v24H0z' />
                        <circle cx={10} cy={10} r={7} />
                        <line x1={21} y1={21} x2={15} y2={15} />
                      </svg>
                    </div>
                    <input
                      className='w-full py-2 pl-12 text-sm text-gray-500 bg-gray-100 border border-gray-100 rounded focus:outline-none focus:border-indigo-700'
                      type='text'
                      placeholder='Search'
                    />
                  </div>
                </div>
                {/* right navbar*/}
                <div className='hidden w-1/2 lg:flex'>
                  <div className='flex items-center justify-end w-full pl-8'>
                    <div
                      className='relative flex items-center cursor-pointer'
                      onClick={() => setProfile(!profile)}
                    >
                      <div className='rounded-full'>
                        {profile && (
                          <ul className='absolute left-0 w-full p-2 mt-12 bg-white border-r rounded shadow sm:mt-16 '>
                            <li className='flex items-center justify-between w-full text-gray-600 cursor-pointer hover:text-indigo-700'>
                              <div className='flex items-center'>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  className='icon icon-tabler icon-tabler-user'
                                  width={18}
                                  height={18}
                                  viewBox='0 0 24 24'
                                  strokeWidth='1.5'
                                  stroke='currentColor'
                                  fill='none'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                >
                                  <path stroke='none' d='M0 0h24v24H0z' />
                                  <circle cx={12} cy={7} r={4} />
                                  <path d='M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2' />
                                </svg>
                                <span className='ml-2 text-sm'>My Profile</span>
                              </div>
                            </li>
                            <li className='flex items-center justify-between w-full mt-2 text-gray-600 cursor-pointer hover:text-indigo-700'>
                              <div className='flex items-center'>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  className='icon icon-tabler icon-tabler-logout'
                                  width={20}
                                  height={20}
                                  viewBox='0 0 24 24'
                                  strokeWidth='1.5'
                                  stroke='currentColor'
                                  fill='none'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                >
                                  <path stroke='none' d='M0 0h24v24H0z' />
                                  <path d='M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2' />
                                  <path d='M7 12h14l-3 -3m0 6l3 -3' />
                                </svg>
                                <span className='ml-2 text-sm'>Sign out</span>
                              </div>
                            </li>
                          </ul>
                        )}
                      </div>
                      <p className='mx-3 text-sm text-gray-800'>
                        Theodorus Clerence
                      </p>
                      <div className='text-gray-600 cursor-pointer'>
                        <svg
                          aria-haspopup='true'
                          xmlns='http://www.w3.org/2000/svg'
                          className='icon icon-tabler icon-tabler-chevron-down'
                          width={20}
                          height={20}
                          viewBox='0 0 24 24'
                          strokeWidth='1.5'
                          stroke='currentColor'
                          fill='none'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <path stroke='none' d='M0 0h24v24H0z' />
                          <polyline points='6 9 12 15 18 9' />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className='relative visible mr-8 text-gray-600 lg:hidden'
                onClick={() => setMenu(!menu)}
              >
                {menu ? (
                  ''
                ) : (
                  <svg
                    aria-label='Main Menu'
                    id='menu'
                    aria-haspopup='true'
                    xmlns='http://www.w3.org/2000/svg'
                    className='cursor-pointer icon icon-tabler icon-tabler-menu'
                    width={30}
                    height={30}
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path stroke='none' d='M0 0h24v24H0z' />
                    <line x1={4} y1={8} x2={20} y2={8} />
                    <line x1={4} y1={16} x2={20} y2={16} />
                  </svg>
                )}
              </div>
            </nav>
            {/* Remove class [ h-64 ] when adding a card block */}
            <div className='container w-11/12 h-64 px-6 py-10 mx-auto md:w-4/5'>
              {/* Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border */}
              <div className='max-w-6xl px-4 mx-auto space-y-9 lg:space-y-4 sm:px-6 lg:px-2'>
                {/* profile */}
                <h1 className='font-bold'>Profile</h1>
                <div class='flex items-center bg-white border-2 p-5 rounded-xl'>
                  <img
                    class='hidden h-16 w-16 rounded-full sm:block'
                    src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2.6&amp;w=256&amp;h=256&amp;q=80'
                    alt=''
                  />
                  <div>
                    <div class='flex items-center'>
                      <h1 class='ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate'>
                        Good morning, Theodorus Clerence
                      </h1>
                    </div>
                    <dl class='mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap'>
                      <dt class='sr-only'>Company</dt>
                      <dd class='flex items-center text-sm text-gray-500 font-medium capitalize sm:mr-6'>
                        <svg
                          class='flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400'
                          x-description='Heroicon name: solid/office-building'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                          aria-hidden='true'
                        >
                          <path
                            fill-rule='evenodd'
                            d='M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z'
                            clip-rule='evenodd'
                          ></path>
                        </svg>
                        Surabaya
                      </dd>
                      <dt class='sr-only'>Account status</dt>
                      <dd class='mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize'>
                        <svg
                          class='flex-shrink-0 mr-1.5 h-5 w-5 text-green-400'
                          x-description='Heroicon name: solid/check-circle'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                          aria-hidden='true'
                        >
                          <path
                            fill-rule='evenodd'
                            d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                            clip-rule='evenodd'
                          ></path>
                        </svg>
                        Verified account
                      </dd>
                    </dl>
                  </div>
                </div>
                {/* content */}
                <h1 className='font-bold'>Overview</h1>
                <div
                  class='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'
                  x-max='1'
                >
                  <div class='bg-white overflow-hidden shadow rounded-lg'>
                    <div class='p-5'>
                      <div class='flex items-center'>
                        <div class='flex-shrink-0'>
                          <svg
                            class='h-6 w-6 text-gray-400'
                            x-description='Heroicon name: outline/scale'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            aria-hidden='true'
                          >
                            <path
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-width='2'
                              d='M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3'
                            ></path>
                          </svg>
                        </div>
                        <div class='ml-5 w-0 flex-1'>
                          <dl>
                            <dt class='text-sm font-medium text-gray-500 truncate'>
                              Account balance
                            </dt>
                            <dd>
                              <div class='text-lg font-medium text-gray-900'>
                                $30,659.45
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                    <div class='bg-gray-50 px-5 py-3'>
                      <div class='text-sm'>
                        <a
                          href='a'
                          class='font-medium text-cyan-700 hover:text-cyan-900'
                        >
                          View all
                        </a>
                      </div>
                    </div>
                  </div>

                  <div class='bg-white overflow-hidden shadow rounded-lg'>
                    <div class='p-5'>
                      <div class='flex items-center'>
                        <div class='flex-shrink-0'>
                          <svg
                            class='h-6 w-6 text-gray-400'
                            x-description='Heroicon name: outline/refresh'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            aria-hidden='true'
                          >
                            <path
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-width='2'
                              d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                            ></path>
                          </svg>
                        </div>
                        <div class='ml-5 w-0 flex-1'>
                          <dl>
                            <dt class='text-sm font-medium text-gray-500 truncate'>
                              Pending
                            </dt>
                            <dd>
                              <div class='text-lg font-medium text-gray-900'>
                                -$19,500.00
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                    <div class='bg-gray-50 px-5 py-3'>
                      <div class='text-sm'>
                        <a
                          href='a'
                          class='font-medium text-cyan-700 hover:text-cyan-900'
                        >
                          View all
                        </a>
                      </div>
                    </div>
                  </div>

                  <div class='bg-white overflow-hidden shadow rounded-lg'>
                    <div class='p-5'>
                      <div class='flex items-center'>
                        <div class='flex-shrink-0'>
                          <svg
                            class='h-6 w-6 text-gray-400'
                            x-description='Heroicon name: outline/check-circle'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            aria-hidden='true'
                          >
                            <path
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-width='2'
                              d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                            ></path>
                          </svg>
                        </div>
                        <div class='ml-5 w-0 flex-1'>
                          <dl>
                            <dt class='text-sm font-medium text-gray-500 truncate'>
                              Processed (last 30 days)
                            </dt>
                            <dd>
                              <div class='text-lg font-medium text-gray-900'>
                                $20,000
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                    <div class='bg-gray-50 px-5 py-3'>
                      <div class='text-sm'>
                        <a
                          href='a'
                          class='font-medium text-cyan-700 hover:text-cyan-900'
                        >
                          View all
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
