import ReactGA from 'react-ga';

export const initGA = () => {
  console.log('init-ga start');
  ReactGA.initialize('UA-162265508-1');
};
