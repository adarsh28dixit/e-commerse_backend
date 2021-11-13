import express from 'express'
import Users from '../models/userModel.js';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import generateToken from '../utils.js';

const userRouter = express.Router();

userRouter.get('/user', (req, res) => {
    Users.find((err, data) => {
        if(err){
            res.send(err)
        }else {
            res.send(data)
        }
    })
});

userRouter.post('/register', async (req, res) => {
     // Check if this user already exisits
    let user = await Users.findOne({email: req.body.email});
    if(user){
        return res.status(400).send({message: "user already registered"});
    } else {
        user = new Users({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
          });
          const createdUser = await user.save();
          res.send({
            _id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            isAdmin: createdUser.isAdmin,
            isSeller: user.isSeller,
            token: generateToken(createdUser),
          });
    }
      
});

userRouter.post('/login', async(req, res) => {
    const user = await Users.findOne({email: req.body.email});
        if(user){
            if(bcrypt.compareSync(req.body.password, user.password)){
                res.send({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    token: generateToken(user)
                });
                return;
            }
        }
        res.status(401).send({
            message: "Invalid name or password"
        })
    
});

export default userRouter;