export const numberWithCommas = (a: number) => {
  return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
