/* eslint-disable */

const token = process.env.SHORTCUT_TOKEN ?? ''
const validationColumnId = process.env.VALIDATION_COLUMN_ID ?? ''
const qaColumnId = process.env.QA_COLUMN_ID ?? ''
const dryRun = process.env.DRY_RUN === 'false' // 'true' for no Shortcut actions--only logging

const headers = {
  'Content-Type': 'application/json',
  'Shortcut-Token': token
}

const baseUrl = 'https://api.app.shortcut.com/api/v3'
const bulkModifyUrl = baseUrl + '/stories/bulk'
const searchUrl = baseUrl + '/stories/search'

const validationLabel = {
  id: '285',
  name: 'Validation Passed'
}

async function getValidationStories() {
  const body = {
    workflow_state_id: validationColumnId
  }

  const res = await fetch(searchUrl, {
    body: JSON.stringify(body),
    headers,
    method: 'POST'
  })

  const data = await res.json()

  if (!Array.isArray(data)) {
    console.error('Unexpected API response:', data)
    return []
  }
  return data
}

async function updateBulkStories({ storyIds }) {
  const ys = storyIds.length > 1 ? 'ies' : 'y'

  if (dryRun) {
    console.log(
      `[Dry Run] Would update stor${ys} ${storyIds} with label "Validation Passed" and move to QA column`
    )
    return
  }

  const body = {
    labels_add: [{ name: validationLabel.name }],
    story_ids: storyIds,
    workflow_state_id: qaColumnId
  }

  await fetch(bulkModifyUrl, {
    body: JSON.stringify(body),
    headers,
    method: 'PUT'
  })

  console.log(`Finished updating stor${ys}: ${storyIds}`)
}

async function main() {
  const stories = await getValidationStories()

  if (stories.length === 0) {
    console.log('No stories found in Validation column')
    return
  }

  const storyIds = stories.map((story) => story.id)

  await updateBulkStories({ storyIds })
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
