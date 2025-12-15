import "../styles/login.css";
import { LoginForm } from "../components/shared/LoginForm";

export const Login = () => {
  return (
    <div className="login-background">
      <div className="container-fluid min-vh-100">
        <div className="row min-vh-100 align-items-center justify-content-end">

          {/* COLUMNA DEL LOGIN */}
          <div className="col-12 col-sm-10 col-md-6 col-lg-4 col-xl-3 me-lg-5">
            <LoginForm />
          </div>

        </div>
      </div>
    </div>
  );
};
