"use client";
import thirdwebIcon from "@public/thirdweb.svg";
import Image from "next/image";

import { ConnectButton, useActiveAccount } from "thirdweb/react";

import { client } from "@/server";
import { myChain } from "@/server/contracts/message";

// 导入 SendMessage 和 ReceiveMessage 组件
import { SendMessage } from "@/components/message/sendMessage";
import { ReceiveMessage } from "@/components/message/receiveMessage";

export default function Message() {
  // 使用 useActiveAccount 钩子来检查用户是否已连接钱包
  const activeAccount = useActiveAccount();

  return (
    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
      <div className="py-20 w-full">
        <Header />

        <div className="flex flex-col items-center mb-20">
          <ConnectButton
            client={client}
            chain={myChain}
            appMetadata={{
              name: "Example App",
              url: "localhost:3000",
            }}
          />
          {/* 只有在钱包连接后才显示 SendMessage 和 ReceiveMessage 组件 */}
          {activeAccount && (
            <div className="flex flex-wrap justify-center gap-8 mt-10">
              {/* 发送消息组件 */}
              <SendMessage />

              {/* 接收消息组件 */}
              <ReceiveMessage />
            </div>
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
