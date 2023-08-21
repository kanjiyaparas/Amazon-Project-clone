
import Randomstring from "randomstring"
import fs from "fs"
import mediamodel from "./MediaModel.js"
import path from "path"

class MediaController {
  async GetMedia(req, res) {
    try {
      // console.log(req.files)
      const file = req.files.file
      let { mimetype, size } = file
      let name = file.name

      let extension = path.extname(name)
      console.log(extension)
      name = Randomstring.generate({
        length: 12,
        charset: "alphabetic"
      }).toLowerCase()

      name = name + extension
      file.name = name

      mimetype = mimetype.split("/")[0]

      if (mimetype !== "image" && mimetype !== "video") {
        mimetype = "application"
      }

      const folderName = `./Upload/${mimetype}`;

      try {
        if (!fs.existsSync(folderName)) {
          fs.mkdirSync(folderName);

        }
      } catch (err) {
        console.error(err);
      }

      let Path = `./Upload/${mimetype}/${name}`


      console.log(Path)

      // console.log(name)
      const result = await file.mv(Path)

      Path = Path.substring(1, Path.length)



      let fileupload = await mediamodel.create({ name, mimetype, size, Path, extension })

      let Media = fileupload._doc

      // let mpath = fileupload.path

      let url = `http://localhost:5000${Path}`
      Media.url = url

      //  Media = await mediamodel.aggregate([
      //     {
      //         $addFields : {
      //             url : `http://localhost:5000${path}`
      //         }
      //     }
      // ])
      console.log(Media)
      // console.log(agg)
      res.json({ message: "success", media: { ...Media } })

    } catch (error) {
      console.log(error)
      return res.status(500).send({ message: "Internal server error" })
    }
  }




  async Showmedia(req, res) {
    try {
      // const result = await mediamodel.aggregate([
      //     {
      //       $match: {
      //         $or: [
      //           { mimetype: "image" },
      //           { mimetype: "video" }
      //         ]
      //       }
      //     },
      //     {
      //       $addFields: {
      //         url: {
      //           $concat: [
      //             "http://localhost:5000",
      //             "$Path"
      //           ]
      //         }
      //       }
      //     }
      //   ]);
      const result = await mediamodel.find({
        $or: [
          { mimetype: "image" },
          { mimetype: "video" }
        ]
      },
        {
          "_id": 1, "mimetype": 1, "url": {
            $concat: [
              "http://localhost:5000",
              "$Path"
            ]
          }
        },
      ).sort({createdAt: -1})
      console.log(result)
      if (result) {
        return res.status(200).send({ message: "successs", media: result })
      }
      return res.status(400).send({ message: "something went wrong" })
    } catch (error) {
      console.log(error)
      return res.status(500).send({ message: "Internal server error" })
    }
  }
}

const mediacontroller = new MediaController()

export default mediacontroller