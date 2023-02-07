import React, { useState, useEffect } from "react";
import "../css/Createpost.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function Createpost() {
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  useEffect(() => {
    if (url) {
      fetch("http://localhost:5000/createPost", {
        method: "post",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            notifyA(data.error);
          } else {
            notifyB("Succesfully Posted");
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
      console.log(url);
    }
  }, [url]);

  const postDetails = () => {
    console.log(body, image);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "instaaacloudd");
    fetch("https://api.cloudinary.com/v1_1/instaaacloudd/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => setUrl(data.url))
      .catch((err) => console.log(err));
  };

  const loadfile = (event) => {
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };

  return (
    <div className="createPost">
      <div className="post-header">
        <h4 style={{ margin: "3px auto" }}>Create New Post</h4>
        <button
          onClick={() => {
            postDetails();
          }}
          id="post-btn"
        >
          Share
        </button>
      </div>
      <div className="main-div">
        <img
          id="output"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAB/CAMAAADxY+0hAAAAY1BMVEX///8AAADp6en5+fliYmJJSUn8/PxBQUFEREQ7Ozvw8PApKSk+Pj7Y2NhxcXHs7OyNjY2Dg4MzMzMdHR2np6evr6/e3t5dXV1TU1PMzMzBwcF5eXmTk5MWFhaamppYWFgLCwtIb7/BAAAC2ElEQVRoge3a3ZqqIBQG4JByHNzmpGliZd3/Ve5pl3+wUAHBg72+w+Lp5THEBbLbYTAYDAaD2TYscB+m1JNjTNwnPiYwf/OAv3OD+B9vPCE/Ml965AkpJf/k1T+JfOhj6PWJQ8GnXnlCqNqv9q5SLfBzLn61XijPZ/3amf5KPed/iQNj3bBsxj845Xf0G/3/ww9LzpN0Kz+5Zq9bPT6cx13w4wfHfqLLz8M72otfk1EuA8uHL/C//0KPefATkSfk4dGnB9knhT+/AHiSt0W3ez+D/O4COPeBf/+Vfcv8ceyDl5+Qb+bJV6winqUnX1XG+/JVqyhf/hnm48CTz2G/Cj35FF5HtQtO575iAHwu/y78cu0HOcB3y033PjQCn522gs/qcz25RLtKfr/hYu+//99mqslR4Hn/lbV/+bS7TjUqhmPgEgy+sfX70S3tYAyT3j7O/VGPFpSW/vDpdp5sSZOiaRou7vPY+eOHezHVVBErPxXGlUEHbPxu7uyiv1dh4YfibUWGN7Z7H9qevQfK5mv78IM91uyAsa94rpNMWmI78ZmCJyQSfyloroV6jz8y8mml4n9Lm3HTf1NUJu8vW/nyI22QPdRSNS6M/JlXA8euIeuu010xLkx8xZqmT1vdlVH/WQR3wMBf8Gbi3QE+qj0f4CDU9xlU0InZc1aKS5/LKj6NiGkq8bdMfGDWXxygSNL1Gwsees+l6Ut7WZqR6lQ93/6lnFilafkpvJmjFaFI0vHpw54XiyQdf3LWXx5u6Cu2EvSTGPm2Q3+QwMBf8310zrT9VCq2bRJ1HWh3h+f8i+qnzFJRPd9m1oc7EOr4qw39PnsNX1VsW+W02C/vLvz3qZMFfrdHv3aaZf4qs76qA/O+y4MoxaxfrTjtAuHtAkHlP59O/bwd2hPnT7wEffTRRx999F/Z+vzn1udfNz//u/X5583Pf29+/n239fl/DAaDwWAwfvIXOTkzllzmdr0AAAAASUVORK5CYII="
        />
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            loadfile(event);
            setImage(event.target.files[0]);
          }}
        />
      </div>
      <div className="details">
        <div className="card-header">
          <div className="card-pic">
            <img
              src="https://images.unsplash.com/photo-1674502136430-723164156df8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
              alt=""
            />
          </div>
          <h5>Ramesh</h5>
        </div>
        <textarea
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
          type="text"
          placeholder="Write a caption..."
        ></textarea>
      </div>
    </div>
  );
}
