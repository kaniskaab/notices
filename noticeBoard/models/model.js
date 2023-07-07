const mongoose = require("mongoose");

const noticeSchema = mongoose.Schema(
    {
        title:
        {
            type:String,
            required:[true, "Please provide title"]
        },
        description:
        {
            type:String,
            required:[true, "Please provide description"]
        },
        date:{
            type:String,
            required:[true, "Please provide date"]
        },
        postedBy:{
            type:String,
            required:[true, "Please provide date"]

        }
    },
        {
            timestamps :true,
        }
)
module.exports= mongoose.model("notices",noticeSchema)