import { createThirdwebClient, defineChain } from "thirdweb";
import { ethereum, polygon } from "thirdweb/chains";
// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID;

if (!clientId) {
  throw new Error("No client ID provided");
}

export const client = createThirdwebClient({
  clientId: clientId,
});

export const myChain = ethereum;
export const myChain1 = polygon;

const contractAddresscounter = "0x5feD8a97808977ee6d8fE0c5996c216a7599df46";
const contractABIcounter = [
  {
    inputs: [],
    name: "count",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decrement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "increment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export const CONTRACTcounter = {
  client: client,
  chain: myChain,
  address: contractAddresscounter,
  abi: contractABIcounter,
};
