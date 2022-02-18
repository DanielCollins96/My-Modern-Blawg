import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

const AsideBio = () => {
  return (
    <aside className="flex flex-col gap-4 py-2 px-4  mb-3 border-t-4 border-l-2  border-slate-400 border">
      <p className="font-bold text-4xl mb-2 mt-2">Learning + Writing</p>
      <p className="text-lg leading-6 text-gray-700 dark:text-gray-200">
        I'm a Canadian Software Developer trying out blogging. I'll be writing about software,
        technology but maybe add a flair of literature, economics, sports or photography
      </p>
      <p className="text-lg leading-6 text-gray-700 dark:text-gray-200">
        Feel free to reach out to me with questions or posts you'd like to see.
      </p>
      <div className="grid grid-flow-col justify-center gap-4 mb-2">
        <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size="6" />
        <SocialIcon kind="github" href={siteMetadata.github} size="6" />
      </div>
    </aside>
  )
}

export default AsideBio
