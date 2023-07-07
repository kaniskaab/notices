const asyncHandler = require("express-async-handler")
const mongoose = require('mongoose')
const notices = require("../models/model")
//@desc get contats
//@route GET /api/notices
//@access public
const getNotices = asyncHandler(
   async (req,res)=>
{
    const notice = await notices.find();
    res.status(200).json(notice);
} 
) 


//@desc create notices
//@route POST /api/notices
//@access public

const postNotices= asyncHandler(
     async (req,res)=>
{
    console.log("the notice is ",req.body);
    const {title, date, description,postedBy} = req.body;
    if(!title || !date || !description|| !postedBy)
    {
        res.status(400);
        throw new Error("error, can't be empty");
    }
    const notice = await notices.create(
        {
           title,description,
           date,postedBy
        }
    );
    res.status(200).json(notice);
}
)



//@desc get notices
//@route GET /api/notices/:id
//@access public

const getNotice = asyncHandler(async (req,res)=>
{
    const notice = await notices.findById(req.params.id)
    if(!notice)
    {
        res.status(404);
        throw new Error("ID not valid!!")
    }
    res.status(200).json(notice);
}) 


//@desc put contats
//@route PUT /api/contacts/:id
//@access public

const putNotices = asyncHandler(async (req,res)=>
{
    const notice =await notices.findById(req.params.id);
    if(!notice)
    {
        res.status(404);
        throw new Error("ID not valid!!")
    };
    const update = await notices.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
   console.log(update)
    res.status(200).json(update);
}) 


//@desc delete contats
//@route DELETE /api/notices/:id
//@access public

const deleteNotices = asyncHandler( async (req,res)=>
{
    const notice =await notices.findById(req.params.id);
    console.log(notice)
    if(!notice)
    {
        res.status(404);
        throw new Error("ID not valid!!")
    };
   const del =  await notices.findByIdAndRemove(req.params.id);
 res.status(200).json(del);
})

module.exports={getNotices, postNotices, putNotices, getNotice, deleteNotices}