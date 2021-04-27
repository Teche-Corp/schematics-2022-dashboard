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
                <h1 className='font-bold text-white'>logo</h1>
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
            <div className='absolute z-40 flex-col justify-between w-64 h-full pb-4 overflow-y-auto transiti`on duration-150 ease-in-out bg-purple-900 shadow md:w-96 lg:relative lg:hidden'>
              <div className='flex flex-col justify-between h-full'>
                <div>
                  <div className='flex items-center justify-between px-8'>
                    <div className='flex items-center w-full h-16 text-white'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width={144}
                        height={30}
                        viewBox='0 0 144 30'
                      >
                        <path
                          fill='#5F7DF2'
                          d='M80.544 9.48c1.177 0 2.194.306 3.053.92.86.614 1.513 1.45 1.962 2.507.448 1.058.673 2.247.673 3.568 0 1.303-.233 2.473-.699 3.51-.465 1.037-1.136 1.851-2.012 2.444-.876.592-1.885.888-3.028.888-1.405 0-2.704-.554-3.897-1.663v4.279h2.64v3.072h-9.14v-3.072h2.26V12.78H70.45V9.657h6.145v1.663l.209-.21c1.123-1.087 2.369-1.63 3.74-1.63zm17.675 0c1.176 0 2.194.306 3.053.92.859.614 1.513 1.45 1.961 2.507.449 1.058.673 2.247.673 3.568 0 1.303-.233 2.473-.698 3.51-.466 1.037-1.136 1.851-2.012 2.444-.876.592-1.886.888-3.028.888-1.405 0-2.704-.554-3.898-1.663v4.279h2.64v3.072h-9.14v-3.072h2.26V12.78h-1.904V9.657h6.144v1.663l.21-.21c1.122-1.087 2.368-1.63 3.739-1.63zM24.973 1c1.13 0 2.123.433 2.842 1.133 0 .004 0 .008.034.012 1.54 1.515 1.54 3.962-.034 5.472-.035.029-.069.058-.069.089-.719.65-1.712 1.05-2.773 1.05-.719 0-1.37.061-1.985.184-2.363.474-3.8 1.86-4.28 4.13-.114.489-.18 1.02-.2 1.59l-.003.176.001-.034.002.034c.022.505-.058 1.014-.239 1.495l-.076.182.064-.157c.106-.28.18-.575.217-.881l.008-.084-.026.195c-.286 1.797-1.858 3.188-3.754 3.282l-.204.005h-.103l-.103.002h-.034c-.65.012-1.232.072-1.78.181-2.328.473-3.765 1.863-4.279 4.139-.082.417-.142.863-.163 1.339l-.008.362v.23c0 2.02-1.603 3.681-3.661 3.861L4.16 29l-.48-.01c-.958-.073-1.849-.485-2.499-1.113-1.522-1.464-1.573-3.808-.152-5.33l.152-.154.103-.12c.719-.636 1.677-1.026 2.704-1.026.754 0 1.404-.062 2.02-.184 2.362-.475 3.8-1.86 4.28-4.126.136-.587.17-1.235.17-1.942 0-.991.411-1.896 1.027-2.583.069-.047.137-.097.172-.15.068-.051.102-.104.17-.159.633-.564 1.498-.925 2.408-.978l.229-.007h.034c.068 0 .171.003.274.009.616-.014 1.198-.074 1.746-.18 2.328-.474 3.766-1.863 4.279-4.135.082-.44.142-.912.163-1.418l.008-.385v-.132c0-2.138 1.78-3.872 4.005-3.877zm-.886 10c1.065 0 1.998.408 2.697 1.073.022.011.03.024.042.036l.025.017v.015c1.532 1.524 1.532 3.996 0 5.52-.034.03-.067.06-.067.09-.7.655-1.665 1.056-2.697 1.056-.7 0-1.332.062-1.932.186-2.298.477-3.696 1.873-4.163 4.157-.133.591-.2 1.242-.2 1.95 0 1.036-.399 1.975-1.032 2.674l-.1.084c-.676.679-1.551 1.055-2.441 1.13l-.223.012-.366-.006c-.633-.043-1.3-.254-1.865-.632-.156-.096-.296-.201-.432-.315l-.2-.177v-.012c-.734-.735-1.133-1.72-1.133-2.757 0-2.078 1.656-3.793 3.698-3.899l.198-.005h.133c.666-.007 1.266-.069 1.832-.185 2.265-.476 3.663-1.874 4.163-4.161.08-.442.139-.916.159-1.424l.008-.387v-.136c0-2.153 1.731-3.899 3.896-3.904zm3.882 11.025c1.375 1.367 1.375 3.583 0 4.95s-3.586 1.367-4.96 0c-1.345-1.367-1.345-3.583 0-4.95 1.374-1.367 3.585-1.367 4.96 0zm94.655-12.672c1.405 0 2.628.323 3.669.97 1.041.648 1.843 1.566 2.406 2.756.563 1.189.852 2.57.87 4.145h-9.954l.03.251c.132.906.476 1.633 1.03 2.18.605.596 1.386.895 2.343.895 1.058 0 2.09-.525 3.097-1.574l3.301 1.066-.203.291c-.69.947-1.524 1.67-2.501 2.166-1.075.545-2.349.818-3.821.818-1.473 0-2.774-.277-3.904-.831-1.13-.555-2.006-1.34-2.628-2.355-.622-1.016-.933-2.21-.933-3.58 0-1.354.324-2.582.971-3.682s1.523-1.961 2.628-2.583c1.104-.622 2.304-.933 3.599-.933zm13.955.126c1.202 0 2.314.216 3.339.648v-.47h3.034v3.91h-3.034l-.045-.137c-.317-.848-1.275-1.272-2.875-1.272-1.21 0-1.816.339-1.816 1.016 0 .296.161.516.483.66.321.144.791.262 1.409.355 1.735.22 3.102.536 4.1.946 1 .41 1.697.919 2.095 1.524.398.605.597 1.339.597 2.202 0 1.405-.48 2.5-1.441 3.282-.96.783-2.266 1.174-3.917 1.174-1.608 0-2.7-.321-3.275-.964V23h-3.098v-4.596h3.098l.032.187c.116.547.412.984.888 1.311.53.364 1.183.546 1.962.546.762 0 1.324-.087 1.688-.26.364-.174.546-.476.546-.908 0-.296-.076-.527-.228-.692-.153-.165-.447-.31-.883-.438-.435-.127-1.102-.27-2-.431-1.997-.313-3.433-.82-4.31-1.517-.875-.699-1.313-1.64-1.313-2.825 0-1.21.455-2.162 1.365-2.856.91-.695 2.11-1.042 3.599-1.042zm-69.164.178v10.27h1.98V23h-8.24v-3.072h2.032V12.78h-2.031V9.657h6.259zm-16.85-5.789l.37.005c1.94.05 3.473.494 4.6 1.335 1.198.892 1.797 2.185 1.797 3.878 0 1.168-.273 2.15-.819 2.945-.546.796-1.373 1.443-2.482 1.943l3.085 5.776h2.476V23h-5.827l-4.317-8.366h-2.183v5.116h2.4V23H39.646v-3.25h2.628V7.118h-2.628v-3.25h10.918zm61.329 0v16.06h1.892V23h-8.24v-3.072h2.082v-13h-2.082v-3.06h6.348zm-32.683 9.04c-.812 0-1.462.317-1.949.951-.486.635-.73 1.49-.73 2.565 0 1.007.252 1.847.756 2.52.503.673 1.161 1.01 1.974 1.01.838 0 1.481-.312 1.93-.934.448-.622.672-1.504.672-2.647 0-1.092-.228-1.942-.685-2.552-.457-.61-1.113-.914-1.968-.914zm17.675 0c-.813 0-1.463.317-1.95.951-.486.635-.73 1.49-.73 2.565 0 1.007.253 1.847.756 2.52.504.673 1.162 1.01 1.974 1.01.838 0 1.481-.312 1.93-.934.449-.622.673-1.504.673-2.647 0-1.092-.229-1.942-.686-2.552-.457-.61-1.113-.914-1.967-.914zM14.1 0C16.267 0 18 1.743 18 3.894v.01c0 2.155-1.733 3.903-3.9 3.903-4.166 0-6.3 2.133-6.3 6.293 0 2.103-1.667 3.817-3.734 3.9l-.5-.009c-.933-.075-1.8-.49-2.433-1.121C.4 16.134 0 15.143 0 14.1c0-2.144 1.733-3.903 3.9-3.903 4.166 0 6.3-2.133 6.3-6.294C10.2 1.751 11.934.005 14.1 0zm108.32 12.184c-.76 0-1.372.22-1.834.66-.46.44-.75 1.113-.87 2.018h5.561c-.118-.795-.442-1.44-.97-1.936-.53-.495-1.158-.742-1.886-.742zM49.525 7.118h-2.26v4.444h1.829c2.023 0 3.034-.754 3.034-2.26 0-.728-.233-1.274-.698-1.638-.466-.364-1.1-.546-1.905-.546zm15.821-3.593c.635 0 1.183.231 1.644.692.462.462.692 1.01.692 1.644 0 .677-.23 1.238-.692 1.682-.46.445-1.009.667-1.644.667-.643 0-1.195-.23-1.656-.692-.462-.461-.692-1.013-.692-1.657 0-.634.23-1.182.692-1.644.46-.461 1.013-.692 1.656-.692zM5.991 1.171c1.345 1.563 1.345 4.095 0 5.658-1.374 1.561-3.585 1.561-4.96 0-1.375-1.563-1.375-4.095 0-5.658 1.375-1.561 3.586-1.561 4.96 0z'
                        />
                      </svg>
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
                                xmlns='http://www.w3.org/2000/svg'
                                className='icon icon-tabler icon-tabler-grid'
                                viewBox='0 0 24 24'
                                strokeWidth='1.5'
                                stroke='currentColor'
                                fill='none'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              >
                                <path stroke='none' d='M0 0h24v24H0z' />
                                <rect x={4} y={4} width={6} height={6} rx={1} />
                                <rect
                                  x={14}
                                  y={4}
                                  width={6}
                                  height={6}
                                  rx={1}
                                />
                                <rect
                                  x={4}
                                  y={14}
                                  width={6}
                                  height={6}
                                  rx={1}
                                />
                                <rect
                                  x={14}
                                  y={14}
                                  width={6}
                                  height={6}
                                  rx={1}
                                />
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
                <div className='w-full pt-8'>
                  <div className='flex justify-center w-full px-6 mb-4'>
                    <div className='relative w-full'>
                      <div className='absolute inset-0 w-4 h-4 m-auto ml-4 text-gray-500'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='icon icon-tabler icon-tabler-search'
                          width={16}
                          height={16}
                          viewBox='0 0 24 24'
                          strokeWidth={1}
                          stroke='#A0AEC0'
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
                        className='w-full py-2 pl-10 text-sm text-gray-500 bg-gray-100 rounded focus:outline-none'
                        type='text'
                        placeholder='Search'
                      />
                    </div>
                  </div>
                  <div className='border-t border-white'>
                    <div className='flex items-center justify-between w-full px-6 pt-1'>
                      <div className='flex items-center'>
                        <img
                          alt='profile-pic'
                          src='https://tuk-cdn.s3.amazonaws.com/assets/components/boxed_layout/bl_1.png'
                          className='w-8 h-8 rounded-md'
                        />
                        <p className='ml-2 text-base leading-4 text-white md:text-xl'>
                          Jane Doe
                        </p>
                      </div>
                      <ul className='flex'>
                        <li className='pt-5 pb-3 text-white cursor-pointer'>
                          <div className='w-6 h-6 md:w-8 md:h-8'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='icon icon-tabler icon-tabler-messages'
                              viewBox='0 0 24 24'
                              strokeWidth={1}
                              stroke='#FFFFFF'
                              fill='none'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            >
                              <path stroke='none' d='M0 0h24v24H0z' />
                              <path d='M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10' />
                              <path d='M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2' />
                            </svg>
                          </div>
                        </li>
                        <li className='pt-5 pb-3 pl-3 text-white cursor-pointer'>
                          <div className='w-6 h-6 md:w-8 md:h-8'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='icon icon-tabler icon-tabler-bell'
                              viewBox='0 0 24 24'
                              strokeWidth={1}
                              stroke='#FFFFFF'
                              fill='none'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            >
                              <path stroke='none' d='M0 0h24v24H0z' />
                              <path d='M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6' />
                              <path d='M9 17v1a3 3 0 0 0 6 0v-1' />
                            </svg>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*Mobile responsive sidebar*/}
          {/* Sidebar ends */}
          <div className='w-full'>
            <nav className='relative z-10 flex items-center justify-end h-16 bg-white shadow lg:items-stretch lg:justify-between'>
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
                <div className='hidden w-1/2 lg:flex'>
                  <div className='flex items-center justify-end w-full pl-8'>
                    <div className='flex items-center justify-center w-20 h-full border-l border-r'>
                      <div className='relative text-gray-600 cursor-pointer'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='icon icon-tabler icon-tabler-bell'
                          width={28}
                          height={28}
                          viewBox='0 0 24 24'
                          strokeWidth='1.5'
                          stroke='currentColor'
                          fill='none'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <path stroke='none' d='M0 0h24v24H0z' />
                          <path d='M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6' />
                          <path d='M9 17v1a3 3 0 0 0 6 0v-1' />
                        </svg>
                        <div className='absolute inset-0 w-2 h-2 m-auto mt-1 mr-1 bg-red-400 border border-white rounded-full' />
                      </div>
                    </div>
                    <div className='flex items-center justify-center w-20 h-full mr-4 text-gray-600 border-r cursor-pointer'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='icon icon-tabler icon-tabler-messages'
                        width={28}
                        height={28}
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        fill='none'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <path stroke='none' d='M0 0h24v24H0z' />
                        <path d='M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10' />
                        <path d='M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2' />
                      </svg>
                    </div>
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
                        <div className='relative'>
                          <img
                            className='object-cover w-10 h-10 rounded-full'
                            src='https://tuk-cdn.s3.amazonaws.com/assets/components/sidebar_layout/sl_1.png'
                            alt='avatar'
                          />
                          <div className='absolute inset-0 w-2 h-2 m-auto mb-0 mr-0 bg-green-400 border border-white rounded-full' />
                        </div>
                      </div>
                      <p className='mx-3 text-sm text-gray-800'>Jane Doe</p>
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
              <div className='max-w-6xl px-4 mx-auto space-y-4 sm:px-6 lg:px-2'>
                {/* profile */}
                <h1 className='font-bold'>Profile</h1>
                <div class='flex items-center bg-white p-5 rounded-xl'>
                  <img
                    class='hidden h-16 w-16 rounded-full sm:block'
                    src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2.6&amp;w=256&amp;h=256&amp;q=80'
                    alt=''
                  />
                  <div>
                    <div class='flex items-center'>
                      <img
                        class='h-16 w-16 rounded-full sm:hidden'
                        src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2.6&amp;w=256&amp;h=256&amp;q=80'
                        alt=''
                      />
                      <h1 class='ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate'>
                        Good morning, Theoderus Clerence
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
                        Duke street studio
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
                  class='mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'
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
