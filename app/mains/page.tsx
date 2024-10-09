import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { categories } from '@/lib/categories';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'public', 'data', 'posts.json');

function readPostsFile() {
  const fileContents = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(fileContents);
}

function getRecentPosts(category: string, count: number) {
  const { posts } = readPostsFile();
  return posts
    .filter((post: any) => post.category === category)
    .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}

export default function MainsPage() {
  const mainsCategory = categories.find(cat => cat.name === 'Mains');
  const recentPosts = getRecentPosts('Mains', 5);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">UPSC Mains</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Mains Syllabus</h2>
        <ul className="list-disc pl-5 space-y-2">
          {mainsCategory?.subcategories.map((subcat, index) => (
            <li key={index}>{subcat}</li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Recent Mains Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post: any) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{post.content.substring(0, 150)}...</p>
                <Link href={`/mains/${post.id}`} className="text-primary hover:underline">
                  Read more
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}