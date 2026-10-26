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

// Layout acakan pertama: 5 shape tersebar acak mengelilingi teks tengah
export const CONNECTOR_ACAKAN_1 = [
  { id: 'plus', centerX: 14, centerY: 24, widthVw: 8.5, rotation: 20 },
  { id: 'square', centerX: 84, centerY: 22, widthVw: 7.8, rotation: -15 },
  { id: 'star', centerX: 18, centerY: 74, widthVw: 9.0, rotation: 35 },
  { id: 'circle', centerX: 86, centerY: 72, widthVw: 8.2, rotation: 0 },
  { id: 'triangle', centerX: 50, centerY: 82, widthVw: 6.0, rotation: -40 },
]

// Layout acakan kedua: 5 shape tersebar acak (posisi baru saat acakan 2)
export const CONNECTOR_ACAKAN_2 = [
  { id: 'plus', centerX: 82, centerY: 28, widthVw: 7.5, rotation: -30 },
  { id: 'square', centerX: 16, centerY: 28, widthVw: 8.0, rotation: 45 },
  { id: 'star', centerX: 50, centerY: 18, widthVw: 8.8, rotation: -10 },
  { id: 'circle', centerX: 22, centerY: 76, widthVw: 9.2, rotation: 15 },
  { id: 'triangle', centerX: 80, centerY: 76, widthVw: 5.8, rotation: 60 },
]
