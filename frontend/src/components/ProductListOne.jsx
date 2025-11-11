import React from 'react'

const ProductListOne = () => {
    return (
        <div className='flex '>
            <div>
                <div>
                    <h1>Deals And Offers</h1>
                    <p>Hygiene Equippments</p>
                </div>
                <button className='bg-gray-500 border '>01</button><button className='bg-gray-500 border '>03</button><button className='bg-gray-500 border '>04</button><button className='bg-gray-500 border '>80</button>
            </div>
            <div className='flex ml-60'>
                <img src="/assets/laptop.png" alt="" />
                <img src="/assets/watch.png" alt="" />
                <img src="/assets/airbuds.png" alt="" />
                <img src="/assets/camera.png" alt="camera" />
                <img src="/assets/mobile.png" alt="mobile" />

            </div>
        </div>
    )
}

export default ProductListOne
