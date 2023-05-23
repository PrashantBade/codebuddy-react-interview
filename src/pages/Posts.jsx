import React, { useState, useEffect } from "react";
import axios from "axios";

const Post = () => {
  const [info, setInfo] = useState([]);

  const getdata = () => {
    axios.get("https://codebuddy.review/posts").then((res) => {
      console.log(res.data);
      setInfo(res.data);
    });
  };

  useEffect(() => {
    getdata();
  }, []);
  return (
    <div>
      {info !== [] &&
        info.map((data, i) => {
          return (
            <div className="container">
              <div
                class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3"
                key={i}
              >
                <div class="col">{data.formData.firstname}</div>
                <div class="col">{data.formData.lastname}</div>
                <div class="col">{data.formData.email}</div>
                <div class="col">{data.formData.password}</div>
                <div class="col">{data.formData.address}</div>
                <div class="col">{data.formData.countrycode}</div>
                <div class="col">{data.formData.phone}</div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Post;

