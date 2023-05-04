import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';

const ParralelQueriesPage = () => {
  const fetchSuperHeroes = () => {
    return axios.get('http://localhost:4000/superheroes');
  };

  const fetchFriends = () => {
    return axios.get('http://localhost:4000/friends');
  };

  const {
    isLoading: superHeroesLoading,
    data: superHeroesData,
    isError: superHeroesIsError,
    error: superHeroesError,
  } = useQuery('super=heroes', fetchSuperHeroes);

  const {
    isLoading: friendsLoading,
    data: friendsData,
    isError: friendsIsError,
    error: friendsError,
  } = useQuery('friends', fetchFriends);

  if (friendsLoading || superHeroesLoading) {
    return <h2>Loading...</h2>;
  }

  if (friendsIsError) {
    return <h2>{friendsError.message}</h2>;
  }

  if (superHeroesIsError) {
    return <h2>{superHeroesError.message}</h2>;
  }

  return (
    <>
      <div>
        {superHeroesData?.data.map((hero) => {
          return (
            <>
              <div key={hero.id}>{hero.name} </div>
            </>
          );
        })}
      </div>
      <br />
      <br />
      <hr />
      <br />
      <br />
      <div>
        {friendsData?.data.map((friend) => {
          return (
            <>
              <div key={friend.id}>{friend.name} </div>
            </>
          );
        })}
      </div>
      ;
    </>
  );
};

export default ParralelQueriesPage;
