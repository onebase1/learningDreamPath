import { MDXProvider } from '@mdx-js/react'
import components from './mdx-components'

export default function MDXLayout({ children }: { children: React.ReactNode }) {
  return (
    <MDXProvider components={components}>
      <div className="mdx-content">
        {children}
      </div>
    </MDXProvider>
  )
}