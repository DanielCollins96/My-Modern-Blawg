import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'

export default function Photos() {
  return (
    <>
      <PageSEO title={`Photos - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="">hey</div>
    </>
  )
}
