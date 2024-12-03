"use client";
import { CONTRACT } from "@/server/contracts/message";
import { prepareContractCall } from "thirdweb";
import { TransactionButton } from "thirdweb/react";
import { useState } from "react";

export function SendMessage() {
  const [recipient, setRecipient] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-4xl font-bold mb-4">Send Message</h1>
      <div className="flex flex-col gap-4 w-1/2">
        <input
          type="text"
          placeholder="Recipient Address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="border px-4 py-2 rounded-md"
        />
        <textarea
          placeholder="Message Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border px-4 py-2 rounded-md"
        />
        <TransactionButton
          transaction={() =>
            prepareContractCall({
              contract: CONTRACT,
              method: "sendMessage",
              params: [recipient, content],
            })
          }
          onTransactionConfirmed={() => {
            setRecipient("");
            setContent("");
            console.log("Message sent successfully");
          }}
          onTransactionSent={() => console.log("Sending message...")}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
        >
          Send Message
        </TransactionButton>
      </div>
    </div>
  );
}
