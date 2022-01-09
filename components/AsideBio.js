import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

const AsideBio = () => {
  return (
    <aside className="flex flex-col gap-4 p-2  mb-auto">
      <p className="font-bold text-4xl mb-2 mt-2">About This Site</p>
      <p className="text-lg leading-6 text-gray-600 dark:text-gray-500">
        I'm a Canadian Software Developer trying out blogging. I'll be making some content about
        software, technology, that is hopefully useful to readers, feel free to reach out to me.
      </p>
      <div className="grid grid-flow-col justify-center gap-4">
        <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size="6" />
        <SocialIcon kind="github" href={siteMetadata.github} size="6" />
      </div>
    </aside>
  )
}

export default AsideBio
