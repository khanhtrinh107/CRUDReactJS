import { useState } from "react";

const LoginHeader = () => {
    const headerStyle = {
        overflow: "hidden",
        background: "green",
        display: "flex",
        justifyContent: "space-between"
    };
    const[message, setMessage] = useState("Xin chao ban!");
    return (
        <div style={headerStyle}>
        <h1>{message}</h1>
        <button onclick={() => setMessage("Ban da dang nhap thanh cong")}>
          Dang nhap
        </button>
      </div>
    )
}
export default LoginHeader;