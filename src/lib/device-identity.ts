const DEVICE_IDENTITIES = [
  { emoji: '🐼', noun: 'Panda' },
  { emoji: '🦊', noun: 'Fox' },
  { emoji: '🐰', noun: 'Bunny' },
  { emoji: '🐧', noun: 'Penguin' },
  { emoji: '🐨', noun: 'Koala' },
  { emoji: '🦦', noun: 'Otter' },
  { emoji: '🦄', noun: 'Unicorn' },
  { emoji: '🐻', noun: 'Bear' },
  { emoji: '🐯', noun: 'Tiger' },
  { emoji: '🐱', noun: 'Kitty' },
  { emoji: '🍓', noun: 'Strawberry' },
  { emoji: '🍑', noun: 'Peach' },
  { emoji: '🥝', noun: 'Kiwi' },
  { emoji: '🍒', noun: 'Cherry' },
  { emoji: '🍉', noun: 'Watermelon' },
  { emoji: '🍍', noun: 'Pineapple' },
  { emoji: '🥥', noun: 'Coconut' },
  { emoji: '🍎', noun: 'Apple' },
] as const

export function generateDeviceDisplayName() {
  const choice = DEVICE_IDENTITIES[Math.floor(Math.random() * DEVICE_IDENTITIES.length)] ?? DEVICE_IDENTITIES[0]
  return `${choice.emoji} ${choice.noun}`
}
