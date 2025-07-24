import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import CreatePlayer from './pages/createplayer';
import PrivateRoute from './components/privateRoute';
import Footer from "./components/footer";
import PlayersList from './components/playerslist';
import './library.css'



function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/region/:region" element={<PlayersList />} />
        <Route path="/create" element={<PrivateRoute> <CreatePlayer /> </PrivateRoute>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;