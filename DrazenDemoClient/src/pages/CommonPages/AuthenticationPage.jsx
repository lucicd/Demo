import { useState } from "react";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Divider } from "primereact/divider";
import authenticationService from "./authenticationService";

export default function AuthenticationPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function processToken(response) {
    const data = await response.json();
    localStorage.setItem("tokenType", data.tokenType);
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("expiresIn", data.expiresIn);
    window.location.assign("/");
  }

  function handleLogin() {
    authenticationService
      .login({
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          processToken(response);
        } else {
          alert("Failed to login.");
        }
      });
  }
  return (
    <div className="card">
      <div className="flex flex-column md:flex-row">
        <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
          <div className="flex flex-wrap justify-content-center align-items-center gap-2">
            <label className="w-6rem">Email</label>
            <InputText
              id="email"
              type="text"
              className="w-12rem"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap justify-content-center align-items-center gap-2">
            <label className="w-6rem">Password</label>
            <InputText
              id="password"
              type="password"
              className="w-12rem"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            label="Login"
            icon="pi pi-user"
            className="w-10rem mx-auto"
            onClick={handleLogin}
          ></Button>
        </div>
        <div className="w-full md:w-2">
          <Divider layout="vertical" className="hidden md:flex">
            <b>OR</b>
          </Divider>
          <Divider
            layout="horizontal"
            className="flex md:hidden"
            align="center"
          >
            <b>OR</b>
          </Divider>
        </div>
        <div className="w-full md:w-5 flex align-items-center justify-content-center py-5">
          <Button
            label="Sign Up"
            icon="pi pi-user-plus"
            severity="success"
            className="w-10rem"
          ></Button>
        </div>
      </div>
    </div>
  );
}
