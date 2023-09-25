import React from 'react'
import Select from 'react-select'
import type IBattery from '../../types/IBattery'
import type ISelectOption from '../../types/ISelectOption'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'

interface BatteryProps {
  key: number,
  index: number,
  batteries: IBattery[],
  selectedBattery: ISelectOption,
  onSelectBattery(event: ISelectOption, index: number): void,
  onDeleteBattery(index: number): void
}

const Battery: React.FC<BatteryProps> = ({ batteries, index, selectedBattery, onSelectBattery, onDeleteBattery }) => {
  const batterySelectOptions: ISelectOption[] = batteries.map((battery: IBattery) => ({ value: battery.name, label: battery.name }))
  const { label } = selectedBattery
  const batteryDescription = (label: string): string => {
    const battery = batteries.find(x => x.name === label)
    if (battery) {
      const { width, height, cost, energy, dimensionUnits, currencyUnits, energyUnits } = battery
      const formattedCurrency = new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyUnits, minimumFractionDigits: 0 }).format(cost)
      return `${width} ${dimensionUnits} X ${height} ${dimensionUnits} - ${energy} ${energyUnits} - ${formattedCurrency}`
    }
    return 'Error occured in retrieving battery information!'
  }

  return (<div className="row margin-v align-c">
    <Select className="react-select" placeholder="Select a battery" options={batterySelectOptions} value={label ? selectedBattery : ''} onChange={(event: any) => onSelectBattery(event, index)} />
    { label && <span className="margin-h">{batteryDescription(label)}</span> }
    <IconButton aria-label="delete" size="medium" onClick={() => onDeleteBattery(index)}>
      <DeleteIcon fontSize="inherit"/>
    </IconButton>
  </div>)
}

export default Battery
