import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import styled from "styled-components";

function App() {
  const [ratings, setRatings] = useState([
    { rate: 1, rated: false },
    { rate: 2, rated: false },
    { rate: 3, rated: false },
    { rate: 4, rated: false },
    { rate: 5, rated: false },
  ]);

  const [stars, setStars] = useState(0);

  const addRating = (rate) => {
    const myRating = ratings;
    const newRatings = myRating
      .filter((rating) => rating.rate <= rate)
      .map(({ rate }) => {
        return { rate, rated: true };
      });
    const left = myRating.filter((rating) => rating.rate > rate);

    setRatings([...newRatings, ...left]);
    setStars(rate);
  };

  const removeRating = (rate) => {
    const myRating = ratings;
    const newRatings = myRating
      .filter((rating) => rating.rate > rate)
      .map(({ rate }) => {
        return { rate, rated: false };
      });
    const left = myRating.filter((rating) => rating.rate <= rate);

    setRatings([...left, ...newRatings]);
    setStars(rate);
  };

  const starStyle = { fontSize: "4rem", cursor: "pointer" };

  return (
    <Wrapper>
      {ratings.map(({ rate, rated }) =>
        rated ? (
          <AiFillStar onClick={() => removeRating(rate)} style={starStyle} />
        ) : (
          <AiOutlineStar onClick={() => addRating(rate)} style={starStyle} />
        )
      )}
      <h1>
        {stars}
        {stars <= 1 ? ` star` : ` stars`}
      </h1>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: red;
`;

export default App;
