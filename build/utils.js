"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.streamToBuffer = void 0;
const streamToBuffer = async (stream) => {
    return new Promise((resolve, reject) => {
        const _buffer = [];
        stream.on('data', (chunk) => _buffer.push(chunk));
        stream.on('end', () => resolve(Buffer.concat(_buffer)));
        stream.on('error', (err) => reject(err));
    });
};
exports.streamToBuffer = streamToBuffer;
