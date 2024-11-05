"use client";

import { useState } from "react";
import Image from "next/image";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import thirdwebIcon from "@public/thirdweb.svg";
import { client } from "../client";
import { ActiveAcc } from "@/components/activeAcc";

export default function Message() {
  // 使用 useActiveAccount 钩子来检查用户是否已连接钱包
  const activeAccount = useActiveAccount();
  const [recipientAddress, setRecipientAddress] = useState("");
  const [message, setMessage] = useState("");

  // 处理发送消息的函数
  const handleSendMessage = () => {
    if (!recipientAddress || !message) {
      alert("Please fill in both recipient address and message.");
      return;
    }
    // 这里可以实现发送消息的逻辑
    console.log("Message sent to:", recipientAddress, "Message:", message);
  };

  return (
    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
      <div className="py-20 w-full">
        <Header />

        <div className="flex flex-col items-center mb-20">
          {/* ConnectButton 连接按钮 */}
          <ConnectButton
            client={client}
            appMetadata={{
              name: "Example App",
              url: "localhost:3000",
            }}
          />
          {/* 只有在钱包连接后才显示 ActiveAcc 组件和发送消息表单 */}
          {activeAccount && (
            <>
              <ActiveAcc />
              <div className="w-full max-w-md mt-10">
                <label
                  className="block text-zinc-100 text-sm font-bold mb-2"
                  htmlFor="recipientAddress"
                >
                  Recipient Address
                </label>
                <input
                  type="text"
                  id="recipientAddress"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter recipient address"
                />
                <label
                  className="block text-zinc-100 text-sm font-bold mt-4 mb-2"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your message"
                />
                <button
                  onClick={handleSendMessage}
                  className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Send Message
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

function Header() {
  return (
    <header className="flex flex-col items-center mb-20 md:mb-20">
      <Image
        src={thirdwebIcon}
        alt=""
        className="size-[150px] md:size-[150px]"
        style={{
          filter: "drop-shadow(0px 0px 24px #a726a9a8)",
        }}
      />

      <h1 className="text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-6 text-zinc-100">
        DIAO
        <span className="text-zinc-300 inline-block mx-1"> + </span>
        <span className="inline-block -skew-x-6 text-blue-500"> CHAT </span>
      </h1>

      <p className="text-zinc-300 text-base">
        The true
        <code className="bg-zinc-800 text-zinc-300 px-2 rounded py-1 text-sm mx-1">
          DAPP
        </code>{" "}
        on EVM.
      </p>
    </header>
  );
}
