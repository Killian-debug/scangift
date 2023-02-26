import React, {useEffect, useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home.js";
import GiftPage from "./views/GiftPage.js";
import ScanPage from "./views/ScanPage.js";
import Place from "./views/Place.js";
import Sidebar from "./components/Sidebar.js";
import AddAnncs from "./views/account/AddAnncs.js";
import AddAdvsr from "./views/account/AddAdvsr.js";
import AddAnncsNew from "./views/account/AddAnncs.new.js";
import Footer from "./components/Footer.js";
import useCookie from "./hooks/Cookie.js";
import Timer from "./components/Timer.js";
import Test from "./views/Test.js";

const App = () => {

  const time = new Date();
  time.setSeconds(time.getSeconds() + 1800);

  var ndate = Date();
  const [timer, setTimer] = useState(undefined);
 
  useEffect(() => {
    if ( useCookie.ifCookie('pauser') ) {
      const t = useCookie.getCookie('pauser')
      const val = JSON.parse(t)

      ndate = new Date(val.expiry)
      console.log(ndate)
      setTimer(ndate)
    }
  }, [timer]);
 
  return (   
   <BrowserRouter>
 
      <Sidebar />
   
     
       {
        timer ? <Timer expiryTimestamp={timer} />
       
        :
     <Routes>
            <Route path="/" element={<Home />}/>

            <Route path="/scanpage" element={<ScanPage />}/>

            <Route path="/giftpage" element={<Place />}/>

            <Route path="/:giftplace" element={ <Place /> } />

            <Route path="/:idevent/:giftplace/:other" element={ <Place /> } />
            </Routes>

       } 
          <Routes>
            <Route path="/account/addanncs" exact element={ <AddAnncs /> } />
           
           <Route path="/account/addanncsnew" exact element={ <AddAnncsNew /> } />

           <Route path="/account/addadvsr" exact element={ <AddAdvsr /> } />

{/*            
            <Route path="/popup" exact element={ <ControlledPopup/> } /> */}

            {/* Cela fonctionne si le chemin ne correspond à aucune option déjà présente */}
            {/* <Route path="*" element={<Home />}>
              {" "}
            </Route> */}
          </Routes>
    
          

    </BrowserRouter>
  );
};

export default App;
