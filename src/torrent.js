import { useEffect, useState } from 'react'
import WebTorrent from 'webtorrent'
import { torrentOptions } from './config'
import { getLargestFileIndex } from './utils'

/**
 * Init WebTorrent Client
 */
const client = new WebTorrent()

/**
 * Keep a reference to torrent accessible
 */
let torrent = null

/**
 * Hook for set torrents state
 * @param {number} interval 
 * @returns {React.ComponentState}
 */
export const useTorrent = interval => {
  const [state, setState] = useState(null)

  useEffect(() => {
    const updateState = () => {
      if (torrent) {
        setState({
          ready: torrent.ready
        })
      }
    }

    let id = setInterval(updateState, interval) 
    return () => clearInterval(id)
  }, [interval])

  return state
}

/**
 * Returns a files from 
 * @returns {WebTorrent.TorrentFile}
 */
export const getTorrentFile = () => {
  if (!torrent) {
    return null
  }
  
  return torrent.files[getLargestFileIndex(torrent.files)]
}

/**
 * Adds a single torrent to the client
 * @param {string} hash 
 * @returns {void}
 */
export const setTorrent = hash => {
  if (!torrent) {
    torrent = client.add(hash, torrentOptions)
  }
}

/**
 * Removes active torernt from client
 * @returns {void}
 */
export const destroyTorrent = () => {
  if (torrent) {
    torrent.destroy(() => {
      torrent = null
    })
  }
}