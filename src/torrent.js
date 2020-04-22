import { useEffect, useState } from 'react'
import WebTorrent from 'webtorrent'
import { torrentOptions } from './config'

/**
 * Init WebTorrent Client
 */
const client = new WebTorrent()

/**
 * Keep a reference to torrent accessible
 */
let torrent = null

/**
 * Keep a reference to files accessible
 */
let files = null


/**
 * 
 */
const getFiles = () => files

/**
 * Hook for set torrents state
 *
 * @param {string} initiator - Torrent identifier
 * @param {number} interval - Update interval
 * @returns {React.ComponentState}
 */
export const useTorrent = (initiator, interval = 1000) => {
  const [torrentState, setTorrentState] = useState(null)

  useEffect(() => {
    // Add torrent of one does not exist
    if (!torrent) {
      torrent = client.add(initiator, torrentOptions)
    }

    const updateTorrentState = () => {
      if (torrent) {
        // Create server if torrent ready and no server set
        if (torrent.ready && !files) {
          files = torrent.files
        }
        
        // Update current state
        setTorrentState({
          ready: torrent.ready,
          peers: torrent.peers,
          downloadSpeed: torrent.downloadSpeed,
          uploadSpeed: torrent.uploadSpeed,
          timeRemaining: torrent.timeRemaining,
          progress: torrent.progress,
        })
      }
    }

    // Interval updator
    let id = setInterval(updateTorrentState, interval) 

    // Cleanup on unmount
    return () => {
      clearInterval(id)
      if (torrent) {
        torrent.destroy(() => {
          torrent = null
        })
        files = null
      }
    }
  }, [initiator, interval])

  return [torrentState, files]
}