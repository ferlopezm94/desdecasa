import React from 'react';
// @ts-ignore
import SEO from '../components/seo';

const IndexPage = () => (
  <div className='w-screen h-screen bg-gray-200 flex justify-center items-center'>
    <SEO
      title='COVID-19 MX | Nacional'
      description='29 de marzo, 2020: 993 casos confirmados (+145). 20 defunciones (+4). 2,564 casos sospechos (-59). 4,955 casos negativos (+614).'
    />
    <div className='h-9/10 w-11/12'>
      <h2 className='text-4xl text-center leading-10 font-extrabold text-blue-600 sm:text-5xl sm:leading-none md:text-6xl mb-4'>
        COVID-19
        <br className='xl:hidden' />
        <span className='text-gray-900'> en México</span>
      </h2>
      <p className='text-center text-gray-600 mb-8 text-lg sm:text-3xl'>
        Estadísticas al día 29 de marzo, 2020
      </p>
      <div className='container h-7/10'>
        <div className='bg-white h-1/4 flex flex-col justify-center items-center border-b-2 rounded-t-lg'>
          <p className='text-3xl font-extrabold'>
            993 <span className='text-base font-light text-gray-600'>+145</span>
          </p>
          <p className='uppercase tracking-wide text-sm text-gray-600'>Casos confirmados</p>
        </div>
        <div className='bg-white h-1/4 flex flex-col justify-center items-center border-b-2'>
          <p className='text-3xl font-extrabold'>
            20 <span className='text-base font-light text-gray-600'>+4</span>
          </p>
          <p className='uppercase tracking-wide text-sm text-gray-600'>Defunciones</p>
        </div>
        <div className='bg-white h-1/4 flex flex-col justify-center items-center border-b-2'>
          <p className='text-3xl font-extrabold'>
            2,564 <span className='text-base font-light text-gray-600'>-59</span>
          </p>
          <p className='uppercase tracking-wide text-sm text-gray-600'>Casos sospechosos</p>
        </div>
        <div className='bg-white h-1/4 flex flex-col justify-center items-center rounded-b-lg'>
          <p className='text-3xl font-extrabold'>
            4,955 <span className='text-base font-light text-gray-600'>+614</span>
          </p>
          <p className='uppercase tracking-wide text-sm text-gray-600'>Casos negativos</p>
        </div>
      </div>
    </div>
  </div>
);

export default IndexPage;
