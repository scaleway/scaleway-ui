import React, { useState, useLayoutEffect } from 'react'

export function ErrorTransition ({ error, Component, ...props}) {
  const [err, setErr] = useState()
  useLayoutEffect(() => {
    const timer = setTimeout(() => setErr(error), 2000)
    return () => timer && clearTimeout(timer)
  }, [error])
  return <Component error={err} {...props} />
}
