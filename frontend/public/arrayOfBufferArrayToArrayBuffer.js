onmessage = (event) => {
  let arrayOfArrayBuffer = event.data;

  const appendBuffer = (buffer1, buffer2) => {
    var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
    tmp.set(new Uint8Array(buffer1), 0);
    tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
    return tmp;
  };

  let appended = appendBuffer(arrayOfArrayBuffer[0].file, arrayOfArrayBuffer[1].file)

  let blob = new Blob([appended])
  postMessage(blob)


  
};
