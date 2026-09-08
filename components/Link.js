/* eslint-disable jsx-a11y/anchor-has-content */
import Link from 'next/link'

const CustomLink = ({ href, ...rest }) => {
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')

  if (isInternalLink) {
    return <Link href={href} {...rest} />
  }

  if (isAnchorLink) {
    return <a href={href} {...rest} />
  }

  // Allow external project links to pass referrer data to destination analytics.
  // eslint-disable-next-line react/jsx-no-target-blank
  return <a target="_blank" rel="noopener" href={href} {...rest} />
}

export default CustomLink
