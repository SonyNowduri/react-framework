export const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      if (file) {
        fileReader.readAsDataURL(file)
      }

      fileReader.onload = () => {
        const base64Res = fileReader.result
        resolve(base64Res)
      }

      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }