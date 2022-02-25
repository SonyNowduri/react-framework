import { Country, State, City }  from 'country-state-city';
import { removeData } from '../../../utils/asyncKeyStorage';


const countryCode = 'US';
const country = Country?.getCountryByCode(countryCode)
const states = State.getStatesOfCountry(country?.isoCode);
export const stateCodes = []
for (const [key, value] of Object.entries(states)) {
  // console.log(key, value, 'key', 'value')
  stateCodes.push({ name: value?.isoCode, description: value?.name })
}



export  function cityCodes(stateVal){
  console.log(stateVal)
  const citiesCode = []
  const cities = City.getCitiesOfState(countryCode, stateVal)
  // console.log(cities)

  for (const [key, value] of Object.entries(cities)) {
    // console.log(key, value, 'key', 'value')
    citiesCode.push({ name: value?.name, description: value?.name })
    
  }
  
  if(citiesCode.length === 0){
    const filteredState =  stateCodes.filter((each) => each.name === stateVal)
    console.log(filteredState[0])
    citiesCode.push({  name: filteredState[0]?.description, description: filteredState[0]?.description})
  }
  // console.log(citiesCode)
 
  return citiesCode 

}



// console.log(Country?.getAllCountries())


// export const stateCodes = [
//   {key:"Select", description:"Select State",name:'Select'},
//   { key: 'AL', description: 'Alabama', name:"AL" },
//   { key: 'AK', description: 'Alaska', name: 'AK' },
//   { key: 'AZ', description: 'Arizona',name: 'AZ' },
//   { key: 'AR', description: 'Arkansas', name: 'AR' },
//   { key: 'CA', description: 'California',name: 'CA' },
//   { key: 'CO', description: 'Colorado',name: 'CO' },
//   { key: 'CT', description: 'Connecticut',name: 'CT' },
//   { key: 'DE', description: 'Delaware',name: 'DE' },
//   { key: 'DC', description: 'District of Columbia' },
//   { key: 'FL', description: 'Florida',name: 'DC' },
//   { key: 'GA', description: 'Georgia',name: 'GA'},
//   { key: 'HI', description: 'Hawaii',name: 'HI' },
//   { key: 'ID', description: 'Idaho',name: 'ID' },
//   { key: 'IL', description: 'Illinois', name: 'IL' },
//   { key: 'IN', description: 'Indiana',name: 'IN' }
// ]


