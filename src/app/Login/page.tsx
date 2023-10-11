"use client";
// LoginForm.js
import React, { useState } from "react";
import "./LoginForm.css";
import { FilledInput, IconButton, Input, InputAdornment, TextField } from "@mui/material";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Swal from "sweetalert2";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    
    console.log("email", email);
    console.log("password", password);  
    const url = `https://plataformasgps.cl/api/companies?filters[name][$eq][0]=${email}&filters[password][$eq][1]=${password}`;
   
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    const data = await response.json();
    const { data: data2 } = data;
    if( data2.length > 0){
      localStorage.setItem('empresa', data.data[0].attributes.name);
      localStorage.setItem('rol', data.data[0].attributes.rol);
      console.log("data", data.data[0].attributes.name);
      console.log("data", data.data[0].attributes.rol);
      window.location.href = '/Installation_list';
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Usuario o contraseña incorrecta',
      })
    }
     
  };

  
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (
    <div className="wrapper">
    <div className="title">
       Login
    </div>
    <form onSubmit={handleSubmit}>
    <div className="" style={{ marginTop: 35}}>
          <Input 
           startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          } 
                id={'usuario'}
                type={"text"}
                name={'usuario'}
                value={email}
                sx={{  width: "32ch", borderWidth: 0  }}
                placeholder="Usuario"
                required={false}
                onChange={(e) => setEmail(e.target.value)}
              />
       </div>
       <div className="" style={{ marginTop: 25}}>
          <Input  
           startAdornment={
            <InputAdornment position="start">
              <VpnKeyIcon />
            </InputAdornment>
          } 
                id={'name'}
                type={showPassword ? 'text' : 'password'}
                name={'name'}
                value={password}
                sx={{  width: "32ch", borderWidth: 0  }}
                placeholder="Contraseña"
                required={false}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
              />
    
       </div>
       <div className="content">
          <div className="checkbox">
             <input type="checkbox" id="remember-me"/>
             <label htmlFor="remember-me"> Recordarme </label>
          </div>
       </div>
       <div className="field">
          <input type="submit" value="Entrar"/>
       </div>
    </form>
 </div>

  );
};

export default LoginForm;
