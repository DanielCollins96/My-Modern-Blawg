import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

const AsideBio = () => {
  return (
    <aside className="flex flex-col gap-4 py-2 px-4  mb-3 border-t-4 border-l-2  border-slate-400 border">
      <p className="font-bold text-4xl mb-2 mt-2">Reading + Writing</p>
      <p className="text-lg leading-6 text-gray-600 dark:text-gray-500">
        I'm a Canadian Software Developer trying out blogging. I'll be making some content about
        software and technology, content that is hopefully useful to readers <br></br>
        <br></br>
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
