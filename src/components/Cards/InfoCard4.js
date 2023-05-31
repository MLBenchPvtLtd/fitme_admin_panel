import React from 'react'
import { Card, CardBody } from '@windmill/react-ui'

function InfoCard3({ title, value, children: icon }) {
  return (
    <Card style={{background: "#E5E8EE"}}>
      <CardBody className=" items-center justify-between " style={{background: "#E5E8EE"}}>
      {icon}
        <div className="">
          <p className="text-lg my-4  font-semibold text-gray-700 dark:text-gray-200" >{title}</p>
          <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">{value}</p>
        </div>
       
      </CardBody>
    </Card>
  )
}

export default InfoCard3