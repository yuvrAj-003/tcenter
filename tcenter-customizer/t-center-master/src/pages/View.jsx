import React, { useEffect, useState } from "react";
import state from "../config/store";
import { useSnapshot } from "valtio";
import CanvasBody from "../canvas";
import { db } from "../config/config";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
// errors
function View() {
  const navigate = useNavigate();
  const snap = useSnapshot(state);
  const { id } = useParams();

  if (id == undefined) {
    navigate("/nopage");
  }

  const getDataById = async () => {
    state.isLoading = true;
    try {
      const docSnap = await getDoc(doc(db, "customize", id));
      let customizeData = docSnap.data();
      state.texture = customizeData.texture;
      state.color = customizeData.color;
      state.position = customizeData.position.split(" ").map((v) => Number(v));
      state.range = customizeData.range.split(" ").map((v) => Number(v));
      state.rotation = customizeData.rotation.split(" ").map((v) => Number(v));

      state.isLoading = false;
    } catch (e) {
      state.isLoading = false;
      navigate("/nopage");
    }
  };
  useEffect(() => {
    getDataById();
  }, []);
  return (
    <div>
      <CanvasBody />
    </div>
  );
}

export default View;
