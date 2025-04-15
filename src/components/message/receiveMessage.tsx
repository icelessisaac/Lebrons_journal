"use client";
import { CONTRACT } from "@/server/contracts/message";
import { useReadContract, useActiveAccount } from "thirdweb/react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import AccordionEntry from "@/components/message/AccordionEntry";

export function ReceiveMessage() {
  const activeAccount = useActiveAccount();
  const walletAddress = activeAccount?.address;

  const {
    data: messages,
    isLoading: loadingMessages,
    refetch,
    isFetching,
  } = useReadContract({
    contract: CONTRACT,
    method: "receiveMessagesContentWithSender",
    params: [walletAddress as string],
  });

  // 假设合约返回的是一个数组，每个元素中第一项为消息内容
  const entries = Array.isArray(messages)
    ? messages.map((m, i) => ({
        index: i + 1,
        message: m[0],
      }))
    : [];

  return (
    <div>
      <Button
        onClick={() => refetch()}
        className="mb-4"
        disabled={isFetching}
        variant="default"
      >
        {isFetching ? (
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="animate-spin" />
            Refreshing...
          </div>
        ) : (
          "Refresh"
        )}
      </Button>
    <div className="flex flex-col items-center mt-8 w-full">
      {loadingMessages || isFetching ? (
        <div className="mt-4 flex items-center gap-2">
          <Loader2 className="animate-spin" />
          <span>Loading messages...</span>
        </div>
      ) : entries.length > 0 ? (
        <AccordionEntry entries={entries} />
      ) : (
        <div className="mt-4 text-center">
          <h2 className="text-xl font-bold">No messages received</h2>
          <p>You have not received any messages yet. Please check back later.</p>
        </div>
      )}
    </div>
    </div>
  );
}