import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home.js";
import HomeOld from "./views/Home.old.js";
import GiftPage from "./views/GiftPage.js";
import ScanPage from "./views/ScanPage.js";
import Place from "./views/Place.js";
import Sidebar from "./components/Sidebar.js";

const App = () => {

  return (
    <div>
      <BrowserRouter>
      {/* <Sidebar /> */}
          <Routes>
            <Route path="/" element={<Home />}>
              {" "}
            </Route>
            <Route path="/homeold" element={<HomeOld />}>
              {" "}
            </Route>
            <Route path="/scanpage" element={<ScanPage />}>
              {" "}
            </Route>
            <Route path="/giftpage" element={<GiftPage />}>
              {" "}
            </Route>

            <Route path="/place/:giftplace" exact element={ <Place /> } />

            {/* Cela fonctionne si le chemin ne correspond à aucune option déjà présente */}
            {/* <Route path="*" element={<Home />}>
              {" "}
            </Route> */}
          </Routes>
      
    </BrowserRouter>
    </div>
    
  );
};

export default App;
