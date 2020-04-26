import React from 'react';
import styled, { keyframes } from 'styled-components';

import historicalTotal from './../../data/historicalTotal.json';

interface StateData {
  stateName: string;
  confirmed: number;
}

const getTopTen = () => {
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
  console.log('top-ten sort', JSON.stringify(topTen.slice(0, 10)));
  return topTen.slice(0, 10);
};

const topTen = getTopTen();

const Race = () => {
  return (
    <div className='w-screen h-screen overflow-hidden'>
      <div className='h-full sliding-background'></div>
      {topTen.map((state, index) => (
        <Player
          score={90 * (state.confirmed / topTen[0].confirmed)}
          bottom={30 - 3 * index}
          src='https://mobilegamegraphics.com/pvpaterno/GIF/wolf_run.gif'
          key={index}
        />
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
