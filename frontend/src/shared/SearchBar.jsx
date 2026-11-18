
import React, { useRef } from 'react'
import './search-bar.css'
import { Col, Form, FormGroup } from 'reactstrap'
import { BASE_URL } from '../utils/config'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
   const locationRef = useRef('')
   const distanceRef = useRef(0)
   const maxGroupSizeRef = useRef(0)
   const maxPriceRef = useRef('')
   const navigate = useNavigate()

   const searchHandler = async (e) => {
      e.preventDefault()

      const location = locationRef.current.value.trim()
      const distance = distanceRef.current.value || 0
      const maxGroupSize = maxGroupSizeRef.current.value || 1
      const maxPrice = maxPriceRef.current.value

      if (!location) {
         return alert('Please enter your destination!')
      }

      if (maxPrice && Number(maxPrice) <= 0) {
         return alert('Please enter a valid budget!')
      }

      try {
         const params = new URLSearchParams({
            city: location,
            distance,
            maxGroupSize,
            maxPrice: maxPrice || ''
         })

         const res = await fetch(
            `${BASE_URL}/tours/search/getTourBySearch?${params}`
         )

         if (!res.ok) {
            throw new Error('Failed to fetch tours')
         }

         const result = await res.json()

         navigate(`/tours/search?${params}`, {
            state: result.data
         })
      } catch (error) {
         alert('Something went wrong. Please try again!')
      }
   }

   return (
      <Col lg="12">
         <div className="search__bar">
            <Form
               className="d-flex align-items-center gap-4 flex-wrap"
               onSubmit={searchHandler}
            >
               <FormGroup className="d-flex gap-3 form__group form__group-fast">
                  <span><i className="ri-map-pin-line"></i></span>
                  <div>
                     <h6>Location</h6>
                     <input type="text" placeholder="Where are you going?" ref={locationRef} />
                  </div>
               </FormGroup>

               <FormGroup className="d-flex gap-3 form__group form__group-fast">
                  <span><i className="ri-map-pin-time-line"></i></span>
                  <div>
                     <h6>Distance</h6>
                     <input type="number" placeholder="Distance km" min="0" ref={distanceRef} />
                  </div>
               </FormGroup>

               <FormGroup className="d-flex gap-3 form__group form__group-fast">
                  <span><i className="ri-group-line"></i></span>
                  <div>
                     <h6>Max People</h6>
                     <input type="number" placeholder="People" min="1" ref={maxGroupSizeRef} />
                  </div>
               </FormGroup>

               <FormGroup className="d-flex gap-3 form__group form__group-last">
                  <span><i className="ri-money-rupee-circle-line"></i></span>
                  <div>
                     <h6>Maximum Budget (₹)</h6>
                     <input type="number" placeholder="Your budget" min="1" ref={maxPriceRef} />
                  </div>
               </FormGroup>

               <button className="search__icon" type="submit">
                  <i className="ri-search-line"></i>
               </button>
            </Form>
         </div>
      </Col>
   )
}

export default SearchBar
