import fs from 'fs'
import render from 'view-engine'


export default function (filePath, data, callback) {
    fs.readFile(filePath, function (err, content) {
        if (err) return callback(new Error(err));
        return callback(null, render(content.toString(), data));
    });
}
