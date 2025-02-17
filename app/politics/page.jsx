"use client"; 
import dynamic from "next/dynamic";

const Politics = dynamic(() => import("@/components/Politics"), {
  ssr: false,
});

export default Politics;
