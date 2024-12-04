"use client";
import { CONTRACT } from "@/server/contracts/message";
import { useReadContract } from "thirdweb/react";
import { useActiveAccount } from "thirdweb/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

export function ReceiveMessage() {
  const activeAccount = useActiveAccount();
  const walletAddress = activeAccount?.address;
  console.log("walletAddress: ", walletAddress);

  const {
    data: messages,
    isLoading: loadingMessages,
    refetch,
    isFetching,
  } = useReadContract({
    contract: CONTRACT,
    method: "receiveMessagesContentWithSender",
    params: [walletAddress as string], // 确保参数为 string[]
  });

  console.log("message:", messages);

  return (
    <div className="flex flex-col items-center mt-8">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold mb-4">
            Received Messages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => refetch()}
            className="mb-4 w-full"
            disabled={isFetching}
            variant="default"
          >
            {isFetching ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin" />
                Refreshing...
              </div>
            ) : (
              "Refresh Messages"
            )}
          </Button>

          {loadingMessages || isFetching ? (
            <Alert className="mt-4" variant="default">
              <Loader2 className="animate-spin mr-2" />
              <AlertDescription>Loading messages...</AlertDescription>
            </Alert>
          ) : messages && messages[0].length > 0 ? (
            <ul className="w-full">
              {messages[0].map((content: string, index: number) => (
                <li key={index} className="my-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Message {index + 1}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="font-semibold">
                        From: {messages[1][index]}
                      </p>
                      <p className="mt-2">Message: {content}</p>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
          ) : (
            <Alert className="mt-4">
              <AlertTitle>No messages received</AlertTitle>
              <AlertDescription>
                You have not received any messages yet. Please check back later.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
