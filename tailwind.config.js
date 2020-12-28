module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      gridTemplateRows: {
        'panels-1': 'repeat(1, minmax(0, 100%))',
        'panels-2': 'repeat(2, minmax(0, 50%))',
        'panels-3': 'repeat(3, minmax(0, 33.333%))',
        'panels-4': 'repeat(4, minmax(0, 25%))',
        'panels-5': 'repeat(5, minmax(0, 20%))',
        'panels-6': 'repeat(6, minmax(0, 16.666%))',
        'panels-7': 'repeat(7, minmax(0, 14.2857%))',
        'panels-8': 'repeat(8, minmax(0, 12.5%))',
      },
      gridTemplateColumns: {
        'property-list': 'max-content 1fr',
      },
      minHeight: {
        'site': '833px',
      },
      maxHeight: {
        'content': 'calc(100% - 89px)',
        'panels': 'calc(100% - 56px)',
        'data': 'calc(100% - 24px)',
      },
    },
  },
  variants: {},
  plugins: [],
}
