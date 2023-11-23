import { FormEvent, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";

function Login() {
    const auth = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errors, setErrors] = useState<string[]>([]);
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const loginResult = await auth.login(email, password);

        if (loginResult.status === 200) {
            navigate("/");
        }
        else if (loginResult.data?.status === 401 && loginResult.data?.detail == "Failed") {
            setErrors(["invalidLoginOrPassword"]);
        }
        else if (loginResult.data?.status === 401 && loginResult.data?.detail == "LockedOut") {
            setErrors(["userLockedOut"]);
        }
        else if (loginResult.data) {
            setErrors([`${loginResult.data.status} - ${loginResult.data.title}.`]);
        }
        else {
            setErrors([`Request failed with status code ${loginResult.status}.`]);
        }
    }

    return (
        <div className="d-flex justify-content-center mt-5">
            <div className="card">
                <div className="card-header text-center">
                    <h1>
                        <FormattedMessage id="loginHeader" />
                    </h1>
                </div>
                <div className="card-body">
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            {errors.map((e, i) => <div key={i}>
                                <FormattedMessage id={e} />
                            </div>)}
                        </FormGroup>

                        <FormGroup floating>
                            <Input id="email" type="email" placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <Label for="email">
                                <FormattedMessage id="email" />
                            </Label>
                        </FormGroup>

                        <FormGroup floating>
                            <Input id="password" type="password" placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <Label for="password">
                                <FormattedMessage id="password" />
                            </Label>
                        </FormGroup>

                        <Button className="w-100" type="submit">
                            <FormattedMessage id="login" />
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login;
