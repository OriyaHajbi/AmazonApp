import axios from 'axios';
import nc from 'next-connect';
import { isAuth } from '@/utils/auth';
import config from '@/utils/config';

const handler = nc();

handler.use(isAuth);

handler.post(async (req, res) => {
    const projectId = config.projectId;
    const dataset = config.dataset;
    const tokenWithWriteAccess = process.env.SANITY_AUTH_TOKEN;


    console.log(req.body);
    const createMutations = [
        {
            create: {
                _type: 'order',
                createdAt: new Date().toISOString(),
                ...req.body,
                userName: req.user.name,
                user: {
                    _type: 'reference',
                    _ref: req.user._id,
                },
            },
        },
    ];




    const url = `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`;

    // const { data } = await axios.post(url,
    //     {
    //         mutations: createMutations
    //     },
    //     {
    //         headers: {
    //             'Content-type': 'application/json',
    //             Authorization: `Bearer ${tokenWithWriteAccess}`,
    //         },
    //     }
    // );
    console.log(url);
    const { data } = await axios.post(url,
        { mutations: createMutations },
        {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${tokenWithWriteAccess}`,
            },
        }
    );




    // console.log(data);
    res.status(201).send(data.results[0].id);
});

export default handler;