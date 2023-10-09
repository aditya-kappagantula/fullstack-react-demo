import React from 'react'
import type IBattery from '../../types/IBattery'
import type ISelectOption from '../../types/ISelectOption'
import type ITransformer from '../../types/ITransformer'

interface BatteryLayoutProps {
  batteries: IBattery[],
  transformer: ITransformer,
  selectedBatteries: ISelectOption[]
}

const SCALE_FT_TO_PX = 5
const SCALE_GRID_CELL_TO_FT = 10

const BatteryCell: React.FC<{width:number, height: number, name: string, color: string}> = ({ width, height, name, color }) => {
  return (
    <div style={{
      width: `${width * SCALE_FT_TO_PX}px`,
      height: `${height * SCALE_FT_TO_PX}px`,
      backgroundColor: color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid',
      boxSizing: 'content-box',
      textAlign: 'center',
      gridColumn: `span ${width / SCALE_GRID_CELL_TO_FT}`,
      wordBreak: 'break-word'
    }}>
      {name}
    </div>
  )
}

const BatteryLayout: React.FC<BatteryLayoutProps> = ({ batteries, transformer, selectedBatteries }) => {
  return (
    <section className="grid-container">
    {
      selectedBatteries.map((selectedBattery, index) => {
        const battery = batteries.find(battery => battery.name === selectedBattery.label)
        if (battery === undefined) {
          return <></>
        }
        const { name, width, height, color } = battery
        return <BatteryCell key={`${name}-${index}`} name={name} width={width} height={height} color={color} />
      })
    }

    {
      Array.from({ length: Math.ceil(selectedBatteries.filter(battery => Boolean(battery.label)).length / 2) }).map((element, index) => {
        return <BatteryCell key={`transformer-${index}`} name="Transformer" width={transformer.width} height={transformer.height} color={transformer.color} />
      })
    }
    </section>
  )
}

export default BatteryLayout
