import React from 'react'
import type IBattery from '../../types/IBattery'
import type ISelectOption from '../../types/ISelectOption'
import type ITransformer from '../../types/ITransformer'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, CardHeader, Chip
} from '@mui/material'

import { AttachMoney, ElectricBolt, Landscape } from '@mui/icons-material'
import Typography from '@mui/material/Typography'

interface CostAnalysisProps {
  batteries: IBattery[],
  selectedBatteries: ISelectOption[],
  transformer: ITransformer,
}

type CostTableRow = {
  name: string,
  count: number,
  individualPrice: string,
  totalPrice: string
}

const CostAnalysis: React.FC<CostAnalysisProps> = ({ batteries, transformer, selectedBatteries }) => {
  const costTableRows: CostTableRow[] = []
  let totalArea: number = 0
  let totalEnergy: number = 0
  let overallPrice: number = 0
  batteries.forEach(battery => {
    const count = selectedBatteries.filter(x => (x as ISelectOption).label === battery.name).length
    const { width, height, cost, energy, currencyUnits } = battery
    costTableRows.push({
      name: battery.name,
      count,
      individualPrice: new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyUnits, minimumFractionDigits: 0 }).format(cost),
      totalPrice: new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyUnits, minimumFractionDigits: 0 }).format(count * cost)
    })
    if (count > 0) {
      totalArea += (width * height) * count
      totalEnergy += (energy * count)
      overallPrice += (count * cost)
    }
  })

  const { width, height, cost, energy, dimensionUnits, currencyUnits, energyUnits } = transformer
  const pricingLabel = new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyUnits, minimumFractionDigits: 0 }).format(cost)
  const dimensionsLabel = `${width} ${dimensionUnits} X ${height} ${dimensionUnits}`
  const energyLabel = `${energy} ${energyUnits}`

  const transformerCount = Math.ceil(selectedBatteries.length / 2)
  costTableRows.push({
    name: 'Transformer',
    count: transformerCount,
    individualPrice: new Intl.NumberFormat('en-US', { style: 'currency', currency: transformer.currencyUnits, minimumFractionDigits: 0 }).format(transformer.cost),
    totalPrice: new Intl.NumberFormat('en-US', { style: 'currency', currency: transformer.currencyUnits, minimumFractionDigits: 0 }).format(transformerCount * transformer.cost)
  })

  totalArea += transformerCount * transformer.width * transformer.height
  totalEnergy += (transformerCount * transformer.energy)
  overallPrice += (transformerCount * transformer.cost)

  return (
    <div className="column grow margin-t">
        <TableContainer component={Paper}>
          <Table aria-label="Cost Table">
          <caption>
            Every 2 Batteries in the configuration will need 1 Transformer <span>
        <Chip className="margin-h" label={pricingLabel} variant="outlined" />
        <Chip className="margin-h" label={dimensionsLabel} variant="outlined" />
        <Chip className="margin-h" label={energyLabel} variant="outlined" /></span>. It is added automatically to the pricing.
          </caption>
            <TableHead>
              <TableRow>
                <TableCell>Battery Type</TableCell>
                <TableCell align="right">Count</TableCell>
                <TableCell align="right">Individual Cost</TableCell>
                <TableCell align="right">Total Cost</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {costTableRows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{row.name}</TableCell>
                  <TableCell align="right">{row.count}</TableCell>
                  <TableCell align="right">{row.individualPrice}</TableCell>
                  <TableCell align="right">{row.totalPrice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="row">
          <Card variant="outlined">
            <CardHeader
              avatar={<AttachMoney />}
              title="Total Cost of Installation"
              subheader="September 14, 2016"
            />
            <Typography align="center" variant="h3" gutterBottom>{new Intl.NumberFormat('en-US', { style: 'currency', currency: transformer.currencyUnits, minimumFractionDigits: 0 }).format(overallPrice)}</Typography>
          </Card>
          <Card variant="outlined">
            <CardHeader avatar={<Landscape />}
              title="Total Area Required"
              subheader="September 14, 2016"
            />
            <Typography align="center" variant="h3" gutterBottom>{`${totalArea} Sq.Ft`}</Typography>
          </Card>
          <Card variant="outlined">
            <CardHeader avatar={<ElectricBolt />}
              title="Total Energy Output"
              subheader="September 14, 2016"
            />
            <Typography align="center" variant="h3" gutterBottom>{totalEnergy} {transformer.energyUnits}</Typography>
          </Card>
        </div>
    </div>
  )
}

export default CostAnalysis
