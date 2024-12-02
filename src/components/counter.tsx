import { CONTRACT } from "@/server/client";
import { useReadContract } from "thirdweb/react";

export function Counter() {
  const { data: count, isLoading: loadingCount } = useReadContract({
    contract: CONTRACT,
    method: "getCount",
  });
  return (
    <div style={{ marginTop: "20px" }}>
      <h1>Counter</h1>
      {loadingCount ? <h2>...</h2> : <h2>{count?.toString()}</h2>}
    </div>
  );
}
