export default {
  branches: [
    { name: 'dev', prerelease: 'dev' },
    { name: 'staging', prerelease: 'staging' },
    { name: 'rc', prerelease: 'rc' },
    'main'
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'angular',
        writerOpts: {
          transform: (commit) => {
            // Skip internal/admin commits from public changelog
            if (commit.type === 'admin') {
              commit.skip = true
            }
            return commit
          }
        }
      }
    ],
    [
      '@semantic-release/changelog',
      { changelogFile: 'CHANGELOG.md' } // public changelog
    ],
    [
      '@semantic-release/changelog',
      { changelogFile: 'CHANGELOG_INTERNAL.md' } // internal changelog
    ],
    '@semantic-release/github',
    '@semantic-release/git'
  ]
}
