export default function AuthHeader({ headerText }) {
  return (
    <div className='sm:mx-auto sm:w-full sm:max-w-md'>
      <img
        className='w-3/4 mx-auto md:w-5/6'
        src='/images/logo/colored-title.png'
        alt='Logo Colored'
      />
      <h1 className='mt-6 text-4xl font-extrabold text-center text-white'>
        {headerText}
      </h1>
    </div>
  );
}
