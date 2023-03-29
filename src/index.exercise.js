// 🐨 you'll need to import React and ReactDOM up here
import React from 'react'
import ReactDOM from 'react-dom'

// 🐨 you'll also need to import the Logo component from './components/logo'
import { Logo } from './components/logo'
import { Dialog } from '@reach/dialog'
import { VisuallyHidden } from '@reach/visually-hidden'
import '@reach/dialog/styles.css'

// 🐨 create an App component here and render the logo, the title ("Bookshelf"), a login button, and a register button.
// 🐨 for fun, you can add event handlers for both buttons to alert that the button was clicked
function App() {
  const [openModal, setOpenModal] = React.useState('none')
  const close = () => setOpenModal('none')
  const handleSubmit = data => {
    console.log(data)
    close()
  }

  return (
    <div>
      <Logo />
      <h1>Bookshelf</h1>
      <button onClick={() => setOpenModal('login')}>Login</button>
      <button onClick={() => setOpenModal('register')}>Register</button>

      <Dialog isOpen={openModal === 'login'} onDismiss={close} aria-label="Login">
        <button onClick={close}>
          <VisuallyHidden>Close</VisuallyHidden>
          <span aria-hidden>X</span>
        </button>
        <p>Login</p>
        <LoginForm onSubmit={handleSubmit} buttonText="Login" />
      </Dialog>

      <Dialog isOpen={openModal === 'register'} onDismiss={close} aria-label="Register">
        <button onClick={close}>
          <VisuallyHidden>Close</VisuallyHidden>
          <span aria-hidden>X</span>
        </button>
        <p>Register</p>
      </Dialog>
    </div>
  )
}

function LoginForm({ onSubmit, buttonText }) {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleSubmit = event => {
    event.preventDefault()
    onSubmit({ username, password })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={event => setUsername(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
      </div>
      <button type="submit">{buttonText}</button>
    </form>
  )
}

// 🐨 use ReactDOM to render the <App /> to the root element
// 💰 find the root element with: document.getElementById('root')
ReactDOM.render(<App />, document.getElementById('root'))