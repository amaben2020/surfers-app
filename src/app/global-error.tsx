// The global-error.tsx boundary wraps the entire app, so be sure to add your own unique <html> and <body> tags when using this file.

// This error boundary catches any errors that weren’t caught by other nested error.tsx boundaries, and as such it won’t be activated often.

"use client";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

const GlobalError = ({ error, reset }: ErrorProps) => {
  return (
    <div>
      GlobalError {error.name} <button onClick={reset}>Reset</button>
    </div>
  );
};

export default GlobalError;
