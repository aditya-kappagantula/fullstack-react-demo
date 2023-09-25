import React from 'react'
import Select from 'react-select'
import type IBattery from '../../types/IBattery'
import type ISelectOption from '../../types/ISelectOption'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Chip from '@mui/material/Chip'

interface BatteryProps {
  key: number,
  index: number,
  batteries: IBattery[],
  selectedBattery: ISelectOption,
  onSelectBattery(event: ISelectOption, index: number): void,
  onDeleteBattery(index: number): void
}

const defaultBattery = { width: 0, height: 0, cost: 0, energy: 0, dimensionUnits: '', currencyUnits: 'USD', energyUnits: '' }

const Battery: React.FC<BatteryProps> = ({ batteries, index, selectedBattery, onSelectBattery, onDeleteBattery }) => {
  const batterySelectOptions: ISelectOption[] = batteries.map((battery: IBattery) => ({ value: battery.name, label: battery.name }))
  const { label } = selectedBattery
  const battery = batteries.find(x => x.name === label) ?? defaultBattery
  const { width, height, cost, energy, dimensionUnits, currencyUnits, energyUnits } = battery
  const pricingLabel = new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyUnits, minimumFractionDigits: 0 }).format(cost)
  const dimensionsLabel = `${width} ${dimensionUnits} X ${height} ${dimensionUnits}`
  const energyLabel = `${energy} ${energyUnits}`

  return (<div className="row margin-v align-c">
    <Select className="react-select" placeholder="Select a battery" options={batterySelectOptions} value={label ? selectedBattery : ''} onChange={(event: any) => onSelectBattery(event, index)} />
    { label &&
      <div className="row">
        <Chip className="margin-h" label={dimensionsLabel} variant="outlined" />
        <Chip className="margin-h" label={energyLabel} variant="outlined" />
        <Chip className="margin-h" label={pricingLabel} variant="outlined" />
      </div>
    }
    <IconButton aria-label="delete" size="medium" onClick={() => onDeleteBattery(index)}>
      <DeleteIcon fontSize="inherit"/>
    </IconButton>
  </div>)
}

export default Battery
