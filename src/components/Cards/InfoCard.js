import React from 'react'
import { Card, CardBody } from '@windmill/react-ui'

function InfoCard({ title, value, children: icon }) {
  return (
    <Card style={{background: "#F8D6DA"}}>
      <CardBody className=" items-center justify-between " style={{background: "#F8D6DA"}}>
      {icon}
        <div className="">
          <p className="text-lg my-4  font-semibold text-gray-700 " >{title}</p>
          <p className="mb-2 text-sm font-medium text-gray-600 ">{value}</p>
        </div>
       
      </CardBody>
    </Card>
  )
}

export default InfoCard
