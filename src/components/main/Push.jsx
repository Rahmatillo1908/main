import axios from 'axios'
import React, { useEffect } from 'react'

const Push = () => {
    useEffect(() => {
      axios.post("https://for-it-center-system.000webhostapp.com/models/display.php",{
        name:""
      })
    }, [])
    
  return (
    <div>

    </div>
  )
}

export default Push