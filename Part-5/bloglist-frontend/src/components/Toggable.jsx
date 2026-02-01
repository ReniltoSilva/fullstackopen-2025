import { useState, useImperativeHandle, forwardRef } from "react";

const Toggable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideButtonCreate = { display: visible ? "none" : "" };
  const showButtonCancel = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      <div style={showButtonCancel}>
        {visible ? props.children : null}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>

      <button
        name="New Blog"
        onClick={toggleVisibility}
        style={hideButtonCreate}
      >
        {props.btnName}
      </button>
    </div>
  );
});

export default Toggable;
