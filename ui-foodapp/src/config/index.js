let server="http://localhost:9000";
// const all={
//     routes:{}
// };
const env={
    development:{

        api:server
    },
    staging:{

        api:server
    },
    production:{

        api:server,

    },
};
export default{
    //...all,
    ...env[process.env.NODE_ENV],

};