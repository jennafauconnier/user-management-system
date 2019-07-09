const User = require('./model');

const getUser = async (req,res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    console.error('Error', error);
    res.status(500).send('Error while fetching all');
  }
};

const createUser = async (req, res) => {
  const {
    name,
    email
  } = req.body;

  try {
    if (!name || !email) {
      throw 'all fields are required'
    }

    // je créer un objet qui va me permettre de recuperer ce que l'utilisateur rentre suivant le model
    const newUser = {
      name: name,
      email: email
    };

    // ici j'envoie notre objet en BDD via une methode mongoose
    User.create(newUser, (err, res_create) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send('user register with success');
      }
    });
  } catch (error) {
    res.status(200).send(error);
  }
};

const viewUser = async (req, res) => {

  const { name, email } = req.body;
  let isSameUser
  let user;

  try {
    user = await User.findOne({ name, email });
    if (!user || !email) {
      throw "Ce user n'existe pas"
    }


    isSameUser = email, user.email;

    if (isSameUser === user) {
      console.log('Match perfect');
    }
    res.send(user);
  } catch (error) {
    console.log("Error authenticating user");
    console.log(error);
    res.status(403).send();
  }
}

module.exports = {
  getUser,
  createUser,
  viewUser
}