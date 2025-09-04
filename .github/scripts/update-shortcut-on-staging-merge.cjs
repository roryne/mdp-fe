/* eslint-disable */
const fetch = require('node-fetch')

const token = process.env.SHORTCUT_TOKEN ?? ''
const validationColumnId = process.env.VALIDATION_COLUMN_ID ?? ''
const qaColumnId = process.env.QA_COLUMN_ID ?? ''
const dryRun = process.env.DRY_RUN === 'true' // 'true' for dry-run mode

async function getValidationStories() {
  const res = await fetch(
    `https://api.app.shortcut.com/api/v3/stories?filter[workflow_state]=${validationColumnId}`,
    { headers: { 'Shortcut-Token': token } }
  )
  const data = await res.json()
  if (!Array.isArray(data)) {
    console.error('Unexpected API response:', data)
    return []
  }
  return data
}

async function updateStory(storyId, storyName) {
  if (dryRun) {
    console.log(
      `[Dry Run] Would update story ${storyId} - "${storyName}" with label "Validation Passed" and move to QA column`
    )
    return
  }

  await fetch(`https://api.app.shortcut.com/api/v3/stories/${storyId}`, {
    method: 'PUT',
    headers: {
      'Shortcut-Token': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      labels: ['Validation Passed'],
      workflow_state_id: qaColumnId
    })
  })

  console.log(`Updated story ${storyId} - "${storyName}"`)
}

async function main() {
  const stories = await getValidationStories()
  console.log(`Found ${stories.length} stories in Validation column.`)

  for (const story of stories) {
    await updateStory(story.id, story.name)
  }

  console.log('All stories processed.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
