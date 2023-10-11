"use client";
import LoginForm from '@/app/Login/page';
import React, { useState, useEffect } from 'react';
import MiniDrawer from '../AppBar';

export default function IsLogin({children}:any) {
    var empresa: any;
    try {
         empresa = localStorage.getItem('empresa');
    } catch (error) {
         empresa = null;
    }
 
   //localStorage.removeItem('empresa');
  return (
    <div style={{ width: '100%' , marginTop: '40px'}}>
      {empresa ? <MiniDrawer children={children}/> : <LoginForm/>}
    </div>
  )
}
