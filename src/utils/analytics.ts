import amplitude from 'amplitude-js';
import moment from 'moment-timezone';
import ReactGA from 'react-ga';

import { Event } from './analyticsEvents';

const year = moment()
  .locale('en')
  .format('YYYY');
const month = moment()
  .locale('en')
  .format('MMMM')
  .toUpperCase();
const day = moment()
  .locale('en')
  .format('dddd')
  .toUpperCase();
const hour = moment().format('HH');
const minute = moment().format('mm');

export const initGA = () => {
  console.log('init-ga start');
  ReactGA.initialize('UA-162265508-1');
};

export const initAmplitude = () => {
  try {
    if (amplitude.getInstance) {
      console.log('init-amplitude start');
      amplitude.getInstance().init('c886889426a03f94edcbb3980845d7bf', undefined, {
        sessionTimeout: 5 * 60 * 1000,
      });
    }
  } catch (error) {
    console.error('init-amplitude error', error);
  }
};

export const sendAmplitudeEvent = (eventName: Event) => {
  try {
    if (amplitude.getInstance) {
      const defaultProperties = { year, month, day, hour, minute };
      console.log(eventName, defaultProperties);
      amplitude.getInstance().logEvent(eventName, defaultProperties);
    }
  } catch (error) {
    console.error('send-amplitude-event error', error);
  }
};
