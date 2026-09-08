import { visit } from 'unist-util-visit'
import fs from 'fs'
import sharp from 'sharp'

export default function remarkImgToJsx() {
  return async (tree) => {
    const imageNodes = []

    visit(
      tree,
      // only visit p tags that contain an img element
      (node) => node.type === 'paragraph' && node.children.some((n) => n.type === 'image'),
      (node) => {
        const imageNode = node.children.find((n) => n.type === 'image')
        if (!imageNode) {
          return
        }

        const imagePath = `${process.cwd()}/public${imageNode.url}`
        if (fs.existsSync(imagePath)) {
          imageNodes.push({ node, imageNode, imagePath })
        }
      }
    )

    for (const { node, imageNode, imagePath } of imageNodes) {
      const metadata = await sharp(imagePath).metadata()
      if (!metadata || typeof metadata.width !== 'number' || typeof metadata.height !== 'number') {
        continue
      }

      imageNode.type = 'mdxJsxFlowElement'
      imageNode.name = 'Image'
      imageNode.attributes = [
        { type: 'mdxJsxAttribute', name: 'alt', value: imageNode.alt },
        { type: 'mdxJsxAttribute', name: 'src', value: imageNode.url },
        { type: 'mdxJsxAttribute', name: 'width', value: metadata.width },
        { type: 'mdxJsxAttribute', name: 'height', value: metadata.height },
      ]

      // Change node type from p to div to avoid nesting error
      node.type = 'div'
      node.children = [imageNode]
    }
  }
}
