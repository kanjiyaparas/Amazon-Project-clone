import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout/Layout';
import Paths from './commen/Paths';
import DashBoard from './screen/DashBoard/DashBoard';
import Productscreen from './screen/Product/Productscreen';
import UserData from './screen/User/UserData';
import { useState } from 'react';
import Loginscreen from './screen/Login/Loginscreen';






function App() {
const [Auth , setAuth] = useState(localStorage.getItem("TOKEN") ? true : false)


  return (
    <BrowserRouter>
   
    <div className="App">
      <Routes>
        <Route path={Paths.DashBoard} element={ <Layout Auth={Auth} setAuth={setAuth} component={<DashBoard/>}/>}></Route>
        <Route path={Paths.Product} element={ <Layout Auth={Auth} setAuth={setAuth} component={<Productscreen/>}/>}></Route>
        <Route path={Paths.user} element={ <Layout Auth={Auth} setAuth={setAuth} component={<UserData/>}/>}></Route>
        <Route path={Paths.Login}  element={<Loginscreen setAuth={setAuth} Auth={Auth}  />}></Route>
      </Routes>
      
    </div>
    </BrowserRouter>
  );
}

export default App;
