import React from 'react';
// @ts-ignore
import SEO from '../components/seo';

const IndexPage = () => (
  <div className='w-screen h-screen bg-gray-200'>
    <SEO title='COVID-19 MX | Nacional' />
    <div className='container h-9/10 w-11/12 bg-gray-100'>
      <h2 className='text-4xl tracking-tight leading-10 font-extrabold text-indigo-600 sm:text-5xl sm:leading-none md:text-6xl'>
        COVID-19
        <br className='xl:hidden' />
        <span className='text-gray-900'>en México</span>
      </h2>
      <div className='container h-56 w-11/12 bg-white'>
        <h1 className='text-xl text-gray-900 leading-tight'>Total hasta hoy</h1>
        <p>Casos confirmados</p>
        <p>Defunciones</p>
        <p>Casos sospechosos</p>
        <p>Casos negativos</p>
      </div>
    </div>
  </div>
);

export default IndexPage;
