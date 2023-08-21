import mongoose from "mongoose";

class MediaModel{
    constructor(){
        this.schema = new mongoose.Schema({
            name:{type:String , required:true},
            mimetype : {type:String , required:true},
            extension :{type:String, required:true},
            Path:{type:String , required:true},
            size:{type:String , required : true},
            rendersize : {type:String , require:true , default:null},
            uploadedby:{type:String , require:true}

        },{timestamps:true})
    }
}

const Media = new MediaModel()

const mediamodel = mongoose.model("tbl_Media" , Media.schema)


export default mediamodel