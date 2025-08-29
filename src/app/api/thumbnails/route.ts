import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), 'public', 'thumbsforThesection')
    const entries = await fs.promises.readdir(publicDir, { withFileTypes: true })
    const allowed = new Set(['.png', '.jpg', '.jpeg', '.webp'])

    const files = entries
      .filter((e) => e.isFile())
      .map((e) => e.name)
      .filter((name) => allowed.has(path.extname(name).toLowerCase()))

    const items = files.map((name, index) => ({
      id: 1000 + index,
      title: name.replace(/\.[^/.]+$/, ''),
      category: 'Thumbnails' as const,
      thumbnail: `/thumbsforThesection/${encodeURIComponent(name)}`,
      type: 'image' as const,
    }))

    return NextResponse.json({ items })
  } catch (error) {
    return NextResponse.json({ items: [], error: 'Failed to read thumbnails' }, { status: 500 })
  }
}


