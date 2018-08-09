const Faker = require('faker')
const fs = require('fs')
const imgGen = require('js-image-generator')
const shell = require('shelljs')

const numVideos = +process.argv[2]
const savePath = process.argv[3] || ''

// node index.js 3 ~/Downloads/TestFiles/videos/

function generateVideo() {
  shell.mkdir('tmp')

  // Generate multiple images
  for (let i = 1 ; i <= 3; i++) {
    imgGen.generateImage(800, 600, 80, function(err, image) {
      if (err) throw err
      fs.writeFileSync('./tmp/img00' + i + '.jpg', image.data)
    })
  }

  const videoName = Faker.random.words()
  // stitch images together into video
  shell.exec(`ffmpeg -r 1/5 -i ./tmp/img%03d.jpg -c:v libx264 -vf fps=25 -pix_fmt yuv420p ${savePath}'${videoName}'.mp4`)

  shell.rm('-rf', 'tmp')
}

for (let i = 1; i <= numVideos; i++) {
  generateVideo()
}

module.exports = generateVideo
