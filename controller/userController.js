const bcrypt = require("bcrypt")

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
            const { usernameOrEmail, password } = req.body

            const findUserByUsernameOrEmail = await User.findOne({
                where: {
                    [Op.or]: {
                        username: usernameOrEmail,
                        email: usernameOrEmail,
                    },
                },
            })

            if (!findUserByUsernameOrEmail) {
                return res.status(400).json({
                    message: "User Not Found"
                })
            }

            const passwordValid = bcrypt.compareSync(
                password,
                findUserByUsernameOrEmail.password
            )

            if (!passwordValid) {
                return res.status(400).json({
                    message: "Wrong password"
                })
            }

            delete findUserByUsernameOrEmail.dataValues.password

            const token = signToken({
                id: findUserByUsernameOrEmail.id,
            })

            return res.status(201).json({
                message: "Login user",
                data: findUserByUsernameOrEmail,
                token,
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Server Error login User"
            })
        }

    },

};

module.exports = userController