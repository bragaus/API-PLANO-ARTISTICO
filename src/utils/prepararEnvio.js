module.exports = function PrepararEnvio(res) {

    // convertendo blob para base64
    const data = res ? res.map((e) => {
        e.blobPreview = new Buffer.from(e.blobPreview).toString('base64');

        e.blobFrente !== null ? 
            e.blobFrente = new Buffer.from(e.blobFrente).toString('base64') : '';

        e.blobVerso !== null ? 
            e.blobVerso = new Buffer.from(e.blobVerso).toString('base64') : '';
            
        return e
    }) : []

    return data
}