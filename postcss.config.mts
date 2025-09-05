import autoprefixer from 'autoprefixer'
import postcssNested from 'postcss-nested'
import postcssPresetEnv from 'postcss-preset-env'

const config = {
  plugins: [
    autoprefixer(),
    postcssNested(),
    postcssPresetEnv({
      stage: 1, // stage 1 features (nesting, custom properties, etc.)
      autoprefixer: {}
    })
  ]
}

export default config
