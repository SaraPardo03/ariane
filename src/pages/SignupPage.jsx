import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

export function SignupPage() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); 
  const auth = getAuth();
  const navigate = useNavigate();

  function toggleMode() {
    setIsSignUp((prev) => !prev);
  }


  async function handleSignUp(e){
    e.preventDefault();
    if (isSignUp) {
      // if sign up
      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          console.log(user);
          navigate('/');
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // if sign in
      signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
          console.log(user);
          navigate('/');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  async function handleGoogleSignIn() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        // Go to the liste of stories
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return <div className="signup-container container-fluid bg-primary">
    <div className="row">
      <div className="col d-none d-md-flex">
        <div className="col container-fluid d-flex justify-content-center align-items-center">
          <div className="">
          <h1 className="text-white">Ariane</h1>
        </div>
      </div>
      </div>
      <div className="col p-0 bg-white signup-form-container">
        <div className="col-12 pt-1 d-md-none bg-primary">
          <div className="container-fluid d-flex justify-content-center align-items-center">
            <div className="">
              <h1 className="text-white">Ariane</h1>
            </div>
          </div>
        </div>
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
              onClick={(e) => handleSignUp(e)} 
              style={{ boxShadow: "0 4px 8px -2px rgba(0, 0, 0, 0.2)" }} 
              size="md">
                {isSignUp ? "SIGN UP" : "SIGN IN"}
              </Button>
            </div>
          </fieldset>
        </Form>
        <div className="divider d-flex align-items-center my-4">
          <p className="text-center fw-bold mx-3 mb-0 text-muted">OU</p>
        </div>
        <div className="p-3 d-grid gap-2">
          <Button  className="" variant="danger" size="md" onClick={handleGoogleSignIn} style={{ boxShadow: "0 4px 8px -2px rgba(0, 0, 0, 0.2)" }}>
            <i className="fs-6 bi bi-google me-2"></i>
            <span className="fs-6">{isSignUp ? "SIGN UP" : "SIGN IN"} WITH GOOGLE</span>
          </Button>
        </div>
        <div className="text-center">
          <p>
            {isSignUp ? "Déjà un compte ?" : "Pas encore de compte ?"}
            <Button variant="link" onClick={toggleMode}>
              {isSignUp ? "Connectez-vous ici" : "Inscrivez-vous ici"}
            </Button>
          </p>
        </div>
      </div>
    </div>
  </div>
}