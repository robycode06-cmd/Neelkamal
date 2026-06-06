import React from 'react'
import ClickSpark from '../components/ClickSpark'
import Hgallery from '../components/Hgallery'




const Page2 = () => {
  return (
    <ClickSpark
        sparkColor="black"
        sparkSize={15}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
    <div className='h-auto w-full bg-[#FCF7EF] z-50 '>
      <h1 className="font-heading text-[11vw] md:text-7xl text-[#7A2B1D] uppercase text-center pt-16">
        ACCOMODATION
      </h1>
      <div className=''>
        <Hgallery/>
      </div>
      
    </div>
    </ClickSpark>
  )
}

export default Page2