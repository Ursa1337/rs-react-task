import { useNavigate } from "react-router-dom"

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        gap: '8px',
      }}
    >
      <h2
        style={{
          fontSize: '28px',
          margin: '0px',
        }}
      >
        0100 0000 0100
      </h2>
      <div
        style={{
          fontSize: '14px',
        }}
      >
        Not found
      </div>
      <button
        id="button-back-not-found"
        style={{
          background: '#fff',
          border: '1px solid #000',
          padding: '8px 12px',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
        onClick={() => {navigate('/')}}
      >
        Go to main
      </button>
    </div>
  )
}