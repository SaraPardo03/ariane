import { useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import User from '../models/User';
import { Context as AuthContext } from '../Context/AuthContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

export function SignupPage() {
  const { login } = useContext(AuthContext);
  const [error,setError] = useState();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); 
  const navigate = useNavigate();

  function toggleMode() {
    setIsSignUp((prev) => !prev);
  }

  const handleSignUp = async () => {
    try {
        if (isSignUp) {
          const user = await User.signUp({ "email": email, "password": password });
          login(user);
            
        } else {
          const user = await User.signIn({ "email": email, "password": password });
          login(user);
        }
        navigate('/');
    } catch (error) {
        console.log(error);
    }
  };



  async function handleGoogleSignIn() {
    console.log("too do")
    /*
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        // Go to the liste of stories
        navigate('/');
      })
      .catch((error) => {
        setError(JSON.stringify(error.code));
        console.log(error);
      });*/
  }

  return <div className="signup-page-container container-fluid">
    <div className="row fill">
      <div className="col d-none d-md-flex bg-primary">
        <div className="container-fluid d-flex justify-content-center align-items-center">
          <h1 className="text-on-primary">Ariane</h1>
        </div>
      </div>
      <div className="col bg-container">
        <div className="row bg-primary d-flex d-md-none">
          <div className="col-12">
            <div className="container-fluid d-flex justify-content-center align-items-center">
              <h2 className="text-on-primary pt-2">Ariane</h2>
            </div>
          </div>
        </div>
        <div className="row fill bg.container">
          <div className="col-12 p-0 d-flex">
            <div className="p-0 container-fluid d-flex justify-content-center align-items-center">
              <div className="p-0 container-fluid">
                <h2 className="text-center text-on-container">Se connecter</h2>
                <Form className="p-3">
                  <fieldset>
                    <Form.Group className="mb-3">
                      <FloatingLabel 
                        label="Adresse e-mail"
                        className="mb-3" >
                        <Form.Control
                          id="signUpEmail"
                          type="email"
                          placeholder="exemple@myemail.com"
                          value={email}
                          aria-describedby="signUpHelpBlock"
                          name="email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </FloatingLabel>
                      <Form.Text id="signUpHelpBlock" muted>
                        
                      </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <FloatingLabel 
                        label="Mot de passe">
                        <Form.Control
                          id="signUpPassword"
                          type="password"
                          placeholder="password"
                          value={password}
                          aria-describedby="passwordHelpBlock"
                          name="password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </FloatingLabel>
                      <Form.Text id="passwordHelpBlock" muted>
                        
                      </Form.Text>
                    </Form.Group>
                    <div className="d-grid gap-2">
                      <Button 
                      onClick={handleSignUp} 
                      style={{ boxShadow: "0 4px 8px -2px rgba(0, 0, 0, 0.2)" }} 
                      size="md">
                        {isSignUp ? "S'INSCRIRE" : "SE CONNECTER"}
                      </Button>
                      
                    </div>
                  </fieldset>
                </Form>
                <div className="p-3 divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0 text-on-container">OU</p>
                </div>
                <div className="p-3 d-grid gap-2">
                  <Button  className="" variant="danger" size="md" onClick={handleGoogleSignIn} style={{ boxShadow: "0 4px 8px -2px rgba(0, 0, 0, 0.2)" }}>
                    <i className="fs-6 bi bi-google me-2 text-white"></i>
                    <span className="fs-6 text-white">{isSignUp ? "S'INSCRIRE" : "SE CONNECTER"} AVEC GOOGLE</span>
                  </Button>
                  <Form.Text id="googleHelpBlock" muted>
                    {error}
                  </Form.Text>
                </div>
                <div className="text-center">
                  <p className="text-on-container">
                    {isSignUp ? "Déjà un compte ?" : "Pas encore de compte ?"}
                    <Button className="text-primary"variant="link" onClick={toggleMode}>
                      {isSignUp ? "Connectez-vous ici" : "Inscrivez-vous ici"}
                    </Button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}