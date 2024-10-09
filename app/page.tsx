import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'public', 'data', 'posts.json')

function readPostsFile() {
  const fileContents = fs.readFileSync(dataFilePath, 'utf8')
  return JSON.parse(fileContents)
}

function getRecentPosts(category: string, count: number) {
  const { posts } = readPostsFile()
  return posts
    .filter((post: any) => post.category === category)
    .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count)
}

export default function Home() {
  const quote = "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill"

  const recentPrelims = getRecentPosts('Prelims', 3)
  const recentMains = getRecentPosts('Mains', 3)
  const recentInterview = getRecentPosts('Interview', 3)
  const recentBlog = getRecentPosts('Blog', 3)

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to UPSC Prep</h1>
        <p className="text-xl">
          Your comprehensive resource for UPSC exam preparation. We provide high-quality content
          for Prelims, Mains, and Interview stages to help you succeed in your UPSC journey.
        </p>
      </section>

      <section className="mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Quote of the Day</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="italic">{quote}</p>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Recent Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <RecentPostsSection title="Prelims" posts={recentPrelims} />
          <RecentPostsSection title="Mains" posts={recentMains} />
          <RecentPostsSection title="Interview" posts={recentInterview} />
          <RecentPostsSection title="Blog" posts={recentBlog} />
        </div>
      </section>
    </div>
  )
}

function RecentPostsSection({ title, posts }) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      {posts.map((post) => (
        <Card key={post.id} className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg">{post.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-2">{post.content.substring(0, 100)}...</p>
            <Link href={`/${title.toLowerCase()}/${post.id}`} className="text-primary hover:underline text-sm">
              Read more
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}