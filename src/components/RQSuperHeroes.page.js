// import axios from 'axios';
// import { useQuery } from 'react-query';

import { Link } from 'react-router-dom';
import {
  useAddSuperHeroData,
  useSuperHeroesData,
} from '../hooks/useSuperHeroesData';
import { useState } from 'react';

// const fetchSuperHeroes = () => {
//   return axios.get('http://localhost:4000/superheroes');
// };

// const RQSuperHeroesPage = () => {
//   const { isLoading, data } = useQuery('super-heroes', () => {
//     return axios.get('http://localhost:4000/superheroes');
//   });

const RQSuperHeroesPage = () => {
  const [name, setName] = useState('');
  const [alterEgo, setAlterEgo] = useState('');

  const onSuccess = (data) => {
    console.log('Perform side effectafter data fetching', data);
  };

  const onError = (error) => {
    console.log('Perform side effect after encountering error', error);
  };

  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData({
      onSuccess,
      onError,
    });

  const { mutate: addHero } = useAddSuperHeroData();

  const handleAddHeroClick = () => {
    const hero = { name, alterEgo };
    addHero(hero);
  };

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>RQ SuperHeroes Page</h2>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>
      <br />
      <button onClick={refetch}>Fetch Heroes</button>
      <br />
      <br />
      {data?.data.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}
      {/* {data.map((heroName) => {
        return <div key={heroName}>{heroName}</div>;
      })} */}
    </>
  );
};

export default RQSuperHeroesPage;

// const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
//   'super-heroes',
//   fetchSuperHeroes,
//   {
//     // cacheTime: 5000,
//     // staleTime: 30000,
//     // refetchOnMount: false,
//     // refetchOnMount: 'always',
//     // refetchOnWindowFocus: true,
//     // refetchInterval: 2000,
//     // refetchIntervalInBackground: true,
//     // enabled: false,
//     onSuccess: onSuccess,
//     onError: onError,
//     select: (data) => {
//       const superHeroNmaes = data.data.map((hero) => hero.name);
//       return superHeroNmaes;
//     },
//   }
// );

// console.log(isLoading, isFetching);

// if (isLoading) {
//   return <h2>Loading...</h2>;
// }
