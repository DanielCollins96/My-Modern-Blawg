import { useEffect } from 'react'
import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'

const COUNT_SCRIPT_ID = 'dsq-count-scr'

function refreshDisqusCounts() {
  const shortname = siteMetadata.comment.disqusConfig.shortname
  if (siteMetadata.comment.provider !== 'disqus' || !shortname) return

  if (window.DISQUSWIDGETS) {
    window.DISQUSWIDGETS.getCount({ reset: true })
    return
  }

  if (document.getElementById(COUNT_SCRIPT_ID)) return

  const script = document.createElement('script')
  script.id = COUNT_SCRIPT_ID
  script.src = `https://${shortname}.disqus.com/count.js`
  script.async = true
  document.body.appendChild(script)
}

export default function CommentCount({ slug, className = '' }) {
  useEffect(() => {
    refreshDisqusCounts()
    const timer = setTimeout(refreshDisqusCounts, 1200)
    return () => clearTimeout(timer)
  }, [slug])

  if (siteMetadata.comment.provider !== 'disqus' || !slug) return null

  return (
    <Link
      href={`/blog/${slug}#comment`}
      className={`text-sm font-medium text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 ${className}`}
      aria-label="View comments"
    >
      <span
        className="disqus-comment-count"
        data-disqus-identifier={slug}
        data-disqus-url={`${siteMetadata.siteUrl}/blog/${slug}`}
      >
        Comments
      </span>
    </Link>
  )
}
