

### 3. SendMessage.tsx

保持之前的逻辑不变，用于输入接收者地址和消息内容，并使用 TransactionButton 发送消息。

```tsx
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
      <h1 className="text-4xl font-bold mb-6">Send Message</h1>
      <div className="flex flex-col gap-6 w-full max-w-lg">
        <Input
          type="text"
          placeholder="Recipient Address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
        <Textarea
          placeholder="Message Content"
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
            console.log("Message sent successfully");
          }}
          onTransactionSent={() => console.log("Sending message...")}
          className="px-4 py-2 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-300 transition-all duration-300"
        >
          Send Message
        </TransactionButton>
      </div>
    </div>
  );
}
```

------

### 4. Message.tsx（最终页面）

在最终页面中，我们判断是否连接了钱包。如果连接，则采用 grid 布局，左侧显示接收消息（ReceiveMessage，内部使用 AccordionEntry 展示数据），右侧显示发送消息（SendMessage）；如果未连接，则仅显示连接按钮。

```tsx
"use client";
import { useActiveAccount } from "thirdweb/react";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/server";
import { myChain } from "@/server/contracts/message";

// 引入拆分后的两个组件
import { ReceiveMessage } from "@/components/message/ReceiveMessage";
import { SendMessage } from "@/components/message/SendMessage";

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
        // 未连接钱包时仅显示连接按钮
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
```

------

### 总结

- **AccordionEntry.tsx**
   保持了你提供的手风琴式展示组件。
- **ReceiveMessage.tsx**
   调用智能合约获取消息，并将数据转换后传入 AccordionEntry 进行展示，同时包含刷新按钮和加载状态提示，逻辑与原始代码一致。
- **SendMessage.tsx**
   负责发送消息，使用 TransactionButton 完成合约调用。
- **Message.tsx**
   整体页面逻辑保持不变，通过 grid 布局分左右两栏，左侧接收消息（展示 AccordionEntry，内部由 ReceiveMessage 包裹），右侧用于发送消息。如果钱包未连接，则仅展示连接按钮。

这样既保证了原始的总体逻辑，又直接使用了你提供的 AccordionEntry 组件。