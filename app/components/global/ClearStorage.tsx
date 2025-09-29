"use client";
import { useEffect } from "react";

export default function ClearStorage() {
  useEffect(() => {
    localStorage.clear(); // Clears all local storage
    // Or localStorage.removeItem("yourKey");
  }, []);

  return null; // nothing to render
}