import React from 'react';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'public', 'data', 'posts.json');

function readPostsFile() {
  const fileContents = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(fileContents);
}

export default function BlogPost({ params }: { params: { id: string } }) {
  const { posts } = readPostsFile();
  const post = posts.find((p: any) => p.id === params.id && p.category === 'Blog');

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-4">Date: {post.date}</p>
      <div className="prose max-w-none">
        {post.content}
      </div>
    </div>
  );
}