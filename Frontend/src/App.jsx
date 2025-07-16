import {BrowserRouter, Routes, Route} from 'react-router-dom';
import registerPage from './components/register';



function App() {
  return (
 <BrowserRouter>
  <Routes>
   <Route path='/' element={<h1>Historic Player API</h1>} />
   <Route path='/login' element={<h1>Login</h1>} />
   <Route path='/register' element={<h1>Register</h1>} />
   <Route path='/historic-players' element={<h1>Historic Players</h1>} />
   <Route path='/add-player' element={<h1>Add-player</h1>} />
   <Route path='/profile' element={<h1>Profile</h1>} />
  </Routes>
 </BrowserRouter>
  )

}
export default App
