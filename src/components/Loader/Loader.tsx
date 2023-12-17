import React from "react";
import { DotLoader } from "react-spinners";

const Loader = () => (
  <div className="absolute inset-0 flex justify-center items-center bg-neutral-300 opacity-80">
    <DotLoader color="#000" />
  </div>
);

export { Loader };
