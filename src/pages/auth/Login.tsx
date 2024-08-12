import {Button, Input, message } from "antd"
function Login() {
  const [messageApi, contextHolder] = message.useMessage();
  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Mot de passe incorrect',
    });
  };
  return (
    <>
      {contextHolder}
      <div className="flex h-dvh justify-center items-center bg-primary">
        <form className="grid flex-col gap-y-4 w-[480px] p-10 rounded-lg bg-white">
          <h1 className="font-black text-3xl" >Login.</h1>
          <span className="text-xs mb-3">Welcome back! please enter your details.</span>
          <div className="content-form flex flex-col space-y-2">
            <span className="text-xs">Email address</span>
            <Input type="email" placeholder="example@gmail.com" className="font-sans p-2.5 rounded-lg" required/>
          </div>
          <div className="content-form flex flex-col space-y-2">
            <div className="label-password flex justify-between">
              <span className="pas text-xs">Password</span>
              <a href="#" className="text-xs text-secondary">Forgot password ?</a>
            </div>
            <Input.Password className="font-sans p-2.5 rounded-lg" placeholder="Enter password"/>
          </div>
          <div className="content-form">
            <Button onClick={error} className="no-hover-button w-full text-white bg-secondary font-sans p-6 rounded-full">Connexion</Button>
          </div>
          <div className="content-form text-center">
            <span className="text-xs">Don't have an account yet ? <a href="#" className="font-bold text-secondary">Sign up here</a></span>
          </div>
        </form>
      </div>
    </>
  )
}
export default Login