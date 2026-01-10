// src/pages/Transaction/TransactionPage.jsx
import React, { useState } from "react";
import CreditWallet from "../../components/transactions/CreditWallet";

import { Outlet } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import {DotLoader} from "react-spinners"
import SelectorTabs from "../../components/transactions/SelectorTabs";

export default function TransactionPage() {
  const [loadingOutlet, setLoadingOutlet] = useState(false);

  // Triggered when user clicks a selector tab
  const handleSelect = () => {
    setLoadingOutlet(true);

    // simulate network loading for 3 seconds
    setTimeout(() => {
      setLoadingOutlet(false);
    }, 5000);
  };

  return (
    <>
      <main className="lg:mx-auto lg:max-w-5xl w-full min-h-screen lg:px-10 px-2 py-6">

        {/* CREDIT WALLET TOP CARD */}
        <CreditWallet />

        {/* SELECTOR TABS */}
        <SelectorTabs onSelect={handleSelect} />

        {/* CONTENT AREA */}
        <div className="my-6">
          {loadingOutlet ? (
            <div className="w-full flex justify-center py-6 flex-col gap-2 items-center">
              <DotLoader color="#090d17" size={40} />
              <small className="text-blue-600">please wait...</small>
            </div>
          ) : (
            <Outlet />
          )}
        </div>

      </main>
    </>
  );
}
