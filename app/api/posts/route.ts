import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'public', 'data', 'posts.json')

function readPostsFile() {
  const fileContents = fs.readFileSync(dataFilePath, 'utf8')
  return JSON.parse(fileContents)
}

function writePostsFile(data: any) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2))
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const subcategory = searchParams.get('subcategory')
  const date = searchParams.get('date')

  try {
    const { posts } = readPostsFile()
    
    let filteredPosts = posts.filter((post: any) => 
      (!category || post.category === category) &&
      (!subcategory || post.subcategory === subcategory) &&
      (!date || post.date === date)
    )

    // Sort posts by date, newest first
    filteredPosts.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return NextResponse.json(filteredPosts)
  } catch (error) {
    console.error('Error reading posts:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const post = await request.json()

  if (!post.id || !post.title || !post.content || !post.category || !post.subcategory || !post.date) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  try {
    const data = readPostsFile()
    data.posts.push(post)
    writePostsFile(data)
    return NextResponse.json({ message: 'Post created successfully' }, { status: 201 })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const updatedPost = await request.json()

  if (!updatedPost.id) {
    return NextResponse.json({ error: 'Missing post ID' }, { status: 400 })
  }

  try {
    const data = readPostsFile()
    const postIndex = data.posts.findIndex((post: any) => post.id === updatedPost.id)

    if (postIndex === -1) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    data.posts[postIndex] = updatedPost
    writePostsFile(data)
    return NextResponse.json({ message: 'Post updated successfully' })
  } catch (error) {
    console.error('Error updating post:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Missing post ID' }, { status: 400 })
  }

  try {
    const data = readPostsFile()
    const postIndex = data.posts.findIndex((post: any) => post.id === id)

    if (postIndex === -1) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    data.posts.splice(postIndex, 1)
    writePostsFile(data)
    return NextResponse.json({ message: 'Post deleted successfully' })
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}