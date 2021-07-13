import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { HiDesktopComputer } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function Modal({ open, setOpen }) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        static
        className='fixed inset-0 z-10 overflow-y-auto'
        initialFocus={cancelButtonRef}
        open={open}
        onClose={setOpen}
      >
        <div className='flex items-end justify-center px-4 pt-4 pb-20 text-center h-1/2 sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className='hidden sm:inline-block sm:align-middle sm:h-screen'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div className='inline-block w-3/4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
              <div className='px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4'>
                <div className='justify-center sm:flex sm:items-start'>
                  <div className='mt-3 sm:mt-0 sm:ml-4'>
                    <Dialog.Title
                      as='h3'
                      className='text-2xl font-bold leading-6 text-center text-gray-900 '
                    >
                      <span className='text-npc'>Pilih</span> Kategori Tim
                    </Dialog.Title>
                  </div>
                </div>
              </div>
              <div className='justify-center px-4 py-3 bg-white sm:px-6 sm:flex sm:flex-row-reverse'>
                <Link
                  type='button'
                  className='inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                  to='/my/sch-npc/team/create/senior'
                >
                  Senior
                </Link>
                <Link
                  type='button'
                  className='inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                  to='/my/sch-npc/team/create/junior'
                >
                  Junior
                </Link>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
