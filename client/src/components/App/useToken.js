import { useState } from 'react';

export default function useToken() {
  const [token, setToken] = useState();

  const saveToken = userToken => {
    console.log('savetoken is called', userToken)
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken);
  };
  return {
    setToken: saveToken,
    token
  }
}