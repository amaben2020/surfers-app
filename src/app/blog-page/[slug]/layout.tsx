import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="border-gray-500 p-8">
      <p className="text-black"> NAVBAR for blog</p>
      {children}
    </div>
  );
};

export default layout;
