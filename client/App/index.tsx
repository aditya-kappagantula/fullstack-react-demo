import React from 'react'
import Header from '../Header'
import TitleContainer from '../TitleContainer'
import type IBattery from '../../types/IBattery'
import type ISelectOption from '../../types/ISelectOption'
import type ITransformer from '../../types/ITransformer'
import Battery from '../Battery'
import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import getAPI from '../utils/getAPI'
import postAPI from '../utils/postAPI'
import './styles.scss'
import CostAnalysis from '../CostAnalysis'

const App: React.FC = () => {
  const [batteries, setBatteries] = React.useState<IBattery[]>([])
  const [isLoadingData, setIsLoadingData] = React.useState<Boolean>(true)
  const [transformer, setTransformer] = React.useState<(ITransformer | {})>({})
  const [selectedBatteries, setSelectedBatteries] = React.useState<(ISelectOption | {})[]>([])

  const selectBattery = (event: ISelectOption, index: number) :void => {
    setSelectedBatteries(items => items.map((item, itemIndex) => {
      if (itemIndex === index) {
        return event
      }
      return item
    }))
  }

  const addBattery = (): void => {
    setSelectedBatteries(items => [...items, {}])
  }

  const deleteBattery = (index: number): void => {
    setSelectedBatteries(items => items.filter((item, itemIndex) => itemIndex !== index))
  }

  React.useEffect(() => {
    if (selectedBatteries.length > 0) {
      postAPI('/api/saveSelectedBatteries', selectedBatteries)
    }
  }, [selectedBatteries])

  React.useEffect(() => {
    setIsLoadingData(true)
    getAPI('/api/session').then(result => {
      setSelectedBatteries(result.selectedBatteries ?? [])
      setIsLoadingData(false)
    })
    getAPI('/api/inventory').then(result => {
      setBatteries(result.batteries)
      setTransformer(result.transformer)
    })
  }, [])
  return (
    <div className="app">
      <Header title="Energy Service App" />
      { !isLoadingData &&
        <div className="row">
          <div className="configuration-container column padding">
            <TitleContainer title="Configuration ">
              <div className="column grow margin">
                <div className="column">
                  {
                    selectedBatteries.map((selection: any, index: number) => <Battery key={index} index={index} batteries={batteries} selectedBattery={selection} onSelectBattery={selectBattery} onDeleteBattery={deleteBattery} />)
                  }
                </div>
                <div className="row margin align-r">
                  <Button variant="outlined" startIcon={<AddIcon />} onClick={addBattery}>Add Battery</Button>
                </div>
              </div>
            </TitleContainer>
            { batteries.length > 0 && selectedBatteries.length > 0 &&
              <TitleContainer title="Cost Analysis ">
                  <CostAnalysis transformer={transformer as ITransformer} batteries={batteries} selectedBatteries={selectedBatteries as ISelectOption[]} />
              </TitleContainer>}
          </div>
          <div className="layout">
          </div>
        </div>
      }
      {
        isLoadingData &&
        <div className="column grow center-v center-h">
          <CircularProgress />
        </div>
      }
    </div>
  )
}

export default App
