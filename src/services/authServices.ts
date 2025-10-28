import { v4 as uuid } from "uuid"

const SESSION_KEY = "ticketapp_session"

type Session = {
  token: string
  user: { id: string; name: string; email: string }
  expiresAt: string
}

export function signInMock({
  email,
  password,
}: {
  email: string
  password: string
}) {
  return new Promise<Session>((resolve, reject) => {
    setTimeout(() => {
      if (email === "user@example.com" && password === "password") {
        const session: Session = {
          token: uuid(),
          user: { id: "u1", name: "User", email },
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        }
        localStorage.setItem(SESSION_KEY, JSON.stringify(session))
        resolve(session)
      } else {
        reject({ message: "Invalid credentials" })
      }
    }, 400)
  })
}

export function signUpMock({
  name,
  email,
}: //password,
{
  name: string
  email: string
  password: string
}) {
  return new Promise<Session>((resolve) => {
    setTimeout(() => {
      const session: Session = {
        token: uuid(),
        user: { id: "u_" + Math.floor(Math.random() * 10000), name, email },
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      }
      localStorage.setItem(SESSION_KEY, JSON.stringify(session))
      resolve(session)
    }, 500)
  })
}

export function getSession(): Session | null {
  const raw = localStorage.getItem(SESSION_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as Session
  } catch {
    return null
  }
}

export function signOut() {
  localStorage.removeItem(SESSION_KEY)
}
