"use client";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { CONTRACT } from "@/server/contracts/message";

export function ReceiveMessage() {
  const { contract } = useContract(CONTRACT.address, CONTRACT.abi);

  const {
    data: messages,
    isLoading: loadingMessages,
    refetch,
    error,
  } = useContractRead(contract, "receiveMessagesContentWithSender");

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-4xl font-bold mb-4">Received Messages</h1>
      <button
        onClick={() => refetch()}
        className="mb-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
      >
        Refresh Messages
      </button>
      {loadingMessages ? (
        <h2 className="text-2xl">...loading</h2>
      ) : error ? (
        <h2 className="text-2xl text-red-500">Error: {error.message}</h2>
      ) : messages && messages[0].length > 0 ? (
        <ul className="w-full max-w-lg">
          {messages[0].map((content: string, index: number) => (
            <li key={index} className="border-b py-4">
              <p className="font-semibold">From: {messages[1][index]}</p>
              <p className="mt-2">Message: {content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <h2 className="text-2xl">No messages received.</h2>
      )}
    </div>
  );
}
