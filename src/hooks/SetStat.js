import axios from 'axios';
import client from './Axios';

const SetStat = async (code_event=null, id_anncs=null) => {
   
    const res = await axios.get('https://geolocation-db.com/json/')
    console.log(res.data);

    var IP = res.data.IPv4
   
    await client
    .post("visite", {
      code_event : code_event,
      id_anncs : id_anncs,
      url : window.location.pathname,
      ip : IP
    })
    .then((res) => {
      return res.data.messageJson
    })
    .catch((err) => {
      return "Erreur de l'enregistrement de la visite"
    } )
  }

export default SetStat;