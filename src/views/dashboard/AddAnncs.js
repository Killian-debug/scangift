import React, { useCallback, useContext, useMemo, useState, useEffect } from "react";
import PrimaryButton from "../../components/Buttons";
import Api from "../../hooks/Axios";
// import SelectField from "../../components/selectField";
import axios from "axios";
import useCookie from "../../hooks/Cookie";

const FormContext = React.createContext({});

const emptyObj = (cfamFwdDtls) => {
  for (var key in cfamFwdDtls) {
  if (typeof cfamFwdDtls[key] == "string") {
      cfamFwdDtls[key] = '';
  } else if (typeof cfamFwdDtls[key] == "number") {
    cfamFwdDtls[key] = null;
  } else if (Array.isArray(cfamFwdDtls[key])) {
      cfamFwdDtls[key] = [];
   }
  // else {
  //     delete cfamFwdDtls[key];
  // }
}
}



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

  const resetToDefault = useCallback(function (e) {
    emptyObj(value)
    //console.log(value)
    setData(defaultValue)
   
    e.target.reset()

  }, []);

  const value = useMemo(
    function () {
      return { ...data, handleChange};
    },
    [data, handleChange]
  );

  const handleSubmit = useCallback(
    function (e) {
      e.preventDefault();
      onSubmit(value);
      setData(defaultValue)
      e.target.reset()

    },
    [onSubmit, value]
  );

  return (
    <FormContext.Provider value={value}>
      <form onReset={(e) => {resetToDefault(e)}} onSubmit={handleSubmit}>{children}</form>
      {/* <p className="text-break" >{JSON.stringify(value)}</p> */}
    </FormContext.Provider>
  );
};



const FileField = ({name, label, helpText }) => {

  const data = useContext(FormContext);
  const onFileChange = useCallback(
    function (e) {
      data.handleChange(e.target.name, e.target.files[0]);
     // console.log(e.target.files[0])
    },
    [data]
  );

  return (
    <div className="form-group">
              <label htmlFor="image">{label}</label>
              <input type="file" className="form-control-file" name={name} accept="png,jpg,jpeg"  id="file" aria-describedby="fileHelpId" onChange={onFileChange} />
              <small id="fileHelpId" className="form-text text-muted">{helpText}</small>
          </div>
  );
};

const InputDef = ({ name, label, type, helpText, placeholder='', min, max }) => {
  const data = useContext(FormContext);
  const inputChange = useCallback(
    function (e) {
      data.handleChange(e.target.name, e.target.value);
      
    },
    [data]
  );
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        min={min}
        max={max}
        type={type ? type : "text"}
        className="form-control"
        name={name}
        id={name}
        placeholder={placeholder}
        aria-describedby="helpId"
        onChange={inputChange}
      />
      <small id="helpId" className="form-text text-muted">
        {helpText ? helpText : name }
      </small>
    </div>
  );
};

const SelectDef = ({ options, name, label, helpText}) => {
  const [selectedOption, setSelectedOption] = useState('');

  const data = useContext(FormContext);
  const inputChange = useCallback(
    function (e) {
      data.handleChange(e.target.name, e.target.value);
     
    },
    [data] 
  );
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select className="form-control" name={name} id={name}>
        {options.map((el, index) => (
          <option
            key={index}
            value={index + 1}
            onChange={inputChange}
          >
            {el}
          </option>
        ))}
      </select>
      <small id="helpId" className="form-text text-muted">
        {helpText ? helpText : name }
      </small>
    </div>
  );
};

// const fieldChange = (e) => {
//   const data = useContext(FormContext);
//   console.log('change')
//   data.handleChange(e.target.name, e.target.value);
  
// };

const AddAnncs = () => {
  
  // const [joinedFile, setJoinedFile] = useState(null);

  // const onFileChange = (e) => {
  //   setJoinedFile(e.target.files[0])
  //  // console.log(e.target.files[0])
  // };


  useEffect(() => {
  
    useCookie.delCookie('pauser')
  }, []);

  const handleSubmit = useCallback(function (value) {
     
     const formData = new FormData();
     for ( var key in value ) {
      formData.append(key, value[key]);
    }
   
  // Update the formData object 
      // formData.append( 
      //   "joinedFile", 
      //   joinedFile,
      // );
     
     
      // for (var pair of formData.entries()) {
      //   console.log(pair[0]+ ' : ' + pair[1]);
      // }

    
    // Request made to the backend api 
    // Send formData object to my nodejs server for save in folder

    Api.post("/annonce",
      formData
    ).then((res)=>{
      //console.log(res)
      alert(res.data.msg)
    })
    .catch((err)=>{
      console.error(err)
      alert('Echec de l\'ajout ! Veuillez vérifier tout les champs et réessayer !')
    })

  }, []);


  return (
    <div className="container-fluid p-5">
   
      <h2 className="d-flex justify-content-center text-center">Ajouter une annonce</h2>
      <div className="d-flex justify-content-center ">
        <div className="col-md-6">
       
          <FormWithContext
           
            defaultValue={{ description:'' , objectif :'Visite' , type_med:'1' , type_url:'whatsapp', url_des:'', type_anncs:'', duree:'3', limite:'-1', id_anncrs:'3', id_event:'3', joinedFile:{} }}
            onSubmit={handleSubmit}
          >
            <FileField name="joinedFile" label="Affiche" helpText="Parcourir vos dossiers" />
             {/* <div className="form-group">
              <label htmlFor="image">Affiche</label>
              <input type="file" className="form-control-file" name="joinedFile" accept="png,jpg,jpeg"  id="file" placeholder="" aria-describedby="fileHelpId" onChange={onFileChange} />
              <small id="fileHelpId" className="form-text text-muted">Parcourir vos dossiers</small>
          </div> */}
            <InputDef name="url_des" type="url" label="Destination" placeholder="https://monsite.com" helpText="url d'atterissage" />
            <InputDef name="limite" type="number" label="Limite" helpText="Nombre d'affichage ( laissez vide si illimité)" placeholder="1" />

            <InputDef name="type_anncs" type="number" label="Type d'annonce" helpText="1=Gagnant | 2=non gagnant" max="2" min="1" />
            
            <InputDef name="id_event" type="text" label="Id de campagne attribué" placeholder="1" helpText="Votre id attribué " min="1" />
            
            {/* <SelectDef options={Objectifs} name="id_event" label="Evenement" helpText="Choisissez la campagne d'affichage des annonces" /> */}

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

            {/* <div className="form-group">
              <label htmlFor="type_anncs">Type d'annonce</label>
              <select className="form-control" name="type_anncs" id="type_anncs">
                {typeAnncs.map((tAnn,index) => (
                  <option
                    key={index}
                    value={index+1}
                    onChange={(e) => setSelectedTypeAnncs(e.target.id)}
                  > {tAnn} </option>
                ))}
              </select>
            </div> */}

            <div className="form-group">
              <InputDef name="description" type="text" label="Message" helpText="message d'appel à l'action" />
              {/* <textarea className="form-control" name="description" id="description" rows="3" onChange={(e)=> fieldChange(e)} ></textarea> */}
            </div>
            

            <PrimaryButton  >Enregistrer</PrimaryButton>
            <button type="reset" className="btn btn-danger ml-2">Annuler</button>
          </FormWithContext>
          
        </div>
      </div>
    </div>
  );
};

export default AddAnncs;
