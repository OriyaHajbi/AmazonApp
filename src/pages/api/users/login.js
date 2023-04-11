import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import { signToken } from '@/utils/auth';
import { client } from '@/utils/client';

const handler = nc();

handler.post(async (req, res) => {
    console.log("in login");
    const user = await client.fetch(`*[_type == "user" && email == $email][0]`, {
        email: req.body.email
    });

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        console.log("in if login");
        const token = signToken({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token,
        });
    } else {
        console.log("in else login");
        res.status(401).send({ message: "Invalid email or password" });
    }
    console.log("after login");
})

export default handler;
