import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';


const Test = () => {

    let { idevent, giftplace, other } = useParams();
const [msgToPlace, setMsgToPlace] = useState();

    useEffect(() => {
  
      if (giftplace && giftplace !== "") {
        setMsgToPlace("ScanGift avec " + giftplace.replace(/-/g, " "));
        console.log("place : " + giftplace);
      }
    }, [giftplace, msgToPlace]);
   
    return (
        <div>
            <p> {idevent} '+' {giftplace} '+' {other} </p>
        </div>
    );
};

export default Test;