"use client";

import { useEffect, useState } from "react";
import api from "./services/api";

export default function Home() {
  const [status, setStatus] = useState("");

  useEffect(() => {
    api.get("/cms/status").then((res) => {
      console.log(res.data);
      setStatus(res.data.status);
    });
  }, []);

  return (
    <div>
      <h1>Smart CMS</h1>
      <p>Status: {status}</p>
    </div>
  );
}
