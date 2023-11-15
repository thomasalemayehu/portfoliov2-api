import { FormEvent, useEffect, useRef } from "react";
import loginStyles from "../assets/styles/Login.module.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useStorage } from "../hooks/index";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "../types";
function Login() {
  const [user] = useStorage<UserInfo>("userInfo", {});
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.token) {
      navigate("/project");
    }
  }, [user, navigate]);

  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_sessionStore, setStoredValue] = useStorage("userInfo", {});

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const username = userNameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      toast("Please input username and password");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email: username,
        password,
      });

      if (response.status == 200) {
        setStoredValue(response.data);
        navigate("/project");
      } else {
        toast.error("Could not login", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (e) {
      toast("Could not login", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div className={loginStyles.container}>
      <div className={loginStyles.main__card}>
        <div className={loginStyles.left__card}>
          <img src="/img/Login-Image.svg"></img>
        </div>
        <div className={loginStyles.right__card}>
          <h2>Welcome Back</h2>
          <p>Please enter your details</p>

          <form action="">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              ref={userNameRef}
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="********"
              ref={passwordRef}
            />

            <button
              className={loginStyles.login__form__submit__button}
              onClick={handleSubmit}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
