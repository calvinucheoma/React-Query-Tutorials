import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import HomePage from './components/Home.page';
import RQSuperHeroesPage from './components/RQSuperHeroes.page';
import SuperHeroesPage from './components/SuperHeroes.page';
import RQSuperHeroPage from './components/RQSuperHero.page';
import ParralelQueriesPage from './components/ParralelQueries.page';
import DynamicParallelPage from './components/DynamicParallel.page';
import DependentQueriesPage from './components/DependentQueries.page';
import PaginatedQueriesPage from './components/PaginatedQueries.page';
import InfiniteQueriesPage from './components/InfiniteQueries.page';
// import OnClickSuperHeroesPage from './components/OnClickSuperHeroes.page';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
              {/* <li>
                <Link to="/on-click-super-heroes">OnClick Super Heroes</Link>
              </li> */}
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/super-heroes" element={<SuperHeroesPage />} />

            <Route path="/rq-parallel" element={<ParralelQueriesPage />} />

            <Route
              path="/rq-dynamic-parallel"
              element={<DynamicParallelPage heroIds={[1, 3]} />}
            />

            <Route
              path="/rq-dependent"
              element={<DependentQueriesPage email="chuks@gmail.com" />}
            />

            <Route path="/rq-paginated" element={<PaginatedQueriesPage />} />

            <Route path="/rq-infinite" element={<InfiniteQueriesPage />} />

            <Route path="/rq-super-heroes" element={<RQSuperHeroesPage />} />

            <Route
              path="/rq-super-heroes/:heroId"
              element={<RQSuperHeroPage />}
            />

            {/* <Route
              path="/on-click-super-heroes"
              element={<OnClickSuperHeroesPage />}
            /> */}
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
