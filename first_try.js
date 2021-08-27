// const fs = require('fs');
// const path = require('path');
// const nowPath = './test/test';
// const videoPath = path.join(nowPath, 'video');

// fs.promises
//   .readdir(nowPath) //
//   .then((data) => {
//     data.forEach((i) => {
//       if (path.extname(i) === '.mp4' || path.extname(i) === '.mov') {
//         console.log('its video type');
//         makeDir('video');
//         fs.rename(nowPath, videoPath, (err) => {
//           console.log(err);
//         });
//         console.log(__dirname);
//       } else {
//         console.log('its not a video');
//       }
//     });
//   })
//   .catch((err) => console.log(err));

// //make directory
// function makeDir(dir) {
//   if (!fs.existsSync(dir)) {
//     fs.promises
//       .mkdir(dir) //
//       .catch((err) => console.log(err));
//   }
// }

const fs = require('fs');
const path = require('path');

const videoDir = './video';
const capDir = './captured';
//read file
fs.promises
  .readdir('./test/test') //
  .then((data) => {
    data.forEach((i) => {
      if (path.extname(i) === '.mp4' || path.extname(i) === '.mov') {
        makeDir(videoDir);
        const oldPath = path.join('./test/test/', i);
        const newPath = path.join('./video', i);
        fs.rename(oldPath, newPath, (err) => {
          console.log(err);
        });
      } else if (path.extname(i) === '.png' || path.extname(i) === '.aae') {
        makeDir(capDir);
        const oldPath = path.join('./test/test/', i);
        const newPath = path.join('./captured', i);
        fs.rename(oldPath, newPath, (err) => {
          console.log(err);
        });
      }
    });
  })
  .catch((err) => console.log(err));

//mkdir function
function makeDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdir('./video', (err) => {
      console.log(err);
    });
    fs.promises
      .readdir(__dirname) //
      .then((data) => console.log(data))
      .catch((err) => {
        console.log(err);
      });
  } else {
    return;
  }
}
