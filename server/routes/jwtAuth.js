const router = require("express").Router()
const pool = require("../db")
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");
//registering

router.post("/register", validInfo, async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await pool.query("SELECT * from users WHERE user_email = $1", [
            email
        ]);
        if (user.rows.length !== 0) {
            return res.status(401).send("User aready exists");
        }

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *", [name, email, bcryptPassword]);



        // Generating our jwt token

        const token = jwtGenerator(newUser.rows[0].user_id);

        res.json({ token })

    } catch (err) {
        console.error(err.message);
        res.status(500).send("SERVER ERROR");
    }
});

//login route

router.post("/login", validInfo, async (req, res) => {
    try {
        //1.destructure the req.body
        const { email, password } = req.body;
        //2. check if user does not exist.
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ]);

        if (user.rows.length === 0) {
            return res.status(401).json("Password or email is incorrect");
        }
        //3. check if incoming password is the same as the database password.

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

        if (!validPassword) {
            return res.status(401).json
                ("password or email is incorrect");
        }
        //4. give them the jwt token.

        const token = jwtGenerator(user.rows[0].user_id);
        res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("SERVER ERROR");
    }
});
// Verification
router.get("/is-verify", authorization, async (req, res) => {
    try {

        res.json(true);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("SERVER ERROR");
    }
});



module.exports = router;
