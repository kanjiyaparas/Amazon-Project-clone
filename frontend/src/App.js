
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Component/Footer';
import Header from './Component/Header';
import Homescreen from './screen/Homescreen';
import Productscreen from './screen/Productscreen';
import Loginscreen from './screen/Loginscreen';
import Registerscreen from './screen/Registerscreen';
import Cartscreen from './screen/Cartscreen';
import { useState } from 'react';
import Shippingscreen from './screen/Shippingscreen';
import PlaceOrderScreen from './screen/PlaceOrderScreen';


function App() {
  const [cartItems, setcartItems] = useState(JSON.parse(localStorage.getItem("cartItems") || "[]"))

  return (
    <BrowserRouter>
    <div className="App">
      <Header cartItems={cartItems} setcartItems={setcartItems}/>
      <main style={{ minHeight: "80.8vh" }}>
        <Routes>
        <Route path="/product/:id" element={<Productscreen cartItems={cartItems}  setcartItems={setcartItems}/>}/>
        <Route path="/" element={<Homescreen/>} exact/>
        <Route path="/Login" element={<Loginscreen/>}/>
        <Route path="/Registration" element={<Registerscreen/>}/>
        <Route path="/Addtocart" element={<Cartscreen cartItems={cartItems} setcartItems={setcartItems}/>} />
        <Route path="/Shipping" element={<Shippingscreen/>}/>
        <Route path="/Placeorder" element={<PlaceOrderScreen cartItems={cartItems} setcartItems={setcartItems} />}/>
        </Routes>
      </main>
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
