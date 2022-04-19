import React from 'react'
import './service.css'
import {
  ButtonN,
  RouteHeading,
  Routediv,
  RouteLinkContainer,
  RouteLinks
}
from '../../style'
import { useParams } from 'react-router-dom'
import { categoryMap } from './categoryItems'
const ServiceDetail = () => {

  const params = useParams()
  const categoryId = params.categoryId
  const serviceId = params.serviceId

  return (
    <>
      <Routediv>
        <RouteHeading>
          <h2>Service Details</h2>
        </RouteHeading>
        <RouteLinkContainer>
          <RouteLinks to='/'><p>Home</p></RouteLinks>
          <p>&nbsp;/&nbsp;</p>
          <RouteLinks to="/services/category">Category</RouteLinks>
          <p>&nbsp;/&nbsp;</p>
          <RouteLinks to={`/services/category/${categoryId}`}>{categoryMap[categoryId]}</RouteLinks>
          <p>&nbsp;/&nbsp;</p>
          <p>Details</p>
        </RouteLinkContainer>
      </Routediv>
      <div className='service-container'>
        <div className='service-info-container'>
          <h1>Clean your furniture.</h1>
          <div className='service-user-info'>
            <img alt={'profile-pic'} />
            <h4>saikatbarua</h4>
          </div>
          <div>
            <h2>Service Detail</h2>
            <p>welcome to my service profile. Plase read before placing order. I will design concept for your brand. And if you have any reference just tell me already
              Why choose me? On time, Easy to contact, Will take your vision and make it come true
              All my design with commersial use, so you can use for anything
            I offer original, special & high-quality designs! High resolution print-ready.
              Please contact me before ordering to set up a details of your idea!
              if you have already a concept in your mind, just tell me. we will do it
              Feel free to contact me if you interested to make project with me :)
            </p>
          </div>
          <div className='service-provider-about'>
            <h2>About Service Provider</h2>
            <h4>From<pre>West Bengal, Kolkata</pre></h4>
            <h4>Member Since<pre>Apri,2022</pre></h4>
          </div>
        </div>
        <div className='service-add'>
          <ButtonN className='service-add-btn'>Add this service</ButtonN>
        </div>
      </div>
    </>
  )
}

export default ServiceDetail