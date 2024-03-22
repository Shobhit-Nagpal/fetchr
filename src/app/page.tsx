"use client";

import AddressForm from "@/components/AddressForm";
import { useState } from "react";
import * as web3 from "@solana/web3.js";

export default function Home() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [executable, setExecutable] = useState(false);

  async function addressSubmittedHandler(address: string) {
    try {
      setAddress(address);
      const key = new web3.PublicKey(address);
      const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
      const balance = await connection.getBalance(key);
      const info = await connection.getAccountInfo(key);
      if (!info) {
        throw new Error("Did not get back info");
      }
      setBalance(balance / web3.LAMPORTS_PER_SOL);
      setExecutable(info.executable);
    } catch (err) {
      setAddress("");
      setBalance(0);
      alert(err);
      return;
    }
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1 className="text-3xl font-bold">Balance Fetchr</h1>
      <div className="mt-12">
        <AddressForm handler={addressSubmittedHandler} />
        <p className="mt-5">{`Address: ${address}`}</p>
        <p className="mt-5">{`Balance: ${balance}`}</p>
        <p className="mt-5">{`Executable: ${executable}`}</p>
      </div>
    </main>
  );
}
