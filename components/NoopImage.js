/* eslint-disable @next/next/no-img-element */
import React from 'react'

// A small shim that replaces `next/image` for static builds/exports.
// It falls back to a plain <img> tag and supports static import objects.
export default function NoopImage(props) {
  const { src, alt = '', width, height, style, ...rest } = props

  // `next/image` allows static imports which become objects: { src, width, height }
  const resolvedSrc = src && typeof src === 'object' && src.src ? src.src : src

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      width={width || (src && src.width) || undefined}
      height={height || (src && src.height) || undefined}
      style={style}
      {...rest}
    />
  )
}
