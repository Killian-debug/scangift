import React, { useCallback, useContext, useMemo, useState } from "react";
import PrimaryButton from "../../components/Buttons";
import Api from "../../hooks/Data";
import AdminNav from "../../components/Admin/AdminNav";
import axios from "axios";

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
    setData( d => ({ ...d, [name] : value }));
  }, []);

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
      {JSON.stringify(value)}
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

const AddAnncs = () => {
  const Objectifs = ["Abonnee", "Visite", "Message"];
  const [selectedRadio, setSelectedRadio] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [joinedFile, setJoinedFile] = useState(null);

  const onFileChange = (e) => {
    setJoinedFile(e.target.files[0])
    console.log("file change")
  };

  const handleSubmit = useCallback(function (value) {
     
     const formData = new FormData();
     for ( var key in value ) {
      formData.append(key, value[key]);
    }
    // console.log(formData)
     

    console.log(joinedFile);

      // Create an object of formData 
      const fileData = new FormData(); 
     
      // Update the formData object 
      fileData.append( 
        "myFile", 
        joinedFile, 
        joinedFile.name
      ); 
     
      // Details of the uploaded file 
      console.log(joinedFile.file); 
     
      // Request made to the backend api 
      // Send formData object to my php file for save in folder
      axios.post("http://localhost:3000/src/views/account/imgupload.php", fileData); 

    // Api.post("/annonce",
    //   urlencodeFormData(formData)
    // ).then((res)=>{
    //   console.log(res)
    // })
    // .catch((err)=>{
    //   console.error(err)
    // })
  }, []);

  return (
    <div className="container-fluid p-5">
      <AdminNav/>
      <h2 className="d-flex justify-content-center">Ajouter une annonce</h2>
      <div className="d-flex justify-content-center ">
        <div className="col-md-6">
        <div className="form-group">
              <label htmlFor="image">Affiche</label>
              <input type="file" className="form-control-file" name="image" accept="png,jpg,jpeg"  id="image" placeholder="" aria-describedby="fileHelpId" onChange={onFileChange} />
              <small id="fileHelpId" className="form-text text-muted">Parcourir vos dossiers</small>
          </div>
          <FormWithContext
            defaultValue={{ description:'' , objectif :'Visite' , type_med:'1' , type_url:'whatsapp', url_des:'', type_anncs:'3', duree:3, limite:0, id_anncrs:1, id_event:1 }}
            onSubmit={handleSubmit}
          >
            <InputDef name="url" label="Destination" />
            <InputDef name="limite" type="number" label="Limite" helpText="limite d'affichage" />

            {/* <InputDef name="naissance" label="Date de fin" type="date" /> */}
            {/* <ul className="d-flex l-none">
              Objectifs :
              {Objectifs.map((objectif) => (
                <li className="mx-2 sexe-list">
                  <input
                    type="radio"
                    id={objectif}
                    name="objectifRadio"
                    checked={objectif === selectedRadio}
                    onChange={(e) => setSelectedRadio(e.target.id)}
                  />
                  <label htmlFor={objectif} className="px-1">
                    {objectif}
                  </label>
                </li>
              ))}
            </ul> */}
            {/* <div className="form-group">
              <label htmlFor="reqCat">Annonceur </label>
              <select className="form-control" name="reqCat" id="reqCat">
                {reqCats.map((cat) => (
                  <option
                    
                    value={cat}
                    onChange={(e) => setSelectedOption(e.target.id)}
                  > {cat} </option>
                ))}
              </select>
            </div> */}
          

            {/* <div className="form-group">
              <label htmlFor="typeUrl">Type Url</label>
              <select className="form-control" name="typeUrl" id="typeUrl">
                {reqCats.map((cat) => (
                  <option
                    
                    value={cat}
                    onChange={(e) => setSelectedOption(e.target.id)}
                  > {cat} </option>
                ))}
              </select>
            </div> */}

            <div className="form-group">
              <label htmlFor="description">Message</label>
              <textarea className="form-control" name="description" id="description" rows="3"></textarea>
            </div>
            

            <PrimaryButton>Enregistrer</PrimaryButton>
            <button type="reset" className="btn btn-danger ml-2">Annuler</button>
          </FormWithContext>
          
        </div>
      </div>
    </div>
  );
};

export default AddAnncs;
