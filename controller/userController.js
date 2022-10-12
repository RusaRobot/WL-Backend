const { validateVerificationToken } = require("../lib/verification");

const userController = {
    postRegister: async (req, res) => {
        try {
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Server Error post register"
            })
        }

    },
    loginUser: async (req, res) => {
        try {
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Server Error login User"
            })
        }

    },
    verifyUser: async (req, res) => {
        try {
          const { verification_token } = req.query
          const validToken = validateVerificationToken(verification_token)
          
          if (!validToken){
            res.status(401).json({
              message: "Token invalid"
            })
          }
    
          await User.update(
            {is_verified: true}, {
            where: {
              id: validToken.id
            }
          })
    
        //   Redirect ke page tertentu
        //   return res.redirect('http://localhost:3000/login')
          return res.status(200).json({
            message: "User verified"
          })
        } catch (err) {
          console.log(err);
          return res.status(500).json({
            message: "Server error",
          });
        }
      },
      verifyUserResend: async (req, res) => {
        try {
          const verificationToken = createVerificationToken({
            id: req.user.id
          })
          const verificationLink = `http://localhost:2000/auth/verification?verification_token=${verificationToken}`
    
    
          const userSaatIni = await User.findByPk(req.user.id)
          const rawHTML = fs.readFileSync("templates/register_user_resend.html", "utf-8");
          const compileHTML = handlebars.compile(rawHTML);
          const result = compileHTML({
            username: userSaatIni.username,
            verificationLink,
          });
          // console.log()
    
    
          await emailer({
            to: userSaatIni.email,
            html: result,
            subject: "Resend Token Email",
            text: "Halo dunia",
          });
          
    
          return res.status(200).json({
            message: "Resend successfully"
          })
        } catch (err) {
          console.log(err);
          return res.status(500).json({
            message: "Server error",
          });
        }
      }

};

module.exports = userController