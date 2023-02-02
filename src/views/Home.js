import React, { useState, useEffect } from "react";
import scangif from "../assets/img/qr-code-scanner-tuto.gif";
import GoButton from "../components/GoButton.js";
import { FormUrl } from "../hooks/Env";
import ClipLoader from "react-spinners/ClipLoader";
import SetStat from "../hooks/SetStat";

const Home = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    SetStat();
  });

  //url du typeForm
  const formLink = FormUrl;
  useEffect(() => {
    setLoading(true);

    if (document.readyState === "complete") {
      setLoading(false);
    }
  }, [loading]);

  window.onload = (event) => {
    setLoading(false);
    console.log("La page est complètement chargée");
  };

  return (
    <div>
      <div className="card bg-transparent text-center border-0">
        <div className="card-header bg-transparent border-0">
          <h3 className="title-s-1 mt-2">
            Scanner pour gagner ! 
          </h3>
        </div>
        <div className="card-body d-flex flex-column justify-content-center align-items-center">
          <div className="scangif m-2 text-center">
            {loading ? (
              <ClipLoader loading={loading} size={80} />
            ) : (
              <img
                src={scangif}
                alt="Scan tuto"
                className="img-fluid rounded-circle scangif"
              />
            )}
          </div>
            <GoButton toUrl="/scanpage" text="scanner" />
       
        </div>
      </div>

      {/* Button principal en bas de page 
                <ButtonPrimary toUrl={formLink} text="Faire ma publicité" /> */}
    </div>
  );
};

export default Home;
