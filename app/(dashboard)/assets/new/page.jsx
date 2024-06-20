import AssetForm from '@/components/AssetForm'
import React from 'react'

const page = () => {
  return (
    <div>
      <div>
        <h1 className="text-black flex items-center">Asset/ 
          <span className='text-primary'> Add New Asset</span>
        </h1>
      </div>

      <AssetForm/>
    </div>
  )
}

export default page
