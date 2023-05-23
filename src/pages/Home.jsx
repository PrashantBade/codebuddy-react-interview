import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SteppedForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    lastname: "",
    address: "",
    countrycode: "",
    phone: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const subform1 = (e) => {
    e.preventDefault();
    const errors = {};
    let hasErrors = false;

    if (!formData.email) {
      errors.email = "Email is required";
      hasErrors = true;
    }
    if (formData.email.length === 0) {
      alert("Email Address can not be empty");
      return;
    }
    if (!formData.password) {
      errors.password = "Password is required";
      hasErrors = true;
    }
    setFormErrors(errors);

    if (formData.password.length < 8 || formData.password.length > 8) {
      alert("Password must equal to 8 characters.");
      return;
    }

    let countUpperCase = 0;
    let countLowerCase = 0;
    let countDigit = 0;
    let countSpecialCharacters = 0;

    for (let i = 0; i < formData.password.length; i++) {
      const specialChars = [
        "!",
        "@",
        "#",
        "$",
        "%",
        "^",
        "&",
        "*",
        "(",
        ")",
        "_",
        "-",
        "+",
        "=",
        "[",
        "{",
        "]",
        "}",
        ":",
        ";",
        "<",
        ">",
      ];

      if (specialChars.includes([i])) {
        countSpecialCharacters++;
      } else if (!isNaN(formData.password[i] * 1)) {
        countDigit++;
      } else {
        if (formData.password[i] === formData.password[i].toUpperCase()) {
          countUpperCase++;
        }
        if (formData.password[i] === formData.password[i].toLowerCase()) {
          countLowerCase++;
        }
      }
    }

    if (countLowerCase !== 2) {
      alert("Password must contain 2 small letters");
      return;
    }

    if (countUpperCase !== 2) {
      alert("Password must contain 2 capital letters");
      return;
    }

    if (countDigit !== 2) {
      alert("Password must contains 2 numbers");
      return;
    }

    if (countSpecialCharacters !== 2) {
      alert("Password must contains 2 special characters");
      return;
    }
    if (!hasErrors) {
      console.log(formData);
    }
    alert("Form is valid");
  };
  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const subform2 = (e) => {
    e.preventDefault();
    const errors = {};
    let hasErrors = false;

    if (!formData.address) {
      errors.address = "Address is required";
      hasErrors = true;
    }
    if (formData.address.length !== 10) {
      alert("Address must be in 10 letters");
    }
    if (!formData.name) {
      errors.name = "Name is required";
      hasErrors = true;
    }
    if (formData.name.length < 2 && formData.name.length > 50) {
      alert("name must be greater than 2 and less than 50 characters ");
    }
    setFormErrors(errors);
    if (!hasErrors) {
      console.log(formData);
    }
  };

  const postdata = () => {
    axios
      .post("https://codebuddy.review/submit", {
        email: formData.email,
        password: formData.password,
        firstname: formData.firstname,
        lastname: formData.lastname,
        address: formData.address,
        countrycode: formData.countrycode,
        phone: formData.phone,
      })

      .then(() => {
        navigate("/posts");
      });
  };

  const submit = (e) => {
    e.preventDefault();

    const errors = {};
    let hasErrors = false;
    if (!formData.name) {
      errors.phone = "Phone number is required";
      hasErrors = true;
    }
    if (formData.phone.length !== 10) {
      alert("invalid phone number");
      return;
    }
    setFormErrors(errors);
    if (!hasErrors) {
      console.log(formData);
    }
    postdata();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h2>Form 1</h2>
            <br></br>
            <label>Email</label>
            <br></br>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            {formErrors.name && <span>{formErrors.name}</span>}
            <br></br>
            <br></br>
            <label>Password</label>
            <br></br>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            {formErrors.name && <span>{formErrors.name}</span>}
            <br></br>
            <br></br>
            <button disabled>Back</button>
            <button onClick={subform1}>Save</button>
            <button onClick={handleNextStep}>Save and Next</button>
          </div>
        );
      case 2:
        return (
          <div>
            <h2>Form 2</h2>
            <br></br>
            <br></br>
            <label>First name</label>
            <br></br>
            <input
              type="text"
              name="firstname"
              placeholder="Enter first name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            {formErrors.name && <span>{formErrors.name}</span>}
            <br></br>
            <br></br>
            <label>Last name</label>
            <br></br>
            <input
              type="text"
              name="lastname"
              placeholder="Enter last name"
              value={formData.lastname}
              onChange={handleInputChange}
            />
            <br></br>
            <br></br>
            <label>Address</label>
            <br></br>
            <input
              type="text"
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
            {formErrors.name && <span>{formErrors.name}</span>}
            <br></br>
            <br></br>
            <button onClick={handlePreviousStep}>Back</button>
            <button onClick={subform2}>Save</button>
            <button onClick={handleNextStep}>Save and Next</button>
          </div>
        );
      case 3:
        return (
          <div>
            <h2>Form 3</h2>
            <br></br>
            <br></br>
            <label>Country Code:</label>
            <br></br>
            <select
              name="countrycode"
              value={formData.countrycode}
              onChange={handleInputChange}
            >
              <option value="">Select Country Code</option>
              <option value="+91">India (+91)</option>
              <option value="+1">America (+1)</option>
            </select>
            <br></br>
            <br></br>
            <label>Phone number</label>
            <br></br>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              placeholder="Enter Phone number"
              onChange={handleInputChange}
              required
            />
            {formErrors.name && <span>{formErrors.name}</span>}
            <br></br>
            <br></br>
            <button onClick={handlePreviousStep}>Back</button>
            <button onClick={submit}>Save</button>
            <button disabled>Save and next</button>
          </div>
        );
      default:
        return null;
    }
  };

  return <form>{renderStep()}</form>;
};

export default SteppedForm;
