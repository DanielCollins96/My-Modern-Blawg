const fs = require('fs')
const path = require('path')
const { spawnSync } = require('child_process')

const root = path.join(__dirname, '..')
const apiDir = path.join(root, 'pages', 'api')
const tmpDir = path.join(root, '.api-export-tmp')

function restoreApiRoutes() {
  if (fs.existsSync(tmpDir) && !fs.existsSync(apiDir)) {
    fs.renameSync(tmpDir, apiDir)
  }
}

process.on('exit', restoreApiRoutes)
process.on('SIGINT', () => {
  restoreApiRoutes()
  process.exit(1)
})
process.on('SIGTERM', () => {
  restoreApiRoutes()
  process.exit(1)
})

if (fs.existsSync(tmpDir)) {
  if (fs.existsSync(apiDir)) {
    throw new Error(
      `Cannot build: both ${apiDir} and ${tmpDir} exist. Remove the stale temp directory at ${tmpDir} and try again.`
    )
  }
  fs.renameSync(tmpDir, apiDir)
}

if (fs.existsSync(apiDir)) {
  fs.renameSync(apiDir, tmpDir)
}

const env = { ...process.env, BUILD_TARGET: 'cloudflare' }
const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx'

const build = spawnSync(npx, ['next', 'build'], {
  stdio: 'inherit',
  env,
  cwd: root,
})

if (build.status !== 0) {
  restoreApiRoutes()
  process.exit(build.status ?? 1)
}

const sitemap = spawnSync(process.execPath, [path.join(__dirname, 'generate-sitemap.js')], {
  stdio: 'inherit',
  env,
  cwd: root,
})

restoreApiRoutes()
process.exit(sitemap.status ?? 0)
