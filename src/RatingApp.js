import React from "react";
import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { nanoid } from "nanoid";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { addRate, removeRate } from "./utils/ratingUtils";

const ratingState = atom({
  key: "ratingState",
  default: [
    { rate: 1, rated: false },
    { rate: 2, rated: false },
    { rate: 3, rated: false },
    { rate: 4, rated: false },
    { rate: 5, rated: false },
  ],
});

const RatingApp = () => {
  const ratings = useRecoilValue(ratingState);
  const setRatings = useSetRecoilState(ratingState);

  const [stars, setStars] = useState(0);
  const starMsg = {
    1: "It's not a good one 😒",
    2: "..arhm, it' just there 😖",
    3: "It's ok 🙁",
    4: "I liked it 🙂",
    5: "wow! I loved it 🤩",
  };

  const addRating = (rate) => {
    setRatings(addRate(ratings, rate));
    setStars(rate);
  };

  const removeRating = (rate) => {
    setRatings(removeRate(ratings, rate));
    setStars(rate);
  };
  return (
    <div className="container shadow-2xl max-w-md mx-auto mt-6 bg-rose-600 rounded-md text-zinc-100 font-mono antialiased">
      <h1
        className={`text-zinc-100/85 text-center text-xl tracking-wide p-6 ${
          !stars ? "animate-pulse " : null
        }`}
      >
        {stars ? starMsg[stars] : "...waiting for your rating"}
      </h1>

      <div className="ring-rose-300 ring-offset-2 ring-offset-rose-100 ring-2 rounded-lg flex gap-x-4 justify-center p-6">
        {ratings.map(({ rate, rated }) =>
          rated ? (
            <AiFillStar
              className="text-5xl"
              onClick={() => removeRating(rate)}
              key={nanoid()}
            />
          ) : (
            <AiOutlineStar
              className="text-5xl"
              onClick={() => addRating(rate)}
              key={nanoid()}
            />
          )
        )}
      </div>
    </div>
  );
};

export default RatingApp;
