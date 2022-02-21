export const addRate = (currentRating, rate) => {
  const newRatings = currentRating
    .filter((rating) => rating.rate <= rate)
    .map(({ rate }) => {
      return { rate, rated: true };
    });
  const left = currentRating.filter((rating) => rating.rate > rate);

  return [...newRatings, ...left];
};

export const removeRate = (currentRating, rate) => {
  const newRatings = currentRating
    .filter((rating) => rating.rate > rate)
    .map(({ rate }) => {
      return { rate, rated: false };
    });
  const left = currentRating.filter((rating) => rating.rate <= rate);

  return [...left, ...newRatings];
};
