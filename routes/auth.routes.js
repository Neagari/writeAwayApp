const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { isLoggedOut, isLoggedIn } = require('../middleware/route.guard');
//Importing note model
const User = require("../models/User.model")

//
router.get("/signup", isLoggedOut,(req, res, next) => {
    res.render("auth/signup");
});

router.post("/signup",isLoggedOut, async(req,res)=>{
    //console.log(req.body)
    const body = {...req.body}

    if(body.password.length < 6){
        res.render('auth/signup', {errorMessage: 'Password too short', body: req.body})     
    } else {
        const salt = bcrypt.genSaltSync(13);
        const passwordHash = bcrypt.hashSync(body.password, salt)
        console.log(passwordHash)
        delete body.password
        body.passwordHash = passwordHash
    
        try{
          await User.create(body)
          res.send(body)
        } catch(error){
            if(error.code === 11000){
                console.log('Duplicate !')
                res.render('auth/signup', {
                errorMessage: 'User name already used',
                 userData: req.body,
                })
            } else {
                res.render('auth/signup', {
                errorMessage: error,
                userData: req.body,
            })
            }

        }}
    })

    router.get("/login",isLoggedOut, (req, res) => {
        res.render("auth/login");
    });

    router.post("/login",isLoggedOut, async(req, res) => {
        const body = req.body
       try{
        const userMatch = await User.find({username: body.username})
        // console.log(userMatch)
        if (userMatch.length) {
            const user = userMatch[0]

            if(bcrypt.compareSync(body.password, user.passwordHash)) {
                
                const tempUser = {
                    username: user.username,
                    email:  user.email, 
                }

                req.session.user = tempUser 
                res.redirect('/profile')  
            } else {
                    res.send('incorrect password') 
            }  

            }else{
                    res.send('User not found')
            }
        }catch (error){
            console.log(error)
        }

    }); 

    router.get("/profile", isLoggedIn, async(req, res) => {
        console.log('SESSION ===>', req.session)
        
        res.render('auth/profile', {user: req.session.user});
      
      });

      router.get("/logout", isLoggedIn, async(req, res) => {
        req.session.destroy(error => {
            if (error) next (error)
            res.redirect('/');
        })
   
    });
        
      

module.exports = router