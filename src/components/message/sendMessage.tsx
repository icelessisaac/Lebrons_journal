"use client";
import { CONTRACT } from "@/server/contracts/message";
import { prepareContractCall } from "thirdweb";
import { TransactionButton } from "thirdweb/react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function SendMessage() {
  const [recipient, setRecipient] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="flex flex-col items-center mt-8 w-full">
      <h1 className="text-4xl font-bold mb-6">Journal</h1>
      <div className="flex flex-col gap-6 w-full max-w-lg">
        <Input
          type="text"
          placeholder="Recipient Address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
        <Textarea
          placeholder="Write your entry here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
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
            console.log("Entry saved successfully!");
          }}
          onTransactionSent={() => console.log("Saving new journal entry...")}
          className="px-4 py-2 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-300 transition-all duration-300"
        >
          Save New Entry
        </TransactionButton>
      </div>
    </div>
  );
}
