import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import LoginByPassword from './Pages/LoginByPassowrd';
import Navbar from './Components/Navbar';
import MainPage from './Pages/MainPage';
import MainPageProtectedRoute from './utils/MainPageProtectedRoute';
import LoginByPasswordProtectedRoute from './utils/LoginByPasswordProtectedRoute';
import Popup from './Components/Popup';
function App() {
  return (
  <>
  <BrowserRouter>
  <Navbar/>
   <Routes>
   <Route path='/' element={<MainPageProtectedRoute><MainPage/></MainPageProtectedRoute>}/>
    <Route path='/login' element={<Login/>} />
    <Route path='/signup' element={<SignUp/>} />
    <Route path='/loginbypassword' element={<LoginByPassword/>} />
   </Routes>
   <Popup/>
   </BrowserRouter>
  </>
  );
}

export default App;
