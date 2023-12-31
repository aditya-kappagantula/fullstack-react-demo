export default interface IBattery {
  name: string,
  width: number,
  height: number,
  energy: number,
  dimensionUnits: string,
  energyUnits: string,
  cost: number,
  currencyUnits: string,
  releaseYear: number | string,
  color: string
}
