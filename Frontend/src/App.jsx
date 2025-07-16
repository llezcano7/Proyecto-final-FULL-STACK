import {BrowserRouter, Routes, Route} from 'react-router-dom';
import register from './components/register';
import login from './components/login'



function App() {
  return (
 <BrowserRouter>
  <Routes>
   <Route path='/' element={<h1>Historic Player API</h1>} />
   <Route path='/login' element={<loginPage/>} />
   <Route path='/register' element={<registerPage/>} />
   <Route path='/historic-players' element={<h1>Historic Players</h1>} />
   <Route path='/add-player' element={<h1>Add-player</h1>} />
   <Route path='/profile' element={<h1>Profile</h1>} />
  </Routes>
 </BrowserRouter>
  )

}
export default App
