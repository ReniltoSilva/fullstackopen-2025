import { forwardRef } from "react";
import { useState, useImperativeHandle } from "react";

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
      <div>
        <div>{visible ? props.children : null}</div>
        <button onClick={toggleVisibility} style={showButtonCancel}>
          Cancel
        </button>
      </div>

      <button onClick={toggleVisibility} style={hideButtonCreate}>
        Create new blog
      </button>
    </div>
  );
});

export default Toggable;
