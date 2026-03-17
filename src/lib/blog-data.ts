export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  coverImage: string
  content: string
}

export function getReadTime(content: string): number {
  const text = content.replace(/<[^>]+>/g, ' ')
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

// Add your articles here. Each object is one blog post.
// - slug: URL-safe identifier, e.g. "how-to-run-a-sub-4-hour-marathon"
// - content: HTML string. Write your article content between the <p> and <h2> tags.
// - coverImage: Use a path like /images/blog/your-image.jpg or a picsum URL.
export const blogPosts: BlogPost[] = [
  {
    slug: 'why-most-runners-overtrain',
    title: 'Why most runners overtrain, and how to stop',
    excerpt:
      'More miles is not always the answer. Here is what the research actually says about training volume, adaptation, and why rest is where progress happens.',
    date: '2025-11-18',
    coverImage: 'https://picsum.photos/seed/overtrain/800/450',
    content: `
<p>Add your article content here. This is a placeholder post that shows how the blog works.</p>
<h2>Your first subheading</h2>
<p>Write your article content in HTML. You can use standard tags like &lt;p&gt;, &lt;h2&gt;, &lt;h3&gt;, &lt;ul&gt;, &lt;ol&gt;, &lt;li&gt;, &lt;strong&gt;, and &lt;em&gt;.</p>
<p>When you are ready to publish a real article, replace this content with your own writing and update the title, excerpt, date, and category fields above.</p>
    `.trim(),
  },
  {
    slug: 'the-case-for-running-slower',
    title: 'The case for running slower',
    excerpt:
      'Easy pace feels wrong when you are trying to get faster. But the science behind Zone 2 training is compelling, and it might be the missing piece in your plan.',
    date: '2025-10-29',
    coverImage: 'https://picsum.photos/seed/slowrun/800/450',
    content: `
<p>Add your article content here. This is a placeholder post.</p>
<h2>Your first subheading</h2>
<p>Replace this with your actual article content when ready.</p>
    `.trim(),
  },
  {
    slug: 'how-to-build-a-running-habit',
    title: 'How to build a running habit that actually sticks',
    excerpt:
      'Motivation gets you started. Systems keep you going. Here are the behaviour-design principles that make consistent training feel automatic.',
    date: '2025-10-07',
    coverImage: 'https://picsum.photos/seed/runhabit/800/450',
    content: `
<p>Add your article content here. This is a placeholder post.</p>
<h2>Your first subheading</h2>
<p>Replace this with your actual article content when ready.</p>
    `.trim(),
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getRecentPosts(count = 3): BlogPost[] {
  return [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count)
}
