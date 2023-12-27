import "./app.scss";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./authContext/AuthContext";
import MovieDetail from "./pages/movieDetail/MovieDetail";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import ResetPassword from "./pages/forgotPassword/ResetPassword";
import PaypalCheckout from "./components/paypalCheckout/PaypalCheckout";
import FavoriteMovies from "./pages/favoriteMovies/FavoriteMovies";
import Personal from "./pages/personal/Personal";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={user ? <Home /> : <Navigate to="/register" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        {user && (
          <>
            <Route path="/movies" element={<Home type="movies" />} />
            <Route path="/series" element={<Home type="series" />} />
            <Route path="/movieDetail" element={<MovieDetail />} />
            <Route path="/personal" element={<Personal />} />
            <Route path="/favorite/:userId" element={<FavoriteMovies />} />
            <Route path="/watch/:movieId" element={<Watch />} />
            <Route path="/paypalCheckout" element={<PaypalCheckout />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
