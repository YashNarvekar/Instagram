import React from "react";
import { RiCloseLine } from "react-icons/ri";
import "../css/Modal.css";
import { Link, useNavigate } from "react-router-dom";
export default function Modal({ setModalOpen }) {
  const navigate = useNavigate();

  return (
    <div className="darkBg" onClick={() => setModalOpen(false)}>
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading"></h5>
          </div>
          <button onClick={() => setModalOpen(false)} className="closeBtn">
            <RiCloseLine></RiCloseLine>
          </button>
          <div className="modalContent">Are you really want to logout??</div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button
                className="logOutBtn"
                onClick={() => {
                  setModalOpen(false);
                  localStorage.clear();
                  navigate("/signin");
                }}
              >
                Log Out
              </button>
              <button className="cancelBtn" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
