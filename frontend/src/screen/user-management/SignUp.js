import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import M from "materialize-css";
import "react-toastify/dist/ReactToastify.css";
import "./signin.css";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);

  useEffect(() => {
    if (url) {
      uploadFields();
    }
  }, [url]);

  const uploadPic = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "Social-webApp");
    data.append("cloud_name", "dt0isai38");

    fetch("https://api.cloudinary.com/v1_1/dt0isai38/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadFields = () => {
    if (
      !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
        email
      )
    ) {
      toast.error("Invalid email");
      return;
    }

    fetch("http://localhost:8070/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        password,
        email,
        pic: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success(data.message);
          navigate("/signin");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const PostData = () => {
    if (image) {
      uploadPic();
    } else {
      uploadFields();
    }
  };

  return (
    <div className="back center-align" >
      <div className="row">
        <div className="col s12 m8 offset-m2"> {/* Adjust width here */}
          <div className="bbCard">
            <div data-testid="sign-1" className="card lCard input-field ">
        <h3><b>SignUp</b></h3>
        <input
          type="text"
          className="form-control mt-3"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          className="form-control mt-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control mt-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

              <div className="file-field input-field">
                <div className="btn deep-orange darken-4 mt-3">
                  <span>Upload Photo</span>
                  <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                  <input className="file-path validate mt-2" type="text" placeholder="Upload file" readOnly />
                </div>
              </div>


              <button
                className="btn waves-effect custom-button waves-light #bf360c deep-orange darken-4 mt-3"
                onClick={() => PostData()}
              >
                SignUp
              </button>
              <br />
              <Link to="/signin">Already have an account ?</Link>
            </div>
          </div>
        </div>
        </div>



      <ToastContainer />
    </div>
  );
}
