import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home.js";
import GiftPage from "./views/GiftPage.js";
import ScanPage from "./views/ScanPage.js";
import Place from "./views/Place.js";
import AddAnncs from "./views/account/AddAnncs.js";
import AddAdvsr from "./views/account/AddAdvsr.js";
// import Sidebar from "./components/Sidebar.js";

const App = () => {

  return (   
   <BrowserRouter>
 
      {/* <Sidebar /> */}
          <Routes>
            <Route path="/" element={<Home />}>
              {" "}
            </Route>
            <Route path="/scanpage" element={<ScanPage />}>
              {" "}
            </Route>
            <Route path="/giftpage" element={<GiftPage />}>
              {" "}
            </Route>

            <Route path="/place/:giftplace" exact element={ <Place /> } />

            <Route path="/account/addanncs" element={ <AddAnncs/> } />

            <Route path="/account/addadvsr" element={ <AddAdvsr/> } />


            {/* Cela fonctionne si le chemin ne correspond à aucune option déjà présente */}
            <Route path="*" element={<Home />}>
              {" "}
            </Route>
          </Routes>
      
    </BrowserRouter>
  );
};

export default App;
