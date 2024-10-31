import React, { useState, useEffect } from 'react';
import Login from '@/components/member/login/login';

export default function LoginPage(props) {
  return (
    <>
      <div className="container my-5 d-flex justify-content-center">
        <Login></Login>
      </div>
    </>
  );
}
