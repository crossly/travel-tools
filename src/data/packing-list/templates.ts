import type { PackingSectionId, PackingTemplate } from '@/lib/types'

export type PackingTemplateDefinition = PackingTemplate & {
  sections: Array<{
    id: PackingSectionId
    items: Array<{
      builtinKey: string
      quantity?: number
    }>
  }>
}

const sharedCore = {
  documents: [
    { builtinKey: 'packing.item.passport' },
    { builtinKey: 'packing.item.visa' },
    { builtinKey: 'packing.item.wallet' },
    { builtinKey: 'packing.item.cards' },
    { builtinKey: 'packing.item.cash' },
    { builtinKey: 'packing.item.insurance' },
  ],
  toiletries: [
    { builtinKey: 'packing.item.toothbrush' },
    { builtinKey: 'packing.item.toothpaste' },
    { builtinKey: 'packing.item.sunscreen' },
    { builtinKey: 'packing.item.faceWash' },
    { builtinKey: 'packing.item.deodorant' },
  ],
  electronics: [
    { builtinKey: 'packing.item.phone' },
    { builtinKey: 'packing.item.charger' },
    { builtinKey: 'packing.item.powerBank' },
    { builtinKey: 'packing.item.adapter' },
    { builtinKey: 'packing.item.earbuds' },
  ],
  medicine: [
    { builtinKey: 'packing.item.dailyMeds' },
    { builtinKey: 'packing.item.painRelief' },
    { builtinKey: 'packing.item.bandages' },
  ],
  misc: [
    { builtinKey: 'packing.item.waterBottle' },
    { builtinKey: 'packing.item.toteBag' },
    { builtinKey: 'packing.item.laundryBag' },
  ],
} as const

export const PACKING_TEMPLATE_DEFINITIONS: PackingTemplateDefinition[] = [
  {
    id: 'weekend',
    nameKey: 'packing.template.weekend.name',
    descriptionKey: 'packing.template.weekend.description',
    sections: [
      {
        id: 'documents',
        items: [...sharedCore.documents],
      },
      {
        id: 'clothing',
        items: [
          { builtinKey: 'packing.item.tops', quantity: 2 },
          { builtinKey: 'packing.item.bottoms', quantity: 1 },
          { builtinKey: 'packing.item.underwear', quantity: 2 },
          { builtinKey: 'packing.item.socks', quantity: 2 },
          { builtinKey: 'packing.item.sleepwear' },
          { builtinKey: 'packing.item.lightOuterwear' },
        ],
      },
      {
        id: 'toiletries',
        items: [...sharedCore.toiletries],
      },
      {
        id: 'electronics',
        items: [...sharedCore.electronics],
      },
      {
        id: 'medicine',
        items: [...sharedCore.medicine],
      },
      {
        id: 'misc',
        items: [
          ...sharedCore.misc,
          { builtinKey: 'packing.item.snacks' },
          { builtinKey: 'packing.item.sunglasses' },
        ],
      },
    ],
  },
  {
    id: 'long-trip',
    nameKey: 'packing.template.longTrip.name',
    descriptionKey: 'packing.template.longTrip.description',
    sections: [
      {
        id: 'documents',
        items: [
          ...sharedCore.documents,
          { builtinKey: 'packing.item.itinerary' },
          { builtinKey: 'packing.item.bookingCopies' },
        ],
      },
      {
        id: 'clothing',
        items: [
          { builtinKey: 'packing.item.tops', quantity: 5 },
          { builtinKey: 'packing.item.bottoms', quantity: 3 },
          { builtinKey: 'packing.item.underwear', quantity: 5 },
          { builtinKey: 'packing.item.socks', quantity: 5 },
          { builtinKey: 'packing.item.sleepwear' },
          { builtinKey: 'packing.item.lightOuterwear' },
          { builtinKey: 'packing.item.comfortShoes' },
        ],
      },
      {
        id: 'toiletries',
        items: [
          ...sharedCore.toiletries,
          { builtinKey: 'packing.item.moisturizer' },
          { builtinKey: 'packing.item.hairbrush' },
        ],
      },
      {
        id: 'electronics',
        items: [
          ...sharedCore.electronics,
          { builtinKey: 'packing.item.laptop' },
          { builtinKey: 'packing.item.cablePouch' },
        ],
      },
      {
        id: 'medicine',
        items: [
          ...sharedCore.medicine,
          { builtinKey: 'packing.item.motionSickness' },
        ],
      },
      {
        id: 'misc',
        items: [
          ...sharedCore.misc,
          { builtinKey: 'packing.item.reusableCutlery' },
          { builtinKey: 'packing.item.neckPillow' },
        ],
      },
    ],
  },
  {
    id: 'beach',
    nameKey: 'packing.template.beach.name',
    descriptionKey: 'packing.template.beach.description',
    sections: [
      {
        id: 'documents',
        items: [...sharedCore.documents],
      },
      {
        id: 'clothing',
        items: [
          { builtinKey: 'packing.item.tops', quantity: 3 },
          { builtinKey: 'packing.item.bottoms', quantity: 2 },
          { builtinKey: 'packing.item.underwear', quantity: 4 },
          { builtinKey: 'packing.item.swimwear', quantity: 2 },
          { builtinKey: 'packing.item.sandals' },
          { builtinKey: 'packing.item.sunHat' },
        ],
      },
      {
        id: 'toiletries',
        items: [
          ...sharedCore.toiletries,
          { builtinKey: 'packing.item.afterSun' },
        ],
      },
      {
        id: 'electronics',
        items: [
          ...sharedCore.electronics,
          { builtinKey: 'packing.item.camera' },
        ],
      },
      {
        id: 'medicine',
        items: [
          ...sharedCore.medicine,
          { builtinKey: 'packing.item.insectRepellent' },
        ],
      },
      {
        id: 'misc',
        items: [
          ...sharedCore.misc,
          { builtinKey: 'packing.item.beachTowel' },
          { builtinKey: 'packing.item.dryBag' },
        ],
      },
    ],
  },
  {
    id: 'business',
    nameKey: 'packing.template.business.name',
    descriptionKey: 'packing.template.business.description',
    sections: [
      {
        id: 'documents',
        items: [
          ...sharedCore.documents,
          { builtinKey: 'packing.item.workBadge' },
          { builtinKey: 'packing.item.meetingNotes' },
        ],
      },
      {
        id: 'clothing',
        items: [
          { builtinKey: 'packing.item.businessWear', quantity: 2 },
          { builtinKey: 'packing.item.tops', quantity: 2 },
          { builtinKey: 'packing.item.underwear', quantity: 3 },
          { builtinKey: 'packing.item.socks', quantity: 3 },
          { builtinKey: 'packing.item.formalShoes' },
        ],
      },
      {
        id: 'toiletries',
        items: [
          ...sharedCore.toiletries,
          { builtinKey: 'packing.item.groomingKit' },
        ],
      },
      {
        id: 'electronics',
        items: [
          ...sharedCore.electronics,
          { builtinKey: 'packing.item.laptop' },
          { builtinKey: 'packing.item.laptopCharger' },
          { builtinKey: 'packing.item.presentationAdapter' },
        ],
      },
      {
        id: 'medicine',
        items: [...sharedCore.medicine],
      },
      {
        id: 'misc',
        items: [
          { builtinKey: 'packing.item.businessCards' },
          { builtinKey: 'packing.item.toteBag' },
          { builtinKey: 'packing.item.waterBottle' },
        ],
      },
    ],
  },
]
