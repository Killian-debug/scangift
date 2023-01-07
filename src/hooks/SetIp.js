import axios from 'axios';
import client from './Data';

const SetIP = async () => {
   
    const res = await axios.get('https://geolocation-db.com/json/')
    console.log(res.data);

    var IP = res.data.IPv4
    console.log('okay')

    await client
    .post("visite", {
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

export default SetIP;