"use client";
import { useActiveAccount } from "thirdweb/react";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/server";
import { myChain } from "@/server/contracts/message";

import { ReceiveMessage } from "@/components/message/receiveMessage";
import { SendMessage } from "@/components/message/sendMessage";

export default function Message() {
  const activeAccount = useActiveAccount();

  return (
    <main className="min-h-full max-h-full flex flex-col justify-start container max-w-screen-lg mx-auto">
      {activeAccount ? (
        <div className="grid grid-cols-2 gap-8 mt-6">
          {/* Left Column: Received Messages */}
          <div className="h-[92vh] border rounded border-gray-700 bg-black p-6 overflow-y-auto">
            {/* Header Row */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-4xl font-bold">Messages</h1>
              <ConnectButton
                client={client}
                chain={myChain}
                appMetadata={{
                  name: "Example App",
                  url: "localhost:3000",
                }}
              />
            </div>
            <ReceiveMessage />
          </div>

          {/* Right Column: Send Message */}
          <div className="h-[92vh] border rounded border-gray-700 bg-black p-4 overflow-y-auto">
            <SendMessage />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <ConnectButton
            client={client}
            chain={myChain}
            appMetadata={{
              name: "Example App",
              url: "localhost:3000",
            }}
          />
        </div>
      )}
    </main>
  );
}