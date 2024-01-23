let path = require('path');
let fs = require('fs');
let infoFiles = function (file) {
  let dat = [];
  if (file.isFile()) {
    fs.stat(
      path.resolve(__dirname, 'secret-folder', file.name),
      function (error, stats) {
        if (error) {
          return console.log(error);
        }
        if (file.name.includes('.')) {
          dat.push(file.name.split('.').slice(0, -1).join('.'));
          dat.push(path.extname(file.name).slice(1));
          dat.push((stats.size / 1024).toFixed(3) + 'Kb');
          console.log(dat.join(' - '));
        } else {
          dat.push(file.name);
          dat.push((stats.size / 1024).toFixed(3) + 'Kb');
          console.log(dat.join(' - '));
        }
      },
    );
  }
};
fs.readdir(
  path.join(__dirname, 'secret-folder'),
  { withFileTypes: true },
  function (error, files) {
    if (error) {
      return console.log(error);
    }
    files.forEach((item) => {
      infoFiles(item);
    });
  },
);
