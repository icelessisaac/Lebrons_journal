"use client";

import { useState } from "react";
import { useContract, useSigner } from "thirdweb/react";
import crypto from "crypto-js";

export default function SendMessage() {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const { contract } = useContract("<your-contract-address>");
  const { data: signer } = useSigner();

  const handleSend = async () => {
    try {
      const encryptedMessage = crypto.AES.encrypt(
        message,
        "<recipient-public-key>"
      ).toString();
      const tx = await contract.call(
        "sendMessage",
        recipient,
        encryptedMessage,
        { from: signer }
      );
      console.log("Message sent:", tx);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Recipient Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <input
        type="text"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSend}>Send Message</button>
    </div>
  );
}
