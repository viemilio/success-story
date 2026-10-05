import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { readdirSync, readFileSync } from 'node:fs'
import { defineConfig, type Plugin } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Bettet die Bilder aus public/img als Data-URIs ein, damit eine einzige
// HTML-Datei ohne Server funktioniert.
function inlinePublicImages(): Plugin {
  const images = readdirSync('public/img').map((f) => [
    `/img/${f}`,
    `data:image/webp;base64,${readFileSync(`public/img/${f}`).toString('base64')}`,
  ])
  return {
    name: 'inline-public-images',
    enforce: 'post',
    generateBundle(_, bundle) {
      for (const chunk of Object.values(bundle)) {
        if (chunk.type === 'chunk')
          for (const [path, uri] of images) chunk.code = chunk.code.replaceAll(path, uri)
      }
    },
  }
}

// Baut eine eigenständige Vorschau-Datei: npm run build:preview → preview/index.html
export default defineConfig({
  plugins: [react(), tailwindcss(), inlinePublicImages(), viteSingleFile()],
  publicDir: false,
  build: { outDir: 'preview', emptyOutDir: true },
})
