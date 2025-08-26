# Admin Bypass Procedure for `main` Branch Protection

## Purpose

This document describes the process for bypassing required status checks on the `main` branch for repository admins.  
It ensures that admins can merge critical changes when necessary without compromising branch protection rules for other contributors.

---

## When to Use

Only use the admin bypass in exceptional circumstances, such as:

- Emergency hotfixes
- CI/CD misbehavior preventing necessary merges
- Other critical situations that require overriding normal status checks

Regular PRs should **always** pass required checks (see list of Required Status Checks at bottom) before merging.

---

## Prerequisites

- You must be listed as a **bypass actor** in the branch protection rules.
- Your bypass mode is configured as `always` in the repository settings.

---

## Steps to Merge with Bypass

1. **Create or open a PR targeting `main`.**
   - This can be a normal feature branch PR or a hotfix branch PR.

2. **Attempt to merge via GitHub UI.**
   - Even if required status checks fail or are incomplete, your account will be allowed to merge.

3. **Verify the merge.**
   - Ensure the merge has completed successfully.
   - Confirm that your bypass did not disrupt unrelated checks or workflows.

---

## Notes and Best Practices

- Keep a record of all bypass merges for audit purposes.
- Only bypass when necessary; normal PRs should adhere to all status checks.
- Communicate with your team if using the bypass to prevent confusion.

---

## References

- GitHub Branch Protection Rules: [https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests)
- Required Status Checks:
  - `kickoff / formatter`
  - `kickoff / linter`
  - `kickoff / typecheck`
  - `kickoff / playwright`
