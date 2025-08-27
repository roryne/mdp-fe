export default {
  branches: [
    { name: 'dev', prerelease: 'dev' },
    { name: 'staging', prerelease: 'staging' },
    { name: 'rc', prerelease: 'rc' },
    'main'
  ],
  plugins: [
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'docs/CHANGELOG.md'
      }
    ],
    '@semantic-release/commit-analyzer',
    [
      '@semantic-release/git',
      {
        assets: ['docs/CHANGELOG.md']
      }
    ],
    '@semantic-release/github',
    '@semantic-release/npm',
    '@semantic-release/release-notes-generator'
  ]
}
