import React from 'react';
// @ts-ignore
import SEO from '../components/seo';

const IndexPage = () => (
  <div className='w-screen h-screen bg-gray-200 flex flex-col justify-center items-center'>
    <SEO
      title='29 de marzo, 2020'
      description='Nacional: 993 casos confirmados (145 más que ayer). 20 defunciones (4 más que ayer).'
    />
    <div className='h-9/10 w-4/5 sm:w-3/5 lg:w-2/5'>
      <h1 className='text-2xl sm:text-4xl md:text-5xl text-center leading-6 sm:leading-none font-extrabold text-blue-600 mb-4'>
        COVID-19
        <br className='xl:hidden' />
        <span className='text-gray-900'> en México</span>
      </h1>
      <p className='text-center text-gray-600 mb-8 text-base sm:text-2xl'>
        Estadísticas al día 29 de marzo, 2020
      </p>
      <div className='h-7/10'>
        <div className='bg-white h-1/4 flex flex-col justify-center items-center border-b-2 rounded-t-lg'>
          <p className='text-xl sm:text-3xl font-extrabold'>993</p>
          <p className='uppercase tracking-wide text-xs sm:text-sm text-gray-600 font-bold'>
            Casos confirmados
          </p>
          <span className='text-xs sm:text-sm font-light text-gray-600 italic'>
            145 más que ayer
          </span>
        </div>
        <div className='bg-white h-1/4 flex flex-col justify-center items-center border-b-2'>
          <p className='text-xl sm:text-3xl font-extrabold'>20</p>
          <p className='uppercase tracking-wide text-xs sm:text-sm text-gray-600 font-bold'>
            Defunciones
          </p>
          <span className='text-xs sm:text-sm font-light text-gray-600 italic'>4 más que ayer</span>
        </div>
        <div className='bg-white h-1/4 flex flex-col justify-center items-center border-b-2'>
          <p className='text-xl sm:text-3xl font-extrabold'>2,564</p>
          <p className='uppercase tracking-wide text-xs sm:text-sm text-gray-600 font-bold'>
            Casos sospechosos
          </p>
          <span className='text-xs sm:text-sm font-light text-gray-600 italic'>
            59 menos que ayer
          </span>
        </div>
        <div className='bg-white h-1/4 flex flex-col justify-center items-center rounded-b-lg'>
          <p className='text-xl sm:text-3xl font-extrabold'>4,955</p>
          <p className='uppercase tracking-wide text-xs sm:text-sm text-gray-600 font-bold'>
            Casos negativos
          </p>
          <span className='text-xs sm:text-sm font-light text-gray-600 italic'>
            614 más que ayer
          </span>
        </div>
      </div>
    </div>
    <span className='text-xs sm:text-sm font-light text-gray-600'>
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
