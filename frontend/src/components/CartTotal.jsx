import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const CartTotal = () => {
    const { currency, discount, delivery_fee, getCartAmount } = useContext(ShopContext)

    const discountedPrice = getCartAmount() - (getCartAmount() * (discount / 100))
  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={'CART'} text2={'TOTALS'}/>
      </div>

      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
            <p>Subtotal</p>
            <p>{currency} {discountedPrice}.00</p>
        </div>
        <hr />
        <div className='flex justify-between'>
            <p>Shipping Fee</p>
            <p>{currency} {delivery_fee}.00</p>
        </div>
        <hr />

        <div className='flex justify-between'>
            <b>Total</b>
            <b>{currency} {discountedPrice === 0 ? 0 : discountedPrice + delivery_fee}.00</b>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
