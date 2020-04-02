import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axiosWithAuth from "../utils/axiosWithAuth";

function ColorForm(props) {
  const { handleSubmit, register, errors, setValue } = useForm();
  const { add, edit, updateColors } = props;
  const [adding, setAdding] = add;
  const [editing, setEditing] = edit;

  useEffect(() => {
    if (editing) {
      setValue([{ color: editing.color }, { hex: editing.code.hex }]);
    }
  }, [editing]);

  const cancel = () => {
    setAdding(false);
    setEditing(false);
  };

  const onSubmit = values => {
    editing ? saveEdit(values) : addColor(values);
  };

  const addColor = values => {
    const { color, hex } = values;
    const newColor = {
      id: editing.id,
      color,
      code: { hex }
    };
    axiosWithAuth()
      .post(`/api/colors`, newColor)
      .then(res => {
        setAdding(false);
        updateColors();
      });
  };

  const saveEdit = values => {
    const { color, hex } = values;
    const updatedColor = {
      id: editing.id,
      color,
      code: { hex }
    };
    axiosWithAuth()
      .put(`/api/colors/${editing.id}`, updatedColor)
      .then(res => {
        setEditing(false);
        updateColors();
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <legend>{editing ? "edit" : "add"} color</legend>
      <label style={errors.color && { color: "red" }}>
        color name:
        <input
          name="color"
          type="text"
          ref={register({
            required: "Required"
          })}
        />
      </label>
      <label style={errors.hex && { color: "red" }}>
        hex code:
        <input
          name="hex"
          type="text"
          ref={register({
            required: "Required"
          })}
        />
      </label>
      <div className="button-row">
        <button type="submit">save</button>
        <button onClick={cancel}>cancel</button>
      </div>
    </form>
  );
}

export default ColorForm;
