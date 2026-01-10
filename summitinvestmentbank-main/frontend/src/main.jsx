import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { registerSW } from 'virtual:pwa-register';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store.jsx';


import App from './App.jsx';
import WalletPage from './pages/wallet/WalletPage.jsx';
import HomeDashboard from './components/dashboard/HomeDashboard.jsx';
import UserProfilePage from './pages/User/UserProfilePage.jsx';
import KYC from './pages/KYC/KYC.jsx';
import TransactionPage from './pages/Transaction/TransactionPage.jsx';
import WalletToCard from './components/Transfers/WalletToCard.jsx';
import WalletToBank from './components/Transfers/WalletToBank.jsx';
import CardToWallet from './components/Transfers/CardToWallet.jsx';
import CardToCard from './components/Transfers/CardToCard.jsx';
import BankToBank from './components/Transfers/BankToBank.jsx';
import CardToBank from './components/Transfers/CardToBank.jsx';
import BankToCard from './components/Transfers/BankToCard.jsx';
import BankToWallet from './components/Transfers/BankToWallet.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import LandingPage from './pages/landingPage/LandingPage.jsx';
import AccountPage from './pages/AccountPage/AccountPage.jsx';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute.jsx';
import AboutPage from './pages/AboutPage/AboutPage.jsx';
import WealthPage from './pages/WealthPage/WealthPage.jsx';




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
  {
    path: "/login-signup",
    element: <LoginPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/wealth",
    element: <WealthPage />,
  },
  {
    path:"/",
    element:<LandingPage/>
  },
  

  {
    element:<ProtectedRoute/>,
    children:[
      {
 path: "/dashboard",
    element: <App />,
    children: [
      { path: "/dashboard", element: <HomeDashboard /> }, // default page
      { path: "/dashboard/wallet", element: <WalletPage /> },
      { path: "/dashboard/profile", element: <UserProfilePage /> },
      { path: "/dashboard/kyc", element: <KYC /> },
      { path: "/dashboard/account", element: <AccountPage/> },

      {
        path: "transactions",
        element: <TransactionPage />,
        children: [
          { path: "wallet-to-card", element: <WalletToCard /> },
          { path: "wallet-to-bank", element: <WalletToBank /> },
          { path: "bank-to-wallet", element: <BankToWallet /> },
          { path: "card-to-wallet", element: <CardToWallet /> },
          { path: "card-to-card", element: <CardToCard /> },
          { path: "card-to-bank", element: <CardToBank /> },
          { path: "bank-to-card", element: <BankToCard /> },
          { path: "bank-to-bank", element: <BankToBank /> },
        ],
      },
    ],
  },
]
  }
    ]
   
  )


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

// {
//   "version": 2,
//     "rewrites": [
//       {
//         "source": "/(.*)",
//         "destination": "/index.html"
//       }
//     ],
//   "builds": [
//     { "src": "dist/**", "use": "@vercel/static" }
//   ],
//   "routes": [
//     { "handle": "filesystem" },
//     { "src": "/(.*)", "dest": "/index.html" }
//   ]
// }

// {
//   "version": 2,
//   "builds": [
//     { "src": "dist/**", "use": "@vercel/static" }
//   ],
//   // "rewrites": [
//   //     {
//   //       "source": "/(.*)",
//   //       "destination": "/index.html"
//   //     }
//   //   ],
//   "routes": [
//     {
//       "src": "/assets/(.*)",
//       "headers": { "cache-control": "max-age=0" }
//     },
//     { "handle": "filesystem" },
//     { "src": "/.*", "dest": "/index.html" }
//   ]
// }
