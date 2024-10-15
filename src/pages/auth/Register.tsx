import {Button, Input } from "antd"
import { FC } from "react";
import { Link } from "react-router-dom";
const Register : FC = () => {
  return (
    <>
      <div className="flex h-dvh justify-center items-center bg-primary">
        <form className="grid flex-col gap-y-4 w-[480px] p-10 rounded-lg bg-white">
          <h1 className="font-black text-3xl" >Inscription.</h1>
          <span className="text-xs mb-3">Welcome ! please enter your details.</span>
          <div className="content-form flex flex-col space-y-2">
            <span className="text-xs">Email address</span>
            <Input type="email" placeholder="example@gmail.com" className="font-sans p-2.5 rounded-lg" required />
          </div>
          <div className="content-form flex flex-col space-y-2">
            <span className="pas text-xs">Password</span>
            <Input.Password className="font-sans p-2.5 rounded-lg" placeholder="Enter password" />
          </div>
          <div className="content-form flex flex-col space-y-2">
            <span className="pas text-xs">Confirm password</span>
            <Input.Password className="font-sans p-2.5 rounded-lg" placeholder="Confirm password" />
          </div>
          <div className="content-form">
            <Button
              htmlType="submit"
              className="no-hover-button w-full text-white bg-secondary font-sans p-6 rounded-full"
            >Connexion</Button>
          </div>
          <div className="content-form text-center">
            <span className="text-xs"><Link to="/" className="font-bold text-secondary">Vouz avez deja un compte ?</Link></span>
          </div>
        </form>
      </div>
    </>
  )
};
export default Register