import React from 'react'
import { Card, CardBody } from '@windmill/react-ui'

function InfoCard3({ title, value, children: icon }) {
  return (
    <Card style={{background: "#FFF3DE"}}>
      <CardBody className=" items-center justify-between " style={{background: "#FFF3DE"}}>
      {icon}
        <div className="">
          <p className="text-lg my-4  font-semibold text-gray-700 " >{title}</p>
          <p className="mb-2 text-sm font-medium text-gray-600 ">{value}</p>
        </div>
       
      </CardBody>
    </Card>
  )
}

export default InfoCard3