"use client";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

const Error = ({ error, reset }: ErrorProps) => {
  return (
    <div>
      Error
      <h2 className="text-lg text-black font-bold">{error.message}</h2>
      <h2 className="text-lg text-black font-bold">{error.name}</h2>
      <button
        className="text-lg text-black font-bold border rounded-lg"
        onClick={() => reset()}
      >
        {" "}
        Reset
      </button>
    </div>
  );
};

export default Error;
