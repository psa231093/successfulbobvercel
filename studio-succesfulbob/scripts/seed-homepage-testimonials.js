/* Run only when the copy refresh is approved for publication:
   npx sanity exec scripts/seed-homepage-testimonials.js --with-user-token
   Existing published or draft testimonials are never replaced. */
const {getCliClient} = require('sanity/cli')
const fs = require('node:fs')
const path = require('node:path')

async function main() {
  const client = getCliClient({apiVersion: '2024-01-01'})
  const id = 'homepageTestimonials'
  const existing = await client.getDocuments([id, `drafts.${id}`])
  if (existing.some(Boolean)) {
    console.log('Testimonials already exist. No changes made.')
    return
  }
  const initial = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../../site/content/testimonials.json'), 'utf8'),
  )
  const items = []
  for (const item of initial) {
    const file = path.resolve(__dirname, '../../site/public', item.imageUrl.replace(/^\//, ''))
    const asset = await client.assets.upload('image', fs.createReadStream(file), {
      filename: path.basename(file),
    })
    items.push({
      _key: item._key,
      _type: 'testimonial',
      name: item.name,
      role: item.role,
      quote: item.quote,
      photo: {_type: 'image', asset: {_type: 'reference', _ref: asset._id}},
    })
  }
  // A concurrent creation must not be overwritten after the uploads finish.
  const latest = await client.getDocuments([id, `drafts.${id}`])
  if (latest.some(Boolean)) {
    console.log('Testimonials were created while preparing images. Content left unchanged.')
    return
  }
  await client.createIfNotExists({_id: id, _type: 'homepageTestimonials', items})
  console.log('Created Homepage Testimonials with five optimized portraits.')
}

main().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
