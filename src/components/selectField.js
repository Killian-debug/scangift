import React, { useContext, useState, useCallback } from "react";

const SelectField = ({name, label, options, helpText, FormContext}) => {
  
  const [selectedTypeAnncs, setSelectedTypeAnncs] = useState("");

  const data = useContext(FormContext);
  
  const inputChange = useCallback(
    function (e) {
    setSelectedTypeAnncs(e.target.id);
      console.log("change");
      data.handleChange(e.target.name, e.target.value);
    },
    [data]
  );
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select className="form-control" name={name} id={name}>
        {options.map((tAnn, index) => (
          <option
            key={index}
            value={index + 1}
            onChange={(e) => inputChange(e)}>
            {tAnn}
          </option>
        ))}
      </select>
      <small id="helpId" className="form-text text-muted">
        {helpText ? helpText : name}
      </small>
    </div>
  );
};

export default SelectField;
