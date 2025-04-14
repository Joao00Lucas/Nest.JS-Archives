import { createReadStream, ReadStream } from "fs"

export const getFileToBuffer = (filename: string):Promise<{ buffer: Buffer, stream: ReadStream }> => {

    const readStream = createReadStream(filename);
    const chunks: Buffer[] = [];

    return new Promise((resolve, reject) => {

        readStream.on('data', (chunk:Buffer) => chunks.push(chunk))

        readStream.on('error', (err) => reject(err));

        readStream.on('close', () => {
            resolve({
                buffer: Buffer.concat(chunks) as Buffer,
                stream: readStream
            })
        })
    })

}