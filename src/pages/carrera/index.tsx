import React from 'react';
import styled, { keyframes } from 'styled-components';

import historicalTotal from './../../data/historicalTotal.json';

interface StateData {
  stateName: string;
  confirmed: number;
}

const getTop = (items: number) => {
  console.log('get-top-ten');
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
  console.log('top-ten sort', JSON.stringify(topTen.slice(0, items)));
  return topTen.slice(0, items);
};

const topPlayers = getTop(8);

const Race = () => {
  return (
    <div className='w-screen h-screen overflow-hidden'>
      <div className='h-full sliding-background' />

      <Dashboard className='bg-gray-200 border-8 w-3/4 sm:w-2/4 lg:w-2/5 h-1/2 wood pt-4 text-black'>
        <p className='text-base sm:text-lg font-mono text-center font-bold uppercase px-4'>
          Carrera COVID-19
        </p>
        <p className='text-xs sm:text-sm text-center font-mono mb-4 px-4'>
          Otra forma de visualizar los datos (con respeto)
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
          <div className='w-full font-mono mb-1 flex justify-center' key={index}>
            <span className='text-xs sm:text-sm text-center'>
              {index + 1 >= 10 ? '10' : `0${index + 1}`}
            </span>
            <span className='text-xs sm:text-sm text-center uppercase w-2/4'>
              {state.stateName}
            </span>
            <span className='text-xs sm:text-sm text-center uppercase w-3/12'>
              {state.confirmed}
            </span>
          </div>
        ))}
      </Dashboard>

      {topPlayers.map((state, index) => (
        <div key={index * 10}>
          <PlayerName
            className='text-xs sm:text-sm text-white font-mono mb-2'
            bottom={30 - 3 * index}
            key={state.stateName}
          >
            {state.stateName}
          </PlayerName>
          <Player
            score={85 * (state.confirmed / topPlayers[0].confirmed)}
            bottom={30 - 3 * index}
            src='https://mobilegamegraphics.com/pvpaterno/GIF/wolf_run.gif'
            key={index}
          />
        </div>
      ))}
    </div>
  );
};

export default Race;

const run = (score: number) => keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(${score}vw);
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
