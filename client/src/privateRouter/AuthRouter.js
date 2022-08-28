export const authRouter = (data, history) => {
  if (!data) {
    history.push('/');
    window.location.reload(false);
  } else {
    // console.log('URL AUTHENTICATED');
  }
  return;
};
