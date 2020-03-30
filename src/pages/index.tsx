import React from 'react';
// @ts-ignore
import SEO from '../components/seo';

const IndexPage = () => (
  <div className='w-screen h-screen bg-gray-200 flex flex-col justify-center items-center'>
    <SEO
      title='29 de marzo, 2020'
      description='Nacional: 993 casos confirmados (145 más que ayer). 20 defunciones (4 más que ayer).'
    />
    <div className='h-9/10 w-11/12'>
      <h2 className='text-4xl text-center leading-10 font-extrabold text-blue-600 sm:text-5xl sm:leading-none md:text-5xl mb-4'>
        COVID-19
        <br className='xl:hidden' />
        <span className='text-gray-900'> en México</span>
      </h2>
      <p className='text-center text-gray-600 mb-8 text-lg sm:text-2xl'>
        Estadísticas al día 29 de marzo, 2020
      </p>
      <div className='h-7/10'>
        <div className='bg-white h-1/4 flex flex-col justify-center items-center border-b-2 rounded-t-lg'>
          <p className='text-3xl font-extrabold'>993</p>
          <p className='uppercase tracking-wide text-sm text-gray-600 font-bold'>
            Casos confirmados
          </p>
          <span className='text-sm font-light text-gray-600 italic'>145 más que ayer</span>
        </div>
        <div className='bg-white h-1/4 flex flex-col justify-center items-center border-b-2'>
          <p className='text-3xl font-extrabold'>20</p>
          <p className='uppercase tracking-wide text-sm text-gray-600 font-bold'>Defunciones</p>
          <span className='text-sm font-light text-gray-600 italic'>4 más que ayer</span>
        </div>
        <div className='bg-white h-1/4 flex flex-col justify-center items-center border-b-2'>
          <p className='text-3xl font-extrabold'>2,564</p>
          <p className='uppercase tracking-wide text-sm text-gray-600 font-bold'>
            Casos sospechosos
          </p>
          <span className='text-sm font-light text-gray-600 italic'>59 menos que ayer</span>
        </div>
        <div className='bg-white h-1/4 flex flex-col justify-center items-center rounded-b-lg'>
          <p className='text-3xl font-extrabold'>4,955</p>
          <p className='uppercase tracking-wide text-sm text-gray-600 font-bold'>Casos negativos</p>
          <span className='text-sm font-light text-gray-600 italic'>614 más que ayer</span>
        </div>
      </div>
    </div>
    <span className='text-sm font-light text-gray-600'>
      Fuente:{' '}
      <a
        href='https://www.gob.mx/salud/documentos/coronavirus-covid-19-comunicado-tecnico-diario-238449'
        target='_blank'
        rel='noopener noreferrer'
        className='underline'
      >
        Gobierno de México
      </a>
    </span>
  </div>
);

export default IndexPage;
