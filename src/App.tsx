import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import { Suspense, lazy } from "react";
import Loader from "./component/Loader";

const Home = lazy(() => import("./component/Home"));
const Learning = lazy(() => import("./component/Learning"));
const Quiz = lazy(() => import("./component/Quiz"));
const Result = lazy(() => import("./component/Result"));
const App = () => {
  return (
    <Router>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learning />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
