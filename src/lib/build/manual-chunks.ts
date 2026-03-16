const chunkMatchers = [
  {
    name: 'framework',
    patterns: [
      '/node_modules/react/',
      '/node_modules/react-dom/',
      '/node_modules/scheduler/',
      '/node_modules/@tanstack/react-router',
      '/node_modules/@tanstack/react-start',
      '/node_modules/@tanstack/router-core',
    ],
  },
  {
    name: 'forms',
    patterns: [
      '/node_modules/react-hook-form/',
      '/node_modules/@hookform/resolvers/',
      '/node_modules/zod/',
    ],
  },
  {
    name: 'calendar',
    patterns: [
      '/node_modules/react-day-picker/',
      '/node_modules/date-fns/',
    ],
  },
  {
    name: 'ui-vendor',
    patterns: [
      '/node_modules/@radix-ui/',
      '/node_modules/@base-ui/react/',
      '/node_modules/lucide-react/',
      '/node_modules/class-variance-authority/',
      '/node_modules/clsx/',
      '/node_modules/tailwind-merge/',
    ],
  },
] as const

export function getManualChunk(id: string) {
  if (!id.includes('/node_modules/')) {
    return undefined
  }

  for (const chunk of chunkMatchers) {
    if (chunk.patterns.some((pattern) => id.includes(pattern))) {
      return chunk.name
    }
  }

  return undefined
}
