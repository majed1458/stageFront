import React, { useState ,useRef} from "react";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import PageContainer from "../../layout/page-container/PageContainer";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  Button,
  Icon,
  PreviewCard,
} from "../../components/Component";
import { Spinner } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "./register.css"

const Register = ({ history }) => {
  const [passState, setPassState] = useState(false);
  const [loading, setLoading] = useState(false);
  const { errors, register, handleSubmit } = useForm();
  const password = useRef({});
  toast.configure();

  const handleFormSubmit = async (data) => {
    console.log("submit")
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/api/auth/buyer/sign-up', {
        gender: data.gender,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password
    });

        if (response.status===201) {
            history.push(`${process.env.PUBLIC_URL}/login`);
        } else {
         
            toast.error("User already registered!");
     
        }
    } catch (error) {
        console.error("Error registering user:", error);
        toast.error("server error");
        // Handle any error UI updates here.
    } finally {
        setLoading(false);
    }
};

  return (
    <React.Fragment>
      <Head title="Register" />
      <PageContainer>
        <Block className="nk-block-middle nk-auth-body  wide-xs">
          <div className="brand-logo pb-4 text-center">
            <Link to={`${process.env.PUBLIC_URL}/`} className="logo-link">
              <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
              <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
            </Link>
          </div>
          <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
            <BlockHead>
              <BlockContent>
                <BlockTitle tag="h4">Register</BlockTitle>
                <BlockDes>
                  <p>Create New Dashlite Account</p>
                </BlockDes>
              </BlockContent>
            </BlockHead>
            <form className="is-alter" onSubmit={handleSubmit(handleFormSubmit)}>
             
            <div className="flex-container">  {/* New wrapper div */}
                    <div className="flex-item">  {/* New item div */}
                        <label className="form-label" htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" name="firstName" ref={register({ required: true })} className="form-control-lg form-control" />
                        {errors.firstName && <p className="invalid">This field is required</p>}
                    </div>

                    <div className="flex-item">  {/* New item div */}
                        <label className="form-label" htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" name="lastName" ref={register({ required: true })} className="form-control-lg form-control" />
                        {errors.lastName && <p className="invalid">This field is required</p>}
                    </div>
                </div>
              <div className="form-group">
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Email or Username
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    bssize="lg"
                    id="default-01"
                    name="email"
                    ref={register({ required: true })}
                    className="form-control-lg form-control"
                    placeholder="Enter your email address or username"
                  />
                  {errors.email && <p className="invalid">This field is required</p>}
                </div>
              </div>
              <div className="flex-container">  {/* New wrapper div */}
                    <div className="flex-item">  {/* New item div */}
                        <label className="form-label" htmlFor="gender">Gender</label>
                        <select id="gender" name="gender" ref={register({ required: true })} className="form-control-lg form-control">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        {errors.gender && <p className="invalid">This field is required</p>}
                    </div>

                    <div className="flex-item">  {/* New item div */}
                        <label className="form-label" htmlFor="phoneNumber">Phone Number</label>
                        <input type="text" id="phoneNumber" name="phoneNumber" ref={register({ required: true })} className="form-control-lg form-control" />
                        {errors.phoneNumber && <p className="invalid">This field is required</p>}
                    </div>
                </div>

              <div className="form-group">
                  <label className="form-label" htmlFor="password">Password</label>
                  <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    ref={(e) => {
                        register(e);
                        password.current = e ? e.value : "";
                    }} 
                    onChange={(e) => (password.current = e.target.value)} 
                    className="form-control-lg form-control" 
                />                  
              {errors.password && <p className="invalid">This field is required</p>}
              </div>

              <div className="form-group">
                  <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                  <input type="password" id="confirmPassword" name="confirmPassword" ref={register({ required: true, validate: value => value === password.current || "The passwords do not match" })} className="form-control-lg form-control" />
                  {errors.confirmPassword && <p className="invalid">{errors.confirmPassword.message}</p>}
              </div>

              <div className="form-group">
                <Button type="submit" color="primary" size="lg" className="btn-block">
                  {loading ? <Spinner size="sm" color="light" /> : "Register"}
                </Button>
              </div>
            </form>
            <div className="form-note-s2 text-center pt-4">
              {" "}
              Already have an account?{" "}
              <Link to={`${process.env.PUBLIC_URL}/auth-login`}>
                <strong>Sign in instead</strong>
              </Link>
            </div>
            {/* <div className="text-center pt-4 pb-3">
              <h6 className="overline-title overline-title-sap">
                <span>OR</span>
              </h6>
            </div>
            <ul className="nav justify-center gx-8">
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#socials"
                  onClick={(ev) => {
                    ev.preventDefault();
                  }}
                >
                  Facebook
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#socials"
                  onClick={(ev) => {
                    ev.preventDefault();
                  }}
                >
                  Google
                </a>
              </li>
            </ul> */}
          </PreviewCard>
        </Block>
        <AuthFooter />
      </PageContainer>
    </React.Fragment>
  );
};
export default Register;
