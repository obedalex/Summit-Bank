import React from 'react'
import KycCard from '../../ReuseableCards/KycCards/KycCard'
import KycForm from '../../ReuseableCards/KycCards/KycForm'

export default function KYC() {
  return (
    <>
    <main className='flex w-full justify-center items-center flex-col gap-4 mb-12'>
        <KycCard/>
        <KycForm/>
    </main>
    </>
  )
}
