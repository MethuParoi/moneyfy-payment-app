"use client";

import Login from "../../../components/authentication/Login";
import React, { useState } from "react";
import { InfoModal } from "../../../components/authentication/InfoModal";
import { showInfoModal } from "../../../store/features/ui/uiSlice";
import { useDispatch, useSelector } from "react-redux";

function SingnInPage() {
  const dispatch = useDispatch();
  const setModal = useSelector((state) => state.ui.showInfoModal);

  const modalHandler = () => {
    dispatch(showInfoModal(false));
  };
  return (
    <>
      <div className="flex items-center justify-center mx-auto">
        <Login />
      </div>
      {setModal && <InfoModal modalHandler={modalHandler} />}
    </>
  );
}

export default SingnInPage;
