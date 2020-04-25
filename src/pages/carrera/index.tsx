import React from 'react';
import styled, { keyframes } from 'styled-components';

const Race = () => {
  return (
    <div className='w-screen h-screen overflow-hidden'>
      <div className='h-full sliding-background'></div>
      <Player
        score={90}
        bottom={30}
        src='https://mobilegamegraphics.com/pvpaterno/GIF/wolf_run.gif'
      />
      <Player
        score={70}
        bottom={25}
        src='https://mobilegamegraphics.com/pvpaterno/GIF/wolf_run.gif'
      />
      <Player
        score={50}
        bottom={20}
        src='https://mobilegamegraphics.com/pvpaterno/GIF/wolf_run.gif'
      />
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
