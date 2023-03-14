import {useEffect, useState} from 'react';
import client from '../Axios';

export const useResource = (ressourceUrl) => {

    const [resource, setResource] = useState(null);

    useEffect(() => {
        async () => await client
        .get(ressourceUrl)
        .then( res => {
            setResource(res.data)
        } )
        .catch( err => {
            console.error(err)
        } )
    }, [ressourceUrl]);
   

    return resource;
};