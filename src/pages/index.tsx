// @ts-ignore
import Mexico from '@svg-maps/mexico';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import moment from 'moment-timezone';
import React, { useState } from 'react';
// @ts-ignore
import { RadioSVGMap } from 'react-svg-map';
import 'react-svg-map/lib/index.css';
import 'moment/locale/es';

// @ts-ignore
import SEO from '../components/seo';
import { Stat } from './../components/Stat';
import { initGA, initAmplitude, sendAmplitudeEvent } from './../utils/analytics';

import todayData from './../data/2020-04-01.json';
import yesterdayData from './../data/2020-03-31.json';

console.log('today', todayData);
console.log('yesterday', yesterdayData);

moment.locale('es');
initGA();
initAmplitude();
sendAmplitudeEvent('INIT');

const IndexPage = () => {
  const slug = '/';
  const stateName = 'México';
  const date = '2020-04-01';
  const today = todayData['Total'];
  const yesterday = yesterdayData['Total'];
  console.log('start', slug, stateName, today, yesterday);

  const todayDate = moment(date).format('DD [de] MMMM[,] YYYY');
  const differenceConfirmed = today.confirmed - yesterday.confirmed;
  const differenceDeaths = today.deaths - yesterday.deaths;
  const differenceSuspects = today.suspects - yesterday.suspects;
  const differenceNegatives = today.negatives - yesterday.negatives;
  const differenceTests = today.tests && yesterday.tests ? today.tests - yesterday.tests : 0;

  const differenceConfirmedText = `${Math.abs(differenceConfirmed)} ${
    differenceConfirmed >= 0 ? 'más' : 'menos'
  } que ayer`;
  const differenceDeathsText = `${Math.abs(differenceDeaths)} ${
    differenceDeaths >= 0 ? 'más' : 'menos'
  } que ayer`;
  const differenceSuspectsText = `${Math.abs(differenceSuspects)} ${
    differenceSuspects >= 0 ? 'más' : 'menos'
  } que ayer`;
  const differenceNegativesText = `${Math.abs(differenceNegatives)} ${
    differenceNegatives >= 0 ? 'más' : 'menos'
  } que ayer`;
  const differenceTestsText =
    today.tests && yesterday.tests
      ? `${Math.abs(differenceTests)} ${differenceTests >= 0 ? 'más' : 'menos'} que ayer`
      : '';

  const differenceConfirmedPercentage =
    Math.round(100 * 100 * (differenceConfirmed / yesterday.confirmed)) / 100;
  const differenceDeathsPercentage =
    Math.round(100 * 100 * (differenceDeaths / yesterday.deaths)) / 100;
  const differenceSuspectsPercentage =
    Math.round(100 * 100 * (differenceSuspects / yesterday.suspects)) / 100;
  const differenceNegativessPercentage =
    Math.round(100 * 100 * (differenceNegatives / yesterday.negatives)) / 100;

  const sharingUrl = `https://desdecasa.today/${slug === '/' ? '' : slug}`;
  const sharingMessage = `*${todayDate} | ${stateName}:*%0A
- ${today.confirmed} casos confirmados (${differenceConfirmedText})%0A
- ${today.deaths} defunciones (${differenceDeathsText})%0A
- ${today.suspects} casos sospechosos (${differenceSuspectsText})%0A
- ${today.negatives} casos negativos (${differenceNegativesText})%0A
${today.tests ? `- ${today.tests} personas estudiadas (${differenceTestsText})%0A` : ''}

%0A%23QuedateEnCasa 🏠
%0AInformación diaria y detallada en ${sharingUrl}`;

  const [stateSelected, setStateSelected] = useState('Selecciona un estado');

  const handleOnChangeState = (event: object) => {
    // @ts-ignore
    setStateSelected(event.attributes.name.value);
  };

  return (
    <div className='bg-gray-200'>
      <div className='w-screen h-screen flex flex-col justify-center items-center'>
        <SEO
          title={todayDate}
          description={`${stateName}: ${today.confirmed} casos confirmados (${differenceConfirmedText}). ${today.deaths} defunciones (${differenceDeathsText}).`}
        />
        <div className='h-9/10 w-10/12 sm:w-3/5 lg:w-2/5'>
          <h1 className='text-2xl sm:text-4xl md:text-5xl text-center leading-6 sm:leading-none font-extrabold text-blue-600 mb-3'>
            COVID-19 <span className='text-gray-900'>en {stateName}</span>
          </h1>
          <p className='text-center text-gray-600 mb-4 text-base sm:text-2xl'>
            Estadísticas al día {todayDate}
          </p>
          <div className='h-2/3 mb-4'>
            <Stat
              title='Casos confirmados'
              stat={today.confirmed}
              statText={differenceConfirmedText}
              differenceStatPercentage={differenceConfirmedPercentage}
              rounded='t'
            />
            <Stat
              title='Defunciones'
              stat={today.deaths}
              statText={differenceDeathsText}
              differenceStatPercentage={differenceDeathsPercentage}
            />
            <Stat
              title='Casos sospechosos'
              stat={today.suspects}
              statText={differenceSuspectsText}
              differenceStatPercentage={differenceSuspectsPercentage}
            />
            <Stat
              title='Casos negativos'
              stat={today.negatives}
              statText={differenceNegativesText}
              differenceStatPercentage={differenceNegativessPercentage}
              rounded='b'
            />
          </div>

          <div className='flex flex-col mb-4'>
            <p className='text-sm text-center sm:text-sm font-light text-gray-600'>
              Comparte esta información
            </p>
            <div className='flex w-20 mx-auto justify-around'>
              <a
                href={`https://wa.me/?text=${sharingMessage}`}
                target='_blank'
                rel='noopener noreferrer'
                className='underline'
                onClick={() => sendAmplitudeEvent('SHARE_VIA_WHATSAPP')}
              >
                <FontAwesomeIcon icon={faWhatsapp} size='lg' className='text-blue-600' />
              </a>
              <a
                href={'http://www.facebook.com/sharer/sharer.php?u=https://desdecasa.today'}
                target='_blank'
                rel='noopener noreferrer'
                className='underline'
                onClick={() => sendAmplitudeEvent('SHARE_VIA_FACEBOOK')}
              >
                <FontAwesomeIcon icon={faFacebookF} size='lg' className='text-blue-600' />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className='h-3/5 flex flex-col justify-center items-center pb-12'>
        <p className='text-2xl sm:text-4xl md:text-5xl text-center leading-6 sm:leading-none font-extrabold text-gray-900 mb-4'>
          Información estatal
        </p>
        <p className='text-center text-gray-600 mb-4 text-base sm:text-2xl'>{stateSelected}</p>
        <div className='w-4/5 sm:w-3/5 lg:w-2/5'>
          <RadioSVGMap map={Mexico} onChange={handleOnChangeState} />
        </div>
      </div>

      <p className='text-sm text-center sm:text-sm font-light text-gray-600 pb-6'>
        Fuente:{' '}
        <a
          href='https://www.gob.mx/salud/documentos/coronavirus-covid-19-comunicado-tecnico-diario-238449'
          target='_blank'
          rel='noopener noreferrer'
          className='underline'
          onClick={() => sendAmplitudeEvent('OPEN_SOURCE')}
        >
          Gobierno de México
        </a>
      </p>
    </div>
  );
};

export default IndexPage;
