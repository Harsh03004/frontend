import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Landing() {

  let navigate = useNavigate();


  const checkAndRefreshToken = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && accessToken!==undefined) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/v1/users/refreshToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refreshToken: localStorage.getItem('refreshToken') })
      });
      console.log('Response:', response);
        console.log("------------------")

      if (response.status === 200) {
        const json = await response.json();

        
        console.log('Response JSON:', json);
        console.log("------------------")
        console.log("access token= "+json.data.accessToken);
        if(json.data.accessToken===undefined){
          navigate("/login");
          return;
        }
        localStorage.setItem('accessToken', json.data.accessToken);
        localStorage.setItem('refreshToken', json.data.refreshToken);
        return;
      } else {
        navigate("/login");
      }
      
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

    // work like documentdidmount
    useEffect(() => {
      checkAndRefreshToken();
        // eslint-disable-next-line
    }, [])

  return (
    <div>
      Hello
    </div>
  )
}

export default Landing
