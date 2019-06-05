export const generateRandomNumber = (): Array<string> => {
  const rc: Array<string> = [
    Math.floor(Math.random() * 255).toString(),
    Math.floor(Math.random() * 255).toString(),
    Math.floor(Math.random() * 255).toString(),
  ]
  return rc
}

export const generateColors = (): [Array<string>, Array<string>] => {
  const backgroundColor: string[] = []
  const borderColor: string[] = []
  const rc: Array<string> = generateRandomNumber()
  for (let i = 0; i < 7; i++) {
    backgroundColor.push('rgba(' + rc[0] + ',' + rc[1] + ',' + rc[2] + ',0.2)')
    borderColor.push('rgba(' + rc[0] + ',' + rc[1] + ',' + rc[2] + ',1)')
  }
  return [backgroundColor, borderColor]
}
