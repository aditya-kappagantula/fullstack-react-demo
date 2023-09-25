import React from 'react'

interface CostAnalysisProps {
  cost: number,
  area: number,
  transformers: number
}

const CostAnalysis: React.FC<CostAnalysisProps> = ({ cost, area, transformers }) => {
  return (
    <div className="column">
      <div className="row space-b margin-v">
        <div>Cost:</div>
        <div>100</div>
      </div>
      <div className="row space-b margin-v">
        <div>Area:</div>
        <div>100</div>
      </div>
      <div className="row space-b margin-v">
        <div>Transformers:</div>
        <div>100</div>
      </div>
    </div>
  )
}

export default CostAnalysis
