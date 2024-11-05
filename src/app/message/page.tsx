
import { useConnect } from "thirdweb/react";
import { createWallet, injectedProvider } from "thirdweb/wallets";
import { client } from "../client";

export default function Home() {
  return (
    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
      <div className="py-20">
        <div className="flex justify-center mb-20">
          <Example />
        </div>
      </div>
    </main>
  );
}

function Example() {
  const { connect, isConnecting, error } = useConnect();
  return (
    <button
      onClick={() =>
        connect(async () => {
          const wallet = createWallet("com.okex.wallet"); // pass the wallet id

          // if user has wallet installed, connect to it
          if (injectedProvider("com.okex.wallet")) {
            await wallet.connect({ client });
          }

          // open WalletConnect modal so user can scan the QR code and connect
          else {
            await wallet.connect({
              client,
              walletConnect: { showQrModal: true },
            });
          }

          // return the wallet to set it as active wallet
          return wallet;
        })
      }
    >
      {isConnecting ? "Connecting..." : "Connect"}
    </button>
  );
}
