import React from "react";
import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { nanoid } from "nanoid";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

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
    1: "I hate it",
    2: "I don't like it",
    3: "It's ok",
    4: "I liked it",
    5: "I loved it",
  };

  const addRating = (rate) => {
    const newRatings = ratings
      .filter((rating) => rating.rate <= rate)
      .map(({ rate }) => {
        return { rate, rated: true };
      });
    const left = ratings.filter((rating) => rating.rate > rate);

    setRatings([...newRatings, ...left]);
    setStars(rate);
  };

  const removeRating = (rate) => {
    const newRatings = ratings
      .filter((rating) => rating.rate > rate)
      .map(({ rate }) => {
        return { rate, rated: false };
      });
    const left = ratings.filter((rating) => rating.rate <= rate);

    setRatings([...left, ...newRatings]);
    setStars(rate);
  };
  return (
    <Wrapper>
      <h1 className={!stars ? "shake-horizontal" : null}>
        {stars ? starMsg[stars] : "...waiting for your rating"}
      </h1>

      {ratings.map(({ rate, rated }) =>
        rated ? (
          <AiFillStar onClick={() => removeRating(rate)} key={nanoid()} />
        ) : (
          <AiOutlineStar onClick={() => addRating(rate)} key={nanoid()} />
        )
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* height: 150px; */
  max-width: 547px;
  margin: 4rem auto;
  padding: 2rem;
  background: #e5e5e5;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);

  h1 {
    font-size: 1em;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-style: italic;
    font-weight: 400;
  }

  svg {
    color: #323357;
    font-size: 3rem;
    padding: 5px;
  }

  /* animations from animista.net */
  .shake-horizontal {
    -webkit-animation: shake-horizontal 3s
      cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite both;
    animation: shake-horizontal 3s cubic-bezier(0.455, 0.03, 0.515, 0.955)
      infinite both;
  }

  @-webkit-keyframes shake-horizontal {
    0%,
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    10%,
    30%,
    50%,
    70% {
      -webkit-transform: translateX(-10px);
      transform: translateX(-10px);
    }
    20%,
    40%,
    60% {
      -webkit-transform: translateX(10px);
      transform: translateX(10px);
    }
    80% {
      -webkit-transform: translateX(8px);
      transform: translateX(8px);
    }
    90% {
      -webkit-transform: translateX(-8px);
      transform: translateX(-8px);
    }
  }
  @keyframes shake-horizontal {
    0%,
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    10%,
    30%,
    50%,
    70% {
      -webkit-transform: translateX(-10px);
      transform: translateX(-10px);
    }
    20%,
    40%,
    60% {
      -webkit-transform: translateX(10px);
      transform: translateX(10px);
    }
    80% {
      -webkit-transform: translateX(8px);
      transform: translateX(8px);
    }
    90% {
      -webkit-transform: translateX(-8px);
      transform: translateX(-8px);
    }
  }
`;

export default RatingApp;
