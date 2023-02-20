import Link from 'next/link';

export default function Hero() {
  return (
    <section className='w-full mx-auto flex h-75px md:pt-4 md:items-center bg-cover bg-right p-8 border-b divide-solid divide-slate-500 bg-slate-50'>
      <div className='container mx-auto'>
        <div className='flex flex-col w-full justify-center items-center tracking-wide text-gray-800'>
          <h1 className='text-2xl m-4 md:text-4xl'>
            Designed and Handmade with Love
          </h1>
        </div>
      </div>
    </section>
  );
}
