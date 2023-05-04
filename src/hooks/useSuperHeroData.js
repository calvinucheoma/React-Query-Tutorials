import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';

// const fetchSuperHero = (heroId) => {
//   return axios.get(`http://localhost:4000/superheroes/${heroId}`);
// };

// export const useSuperHeroData = (heroId) => {
//   return useQuery(['super-hero', heroId], () => fetchSuperHero(heroId));
// };

const fetchSuperHero = ({ queryKey }) => {
  const heroId = queryKey[1];
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const useSuperHeroData = (heroId) => {
  const queryClient = useQueryClient();
  return useQuery(['super-hero', heroId], fetchSuperHero, {
    initialData: () => {
      const hero = queryClient
        .getQueryData('super-heroes')
        ?.data?.find((hero) => hero.id === parseInt(heroId));

      if (hero) {
        return {
          data: hero,
        };
      } else {
        return undefined;
      }
    },
  });
};

//react-query automatically passes the unique ID into the fetcher function so we can replace the
//arrow function with just fetchSuperHero and then instead of heroId as a paramter, the function receives
//various values of which we destructure 'queryKey'. The query key is an array which mimics the array
//we have passed into useQuery. So heroId is at index position 1 and we can write: const heroId = queryKey[1]
