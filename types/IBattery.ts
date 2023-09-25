export default interface IBattery {
  name: string,
  width: string,
  height: string,
  energy: number,
  dimensionUnits: string,
  energyUnits: string,
  cost: number,
  currencyUnits: string,
  releaseYear: number | string
}
