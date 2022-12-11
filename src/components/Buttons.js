import React from "react";


const PrimaryButton = ({ children }) => {
    return (
      <button type="submit" className="btn btn-primary">
        {children}
      </button>
    );
  };

export default PrimaryButton;