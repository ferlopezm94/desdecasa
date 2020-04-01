import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import React from 'react';
import moment from 'moment-timezone';
import 'moment/locale/es';
moment.locale('es');

// @ts-ignore
import SEO from '../components/seo';
import { daily } from './../data';
import { initGA, initAmplitude, sendAmplitudeEvent } from './../utils/analytics';

initGA();
initAmplitude();
sendAmplitudeEvent('INIT');

const today = daily[0];
const yesterday = daily[1];
const todayDate = moment(today.date).format('DD [de] MMMM[,] YYYY');
const differenceConfirmed = today.confirmed - yesterday.confirmed;
const differenceDeaths = today.deaths - yesterday.deaths;
const differenceSuspects = today.suspects - yesterday.suspects;
const differenceNegatives = today.negatives - yesterday.negatives;

interface Props {
  path: string;
  pageContext: {
    stateName: string;
  };
}

const IndexPage = ({ path, pageContext }: Props) => {
  console.log('start', path, pageContext.stateName);

  const sharingMessage = `*${todayDate} | ${pageContext.stateName}:*%0A
- ${today.confirmed} casos confirmados (${Math.abs(differenceConfirmed)} ${
    differenceConfirmed > 0 ? 'más' : 'menos'
  } que ayer)%0A
- ${today.deaths} defunciones (${Math.abs(differenceDeaths)} ${
    differenceDeaths > 0 ? 'más' : 'menos'
  } que ayer)%0A
- ${today.suspects} casos sospechosos (${Math.abs(differenceSuspects)} ${
    differenceSuspects > 0 ? 'más' : 'menos'
  } que ayer)%0A
- ${today.negatives} casos negativos (${Math.abs(differenceNegatives)} ${
    differenceNegatives > 0 ? 'más' : 'menos'
  } que ayer)%0A
${today.tests && `- ${today.tests} personas estudiadas%0A`}

%0A%23QuedateEnCasa 🏠
%0AInformación diaria y detallada en https://desdecasa.today/`;

  return (
    <div className='w-screen h-screen bg-gray-200 flex flex-col justify-center items-center'>
      <SEO
        title={todayDate}
        description={`${pageContext.stateName}: ${today.confirmed} casos confirmados (${Math.abs(
          differenceConfirmed,
        )} ${differenceConfirmed > 0 ? 'más' : 'menos'} que ayer). ${
          today.deaths
        } defunciones (${Math.abs(differenceDeaths)} ${
          differenceDeaths > 0 ? 'más' : 'menos'
        } que ayer).`}
      />
      <div className='h-9/10 w-4/5 sm:w-3/5 lg:w-2/5'>
        <h1 className='text-2xl sm:text-4xl md:text-5xl text-center leading-6 sm:leading-none font-extrabold text-blue-600 mb-3'>
          COVID-19 <span className='text-gray-900'>en {pageContext.stateName}</span>
        </h1>
        <p className='text-center text-gray-600 mb-4 text-base sm:text-2xl'>
          Estadísticas al día {todayDate}
        </p>
        <div className='h-2/3 mb-4'>
          <div className='bg-white h-1/4 flex flex-col justify-center items-center border-b-2 rounded-t-lg'>
            <p className='text-xl sm:text-3xl font-extrabold'>{today.confirmed}</p>
            <p className='uppercase tracking-wide text-xs sm:text-sm text-gray-600 font-bold'>
              Casos confirmados
            </p>
            <span className='text-xs sm:text-sm font-light text-gray-600 italic'>
              {Math.abs(differenceConfirmed)} {differenceConfirmed > 0 ? 'más' : 'menos'} que ayer
            </span>
          </div>
          <div className='bg-white h-1/4 flex flex-col justify-center items-center border-b-2'>
            <p className='text-xl sm:text-3xl font-extrabold'>{today.deaths}</p>
            <p className='uppercase tracking-wide text-xs sm:text-sm text-gray-600 font-bold'>
              Defunciones
            </p>
            <span className='text-xs sm:text-sm font-light text-gray-600 italic'>
              {Math.abs(differenceDeaths)} {differenceDeaths > 0 ? 'más' : 'menos'} que ayer
            </span>
          </div>
          <div className='bg-white h-1/4 flex flex-col justify-center items-center border-b-2'>
            <p className='text-xl sm:text-3xl font-extrabold'>{today.suspects}</p>
            <p className='uppercase tracking-wide text-xs sm:text-sm text-gray-600 font-bold'>
              Casos sospechosos
            </p>
            <span className='text-xs sm:text-sm font-light text-gray-600 italic'>
              {Math.abs(differenceSuspects)} {differenceSuspects > 0 ? 'más' : 'menos'} que ayer
            </span>
          </div>
          <div className='bg-white h-1/4 flex flex-col justify-center items-center rounded-b-lg'>
            <p className='text-xl sm:text-3xl font-extrabold'>{today.negatives}</p>
            <p className='uppercase tracking-wide text-xs sm:text-sm text-gray-600 font-bold'>
              Casos negativos
            </p>
            <span className='text-xs sm:text-sm font-light text-gray-600 italic'>
              {Math.abs(differenceNegatives)} {differenceNegatives > 0 ? 'más' : 'menos'} que ayer
            </span>
          </div>
        </div>

        <div className='flex flex-col mb-4'>
          <p className='text-sm text-center sm:text-sm font-light text-gray-600'>Comparte</p>
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
        <p className='text-sm text-center sm:text-sm font-light text-gray-600'>
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
    </div>
  );
};

export default IndexPage;
