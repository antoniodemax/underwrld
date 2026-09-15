export const SPOTIFY_ARTIST_URL = 'https://open.spotify.com/artist/7GWXR553kTohhT3poHJOP5'

export type Release = {
  artist: string
  title: string
  year: string
  type: 'Single'
  spotifyTrackUrl: string
  spotifyAlbumUrl: string
  image: string | null
}

export const RELEASES: Release[] = [
  {
    artist: 'Quincy',
    title: 'On To The Next',
    year: '2026',
    type: 'Single',
    spotifyTrackUrl: 'https://open.spotify.com/track/3ThzxtAWDkDtGOrR57RafU',
    spotifyAlbumUrl: 'https://open.spotify.com/album/1el8jyISzs11heegWJ7KGV',
    image: null,
  },
  {
    artist: 'Quincy',
    title: 'KELELE',
    year: '2025',
    type: 'Single',
    spotifyTrackUrl: 'https://open.spotify.com/track/1edRiRkvDb7rmAkfUCzstW',
    spotifyAlbumUrl: 'https://open.spotify.com/album/7gSXxOaNMUdgBT1HFrzmnM',
    image: null,
  },
  {
    artist: 'Quincy',
    title: 'Form',
    year: '2024',
    type: 'Single',
    spotifyTrackUrl: 'https://open.spotify.com/track/4NfCRg1MyN7Cs6ZpdszRe9',
    spotifyAlbumUrl: 'https://open.spotify.com/album/6C1DmrRN6g0HPbWlGfOGR8',
    image: null,
  },
]
