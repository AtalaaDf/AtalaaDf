import { SHAPE_ASSETS } from './assets'

export const HOME_SHAPES_CONFIG = [
  {
    id: 'plus',
    name: 'Plus',
    asset: SHAPE_ASSETS.plus,
    baseSize: '12vw',
    angleOffset: 0,
  },
  {
    id: 'star',
    name: 'Bintang',
    asset: SHAPE_ASSETS.star,
    baseSize: '10.5vw',
    angleOffset: (2 * Math.PI) / 5,
  },
  {
    id: 'circle',
    name: 'Lingkaran',
    asset: SHAPE_ASSETS.circle,
    baseSize: '10.2vw',
    angleOffset: (4 * Math.PI) / 5,
  },
  {
    id: 'square',
    name: 'Persegi',
    asset: SHAPE_ASSETS.square,
    baseSize: '9vw',
    angleOffset: (6 * Math.PI) / 5,
  },
  {
    id: 'triangle',
    name: 'Segitiga',
    asset: SHAPE_ASSETS.triangle,
    baseSize: '9vw',
    angleOffset: (8 * Math.PI) / 5,
  },
]
