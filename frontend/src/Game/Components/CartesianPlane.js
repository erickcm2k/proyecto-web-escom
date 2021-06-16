import React, { useRef, useEffect } from "react";
import { draw, drawUserLine } from "../../Helpers/canvasHelper";
const CartesianPlane = (props) => {
  const canvasRef = useRef();

  useEffect(() => {
    draw({ canvasRef, ...props });
  }, []);

  useEffect(() => {
    const { tries } = props;
    const { isCorrect } = props;
    const { formNumM, formDenomM, formB } = props.value;    

    if (tries === 0 && !isCorrect) {
      drawUserLine({ canvasRef, formNumM, formDenomM, formB });
    }
  }, [props.tries]);

  return (
    <canvas
      ref={canvasRef}
      height="650px"
      width="650px"
      style={{
        margin: "0 auto",
      }}
    ></canvas>
  );
};

export default CartesianPlane;
