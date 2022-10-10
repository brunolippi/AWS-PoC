import { Stream } from "stream"

export const streamToBuffer = async (stream: Stream): Promise<Buffer> => {
    return new Promise<Buffer>((resolve, reject) => {
        const _buffer: Uint8Array[] = [];

        stream.on('data', (chunk) => _buffer.push(chunk))
        stream.on('end', () => resolve(Buffer.concat(_buffer)))
        stream.on('error', (err) => reject(err))
    })
}