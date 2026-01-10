// WalletPage.jsx
import React from "react";
import MainWallet from "../../ReuseableCards/walletsCards/MainWallet";
import Cards from "../../ReuseableCards/walletsCards/Cards";
import QuickSend from "../../ReuseableCards/walletsCards/QuickSend";
import CreateCards from "../../ReuseableCards/CreateCards/CreateCards";


export default function WalletPage() {
  return (
    <main className="w-full flex flex-col lg:px-8 py-4">

      {/* MAIN WALLET SECTION */}
      <section className="flex  flex-col gap-2 w-full rounded-xl ">
        
        {/* RIGHT — Main Wallet */}
        
          <MainWallet />
       
       {/* Create Cards */}
          <CreateCards/>
        {/* cards */}

        <Cards />

        
        {/* quick send */}
        <div className="mb-12 lg:mb-0">
            <QuickSend/>
            </div>


      </section>
    </main>
  );
}
