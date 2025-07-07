import {atom, useAtom} from 'jotai'

const jwtAtom = atom("");

export function useJwt() {
    const [jwt, setJwtAtom] = useAtom(jwtAtom);

    const setJwt = (newJwt) =>{
        // save to local storage the jwt
        localStorage.setItem('jwt', newJwt); // store key/value pairs in the browser's cookies
        
        setJwtAtom(newJwt);
    }

    const getJwt = () => {
        const storedJwt = localStorage.getItem('jwt');
        if (storedJwt && !jwt) {
            setJwtAtom(storedJwt);
        }
        return jwt || storedJwt;
    }

    const clearJwt = () => {
        localStorage.removeItem('jwt');
        setJwtAtom(null);
    }

    return {
        setJwt, getJwt, clearJwt
    }


}