import React from 'react'
import {
  LayoutDashboard,
  Wallet,
  User,
  Bell,
  CreditCard,
  ShieldCheck,
  BarChart3,
  Search,
  LogOut,
  Menu
} from "lucide-react";
import {  useLocation, useNavigate } from "react-router-dom";
import WelcomeCard from '../../ReuseableCards/WelcomeCard';
import MainAccount from '../../ReuseableCards/MainAccount';
import WalletCards from '../../ReuseableCards/WalletCards';
import LastTransactions from '../../ReuseableCards/LastTransactions';
import ChartsAndOverview from '../../ReuseableCards/ChartsAndOverview';
import BusinessAccounts from './dashboardPreview/BusinessAccounts';
import DashboardWallet from './dashboardPreview/DashboardWallet';
import DashboardCards from './dashboardPreview/DashboardCards';
import DashboardTransaction from './dashboardPreview/DashboardTransaction';
import BanksTotal from './totalCards/BanksTotal';
import CardTotal from './totalCards/CardTotal';
import AllAccountsTotal from './totalCards/AllAccountsTotal';
export default function HomeDashboard() {
  return (
   <>
        {/* page body */}
        <main className="w-full flex items-center sm:px-6 lg:px-8 py-4 mb-12 lg:mb-0">

          {/* example hero / dashboard header */}
          <div className="w-full flex flex-col lg:p-4 gap-6">
            {/* dashboard accounts and wallet flex on  desktop and tablet, col on mobile */}
           <section className='flex flex-col lg:flex-row items-start justify-between w-full gap-4'>


             <div className='flex flex-col gap-4 w-full lg:w-[30%] self-start'>


                <AllAccountsTotal/>
                <BusinessAccounts/>
              </div>

              <div className='flex flex-col w-full lg:w-[70%] self-start'>


                <DashboardWallet/>
                <BanksTotal/>
                <CardTotal/>
              </div>

              </section>


               {/* dashboard accounts and wallet flex on  desktop and tablet, col on mobile */}
                <section className='flex flex-col lg:flex-row justify-between w-full  gap-4'>
              <div className='w-full lg:w-[30%]'>

                <DashboardCards/>
              </div>
              <div className='w-full lg:relative lg:bottom-10 lg:w-[70%] mt-4'>

                <DashboardTransaction/>
              </div>
              </section>


            {/* welcome card */}
            {/* <div className='flex lg:flex-row flex-col w-full gap-4  justify-evenly'>
                <div className='lg:w-[40%] '>
                <WelcomeCard/>

                </div>
                <div className='lg:w-[60%]'>
                <MainAccount/>

                </div>
                
            </div> */}
            {/* various  wallet cards */}
                <div >
  {/* <WalletCards /> */}

  {/* transactions and charts */}
  {/* <div className='flex lg:flex-row flex-col gap-3 w-full mt-4'>
    <div className='w-full md:w-[40%] lg:w-[40%] '>
        <LastTransactions/>
    </div>
    <div className='w-full md:w-[60%] lg:w-[60%] '>
        <ChartsAndOverview/>
    </div>


    </div> */}

</div>

            
         
          </div>


        </main>
   </>
  )
}

