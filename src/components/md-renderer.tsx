import { Suspense } from 'react'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

// Server Component for rendering Markdown
async function MarkdownContent({ content }: { content: string }) {
  // Process markdown to HTML on the server
  const processedContent = await remark().use(remarkHtml).process(content)

  const contentHtml = processedContent.toString()

  return (
    <div
      className="prose prose-sm sm:prose max-w-none"
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    />
  )
}

// Wrapper component with fallback
export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <Suspense
      fallback={<div className="h-40 animate-pulse rounded-md bg-gray-100" />}
    >
      <MarkdownContent content={content} />
    </Suspense>
  )
}
