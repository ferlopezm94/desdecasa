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

import todayData from './../data/2020-04-03.json';
import yesterdayData from './../data/2020-04-02.json';

console.log('today', todayData);
console.log('yesterday', yesterdayData);

moment.locale('es');
initGA();
initAmplitude();
sendAmplitudeEvent('INIT');

interface DailyData {
  confirmed: number;
  deaths: number;
  suspects: number;
  negatives: number;
}

const IndexPage = () => {
  const date = '2020-04-03';
  const today = todayData['Total'];
  const yesterday = yesterdayData['Total'];
  console.log('start', today, yesterday);

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

  const sharingUrl = 'https://desdecasa.today/';
  const sharingMessage = `*${todayDate} | México:*%0A
- ${today.confirmed} casos confirmados (${differenceConfirmedText})%0A
- ${today.deaths} defunciones (${differenceDeathsText})%0A
- ${today.suspects} casos sospechosos (${differenceSuspectsText})%0A
- ${today.negatives} casos negativos (${differenceNegativesText})%0A
${today.tests ? `- ${today.tests} personas estudiadas (${differenceTestsText})%0A` : ''}

%0A%23QuedateEnCasa 🏠
%0AInformación diaria y detallada en ${sharingUrl}`;

  const [stateSelected, setStateSelected] = useState('Selecciona un estado');
  const [stateTodayData, setStateTodayData] = useState<DailyData>();
  const [stateYesterdayData, setStateYesterdayData] = useState<DailyData>();

  const handleOnChangeState = (event: object) => {
    // @ts-ignore
    const stateName = event.attributes.name.value;
    console.log('state-selected', stateName);

    switch (stateName) {
      case 'Querétaro':
        if (todayData['Queretaro'] && yesterdayData['Queretaro']) {
          sendAmplitudeEvent('SELECT_STATE', { state: 'Querétaro' });
          setStateSelected('Querétaro');
          // @ts-ignore
          setStateTodayData(todayData['Queretaro'] as DailyData);
          // @ts-ignore
          setStateYesterdayData(yesterdayData['Queretaro'] as DailyData);
        } else {
          console.error('state-not-found');
        }
        break;
      case 'Mexico City':
        if (todayData['Ciudad de México'] && yesterdayData['Ciudad de México']) {
          sendAmplitudeEvent('SELECT_STATE', { state: 'Ciudad de México' });
          setStateSelected('Ciudad de México');
          // @ts-ignore
          setStateTodayData(todayData['Ciudad de México'] as DailyData);
          // @ts-ignore
          setStateYesterdayData(yesterdayData['Ciudad de México'] as DailyData);
        } else {
          console.error('state-not-found');
        }
        break;
      default:
        // @ts-ignore
        if (todayData[stateName] && yesterdayData[stateName]) {
          sendAmplitudeEvent('SELECT_STATE', { state: stateName });
          setStateSelected(stateName);
          // @ts-ignore
          setStateTodayData(todayData[stateName] as DailyData);
          // @ts-ignore
          setStateYesterdayData(yesterdayData[stateName] as DailyData);
        } else {
          console.error('state-not-found');
        }
    }
  };

  return (
    <div className='bg-gray-200'>
      <SEO
        title={todayDate}
        description={`México: ${today.confirmed} casos confirmados (${differenceConfirmedText}). ${today.deaths} defunciones (${differenceDeathsText}).`}
      />
      <div className='w-screen flex flex-col justify-center items-center'>
        <div className='h-9/10 w-10/12 sm:w-3/5 lg:w-2/5 mt-5 mb-5'>
          <h1 className='text-2xl sm:text-4xl md:text-5xl text-center leading-6 sm:leading-none font-extrabold text-blue-600 mb-3'>
            COVID-19 <span className='text-gray-900'>en México</span>
          </h1>
          <p className='text-center text-gray-600 mb-4 text-base sm:text-2xl'>
            Estadísticas al día {todayDate}
          </p>
          <div className='mb-4'>
            <Stat
              title='Casos confirmados'
              today={today.confirmed}
              yesterday={yesterday.confirmed}
              rounded='t'
            />
            <Stat title='Defunciones' today={today.deaths} yesterday={yesterday.deaths} />
            <Stat title='Casos sospechosos' today={today.suspects} yesterday={yesterday.suspects} />
            <Stat title='Casos negativos' today={today.negatives} yesterday={yesterday.negatives} />
            <Stat
              title='Personas estudiadas'
              today={today.tests}
              yesterday={yesterday.tests}
              rounded='b'
            />
          </div>

          <div className='flex flex-col mb-2'>
            <p className='text-sm text-center sm:text-sm font-light text-gray-600'>
              Comparte esta información
            </p>
            <div className='flex w-32 mx-auto justify-around'>
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

      <div className='h-9/10 w-10/12 mt-5 mb-5 mx-auto flex flex-col justify-center'>
        <p className='text-2xl sm:text-4xl md:text-5xl text-center leading-6 sm:leading-none font-extrabold text-gray-900 mb-3'>
          Información estatal
        </p>
        <p className='text-center text-gray-600 mb-4 text-base sm:text-2xl'>{stateSelected}</p>
        <div className='sm:w-3/5 lg:w-2/5 mb-4'>
          <RadioSVGMap map={Mexico} onChange={handleOnChangeState} />
        </div>
        {stateTodayData && stateYesterdayData && (
          <div className='h-2/3 mb-4'>
            <Stat
              title='Casos confirmados'
              today={stateTodayData.confirmed}
              yesterday={stateYesterdayData.confirmed}
              rounded='t'
            />
            <Stat
              title='Defunciones'
              today={stateTodayData.deaths}
              yesterday={stateYesterdayData.deaths}
            />
            <Stat
              title='Casos sospechosos'
              today={stateTodayData.suspects}
              yesterday={stateYesterdayData.suspects}
            />
            <Stat
              title='Casos negativos'
              today={stateTodayData.negatives}
              yesterday={stateYesterdayData.negatives}
              rounded='b'
            />
          </div>
        )}
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
