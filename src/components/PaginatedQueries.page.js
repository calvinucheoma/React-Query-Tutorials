import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

const fetchColors = (pageNumber) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`);
};

const PaginatedQueriesPage = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const { isLoading, data, isError, error, isFetching } = useQuery(
    ['colors', pageNumber],
    () => fetchColors(pageNumber),
    {
      keepPreviousData: true, //react-query maintains the data from the last successful request while the new data is being fetched. This prevents the page from loading every time we navigate between page. So when the new data arrives, the previous data is seamlessly swapped to show the new data
      //So when we click on the next or previous page, we can see the previous data is still present while the new data is being fetched in the background.
      //Once the data is fetched, old data is swapped out and new data is swapped in. We can test this by including Loading message while isFetching and we only see the loading message while isFetching and not isLoading
    }
  );

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <div>
        {data?.data.map((color) => {
          return (
            <div key={color.id}>
              <h2>
                {color.id} . {color.label}
              </h2>
            </div>
          );
        })}
      </div>

      <div>
        <button
          onClick={() => setPageNumber((page) => page - 1)}
          disabled={pageNumber === 1}
        >
          Prev page
        </button>
        <button
          onClick={() => setPageNumber((page) => page + 1)}
          disabled={pageNumber === 4}
        >
          Next page
        </button>
      </div>
      {isFetching && 'Loading'}
    </>
  );
};

export default PaginatedQueriesPage;
