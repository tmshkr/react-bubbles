import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

import ColorForm from "./ColorForm";

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);

  const editColor = color => {
    setEditing(color);
  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then(res => updateColors());
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {(editing || adding) && (
        <ColorForm
          add={[adding, setAdding]}
          edit={[editing, setEditing]}
          updateColors={updateColors}
        />
      )}
      {!adding && !editing && (
        <button onClick={() => setAdding(true)}>Add Color</button>
      )}
    </div>
  );
};

export default ColorList;
