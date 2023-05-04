import React, { useState } from 'react';
import { useSuperHeroesData } from '../hooks/useSuperHeroesData';

const OnClickSuperHeroesPage = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const onSuccess = (data) => {
    console.log(
      'Perform side effect after data fetching on click of button',
      data
    );
  };

  const onError = (error) => {
    console.log(
      'Perform side effect after encountering error on click of button',
      error
    );
  };

  const { isLoading, isFetching, isError, error, data, refetch } =
    useSuperHeroesData({ onSuccess, onError, isEnabled });

  const handleClick = () => {
    setIsEnabled(true);
    refetch();
  };

  if (isLoading || isFetching) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      <h2>OnClick SuperHeroes Page</h2>
      <button onClick={handleClick}>Fetch Heroes</button>
      {isEnabled &&
        data.map((heroName) => {
          return <div key={heroName}>{heroName}</div>;
        })}
    </>
  );
};

export default OnClickSuperHeroesPage;
