export default defineAppConfig({
  // https://ui3.nuxt.dev/getting-started/theme#design-system
  ui: {
    colors: {
      // primary: "mybrand",
      // neutral: "slate",
    },
    button: {
      defaultVariants: {
        // Set default button color to neutral
        // color: 'neutral'
      }
    },
    select: {
      slots : {

      }
    },
    alert: {
      slots: {
        root: 'py-1'
      }
    }
  }
})
