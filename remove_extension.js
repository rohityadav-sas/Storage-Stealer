function removeExtension(filename) {
    const lastDotPosition = filename.lastIndexOf('.');
    if (lastDotPosition === -1) return filename;
    return filename.substring(0, lastDotPosition);
}

module.exports = removeExtension;