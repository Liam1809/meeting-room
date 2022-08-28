import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';

//import actions
import { setSnackBar } from '../../../actions/snackbar';

import {
  TextField,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Badge,
  Tooltip,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ChatIcon from '@material-ui/icons/Chat';

import useStyles from './styles';

let count = 0;

const Chat = ({ guestName, room, socket, messageCount }) => {
  const dispatch = useDispatch();

  const classes = useStyles();

  const [openChating, setOpenChating] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('To Receiver', () => {
      dispatch(setSnackBar(true, 'info', 'New Messages Received'));
      count += 1;
      messageCount.current = count;
    });

    socket.on('new message received', data => {
      setMessages(currentMessages => [
        ...currentMessages,
        {
          sender: data.sender,
          receivedMessage: data.receivedMessage,
          timeSent: data.timeSent,
        },
      ]);
    });

    // eslint-disable-next-line
  }, []);

  const openChat = () => {
    count = 0;
    messageCount.current = count;
    setOpenChating(true);
  };

  const handleClose = e => {
    count = 0;
    e.preventDefault();
    messageCount.current = count;
    setOpenChating(false);
  };

  const sendNewMessage = e => {
    e.preventDefault();

    if (newMessage) {
      socket.emit(
        'new message',
        {
          sender: guestName,
          receivedMessage: newMessage,
          timeSent: new Date(),
        },
        room
      );
    }
    setNewMessage('');
  };

  return (
    <div>
      <Tooltip title="Chat Box">
        <Badge badgeContent={messageCount.current || 0} color="secondary">
          <Button onClick={openChat}>
            <ChatIcon fontSize="large" className={classes.buttonColor} />
          </Button>
        </Badge>
      </Tooltip>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={openChating}
        onClose={handleClose}
        style={{ maxHeight: '50%', margin: ' auto 0' }}
      >
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={8} container justifyContent="flex-end">
            <DialogTitle>Chat Room</DialogTitle>
          </Grid>
          <Grid item xs={2}>
            <DialogActions>
              <Button onClick={handleClose}>
                <CloseIcon />
              </Button>
            </DialogActions>
          </Grid>
        </Grid>
        <DialogContent>
          <div style={{ textAlign: 'left', width: '90%' }}>
            {messages.length > 0
              ? messages.map((message, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        padding: '5px 0',
                      }}
                    >
                      <p>
                        <strong>
                          {message.sender}[
                          <span
                            style={{
                              fontSize: '16px',
                              letterSpacing: '1px',
                              wordSpacing: 'normal',
                              display: 'inline-block',
                            }}
                          >
                            {moment(message.timeSent).format('LTS')}
                          </span>
                          ]
                        </strong>
                        : {message.receivedMessage}
                      </p>
                    </div>
                  );
                })
              : 'Chat is empty'}
          </div>
        </DialogContent>
        <DialogActions>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={10}>
              <TextField
                value={newMessage}
                variant="outlined"
                fullWidth
                label="Message Here"
                type="text"
                onChange={e => setNewMessage(e.target.value)}
                inputProps={{
                  maxLength: 40,
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={sendNewMessage}
              >
                Send
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Chat;
