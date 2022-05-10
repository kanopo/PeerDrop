onmessage = (event) => {
  let blob = event.data;

  blob.arrayBuffer().then((res) => {
    postMessage(res);
  });
};
