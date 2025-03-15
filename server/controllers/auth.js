class AuthController {
  async signup(req, res) {
    try {
      const { username, firstName, lastName, email, password, gender, avatar } = req.body;
    } catch (error) {}
  }
  async signin(req, res) {
    try {
      const { username, email, password } = req.body;
    } catch (error) {}
  }
  async signout(req, res) {
    try {
    } catch (error) {}
  }
}

const authController = new AuthController();

export default authController;
