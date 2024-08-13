import {Button, Input, message } from "antd"
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Authuser } from "../../api/json/Authuser";
import { useNavigate } from "react-router-dom";
import { useAuthentification } from "../../api/auth/mutation/Mutation";
import { FC } from "react";
const Login : FC = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const Authmutation = useAuthentification();
  const HandleAuth: SubmitHandler<Authuser> = async (data) => {
    const reponse = await Authmutation.mutateAsync(data);
    if (reponse.data?.status === 200) {
      localStorage.setItem('role', reponse.data?.data.role);
      localStorage.setItem('token-user', reponse.data?.data.token);
      navigate("/ordredemission");
    } else {
      messageApi.open({
        type: 'error',
        content: 'Mot de passe incorrect',
      });
    }
  }
  const { control, handleSubmit } = useForm<Authuser>();
  return (
    <>
      {contextHolder}
      <div className="flex h-dvh justify-center items-center bg-primary">
        <form onSubmit={handleSubmit(HandleAuth)} className="grid flex-col gap-y-4 w-[480px] p-10 rounded-lg bg-white">
          <h1 className="font-black text-3xl" >Login.</h1>
          <span className="text-xs mb-3">Welcome back! please enter your details.</span>
          <div className="content-form flex flex-col space-y-2">
            <span className="text-xs">Email address</span>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => <Input {...field} type="email" placeholder="example@gmail.com" className="font-sans p-2.5 rounded-lg" required />}
            />
          </div>
          <div className="content-form flex flex-col space-y-2">
            <div className="label-password flex justify-between">
              <span className="pas text-xs">Password</span>
              <a href="#" className="text-xs text-secondary">Forgot password ?</a>
            </div>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => <Input.Password {...field} className="font-sans p-2.5 rounded-lg" placeholder="Enter password" />}
            />
          </div>
          <div className="content-form">
            <Button
              htmlType="submit"
              className="no-hover-button w-full text-white bg-secondary font-sans p-6 rounded-full"
              loading = {Authmutation.isPending}
            >Connexion</Button>
          </div>
          <div className="content-form text-center">
            <span className="text-xs">Don't have an account yet ? <a href="#" className="font-bold text-secondary">Sign up here</a></span>
          </div>
        </form>
      </div>
    </>
  )
};
export default Login