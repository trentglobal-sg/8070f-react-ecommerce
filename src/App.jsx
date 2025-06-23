
import Footer from "./Footer"
import Navbar from "./Navbar"


import "./style.css"

import { Route, Switch } from 'wouter';
import ProductPage from "./ProductPage";
import RegisterPage from "./RegisterPage";
import HomePage from "./HomePage";
import FlashMessage from "./FlashMessage";



export default function App() {


  return (<>

    <Navbar />
    <FlashMessage/>
    

    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/products" component={ProductPage} />
      <Route path="/register" component={RegisterPage} />
    </Switch>


    <Footer />

  </>)
}