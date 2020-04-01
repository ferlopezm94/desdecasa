interface Daily {
  date: string;
  confirmed: number;
  deaths: number;
  suspects: number;
  negatives: number;
  tests?: number;
}

export const daily: Daily[] = [
  {
    date: '2020-03-31',
    confirmed: 1215,
    deaths: 29,
    suspects: 3511,
    negatives: 6282,
    tests: 11008,
  },
  {
    date: '2020-03-30',
    confirmed: 1094,
    deaths: 28,
    suspects: 2752,
    negatives: 5635,
    tests: 9481,
  },
  {
    date: '2020-03-29',
    confirmed: 993,
    deaths: 20,
    suspects: 2564,
    negatives: 4955,
  },
];
