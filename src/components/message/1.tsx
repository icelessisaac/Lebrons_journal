"use client";
import { CONTRACT } from "@/server/contracts/message";
import { prepareContractCall } from "thirdweb";
import { TransactionButton, useReadContract } from "thirdweb/react";
import { useState } from "react";

export function SendMessage() {
  const [toAddress, setToAddress] = useState<string>("");
  const [messageContent, setMessageContent] = useState<string>("");

  const {
    data: messages,
    isLoading: loadingMessages,
    refetch,
  } = useReadContract({
    contract: CONTRACT,
    method: "receiveMessagesContentWithSender",
  });

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-4xl font-bold mb-4">Send Message</h1>
      <div className="w-full max-w-md space-y-4">
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-1" htmlFor="toAddress">
            Recipient Address:
          </label>
          <input
            type="text"
            id="toAddress"
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={toAddress}
            onChange={(e) => setToAddress(e.target.value)}
            placeholder="Enter recipient's wallet address"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-1" htmlFor="messageContent">
            Message Content:
          </label>
          <textarea
            id="messageContent"
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            placeholder="Enter your message"
          />
        </div>
        <TransactionButton
          transaction={() =>
            prepareContractCall({
              contract: CONTRACT,
              method: "sendMessage",
              params: [toAddress, messageContent],
            })
          }
          onTransactionConfirmed={() => {
            console.log("Message sent successfully!");
            refetch();
          }}
          onTransactionSent={() => console.log("Sending message...")}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 w-full"
        >
          Send Message
        </TransactionButton>
      </div>
      <div className="w-full max-w-md mt-8">
        <h2 className="text-2xl font-semibold mb-4">Received Messages</h2>
        {loadingMessages ? (
          <p>Loading messages...</p>
        ) : messages && messages[0].length > 0 ? (
          <div className="space-y-4">
            {messages[0].map((content: string, index: number) => (
              <div
                key={index}
                className="p-4 border rounded-md shadow-md bg-gray-50"
              >
                <p className="text-lg font-medium">
                  From: {messages[1][index]}
                </p>
                <p className="text-gray-700">{content}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No messages received.</p>
        )}
      </div>
    </div>
  );
}
