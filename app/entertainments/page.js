"use client"; 
import dynamic from "next/dynamic";

const Entertainments = dynamic(() => import("../../components/Entertainment"), {
  ssr: false,
});

export default Entertainments;

