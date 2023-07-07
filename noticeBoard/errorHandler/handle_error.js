const {constants} = require("../errorConstants");
const error = (err, req, res, next)=>
{
    const errStatus = res.statusCode ? res.statusCode: 500;

    switch (errStatus) {
        case constants.VALIDATION_ERROR:
             res.json({title:"Empty",message: err.message, stack : err.stack});
            break;
        case constants.NOT_FOUND:
            res.json({title:"Not found",message: err.message, stack : err.stack});
            break;
        case constants.SERVER:
            res.json({title:"Error in the Server",message: err.message, stack : err.stack});
            break;
        case constants.FORBIDDEN:
            res.json({title:"Forbidden",message: err.message, stack : err.stack});
            break;
        case constants.AUTHENTICATION_ERROR:
            res.json({title:"Your access is denied",message: err.message, stack : err.stack});
            break;
        default:
            res.json({title:"No error",message: "no error found"});
            break;
    }

   
    
}

module.exports=error