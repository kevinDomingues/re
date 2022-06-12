const router = require("express").Router();
const jwt = require("jsonwebtoken");
const auth = require("../auth/auth");

const { restart } = require("nodemon");
const User = require("../models/User");
const crypto = require("crypto");
const { Console } = require("console");
const console = require("console");

router.get("/check/:email", async (req, res) => {
  const email = req.params.email;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      res
        .status(200)
        .json({ message: "No user found with the email searched." });
      return;
    }

    res.status(422).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/checkToken", auth, async (req, res) => {
  res.status(200).json({ valid: true });
});

router.post("/signUp", async (req, res) => {
  const { name, email, password, contact } = req.body;

  hash = crypto.createHash("sha256").update(password).digest("hex");
  const user = {
    name,
    email,
    contact,
  };

  if (!email || !password) {
    res.status(422).json({ error: "You must provide an email and password!" });
    return;
  }

  user.password = hash;

  // FAZER VERIFICAÇÃO DE TODOS OS CAMPOS OBRIGATÓRIOS
  let valid = true;

  const user_email = await User.findOne({ email: email });

  if (user_email) {
    res.status(400).send({ message: "Failed! Email is already in use!" });
    valid = false;
    return;
  }

  if (valid) {
    try {
      await User.create(user);

      res.status(201).json({ message: "User created!" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const people = await User.find();

    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/me", auth, async (req, res) => {
  const id = req.user_id;

  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      res.status(422).json({ message: "User not found!" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/getName", auth, async (req, res) => {
  const id = req.user_id;

  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      res.status(422).json({ message: "User not found!" });
      return;
    }

    res.status(200).send(user.name);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email, password)) {
      res.status(400).json({ message: "Insert all inputs!" });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(422).json({ message: "This user does not exist!" });
      return;
    } else {
      let hash = crypto.createHash("sha256").update(password).digest("hex");
      if (user.password === hash) {
        const token = jwt.sign({ user_id: user._id }, process.env.TOKEN_KEY, {
          expiresIn: "30d",
        });
        res.status(200).json({
          name: user.name,
          email: user.email,
          contact: user.contact,
          token: token,
        });
      } else {
        res.status(422).json({ message: "Wrong Credentials!" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post("/loginWeb", async (req, res) => {
  // Extrair dados de requisição pela url = req.params~

  try {
    const { email, password } = req.body;

    if (!(email, password)) {
      res.status(400).json({ message: "Insert all inputs!" });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(422).json({ message: "This user does not exist!" });
      return;
    } else {
      let hash = crypto.createHash("sha256").update(password).digest("hex");
      if (user.password === hash) {
        let permission = 1;
        if (user.email === "admin@app.pt") {
          permission = 2;
        }
        const token = jwt.sign({ user_id: user._id }, process.env.TOKEN_KEY, {
          expiresIn: "30d",
        });
        res.status(200).json({ token: token, permissionLevel: permission });
      } else {
        res.status(422).json({ message: "Wrong Credentials!" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//  Atualização de dados (PUT, PATCH(atualização parcial))

router.patch("/update", auth, async (req, res) => {
  const id = req.user_id;

  const {
    name,
    email,
    minGlicose,
    maxGlicose,
    height,
    weight,
    contact,
    birthdayDate,
  } = req.body;

  const user = {
    username,
    name,
    email,
    contact,
    birthdayDate,
  };

  try {
    const updatedUser = await User.updateOne({ _id: id }, user);

    if (updatedUser.matchedCount == 0) {
      res.status(422).json({ message: "O utilizador não foi encontrado!" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//  Eliminar dados

router.post("/deleteUser", auth, async (req, res) => {
  const { id } = req.body;

  const user = await User.findOne({ _id: id });

  if (!user) {
    res.status(422).json({ message: "O utilizador não foi encontrado!" });
    return;
  }

  try {
    await User.deleteOne({ _id: id });

    res.status(200).json({ message: "Utilizador removido com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post("/deleteUserAdmin", async (req, res) => {
  const { id } = req.body;

  const user = await User.findOne({ _id: id });

  if (!user) {
    res.status(422).json({ message: "O utilizador não foi encontrado!" });
    return;
  }

  try {
    await User.deleteOne({ _id: id });

    res.status(200).json({ message: "Utilizador removido com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
