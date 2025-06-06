import React from 'react'
import { useSelector } from 'react-redux'
import { valideURLConvert } from '../utils/valideURLConvert'
import { useNavigate } from 'react-router-dom'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'

const Home = () => {
  const loadingCategory = useSelector(state => state.product.loadingCategory)
  const categoryData = useSelector(state => state.product.allCategory)
  const subCategoryData = useSelector(state => state.product.allSubCategory)
  const navigate = useNavigate()

  const handleRedirectProductListpage = (id, cat) => {
    const subcategory = subCategoryData.find(sub => {
      return sub.category.some(c => c._id === id)
    })

    if (!subcategory) return

    const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`
    navigate(url)
  }

  return (
    <section className='bg-white'>
      <div className='container mx-auto'>
        <div className='w-full h-full min-h-48 bg-blue-100 rounded'>
          {/* Lazy Loading Cloudinary Banner */}
          <img
            src="https://res.cloudinary.com/dlbl9sb4q/image/upload/v1744848029/new_banner_naymfb.png"
            className='w-full h-full hidden lg:block'
            alt='banner'
            loading="lazy"
          />
          <img
            src="https://res.cloudinary.com/dlbl9sb4q/image/upload/v1744848029/banner-mobile_gu9su0.png"
            className='w-full h-full lg:hidden'
            alt='banner-mobile'
            loading="lazy"
          />
        </div>
      </div>

      <div className='container mx-auto px-4 my-2 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2'>
        {
          loadingCategory ? (
            new Array(12).fill(null).map((_, index) => (
              <div key={index + "loadingcategory"} className='bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse'>
                <div className='bg-blue-100 min-h-24 rounded'></div>
                <div className='bg-blue-100 h-8 rounded'></div>
              </div>
            ))
          ) : (
            categoryData.map((cat) => (
              <div
                key={cat._id + "displayCategory"}
                className='w-full h-full cursor-pointer'
                onClick={() => handleRedirectProductListpage(cat._id, cat.name)}
              >
                <img
                  src={cat.image}
                  className='w-full h-full object-scale-down'
                  loading="lazy"
                  alt={cat.name}
                />
              </div>
            ))
          )
        }
      </div>

      {/* Display Category-wise Products */}
      {
        categoryData?.map((c) => (
          <CategoryWiseProductDisplay
            key={c?._id + "CategorywiseProduct"}
            id={c?._id}
            name={c?.name}
          />
        ))
      }

    </section>
  )
}

export default Home
