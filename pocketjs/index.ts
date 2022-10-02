import { IsomorphicProvider } from "@pokt-foundation/pocketjs-isomorphic-provider";
import { KeyManager } from "@pokt-foundation/pocketjs-signer";
// import { TransactionBuilder } from '@pokt-foundation/pocketjs-transaction-builder'
// import { Relayer } from '@pokt-foundation/pocketjs-relayer'
import {
  MAINNET_RPC_URL,
  DISPATCHERS,
  // RELAY_DATA,
  // POCKET_AAT,
} from "./config";

// Instantiate a provider for querying information on the chain!
export const provider = new IsomorphicProvider({
  rpcUrl: MAINNET_RPC_URL,
  // If you'll Instantiate a relayer, you need to add dispatchers as well
  dispatchers: DISPATCHERS.map((dispatcher) => dispatcher.toString()),
});

export default async function pocketjs() {
  const balance = await provider.getBalance(
    "07a6fca4dea9f01e4c19f301df0d0afac128561b"
  );

  // Instantiate a signer for importing an account and signing messages!
  const signer = await KeyManager.fromPrivateKey(
    process.env.PRIVATE_KEY as string
  );

  const address = signer.getAddress();
  const publicKey = signer.getPublicKey();
  const signedMessage = signer.sign("deadbeef");

  /** Transaction signing and sending */
  // Instantiate a new TransactionBuilder for creating transaction messages and
  // and sending them over the network!
  // export const transactionBuilder = new TransactionBuilder({
  //   provider,
  //   signer,
  // })

  // Create a new `Send` Message which is used to send funds over the network.
  // const sendMsg = transactionBuilder.send(
  //   signer.getAddress(),
  //   '07a6fca4dea9f01e4c19f301df0d0afac128561b',
  //   // Amount in uPOKT (1 POKT = 1*10^6 uPOKT)
  //   '1000000'
  // )

  // Send it over the network!
  // const txresponse = await transactionBuilder.submit({
  //   memo: 'POKT Payment',
  //   txMsg: sendMsg,
  // })

  /** Use Pocket Network RPC/relay services */
  // Create a new relayer to send relays over the network!
  // export const relayer = new Relayer({
  //   keyManager: signer,
  //   provider,
  //   dispatchers: DISPATCHERS,
  // })

  // const session = await relayer.getNewSession({
  //   chain: process.env.APP_CHAIN,
  //   applicationPubKey: process.env.APP_PUBLIC_KEY,
  // })

  // const relay = await relayer.relay({
  //   data: process.env.RELAY_DATA,
  //   blockchain: process.env.APP_CHAIN,
  //   pocketAAT: POCKET_AAT,
  //   session: session,
  // })
  return {
    balance,
    address,
    publicKey,
    signedMessage,
    // txresponse,
    // relay,
  };
}
