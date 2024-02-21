import React from 'react'
import { CWidgetStatsA } from '@coreui/react'

const WidgetsDropdown = ({ dataDashboard }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '30px',
        paddingInline: 'auto',
      }}
    >
      <CWidgetStatsA
        className="mb-4 pb-4 cwidget-stats-a"
        color="primary"
        value={<>{dataDashboard?.total}</>}
        title="User's Visit Today"
      />

      <CWidgetStatsA
        className="mb-4 pb-4 cwidget-stats-a"
        color="info"
        value={<>{dataDashboard?.total}</>}
        title={`User's Visit on ${new Date().toLocaleString('default', {
          month: 'long',
        })} ${new Date().toLocaleString('default', {
          year: 'numeric',
        })}`}
      />

      <CWidgetStatsA
        className="mb-4 pb-4 cwidget-stats-a"
        color="warning"
        value={<>{dataDashboard?.total}</>}
        title="User's Visit Total"
      />
    </div>
  )
}

export default WidgetsDropdown
