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

export const CONNECTOR_SHAPES_CONFIG = [
  {
    id: 'plus',
    name: 'Plus',
    asset: SHAPE_ASSETS.plus,
    centerX: 16.0,
    widthVw: 9.8,
  },
  {
    id: 'square',
    name: 'Persegi',
    asset: SHAPE_ASSETS.square,
    centerX: 33.2,
    widthVw: 9.2,
  },
  {
    id: 'star',
    name: 'Bintang',
    asset: SHAPE_ASSETS.star,
    centerX: 50.5,
    widthVw: 9.5,
  },
  {
    id: 'circle',
    name: 'Lingkaran',
    asset: SHAPE_ASSETS.circle,
    centerX: 67.7,
    widthVw: 9.5,
  },
  {
    id: 'triangle',
    name: 'Segitiga',
    asset: SHAPE_ASSETS.triangle,
    centerX: 84.5,
    widthVw: 6.2,
  },
]

export const ABOUT_SHAPES_CONFIG = [
  {
    id: 'star',
    name: 'Bintang',
    asset: SHAPE_ASSETS.star,
    centerX: 16,
    centerY: 24,
    widthVw: 12,
    rotation: 12,
  },
  {
    id: 'circle',
    name: 'Lingkaran',
    asset: SHAPE_ASSETS.circle,
    centerX:12,
    centerY: 60,
    widthVw: 16,
    rotation: 0,
  },
  {
    id: 'triangle',
    name: 'Segitiga',
    asset: SHAPE_ASSETS.triangle,
    centerX: 24,
    centerY: 44,
    widthVw: 9.5,
    rotation: 75,
  },
]
