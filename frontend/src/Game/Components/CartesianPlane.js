import React, { useRef, useEffect } from "react";
import { draw, drawUserLine } from "../../Helpers/canvasHelper";
const CartesianPlane = (props) => {
  const canvasRef = useRef();

  // Se resuelve el bug que no permite acceder al contenido de props.levelData
  useEffect(() => {
    try {
      const { b, denominadorM, numeradorM } = props.levelData;
      draw({ canvasRef, numeradorM, denominadorM, b });
    } catch (error) {
      console.log(error);
    }
  });

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
