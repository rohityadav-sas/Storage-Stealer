function splitBuffer(buffer, chunkSize) {
    const chunks = [];
    const chunkSizes = [];
    for (let i = 0; i < buffer.length; i += chunkSize) {
        const chunk = buffer.slice(i, i + chunkSize);
        chunks.push(chunk);
        chunkSizes.push(chunk.length);
    }
    return { chunks, chunkSizes };
}

module.exports = splitBuffer;