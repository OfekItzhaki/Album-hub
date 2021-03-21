let file = '../path/to/chad_warden.mpeg';

// async
const fileExists = (file) => {
    return new Promise((resolve, reject) => {
        fs.access(file, fs.constants.F_OK, (err) => {
            err ? reject(false) : resolve(true)
        });
    })
}   