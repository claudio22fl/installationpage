"use client";
import LoginForm from '@/app/Login/page';
import React, { useState, useEffect } from 'react';
import MiniDrawer from '../AppBar';

export default function IsLogin({children}:any) {
   const empresa = localStorage.getItem('empresa');
   //localStorage.removeItem('empresa');
  return (
    <div style={{ width: '100%' , marginTop: '40px'}}>
      {empresa ? <MiniDrawer children={children}/> : <LoginForm/>}
    </div>
  )
}
