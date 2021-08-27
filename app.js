const fs = require('fs');
const path = require('path');

//path
const photoPath = '../../test/test';

//파일을 읽어오기
fs.promises
  .readdir(photoPath) //
  .then((data) => {
    data.forEach((i) => {
      checkExtname(i, data);
    });
  })
  .catch((err) => console.log(err));

//확장자 별로 분리
function checkExtname(i, data) {
  if (path.extname(i) === '.mp4' || path.extname(i) === '.mov') {
    makeDir('video', i);
  } else if (path.extname(i) === '.png' || path.extname(i) === '.aae') {
    makeDir('captured', i);
  } else if (path.extname(i) === '.jpg') {
    checkDup(i, data);
  }
}

//dir 만들기
function makeDir(dir, i) {
  const dirPath = path.join(photoPath, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdir(dirPath, (err) => console.log(err));
    moveFile(photoPath, i, dirPath);
  } else {
    moveFile(photoPath, i, dirPath);
  }
}

//move files
function moveFile(photoPath, i, dirPath) {
  fs.promises
    .rename(path.join(photoPath, i), path.join(dirPath, i)) //
    .then(console.log(`${i}를 ${dirPath}로 옮겼습니다.`))
    .catch((err) => console.log(err));
}
//checking edited files
function checkDup(i, data) {
  if (i.includes('_E')) {
    const eLocate = i.indexOf('E');
    const dup = i.slice(eLocate + 1, i.length); //4
    data.forEach((i) => {
      if (i.includes(dup)) {
        makeDir('duplicated', i);
      }
    });
  }
}
