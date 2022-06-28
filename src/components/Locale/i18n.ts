import { I18n } from "aws-amplify";

function Localei18n() {
  const authScreenLabels = {
    pt: {
      "Sign Up": "Cadastrar",
      "Forgot Password": "Esqueceu a senha?",
      "Sign In Account": "Cadastrar",
      "Enter your email": "Digite seu email",
      "Enter your password": "Digite sua senha",
      Password: "Senha",
      "Sign In": "Entrar",
      "Please Sign In / Sign Up": " ",
      "Sign in to your account": "Entrar com sua conta",
      "Create a new account": "Criar uma nova conta",
      "Confirm a Code": "Confirmar código",
      "Confirm Sign Up": "Confirmar cadastro",
      "Resend code": "Reenviar código",
      "Back to Sign In": "Voltar para login",
      Confirm: "Confirmar",
      "Confirmation Code": "Confirmar Código",
      "Sign Out": "Sair",
      "Phone Number": "Telefone",
      "Enter your confirmation code": "Confirmar Código",
      "Enter your username": "Digite seu Username",
      Hello: "Olá",
      Username: "Username",
      "Incorrect username or password": "Username ou senha incorretos",
      Send: "Enviar",
      "Reset your password": "Resete sua senha",
    },
  };

  I18n.setLanguage("pt");

  I18n.putVocabularies(authScreenLabels);
}

export default Localei18n;
