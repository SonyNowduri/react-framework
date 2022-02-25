export const storeData = async (key, value) => {
  try {
    await localStorage.setItem(`${key}`, `${value}`)
  } catch (e) {
    console.log(e)
  }
}

export const getData = (key) => localStorage.getItem(`${key}`)
export const removeData = async (key) => localStorage.removeItem(`${key}`)


