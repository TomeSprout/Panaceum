import * as fs from 'fs'

const WriteToJSON = (object: any) => {
  const stringifyResponse = JSON.stringify(object)
    fs.writeFile('res.json', stringifyResponse, (err: Error | null) => {
      if (err) throw err;
      console.log("New response data added to file")
    })
}

export default WriteToJSON