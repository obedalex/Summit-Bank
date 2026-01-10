import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { registerSW } from 'virtual:pwa-register';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store.jsx';


import App from './App.jsx';
import AdminLayout from './App.jsx';
import AdminWalletList from './components/wallet/AdminWalletList.jsx';
import WalletLayout from './components/WalletLayout/WalletLayout.jsx';
import ViewAllWallets from './components/wallet/ViewAllWallets.jsx';
import CreditWallet from './components/wallet/CreditWallet.jsx';
import DebitWallet from './components/wallet/DebitWallet.jsx';
import ReverseTransactions from './components/wallet/ReverseTransactions.jsx';
import WalletSettings from './components/wallet/WalletSettings.jsx';
import FreezeWallet from './components/wallet/FreezeWallet.jsx';
import WalletTransactions from './components/wallet/WalletTransactions.jsx';
import SingleWallet from './components/wallet/SingleWallet.jsx';
import CardHome from './components/card/CardHome.jsx';
import BankHome from './components/bank/BankHome.jsx';
import KycHome from './components/kyc/KycHome.jsx';
import UserHome from './components/users/UserHome.jsx';
import CreateWallet from './components/wallet/CreateWallet.jsx';
import LoginSignup from './page/LoginSignup.jsx';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute.jsx';

// Register the service worker
registerSW({
  onNeedRefresh() {
    // Optional: notify the user to reload the page
  },
  onOfflineReady() {
    console.log('App is ready to work offline');
  },
});

const router = createBrowserRouter([
  // PUBLIC ROUTES
  {
    path: "/",
    element: <LoginSignup />,
  },

  // PROTECTED ROUTES WRAPPED AROUND ADMIN LAYOUT
  {
    element: <ProtectedRoute />, // Protect everything inside here
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          /* ---------------- WALLET ROUTES ---------------- */
          { index: true, element: <WalletLayout /> }, // default /admin page
          { path: "wallets", element: <WalletLayout /> },
          { path: "wallets/create", element: <CreateWallet /> },
          { path: "wallets/all", element: <ViewAllWallets /> },
          { path: "wallets/credit", element: <CreditWallet /> },
          { path: "wallets/debit", element: <DebitWallet /> },
          { path: "wallets/reverse", element: <ReverseTransactions /> },
          { path: "wallets/settings/:walletId", element: <WalletSettings /> },
          { path: "wallets/freeze/:walletId", element: <FreezeWallet /> },
          { path: "wallets/transactions/:walletId", element: <WalletTransactions /> },
          { path: "wallets/single/:walletId", element: <SingleWallet /> },

          /* ---------------- CARD ROUTES ---------------- */
          { path: "cards", element: <CardHome /> },

          /* ---------------- BANK ROUTES ---------------- */
          { path: "banks", element: <BankHome /> },

          /* ---------------- KYC ROUTES ---------------- */
          { path: "kyc", element: <KycHome /> },

          /* ---------------- USER ROUTES ---------------- */
          { path: "users", element: <UserHome /> },
        ],
      },
    ],
  },
]);



// Render the app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    


    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        
          <RouterProvider router={router} />
        
      </PersistGate>
    </Provider>
   
  </StrictMode>
);

