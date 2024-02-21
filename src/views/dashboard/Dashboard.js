import React, { useEffect, useState } from 'react'

import WidgetsDropdown from '../widgets/WidgetsDropdown'
import { axios } from 'src/utils'

const Dashboard = () => {
  const [dataDashboard, setDataDashboard] = useState({})

  const [tag, setTag] = useState('fetch')

  useEffect(() => {
    if (tag === 'fetch') {
      axios('/dashboard')
        .then((res) => {
          if (res.status === 200) {
            setDataDashboard(res?.data?.data || {})
          }
        })
        .catch(() => {})
        .finally(() => {
          setTag('')
        })
    }
  }, [tag])

  return (
    <div>
      <WidgetsDropdown dataDashboard={dataDashboard} />
    </div>
  )
}

export default Dashboard
