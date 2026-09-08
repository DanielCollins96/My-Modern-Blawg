import React, { useCallback, useEffect, useState } from 'react'

import siteMetadata from '@/data/siteMetadata'

const Disqus = ({ frontMatter }) => {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(null)

  const COMMENTS_ID = 'disqus_thread'
  const shortname = siteMetadata.comment.disqusConfig.shortname

  const LoadComments = useCallback(() => {
    if (!shortname) {
      setError('Disqus shortname is not configured.')
      return
    }

    const config = function () {
      this.page.url = `${siteMetadata.siteUrl}/blog/${frontMatter.slug}`
      this.page.identifier = frontMatter.slug
    }

    window.disqus_config = config

    const embedSrc = `https://${shortname}.disqus.com/embed.js`
    const alreadyInjected = document.querySelector(`script[src="${embedSrc}"]`)

    if (window.DISQUS) {
      window.DISQUS.reset({
        reload: true,
        config,
      })
    } else if (!alreadyInjected) {
      const script = document.createElement('script')
      script.src = embedSrc
      script.setAttribute('data-timestamp', String(+new Date()))
      script.async = true
      script.onerror = () => {
        setError('Failed to load comments.')
        setLoaded(false)
        if (script.parentNode) {
          script.parentNode.removeChild(script)
        }
      }
      document.body.appendChild(script)
    }

    setLoaded(true)
  }, [frontMatter.slug, shortname])

  useEffect(() => {
    LoadComments()
  }, [LoadComments])

  return (
    <div className="pt-6 pb-6 text-gray-700 dark:text-gray-300">
      {!loaded && (
        <div className="text-center">
          <button type="button" onClick={LoadComments}>
            Load Comments
          </button>
        </div>
      )}
      <div className="disqus-frame" id={COMMENTS_ID} />
      {error && <p className="text-center">{error}</p>}
    </div>
  )
}

export default Disqus
