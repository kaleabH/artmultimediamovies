import { Container } from '@mui/material'
import React from 'react'
import VideoPlayer from './VideoPlayer'

function PlayList({mediaType}) {
  return (
    <div>
        <Container header="Play List">
            <div>
                <div><ul></ul></div>
                <div>
                    <VideoPlayer media={""} mediaType={mediaType}/>
                </div>

            </div>

        </Container>
    </div>
  )
}

export default PlayList