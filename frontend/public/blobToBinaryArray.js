const CHUNK_SIZE = 5000000; //~5MB
let arrayOfChunks = []

onmessage = (event) => {
  let blob = event.data;
  let size = blob.size;
  let chunks = Math.ceil(size / CHUNK_SIZE);

  for (let i = 0; i < size; i += CHUNK_SIZE) {
    let chunk = blob.slice(i, i + CHUNK_SIZE)
    arrayOfChunks.push(chunk)
  }

  postMessage(arrayOfChunks)
};
