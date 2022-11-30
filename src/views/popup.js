import React, { useState } from 'react';

import Popup from 'reactjs-popup';


const ControlledPopup = () => {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  return (
    <div>
      <button type="button" className="button" onClick={() => setOpen(o => !o)}>
        Controlled Popup
      </button>
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
          <a className="close" href='google.com' onClick={closeModal}>
            &times;
          </a>
        <div className="modal">
         
        </div>
        <p className="content" > Aller vers <a className="d-inline d-flex" href="https://google.com" target="_blank" rel="noreferrer" >https://google.com</a> </p>
          <div className="actions d-flex justify-content-end">
              <a href="https://google.com" className='text-right' target="_blank" rel='noreferrer'>
                <button
                  className="btn-primary"
                  onClick={() => {
                    console.log("modal go to url ");
                  }}
                >
                  Okay
                </button>
              </a>

            </div>
      </Popup>
    </div>
  );
};

export default ControlledPopup;