import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Footer from "../components/comman/Footer";
import NavBar from "../components/comman/NavBar";

const Home = React.lazy(() => import("../views/home/Home"));
const ExplorePage = React.lazy(() =>
  import("../views/explorePage/ExplorePage")
);
const SearchResult = React.lazy(() =>
  import("../views/searchResult/SearchResult")
);
const TvShows = React.lazy(() => import("../views/tvShows/TvShows"));
const MoviesPage = React.lazy(() => import("../views/moviesPage/MoviesPage"));
const CollectionShowDetail = React.lazy(() =>
  import("../views/collectionShowDetail/CollectionShowDetail")
);
const PersonDetail = React.lazy(() =>
  import("../views/personDetail/PersonDetail")
);
function Router() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Suspense fallback={<div> Please Wait... </div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore/:type/:id" element={<ExplorePage />} />
            <Route
              path="/collectionshow/:type/:id"
              element={<CollectionShowDetail />}
            />
            <Route path="/search/:movie" element={<SearchResult />} />
            <Route path="/person/:id" element={<PersonDetail />} />
            <Route path="/tv" element={<TvShows />} />
            <Route path="/movie" element={<MoviesPage />} />
            {/* <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogInPage />} /> */}
          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default Router;
