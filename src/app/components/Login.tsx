import React from "react";

const Login = () => {
  return (
    <div className=" w-full mx-[300px] px-3 flex flex-col bg-zinc-900 h-[200px]">
      <h1 className="mx-auto">Login</h1>
      <form action="" className=" flex flex-col w-auto mx-auto">
        <label htmlFor="">UserName</label>
        <input type="text" className=" w-[300px]" />
        <label htmlFor="">Password</label>
        <input type="password" className="w-[300px]" />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Login;
