# Button Component Test Documentation

## 🎯 Goals

- Validate that `Button` behaves consistently across **states**, **variants**, and **interactions**.
- Minimize regressions in accessibility, styling, and interactivity.
- Serve as living documentation for contributors.

---

## ✅ Test Coverage Matrix

| Category          | What’s Tested                                                        | Why it Matters                          |
| ----------------- | -------------------------------------------------------------------- | --------------------------------------- |
| **Rendering**     | Default button renders with text                                     | Ensures baseline render works           |
| **Variants**      | `primary`, `warning` apply correct styles                            | Style regressions are caught            |
| **States**        | `disabled`, `focus`, `hover`, `isLoading`                            | Prevents broken UX / a11y               |
| **Events**        | `onClick` fires when enabled, does not fire when disabled            | Guards against silent UX bugs           |
| **Accessibility** | ARIA attributes, keyboard focus                                      | WCAG compliance                         |
| **Icons**         | Left/right icon render correctly, hidden icons respect `aria-hidden` | Prevents visual or screen reader issues |

---

## 🗒️ Notes

- **Accessibility first**: Tests prefer user-facing queries (`getByRole`, `getByText`) over implementation details.

---

## 🚦 Future Improvements

- Add test cases for `Button` in forms (submitting behavior).

---
