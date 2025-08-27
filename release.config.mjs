export default {
  branches: [
    { name: 'staging', prerelease: 'staging' },
    { name: 'rc', prerelease: 'rc' },
    'main'
  ],
  plugins: [
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md'
      }
    ],
    '@semantic-release/commit-analyzer',
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md']
      }
    ],
    '@semantic-release/github',
    '@semantic-release/npm',
    '@semantic-release/release-notes-generator'
  ]
}
