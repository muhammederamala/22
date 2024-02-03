import React, { useState, useEffect } from "react";
import axios from "axios";

function UserInfoPage() {
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("Token");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/get-user-info`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setUserInfo(response.data.userInfo);
        setFormData({
          firstName: response.data.userInfo.firstName,
          lastName: response.data.userInfo.lastName,
          email: response.data.userInfo.email,
        });
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [edit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem("Token");
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/edit-user-info`,
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setEdit(false);
      setShowPassword(false);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">User Information</h2>
              {loading && <p>Loading...</p>}
              {!loading && !edit && (
                <div>
                  <p style={{ fontSize: "20px" }} className="mt-3">
                    First Name: <strong>{userInfo.firstName}</strong>
                  </p>
                  <p style={{ fontSize: "20px" }} className="mt-3">
                    Last Name: <strong>{userInfo.lastName}</strong>
                  </p>
                  <p style={{ fontSize: "20px" }} className="mt-3">
                    Email: <strong>{userInfo.email}</strong>
                  </p>
                  <button
                    onClick={() => {
                      setEdit(true);
                    }}
                    className="btn btn-primary mt-3"
                  >
                    Edit
                  </button>
                </div>
              )}
              {!loading && edit && (
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-4">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary m-2">
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEdit(false);
                    }}
                    className="btn btn-secondary m-2"
                  >
                    Cancel
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfoPage;
