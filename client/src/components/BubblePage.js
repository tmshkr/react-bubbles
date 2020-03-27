import React, { useState, useEffect } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  useEffect(() => {
    getColors();
  }, []);

  const getColors = () => {
    axiosWithAuth()
      .get("/api/colors")
      .then(({ data }) => setColorList(data));
  };

  return (
    <>
      <ColorList colors={colorList} updateColors={getColors} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
