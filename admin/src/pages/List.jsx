import React, { useEffect, useState } from 'react'
import { currency, backendUrl } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'
const List = ({token}) => {

  const fetchLimit = 2
  const [offset, setOffset] = useState(0)
  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.post(backendUrl + '/api/product/list', {fetchLimit, offset})
      
      if(response.data.products.length > 0) {
        setList(prev => [...prev, ...response.data.products])
        setOffset(offset => offset + fetchLimit)
      } else {
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {
      
      const response = await axios.post(backendUrl + '/api/product/remove', {id}, {headers: {token}})

      if(response.data.success) {
        toast.success(response.data.message)

        // const response = await axios.post(backendUrl + '/api/product/list')
        // console.log(response)
        // if(response.data.products) {
        //   setList(response.data.products)
        // } else {
        //   console.log("Else block")
        // }
        // await fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [offset])

  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>

        {/* List table title */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

      {/* Products List */}
      {
        list.map((item, index) => (
          <div key={index} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm'>
            <img className='w-12' src={item.image[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>
            <p onClick={() => removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
          </div>
        ))
      }
      </div>
    </>
  )
}

export default List
