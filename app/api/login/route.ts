import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const body = await req.json()

  const urlEncodedBody = new URLSearchParams({
    username: body.username,
    password: body.password,
  }).toString()

  const springResponse = await fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: urlEncodedBody,
  })

  const token = await springResponse.text()

  if (!springResponse.ok) {
    return NextResponse.json(
      { error: token },
      { status: springResponse.status }
    )
  }

  return NextResponse.json({ token })
}
