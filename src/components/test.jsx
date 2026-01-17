import { useState } from "react"
import uploadFile from "../utils/mediaUpload"

export default function Test() {
  const [file, setFile] = useState(null)

  async function upload() {
    if (!file) {
      console.log("No file selected")
      return
    }

    try {
      const url = await uploadFile(file)
      console.log(url)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-2">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={upload}
        className="w-[100px] h-[40px] bg-blue-500 text-white rounded-lg"
      >
        Upload
      </button>
    </div>
  )
}
