import React, { useCallback, useContext, useMemo, useState, useEffect } from "react";
import PrimaryButton from "../../components/Buttons";
import Api from "../../hooks/Axios";
import useCookie from "../../hooks/Cookie";

const FormContext = React.createContext({});

function urlencodeFormData(fd){
  var params = new URLSearchParams();
  for(var pair of fd.entries()){
      typeof pair[1]=='string' && params.append(pair[0], pair[1]);
  }
  return params.toString();
}

const FormWithContext = ({ defaultValue, onSubmit, children }) => {
  const [data, setData] = useState(defaultValue);
  const handleChange = useCallback(function (name, value) {
    setData(d => ({ ...d, [name] : value}) );
    console.log(data)
  }, [data]);

  const value = useMemo(
    function () {
      return { ...data, handleChange };
    },
    [data, handleChange]
  );

  const handleSubmit = useCallback(
    function (e) {
      e.preventDefault();
      onSubmit(value);
      console.log(value)
    },
    [onSubmit, value]
  );

  return (
    <FormContext.Provider value={value}>
      <form onSubmit={handleSubmit}>{children}</form>
      {/* {JSON.stringify(value)} */}
    </FormContext.Provider>
  );
};

const InputDef = ({ name, label, type, helpText }) => {
  const data = useContext(FormContext);
  const inputChange = useCallback(
    function (e) {
      console.log('change')
      data.handleChange(e.target.name, e.target.value);
      
    },
    [data]
  );
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type ? type : "text"}
        className="form-control"
        name={name}
        id={name}
        aria-describedby="helpId"
        placeholder={data[name] || ""}
        onChange={inputChange}
      />
      <small id="helpId" className="form-text text-muted">
        {helpText ? helpText : name }
      </small>
    </div>
  );
};

const AddAdvsr = () => {
  useEffect(() => {
  
    useCookie.delCookie('pauser')
  }, []);

  // const [joinedFile, setJoinedFile] = useState();

  // const onFileChange = () => {
  //   setJoinedFile(this.files[0])
  // };

  const handleSubmit = useCallback(function (value) {
     
     const formData = new FormData();
     for ( var key in value ) {
      formData.append(key, value[key]);
    }
    console.log(formData)
     
    var formDataUrlencoded = urlencodeFormData(formData)
    console.log(value);
    Api.post("/annonceur", formDataUrlencoded ).then((res)=>{
      console.log(res)
    })
    .catch((err)=>{
      console.error(err)
    })
  }, []);

  return (
    <div className="container-fluid pt-5">
      <h2 className="d-flex justify-content-center">Inscription annonceur</h2>
      <div className="d-flex justify-content-center ">
        <div className="col-md-6">
          <FormWithContext
            defaultValue={{ nom : "Doe", tel:"22999000000",  email:"johndoe@gmail.com", description : '', joinFile :"p" }}
            onSubmit={handleSubmit}
          >
            <InputDef name="nom" label="Nom" />
            <InputDef type='tel' name="tel" label="Numéro" helpText="numéro sans le '+'" />
            <InputDef type='email' name="email" label="E-mail" />
            
            {/* <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea className="form-control" name="description" id="description" rows="3"></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="fichier">Joindre un fichier</label>
              <input type="file" className="form-control-file" name="fichier" id="fichier" placeholder="" aria-describedby="fileHelpId" onChange={onFileChange} />
              <small id="fileHelpId" className="form-text text-muted">Parcourir vos dossiers</small>
            </div> */}
            <PrimaryButton>Enregistrer</PrimaryButton>
            <button type="reset" className="btn btn-danger ml-2">Annuler</button>
          </FormWithContext>
        </div>
      </div>
    </div>
  );
};

export default AddAdvsr;
