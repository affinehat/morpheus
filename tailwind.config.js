module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      gridTemplateRows: {
        'panels-1': 'repeat(1, 100%)',
        'panels-2': 'repeat(2, 50%)',
        'panels-3': 'repeat(3, 33.333%)',
        'panels-4': 'repeat(4, 25%)',
        'panels-5': 'repeat(5, 20%)',
        'panels-6': 'repeat(6, 16.667%)',
        'panels-7': 'repeat(7, 14.286%)',
        'panels-8': 'repeat(8, 12.5%)',
      },
      gridTemplateColumns: {
        'property-list': 'max-content 1fr',
      }
    },
  },
  variants: {},
  plugins: [],
}
