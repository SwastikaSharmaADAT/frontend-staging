import moment from "moment"
import { useEffect, useState } from "react"

const useTimestamp=(stamp,relativeTime)=>{
    const [date, setDate] = useState(new Date(stamp))
    moment.locale('en', {relativeTime})
  
    useEffect(() => {
      /**reRender after 1 minute */
      var timerID = setInterval(() => tick(), 30000)
      return function cleanup() {
        clearInterval(timerID)
      }
    })
  
    function tick() {
      setDate(new Date(stamp))
    }
    /**Render timestamp */
    return moment(date).fromNow().toString()
}

export default useTimestamp