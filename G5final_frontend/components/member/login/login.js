import React, { useState } from 'react';
import RegisterForm from './register-form';
import LoginForm from './login-form';
import ForgetPasswordForm from './forget-password-form';

export default function LoginPage(props) {
  const [Formtype, setFormtype] = useState(2);

  return (
    <>
      <RegisterForm
        Formtype={Formtype}
        setFormtype={setFormtype}
      ></RegisterForm>
      <LoginForm Formtype={Formtype} setFormtype={setFormtype}></LoginForm>
      <ForgetPasswordForm
        Formtype={Formtype}
        setFormtype={setFormtype}
      ></ForgetPasswordForm>
    </>
  );
}
