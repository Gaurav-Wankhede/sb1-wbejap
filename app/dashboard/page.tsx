"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { categories } from '@/lib/categories'

export default function Dashboard() {
  const [posts, setPosts] = useState([])
  const { register, handleSubmit, reset, setValue } = useForm()
  const router = useRouter()

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('adminLoggedIn')
    if (!adminLoggedIn) {
      router.push('/admin/login')
    } else {
      fetchPosts()
    }
  }, [router])

  const onSubmit = async (data) => {
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, id: Date.now().toString() }),
    })

    if (response.ok) {
      reset()
      fetchPosts()
    }
  }

  const fetchPosts = async () => {
    const response = await fetch('/api/posts')
    if (response.ok) {
      const data = await response.json()
      setPosts(data)
    }
  }

  const deletePost = async (id) => {
    const response = await fetch(`/api/posts?id=${id}`, {
      method: 'DELETE',
    })

    if (response.ok) {
      fetchPosts()
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn')
    router.push('/admin/login')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button onClick={handleLogout}>Logout</Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
        <Input {...register('title')} placeholder="Title" className="mb-4" />
        <Textarea {...register('content')} placeholder="Content" className="mb-4" />
        <Select onValueChange={(value) => {
          setValue('category', value)
          setValue('subcategory', '') // Reset subcategory when category changes
        }}>
          <SelectTrigger className="mb-4">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.name} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setValue('subcategory', value)}>
          <SelectTrigger className="mb-4">
            <SelectValue placeholder="Select subcategory" />
          </SelectTrigger>
          <SelectContent>
            {categories.flatMap((category) =>
              category.subcategories.map((subcategory) => (
                <SelectItem key={subcategory} value={subcategory}>
                  {subcategory}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
        <Input {...register('date')} type="date" className="mb-4" />
        <Button type="submit">Create Post</Button>
      </form>

      <div>
        <h2 className="text-2xl font-bold mb-4">Posts</h2>
        {posts.map((post) => (
          <div key={post.id} className="mb-4 p-4 border rounded">
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p>{post.content.substring(0, 100)}...</p>
            <p>Category: {post.category}</p>
            <p>Subcategory: {post.subcategory}</p>
            <p>Date: {post.date}</p>
            <Button onClick={() => deletePost(post.id)} variant="destructive" className="mt-2">Delete</Button>
          </div>
        ))}
      </div>
    </div>
  )
}