"use client";

import { useEffect, useState } from "react";
import api from "../../services/api";
import { useParams } from "next/navigation";

export default function HomePage() {
  const [status, setStatus] = useState("");

  useEffect(() => {
    api.get("/cms/status").then((res) => {
      console.log(res.data);
      setStatus(res.data.status);
    });
  }, []);

  const { slug } = useParams();

  return (
    <div>
      <h1>Smart CMS</h1>
      <p>Status: {status}</p>
      <div>Blog post: {slug}</div>
    </div>
  );
}
