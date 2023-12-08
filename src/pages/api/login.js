const config = require('./../../../config')
const userSchema = require('./../../../models/users')

export default async (req, res) => {
    if (req.method === 'POST'){
        const { username, password } = req.body
        
        res.send({message: `username ${username} password ${password}`, status: 200})

        
    }
}
