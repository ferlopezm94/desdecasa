import React from 'react';
import styled, { keyframes } from 'styled-components';

// @ts-ignore
import SEO from './../../components/seo';
import historicalTotal from './../../data/historicalTotal.json';
// @ts-ignore
import virus from './../../images/virus.gif';
import { numberWithCommas } from './../../utils/utils';

interface StateData {
  stateName: string;
  confirmed: number;
}

const RACE_OFFSET_X = 20;

const getTop = (items: number) => {
  console.log('get-top');
  console.log(Object.entries(historicalTotal));
  const topTen: StateData[] = [];

  for (const [key, value] of Object.entries(historicalTotal)) {
    if (key !== 'Dates' && key !== 'Total') {
      topTen.push({
        stateName: key,
        // @ts-ignore
        confirmed: value.confirmed[value.confirmed.length - 1],
      });
    }
  }

  topTen.sort((state1, state2) => (state1.confirmed < state2.confirmed ? 1 : -1));
  console.log('get-top sort', JSON.stringify(topTen.slice(0, items)));
  return topTen.slice(0, items);
};

const topPlayers = getTop(8);

const Top = () => {
  return (
    <div className='w-screen h-screen overflow-hidden'>
      <SEO
        title='COVID-19 en México'
        description='Conoce cuáles son las 8 entidades con más casos confirmados'
      />
      <div className='h-full sliding-background' />

      <Dashboard className='bg-gray-200 border-8 w-3/4 sm:w-2/4 lg:w-2/5 h-1/2 wood pt-2 text-black'>
        <p className='text-base sm:text-lg font-mono text-center font-bold uppercase px-4'>
          COVID-19 Top 8
        </p>
        <p className='text-xs sm:text-sm text-center font-mono mb-4 px-4'>
          Las 8 entidades con más casos confirmados
        </p>
        <div className='w-full font-mono mb-1 flex justify-center'>
          <span className='text-xs sm:text-sm text-center font-semibold'>#</span>
          <span className='text-xs sm:text-sm text-center font-semibold uppercase w-2/4'>
            Estado
          </span>
          <span className='text-xs sm:text-sm text-center font-semibold uppercase w-3/12'>
            Confirmados
          </span>
        </div>
        {topPlayers.map((state, index) => (
          <div
            className='w-full text-xs sm:text-sm text-center font-mono uppercase mb-1 flex justify-center'
            key={index}
          >
            <span>{index + 1 >= 10 ? '10' : `0${index + 1}`}</span>
            <span className='w-2/4'>{state.stateName}</span>
            <span className='w-3/12'>{numberWithCommas(state.confirmed)}</span>
          </div>
        ))}
      </Dashboard>

      {topPlayers.map((state, index) => (
        <div key={index * 10}>
          <PlayerName
            className='text-xs sm:text-sm text-white font-mono mb-2'
            bottom={23 - 3 * index}
            key={state.stateName}
          >
            {state.stateName}
          </PlayerName>
          <Player
            score={(85 - RACE_OFFSET_X) * (state.confirmed / topPlayers[0].confirmed)}
            bottom={23 - 3 * index}
            src={virus}
            key={index}
          />
        </div>
      ))}
    </div>
  );
};

export default Top;

const run = (score: number) => keyframes`
  from {
    transform: translateX(${RACE_OFFSET_X}vw);
  }
  to {
    transform: translateX(${score + RACE_OFFSET_X}vw);
  }
`;

interface PlayerNameProps {
  bottom: number;
}

const PlayerName = styled.p<PlayerNameProps>`
  bottom: ${props => props.bottom}%;
  left: 2%;
  position: absolute;
`;

interface AnimationProps {
  score: number;
  bottom: number;
}

const Player = styled.img<AnimationProps>`
  position: absolute;
  height: 3rem;
  bottom: ${props => props.bottom}%;
  animation: ${props => run(props.score)} 10s forwards;
`;

const Dashboard = styled.div`
  position: absolute;
  left: 5%;
  right: 5%;
  top: 5%;
  margin: 0 auto;
`;
