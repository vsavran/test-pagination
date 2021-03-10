import React, { useEffect, useRef, useState } from 'react'

import styled from 'styled-components'

import { DateTime } from 'luxon'

const Container = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  background: #00000080;
  color: white;
  text-align: center;
`

function Ticker() {
  const testStart = useRef(DateTime.local())
  const [time, setTime] = useState(
    DateTime.local().diff(testStart.current).toFormat('hh:mm:ss'),
  )

  useEffect(() => {
    testStart.current = DateTime.fromISO(localStorage.getItem('test-start'))
    if (!testStart.current.isValid) {
      testStart.current = DateTime.local()
      localStorage.setItem('test-start', testStart.current.toISO())
    }
    setInterval(() => {
      setTime(DateTime.local().diff(testStart.current).toFormat('hh:mm:ss'))
    }, 1000)
  }, [])

  return <Container>Viewing this test: {time}</Container>
}

export default Ticker
