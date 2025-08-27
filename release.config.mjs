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
    '@semantic-release/release-notes-generator',
    '@semantic-release/npm',
    '@semantic-release/github'
  ]
}
