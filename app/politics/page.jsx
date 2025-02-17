import dynamic from "next/dynamic";

const Politics = dynamic(() => import("../path/to/Politics"), {
  ssr: false,
});

export default Politics;
