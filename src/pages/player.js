import React, { Component, createRef } from 'react';
import WebTorrent from 'webtorrent';

import { renderOptions, torrentOptions } from './config';

class Player extends Component {
  constructor() {
    // Initiial state
    this.state = {
      isPlaying: false,
      torrentReady: false,
      torrentPeers: 0,
      torrentDownload: 0,
      torrentProgress: 0
    }

    // Torrent client 
    this.client = new WebTorrent()

    // Reference to player dom object to directly control
    this.player = createRef()

    // Control timings in component
    this.interval = null
  }

  componentDidMount() {
    const torrentHash = this.props.match.params.id
  }

  addTorrent = (hash, trackers) => {
    this.client.add(
      torrentPath,
      torrentOptions,
      this.torrentReady
    )
  }

  torrentReady = torrent => {
    this.setState({
      torrentReady: true
    })
    this.interval = setInterval(() => {
      this.setState({
        torrentDownload: torrent.downloadSpeed,
        torrentPeers: torrent.numPeers,
        torrentProgress: torrent.progress
      })
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    this.client.destroy();
  }

  render() {
    return (
      null
    )
  }
}

export default Player;