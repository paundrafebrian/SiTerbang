import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgot } from "../redux/actions/auth";
import Swal from "sweetalert2";
import "../assets/css/styleku.css";
import Logo from "../assets/img/undraw_Aircraft_re_m05i.png";
import Banner from "../assets/img/undraw_connected_world_wuay.svg";

export default function Reset() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
  });
  useEffect(() => {
    document.title = `${process.env.REACT_APP_APP_NAME} - Forgot Password`;
    window.scrollTo(0, 0);
  }, []);
  const onSubmitted = (e) => {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    Swal.fire({
      title: "Are you sure?",
      text: `that ${form.email} is your account?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `yes, that's right!`,
    }).then((result) => {
      if (result.isConfirmed) {
        forgot(form, setErrors).then((res) => {
          if (res === true) {
            Swal.fire({
              title: "Success",
              text: "you success to reset password, now check your email to reset your password",
              icon: "success",
            });
            return navigate("/login");
          }
        });
      }
    });
    setIsLoading(false);
  };
  return (
    <>
      <section class="h-100 gradient-form">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-xl-10">
              <div class="card rounded-3 text-black card-phone-xs">
                <div class="row g-0">
                  <div class="col-lg-6 card-phone-xs">
                    <div class="card-body p-md-5 mx-md-4">
                      <div class="text-center">
                        <img src={Logo} width="185" alt="logo" />
                        <h4 class="mt-1 mb-5 pb-1">Si Terbang</h4>
                      </div>

                      <form onSubmit={(e) => onSubmitted(e)}>
                        <div class="form-outline mb-4">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            class="form-control input-login"
                            placeholder="Email"
                            onChange={(e) =>
                              setForm({ ...form, email: e.target.value })
                            }
                          />
                        </div>
                        {errors.length > 0 && (
                          <div
                            className="alert alert-danger mx-0"
                            style={{ maxWidth: "350px", marginLeft: "10px" }}
                          >
                            <ul className="m-0">
                              {errors.map((error, index) => (
                                <li key={index}>{error.msg}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <div class="text-center pt-1 mb-5 pb-1 ">
                          {isLoading ? (
                            <button
                              className="btn btn-success btn-lg ms-2"
                              type="button"
                              disabled
                            >
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                              ></span>{" "}
                              Loading...
                            </button>
                          ) : (
                            <button type="submit" className="btn-login">
                              Send
                            </button>
                          )}
                        </div>
                      </form>
                    </div>
                  </div>
                  <div class="col-lg-6 d-flex align-items-center gradient-custom-2 card-phone">
                    <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4>Ramah Di kantong, Memudahkan anda</h4>
                      <p>
                        <img src={Banner} alt="" width={350} />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
