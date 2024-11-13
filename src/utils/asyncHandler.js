// Method 02


const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}


// Method 01

// const aysncHandler = () => {}
// const aysncHandler = (func) => {()=>{}}
// const aysncHandler = (func) => () => {}
// const aysncHandler = (func) => aysnc() => {}

// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     }
//     catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }



export { asyncHandler }