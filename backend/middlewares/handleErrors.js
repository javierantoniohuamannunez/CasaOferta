module.exports=(error,request,response,next)=>{
    console.error(error);
    console.log(error.name);
    if(error.name==="CastError"){
        return response.status(400).json({ ok: false, error: 'id used is malformed' })
    }
    if(error.name==="ValidationError"){
        return response.status(400).json({ ok: false, error: 'id used is malformed' })
    }
    response.status(500).json({ ok: false, error: 'internal server error' })
}