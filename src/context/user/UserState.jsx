import { useState } from 'react';
// import { json } from 'react-router-dom';
import userContext from './userContext';
import { data, useNavigate } from 'react-router-dom';
import Alert from '../../components/Alert';

const UserState = (props) => {

    let navigate = useNavigate();

    const [id, setId] = useState("");

    const host = "http://localhost:3000/"

    const loginUser = async (credentials) => {
        const response = await fetch(`${host}api/v1/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // used to send data to the api in json format
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        try {
            const json = await response.json();

            // console.log('Response:', response);
            // console.log("------------------")
            // console.log('Response JSON:', json);

            if (response.status === 200) {
                // console.log('Access Token:', json.data.accessToken);
                // console.log('Refresh Token:', json.data.refreshToken);
                localStorage.setItem('accessToken', json.data.accessToken);
                localStorage.setItem('refreshToken', json.data.refreshToken); // Store refresh token
                console.log(json.data.user)
                // setId(json.data.user)

                props.showAlert("Login successfully", "success")
                navigate("/home");
            }
            else {
                props.showAlert("Invalid credentials", "danger")
            }
        } catch (error) {
            console.log("Invalid")
            props.showAlert("Invalid credentials", "danger")
        }
    }

    const registerUser = async (credentials) => {
        const response = await fetch(`${host}api/v1/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // used to send data to the api in json format
            body: JSON.stringify({ fullname: credentials.name, email: credentials.email, password: credentials.password, username: credentials.username })
        });
        console.log(response)
        console.log(response.status)
        const json = await response.json();
        // console

        if (response.status === 201) {
            // localStorage.setItem('token', json.authToken);
            navigate("/login");
            props.showAlert("Account created successfully", "success")
        }
        else {
            props.showAlert("Invalid credentials", "danger")
        }
    }

    const userDetail = async () => {
        const response = await fetch(`${host}api/v1/users/getUserDetail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accessToken': localStorage.getItem('accessToken')
            },
            body: JSON.stringify({ accessToken: localStorage.getItem('accessToken') })
            
        });

        try {
            const json = await response.json();
            console.log(json)


            if (response.status === 200) {
                setId(json.data)
            }
            else {
                checkRefreshToken();
                // props.showAlert("Invalid credentials", "danger")
            }
            
        } catch (error) {
            console.log(error)
            props.showAlert("Invalid credentials", "danger")
        }

    }

    const updateAvatar = async (image) => {
        const formData = new FormData();
        await formData.append('avatar', image);
        await formData.append('user', JSON.stringify(id));
        // formData.append(data)
        console.log(id)

        const response = await fetch(`${host}api/v1/users/updateAvatar`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                
            },
            body: formData
        });

        const json = await response.json();
        if (response.status === 200) {
            console.log(json.data)
            setId(json.data);
            props.showAlert("Avatar updated successfully", "success");
            return json
        } else {
            props.showAlert("Error updating avatar", "danger");
        }
    };

    const checkRefreshToken =  async ()=>{
        try {
            const response = await fetch(`${host}api/v1/users/refreshToken`, {
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
    }
    // to be edited by kavya (this will be handled by the backend)
    // const logout = async() => {
    //     localStorage.removeItem('accessToken');
    //     localStorage.removeItem('refreshToken');
    //     navigate("/login");
    //   };
    const logout = async () => {
        const refreshToken = localStorage.getItem('refreshToken'); // Retrieve the refresh token from local storage
      
        if (!refreshToken) {
          console.error('No refresh token found');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          navigate('/login');
          return;
        }
      
        try {
          // Call the backend /logout route
          const response = await fetch(`${host}api/v1/users/logout`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            // kavya dekh lio user id dalni hai 
            body: JSON.stringify({ refreshToken }), // Send the refresh token to the backend
          });
      
          if (response.ok) {
            console.log('Logged out successfully');
          } else {
            console.error('Failed to log out');
          }
        } catch (error) {
          console.error('Error during logout:', error);
        } finally {
          // Clear tokens from local storage and navigate to the login page
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          navigate('/login');
        }
      };
    
    // userDetail();
    return (
        <userContext.Provider value={{ loginUser, registerUser, userDetail, updateAvatar, checkRefreshToken, logout, id }}>
            {props.children}
        </userContext.Provider>
    )

}

export default UserState;