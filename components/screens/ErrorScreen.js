import React from 'react'

export default function ErrorScreen({ error }) {
  return (
    <div>
      <h1>An error occurred</h1>
      <p>The system will automatically restart in 5 seconds</p>

      <div>
        <div>Error Information</div>
      </div>
    </div>
  )
}
