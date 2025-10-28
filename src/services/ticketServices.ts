import { v4 as uuid } from "uuid"

const TICKETS_KEY = "ticketapp_tickets"

type Ticket = {
  id: string
  title: string
  description?: string
  status: "open" | "in_progress" | "closed"
  priority?: "low" | "medium" | "high"
  createdAt: string
  updatedAt: string
  reporterId: string
}

function readAll(): Ticket[] {
  const raw = localStorage.getItem(TICKETS_KEY)
  return raw ? JSON.parse(raw) : []
}
function writeAll(tickets: Ticket[]) {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets))
}

if (!localStorage.getItem(TICKETS_KEY)) {
  writeAll([
    {
      id: uuid(),
      title: "Welcome ticket",
      description: "This is a seeded ticket for demo purposes.",
      status: "open",
      priority: "low",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      reporterId: "u1",
    },
  ])
}

export function fetchTickets(): Promise<Ticket[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.03)
        return reject({ message: "Simulated network error" })
      resolve(readAll())
    }, 300)
  })
}

export function createTicket(
  payload: Omit<Ticket, "id" | "createdAt" | "updatedAt">
): Promise<Ticket> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const now = new Date().toISOString()
      const ticket: Ticket = {
        id: uuid(),
        ...payload,
        createdAt: now,
        updatedAt: now,
      }
      const list = readAll()
      list.unshift(ticket)
      writeAll(list)
      resolve(ticket)
    }, 300)
  })
}

export function updateTicket(
  id: string,
  changes: Partial<Ticket>
): Promise<Ticket> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const list = readAll()
      const idx = list.findIndex((t) => t.id === id)
      if (idx === -1) return reject({ message: "Ticket not found" })
      list[idx] = {
        ...list[idx],
        ...changes,
        updatedAt: new Date().toISOString(),
      }
      writeAll(list)
      resolve(list[idx])
    }, 300)
  })
}

export function deleteTicket(id: string): Promise<{ success: boolean }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      let list = readAll()
      list = list.filter((t) => t.id !== id)
      writeAll(list)
      resolve({ success: true })
    }, 300)
  })
}
