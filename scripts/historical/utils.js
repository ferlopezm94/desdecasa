const dailyDates = [
  '2020-03-30',
  '2020-03-31',
  '2020-04-01',
  '2020-04-02',
  '2020-04-03',
  '2020-04-04',
  '2020-04-05',
  '2020-04-06',
  '2020-04-07',
  '2020-04-08',
  '2020-04-09',
  '2020-04-10',
  '2020-04-11',
  '2020-04-12',
  '2020-04-13',
  '2020-04-14',
  '2020-04-15',
  '2020-04-16',
  '2020-04-17',
  '2020-04-18',
  '2020-04-19',
  '2020-04-20',
  '2020-04-21',
  '2020-04-22',
  '2020-04-23',
  '2020-04-24',
  '2020-04-25',
  '2020-04-26',
  '2020-04-27',
  '2020-04-28',
  '2020-04-29',
  '2020-04-30',
  '2020-05-01',
  '2020-05-02',
  '2020-05-03',
  '2020-05-04',
  '2020-05-05',
  '2020-05-06',
  '2020-05-07',
  '2020-05-08',
  '2020-05-09',
  '2020-05-10',
  '2020-05-11',
  '2020-05-12',
  '2020-05-13',
  '2020-05-14',
  '2020-05-15',
  '2020-05-16',
  '2020-05-17',
  '2020-05-18',
  '2020-05-19',
  '2020-05-20',
  '2020-05-21',
  '2020-05-22',
  '2020-05-23',
  '2020-05-24',
  '2020-05-25',
  '2020-05-26',
  '2020-05-27',
  '2020-05-28',
  '2020-05-29',
  '2020-05-30',
  '2020-05-31',
  '2020-06-01',
  '2020-06-02',
  '2020-06-03',
  '2020-06-04',
  '2020-06-05',
  '2020-06-06',
  '2020-06-07',
  '2020-06-08',
];

const informationTotal = {
  Aguascalientes: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  'Baja California': {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  'Baja California Sur': {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Campeche: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Coahuila: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Colima: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Chiapas: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Chihuahua: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  'Ciudad de México': {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Durango: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Guanajuato: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Guerrero: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Hidalgo: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Jalisco: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  México: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Michoacán: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Morelos: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Nayarit: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  'Nuevo León': {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Oaxaca: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Puebla: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Querétaro: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  'Quintana Roo': {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  'San Luis Potosí': {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Sinaloa: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Sonora: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Tabasco: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Tamaulipas: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Tlaxcala: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Veracruz: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Yucatán: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Zacatecas: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Total: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
    tests: [],
  },
  Dates: {
    dates: [],
  },
};

const informationNewDaily = {
  Aguascalientes: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  'Baja California': {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  'Baja California Sur': {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Campeche: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Coahuila: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Colima: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Chiapas: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Chihuahua: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  'Ciudad de México': {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Durango: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Guanajuato: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Guerrero: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Hidalgo: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Jalisco: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  México: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Michoacán: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Morelos: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Nayarit: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  'Nuevo León': {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Oaxaca: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Puebla: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Querétaro: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  'Quintana Roo': {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  'San Luis Potosí': {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Sinaloa: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Sonora: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Tabasco: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Tamaulipas: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Tlaxcala: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Veracruz: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Yucatán: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Zacatecas: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
  },
  Total: {
    confirmed: [],
    negatives: [],
    suspects: [],
    deaths: [],
    tests: [],
  },
  Dates: {
    dates: [],
  },
};

module.exports = {
  informationTotal,
  informationNewDaily,
  dailyDates,
};
