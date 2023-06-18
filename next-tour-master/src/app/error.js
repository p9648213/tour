"use client";

const Error = ({ error, reset }) => {
  return (
    <div>
      <h2>{error.toString()}</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
};

export default Error;
