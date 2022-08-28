import React, { useState, useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Peer from 'peerjs';
import { v4 as uuidv4 } from 'uuid';
import { io } from 'socket.io-client';
import {
  CONNECTION_URL,
  PEER_SERVER_URL,
  LOCALHOST,
} from '../../constants/Types';

//import components
import Video from './Video/Video.js';
import Chat from './Chat/Chat';

// protect private router
import { authRouter } from '../../privateRouter/AuthRouter';

//import styling
import { Container, Grid, Grow, Button, Tooltip } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import useStyles from './styles';

const socket = io.connect(CONNECTION_URL || LOCALHOST);

const myPeerID = uuidv4();

const myPeer = new Peer(myPeerID, {
  secure: true,
  host: PEER_SERVER_URL,
  port: 443,
});

const Joiner = () => {
  const classes = useStyles();

  const history = useHistory();

  const { state } = useLocation();

  // Authenticate URL
  authRouter(state?.data, history);

  const { guestName, room } = state?.data;

  // store video scream array
  const [videoStreams, setVideoStreams] = useState([]);
  // store peers array
  // const [peersArray, setPeersArray] = useState([]);
  // store local stream
  const [myStream, setMyStream] = useState();

  const messageCount = useRef(0);

  useEffect(() => {
    let mounted = true;
    console.log(myPeerID, guestName, room);

    socket.emit('new-Guest-First-Arrive', myPeerID, room, guestName);

    socket.on('new-Guest-Arrived', (peerID, room, guestName) => {
      console.log(peerID, room, guestName);

      // setPeersArray(peers => {
      //   const copyPeers = [...peers];
      //   const found = copyPeers.some(item => item === peerID);

      //   if (!found && peerID !== myPeerID) copyPeers.push(peerID);

      //   return copyPeers;
      // });

      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: true,
        })
        .then(stream => {
          // console.log(stream.id);
          setMyStream(stream);

          if (peerID !== myPeerID) {
            // socket.emit('sendMyPeer', room, myPeerID);

            const call = myPeer.call(peerID, stream);

            call.on('stream', remoteStream => {
              if (stream.id !== remoteStream.id) {
                setVideoStreams(streams => {
                  const copyStreams = [...streams];
                  const found = copyStreams.some(
                    item => item.id === remoteStream.id
                  );
                  if (!found) copyStreams.push(remoteStream);
                  return copyStreams;
                });
              }
            });
          }
        })
        .catch(error => console.log('Failed to get local stream', error));

      myPeer.on('call', call => {
        navigator.mediaDevices
          .getUserMedia({
            video: true,
            audio: true,
          })
          .then(stream => {
            setMyStream(stream);

            // console.log(stream);
            call.answer(stream);

            call.on('stream', remoteStream => {
              console.log(remoteStream);
              if (stream.id !== remoteStream.id) {
                setVideoStreams(streams => {
                  const copyStreams = [...streams];

                  const found = copyStreams.some(
                    item => item.id === remoteStream.id
                  );
                  if (!found) copyStreams.push(remoteStream);
                  return copyStreams;
                });
              }
            });
          })
          .catch(error => console.log('Failed to get local stream', error));
      });
    });

    // socket.on('receiveMyPeer', peerID => {
    //   setPeersArray(peers => {
    //     const copyPeers = [...peers];

    //     const found = copyPeers.some(item => item === peerID);
    //     if (!found && peerID !== myPeerID) copyPeers.push(peerID);

    //     return copyPeers;
    //   });
    // });

    socket.on('userLeft', (streamID, peerID) => {
      if (mounted) {
        // console.log(streamID, peerID);

        setVideoStreams(currentStreams => {
          let filteredStreams = currentStreams.filter(
            stream => stream.id !== streamID
          );
          return [...filteredStreams];
        });

        // setPeersArray(currentPeers => {
        //   let filteredPeers = currentPeers.filter(peer => peer !== peerID);
        //   return [...filteredPeers];
        // });
      }
    });

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line
  }, []);

  const handleLeave = e => {
    e.preventDefault();

    // stop media track: video and audio
    myStream.getTracks().forEach(track => {
      track.stop();
    });

    socket.emit('userExited', myStream.id, myPeerID, room);

    // push back to /
    history.push('/');

    window.location.reload(false);
  };

  // console.log('my stream', myStream);
  // console.log('video arrays', videoStreams);
  // console.log('peer arrays', peersArray);
  return (
    <Grow in>
      <Container maxWidth="xl" className={classes.mainContainer}>
        <Grid container direction="column" style={{ height: '100%' }}>
          <Grid
            className={classes.Videos}
            container
            item
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Video muted={true} stream={myStream} controls={true} />
            {videoStreams.length > 0 &&
              videoStreams.map((stream, index) => (
                <Video muted={false} key={index} stream={stream} />
              ))}
          </Grid>

          <Grid
            container
            item
            className={classes.Controls}
            justifyContent="center"
            alignItems="center"
          >
            {/* Leave Room */}
            <Grid item>
              <Tooltip title="Leave Room">
                <Button onClick={handleLeave}>
                  <ExitToAppIcon
                    fontSize="large"
                    className={classes.buttonColor}
                  />
                </Button>
              </Tooltip>
            </Grid>
            {/* Chat */}
            <Grid item>
              <Chat
                guestName={guestName}
                room={room}
                socket={socket}
                messageCount={messageCount}
              />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Joiner;
