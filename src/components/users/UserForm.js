import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField } from '@material-ui/core';
import { userRegister, userLogin } from "../../api";

const UserForm = ({ action, setToken, setUserData }) => {

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isLogin = action === 'login';
  const title = isLogin ? 'Login' : 'Register';
  const oppositeAction = isLogin ? 'register' : 'login';
  const oppositeTitle = isLogin ? 'Register' : 'Login';

  const formSubmit = async (event) => {
    event.preventDefault();

    const body = {username, password}

    let data = null;


    console.log(isLogin);

    if(isLogin){
      console.log('Loggin in');
    
      body.email = email;

      data = await userLogin({
        username: username,
        password: password
      });
    }else{
      data = await userRegister({
        username: username,
        email: email,
        password: password
      });
    }
      
    if(typeof data === 'object'){

      console.log('Worked: ', data);
      localStorage.setItem( 'pokemon-card-manager-token', data.token );
      setToken(data.token);
      setUserData(data.user);
      // ??
      navigate('/users/profile');
    }else{
      alert(data);
    }
  };

  return (
    <>
      <form onSubmit={formSubmit}>

        <h2 id="registerhead">Welcome, Please {title}</h2>

        <TextField 
          type="text" 
          label="Username" 
          required
          minLength="3"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        {isLogin ?  null :
        <TextField 
          type="email" 
          label="Email" 
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        }

        <TextField 
          type="password" 
          label="Password" 
          required
          minLength="8"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <Button 
          variant="contained" 
          type="submit">
          {title}
        </Button>

        <p> {isLogin ? "Don't have" : 'Have'} an Account?</p>
        <Button 
          variant="contained" 
          type="submit">
          <Link to={`/${oppositeAction}`}>{oppositeTitle}</Link>
        </Button>
      </form>
    </>
  );
};

export default UserForm;
