import React, { useEffect, useRef, useState } from 'react'
import { useTorrent  } from './torrent'
import { renderOptions } from './config'
import { getLargestFileIndex } from './utils'

/**
 * Root player view
 */
const Player = props => {
  const hash = props.match.params.hash
  const video = useRef()
  const [info, files] = useTorrent(hash, 1000)
  const [rendering, setRendering] = useState(false)

  if (info && info.ready && !rendering) {
    console.log(files)
    setRendering(true)
    files[getLargestFileIndex(files)].renderTo(video.current, renderOptions, err => {
        if (err) {
          console.log(err)
        }
        console.log(`Rendering: ${hash}`)
      }
    )
  }

  return (
    <main className='player'>
      <video className='video' ref={video} />
      <Overlay video={video} {...info} />
    </main>
  )
}

export default Player

/**
 * Player overlay element
 */
const Overlay = props => {
  const [active, setActive] = useState()

  return (
    <div className={active ? 'overlay overlay--active' : 'overlay'}>

    </div>
  )
}

// const LoadingBar = props => {
//   const torrent = props.torrent
//   if (!torrent.progress) {
//     return null
//   }

//   // Find all contiguous parts of the torrent which are loaded
//   const prog = torrent.progress
//   const fileProg = prog.files[props.playingFileIndex]

//   if (!fileProg) return null

//   const parts = []
//   let lastPiecePresent = false
//   for (let i = fileProg.startPiece; i <= fileProg.endPiece; i++) {
//     const partPresent = Bitfield.prototype.get.call(prog.bitfield, i)
//     if (partPresent && !lastPiecePresent) {
//       parts.push({ start: i - fileProg.startPiece, count: 1 })
//     } else if (partPresent) {
//       parts[parts.length - 1].count++
//     }
//     lastPiecePresent = partPresent
//   }

//   // Output some bars to show which parts of the file are loaded
//   const loadingBarElems = parts.map(function (part, i) {
//     const style = {
//       left: (100 * part.start / fileProg.numPieces) + '%',
//       width: (100 * part.count / fileProg.numPieces) + '%'
//     }

//     return (<div key={i} className='loading-bar-part' style={style} />)
//   })

//   return (<div key='loading-bar' className='loading-bar'>{loadingBarElems}</div>)
// }