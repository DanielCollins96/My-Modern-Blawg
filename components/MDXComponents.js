/* eslint-disable react/display-name */
import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import Image from './Image'
import CustomLink from './Link'
import TOCInline from './TOCInline'
import Pre from './Pre'
import { BlogNewsletterForm } from './NewsletterForm'
import PostLayout from '@/layouts/PostLayout'
import PostSimple from '@/layouts/PostSimple'
import AuthorLayout from '@/layouts/AuthorLayout'
import ListLayout from '@/layouts/ListLayout'

export const layouts = {
  PostLayout,
  PostSimple,
  AuthorLayout,
  ListLayout,
}

export const MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  BlogNewsletterForm,
}

export const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource])
  const Layout = layouts[layout]

  if (!Layout) {
    throw new Error(`Unknown layout: ${layout}`)
  }

  return (
    <Layout {...rest}>
      <MDXLayout components={MDXComponents} />
    </Layout>
  )
}
