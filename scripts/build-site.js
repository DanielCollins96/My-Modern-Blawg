const { spawnSync } = require('child_process')
const path = require('path')

const isCloudflare = process.env.CF_PAGES === '1' || process.env.BUILD_TARGET === 'cloudflare'

if (isCloudflare) {
  require('./build-cloudflare.js')
} else {
  const root = path.join(__dirname, '..')
  const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx'

  const build = spawnSync(npx, ['next', 'build'], {
    stdio: 'inherit',
    cwd: root,
    env: process.env,
  })

  if (build.status) {
    process.exit(build.status)
  }

  const sitemap = spawnSync(process.execPath, [path.join(__dirname, 'generate-sitemap.js')], {
    stdio: 'inherit',
    cwd: root,
    env: process.env,
  })

  process.exit(sitemap.status ?? 0)
}
