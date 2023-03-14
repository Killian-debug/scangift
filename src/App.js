import React, {useEffect, useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home.js";
import GiftPage from "./views/GiftPage.js";
import ScanPage from "./views/ScanPage.js";
import Place from "./views/Place.js";
import Sidebar from "./components/Sidebar.js";
import AddAnncs from "./views/dashboard/AddAnncs.js";
import AddAdvsr from "./views/dashboard/AddAdvsr.js";
import AddAnncsNew from "./views/dashboard/AddAnncs.new.js";
import Footer from "./components/Footer.js";
import useCookie from "./hooks/Cookie.js";
import Timer from "./components/Timer.js";
import Test from "./views/Test.js";
import SignUp from "./views/login/SignUp.js";
import SignIn from "./views/login/SignIn.js";

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
   
{/*      
       {
        timer ? <Timer expiryTimestamp={timer} />
        : */}
     <Routes>
            <Route path="/" element={<Home />}/>

            <Route path="/scanpage" element={<ScanPage />}/>

            <Route path="/giftpage" element={<Place />}/>

            <Route path="/:giftplace" element={ <Place /> } />

            <Route path="/:idevent/:giftplace/:other" element={ <Place /> } />
            {/* </Routes>

       } 
          <Routes> */}
            <Route path="/dashboard/addanncs" exact element={ <AddAnncs /> } />
           
           <Route path="/dashboard/addanncsnew" exact element={ <AddAnncsNew /> } />

           <Route path="/signup" exact element= { <SignUp  /> } />

           <Route path="/signin" exact element={<SignIn />} />
          
           <Route path="/dashboard/addadvsr" exact element={ <AddAdvsr /> } />

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
