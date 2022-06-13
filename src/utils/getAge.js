const calcAge = dataBorn => {
  const currentDate = new Date()
  const currencyYear = currentDate.getFullYear()
  const partsYearBorn = dataBorn.split("/")
  const dayBorn = partsYearBorn[0]
  const monthBorn = partsYearBorn[1]
  const yearBorn = partsYearBorn[2]
  let age = currencyYear - yearBorn
  const currencyMonth = currentDate.getMonth() + 1
  // Se mes atual for menor que o nascimento, nao fez aniversario ainda
  if (currencyMonth < monthBorn) {
    age--
  } else {
    // Se estiver no mes do nascimento, verificar o dia
    if (currencyMonth === monthBorn) {
      if (new Date().getDate() < dayBorn) {
        // Se a data atual for menor que o dia de nascimento ele ainda nao fez aniversario
        age--
      }
    }
  }
  return age
}

export default calcAge
