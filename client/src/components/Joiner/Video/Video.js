import React, { useState, useEffect, createRef } from 'react';

import { Grid, Button, Tooltip } from '@material-ui/core';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';

import useStyles from './styles';

const Video = ({ stream, muted, controls = false }) => {
  const [Videoing, setVideoing] = useState(false);
  const [Muting, setMuting] = useState(false);
  const [isZoom, setIsZoom] = useState(false);
  const videoRef = createRef();
  const classes = useStyles();

  useEffect(() => {
    let video = videoRef.current;

    if (video) {
      video.srcObject = stream;
    }

    // eslint-disable-next-line
  }, [videoRef, stream]);

  const toggleZoom = () => {
    setIsZoom(isZoom => !isZoom);
  };

  const toggleVideoing = () => {
    setVideoing(Videoing => !Videoing);
    stream.getVideoTracks()[0].enabled = Videoing;
  };

  const toggleMuting = () => {
    setMuting(Muting => !Muting);
    stream.getAudioTracks()[0].enabled = Muting;
  };

  return (
    <Grid
      container
      xs={isZoom ? 10 : 4}
      item
      justifyContent="flex-end"
      alignItems={isZoom ? 'flex-start' : 'flex-end'}
      className={
        isZoom ? `${classes.checkZooming}` : `${classes.videoContainer}`
      }
    >
      <video
        autoPlay
        muted={muted}
        ref={videoRef}
        className={classes.video}
        playsInline
      />
      {/* Zooming */}
      <div className={classes.floating}>
        {controls && (
          <>
            <Tooltip title="Camera">
              <Button onClick={toggleVideoing} className={classes.Sizing}>
                {Videoing ? (
                  <VideocamOffIcon
                    fontSize={isZoom ? 'large' : 'medium'}
                    color="secondary"
                  />
                ) : (
                  <VideocamIcon
                    fontSize={isZoom ? 'large' : 'medium'}
                    color="primary"
                  />
                )}
              </Button>
            </Tooltip>
            <Tooltip title="Mic">
              <Button onClick={toggleMuting} className={classes.Sizing}>
                {Muting ? (
                  <MicOffIcon
                    fontSize={isZoom ? 'large' : 'medium'}
                    color="secondary"
                  />
                ) : (
                  <MicIcon
                    fontSize={isZoom ? 'large' : 'medium'}
                    color="primary"
                  />
                )}
              </Button>
            </Tooltip>
          </>
        )}

        <Tooltip title="zoom">
          <Button onClick={toggleZoom} className={classes.Sizing}>
            {isZoom ? (
              <FullscreenExitIcon
                color="primary"
                fontSize={isZoom ? 'large' : 'medium'}
              />
            ) : (
              <ZoomOutMapIcon
                color="primary"
                fontSize={isZoom ? 'large' : 'small'}
              />
            )}
          </Button>
        </Tooltip>
      </div>
    </Grid>
  );
};

export default Video;
