import React, { ReactNode } from "react";

type props = {
  children: ReactNode;
  customeStyle?:string;
};
const Container = ({ children ,customeStyle }: props) => {
    return <div className={`px-5 xl:px-[180px] ${customeStyle}`}>{children}</div>;
}

export default Container

