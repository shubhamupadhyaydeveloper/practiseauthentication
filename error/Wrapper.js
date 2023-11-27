function Wrapper(fn) {
    return function inner(req , res ,next) {
         fn(req,res,next).catch(next)
    }
}

module.exports  = Wrapper