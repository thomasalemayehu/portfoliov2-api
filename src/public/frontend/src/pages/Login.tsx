import loginStyles from "../assets/styles/Login.module.css"

function Login() {
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
            <input type="email" name="email" id="email" placeholder="Email" />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="********"
            />

            <button
              className={loginStyles.login__form__submit__button}
            >Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login