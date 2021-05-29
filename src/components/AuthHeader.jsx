export default function AuthHeader({ headerText }) {
  return (
    <div className='sm:mx-auto sm:w-full sm:max-w-md'>
      <img
        className='w-32 mx-auto'
        src='/images/logo/colored-no-title.png'
        alt='Logo Colored'
      />
      <h1 className='mt-6 text-4xl font-extrabold text-center text-white'>
        {headerText}
      </h1>
    </div>
  );
}
