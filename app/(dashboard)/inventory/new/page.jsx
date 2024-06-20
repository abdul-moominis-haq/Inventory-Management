import InventoryForm from '@/components/InventoryForm'
import React from 'react'

const page = () => {
  return (
    <div>
      <div className="">
        <h1 className="text-black flex items-center ">Inventory/ 
          <span className='text-[#00695C]'>  Add Inventory</span>
        </h1>
      </div>
      <InventoryForm/>
    </div>
  )
}

export default page