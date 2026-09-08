import NextImage from 'next/image'

const Image = ({ alt = '', ...rest }) => <NextImage alt={alt} {...rest} />

export default Image
