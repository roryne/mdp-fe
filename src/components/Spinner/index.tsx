const Spinner = ({
  className,
  shouldShow
}: {
  readonly shouldShow: boolean
  readonly className?: string
}) => {
  if (!shouldShow) return null

  return (
    <svg
      className={className}
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="25"
        cy="25"
        fill="none"
        r="20"
        stroke="currentColor"
        strokeDasharray="90,150"
        strokeDashoffset="0"
        strokeLinecap="round"
        strokeWidth="4"
      >
        <animateTransform
          attributeName="transform"
          dur="1s"
          from="0 25 25"
          repeatCount="indefinite"
          to="360 25 25"
          type="rotate"
        />
      </circle>
    </svg>
  )
}

Spinner.displayName = 'Spinner'

export default Spinner
