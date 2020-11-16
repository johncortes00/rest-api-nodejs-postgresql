const { Pool } = require('pg');
const {Client} = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:admin@localhost:5432/firstapi',
    ssl: process.env.DATABASE_URL ? true : false
})

/*const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

const pool = new Pool({
    /*host:'localhost',
    user:'postgres',
    password:'admin',
    database:'firstapi',
    port:'5432'*/

    /*host:'ec2-18-210-180-94.compute-1.amazonaws.com',
    user:'jnmhnljrbwetzi',
    password:'347543ac0f88b620add1065304fa29bae9873f7aef80671073fca9475b793671',
    database:'d7hal1t1b8r19',
    port:'5432'
});*/

const client = new Client({
    connectionString:  process.env.DATABASE_URL || 'postgresql://postgres:admin@localhost:5432/firstapi'//,
    //ssl:{rejectUnauthorized:false}
});

client.connect();

const getUsers = async (req,res)=>{
    try
    {
        const response = await client.query('SELECT * FROM users');
        res.status(200).json(response.rows);
    }
    catch(error){
        console.log(error);
        res.send("Error: "+error);
    }
};

/*const getUsers = async (req,res)=>{
    try
    {
        const client = await pool.connect();
        const response = await pool.query('SELECT * FROM users');
        res.status(200).json(response.rows);
        client.release();
    }
    catch(error){
        console.log(error);
        res.send("Error: "+error);
    }
};*/

const getUserById = async(req,res) => {
    //res.send('User ID: '+req.params.id);
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM users WHERE id = $1',[id]);
    res.json(response.rows);
    //res.send('user listed')
};

const createUser = async (req,res)=>{
    const {name, email} = req.body;
    const response = await pool.query('INSERT INTO users(name, email) VALUES($1, $2)',[name, email ]);
    console.log(response);
    //res.send('user created');
    res.json({
        message: 'User Added Successfully',
        body:{
            user:{name,email}
        }
    });
};

const deleteUser = async(req,res) =>{
    const id = req.params.id;
    const response = await pool.query('DELETE FROM users WHERE id = $1',[id]);
    console.log(response);
    res.json(`User ${id} deleted successfully`);
    //res.send('USER DELETED '+ id);
};

const updateUser = async(req,res) => {
    const id = req.params.id;
    const {name, email} = req.body;
    const response = await pool.query('UPDATE users SET name = $1, email=$2 WHERE id = $3',[name, email,id]);
    console.log(response);
    res.json('User updated successfully');
    //res.json(`User ${id} uptades successfully`);*/
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser
}