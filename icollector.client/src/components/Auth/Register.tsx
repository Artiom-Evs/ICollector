import { FormEvent, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";

function Register() {
    const auth = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confPassword, setConfPassword] = useState<string>("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (password !== confPassword) {
            return;
        }

        const registerResult = await auth.register(email, password);

        if (registerResult.status === 200) {
            navigate("/");
        }
    }

    return (
        <div className="d-flex justify-content-center mt-5">
            <div className="card">
                <div className="card-header">
                    <h1>
                        <FormattedMessage id="registrationHeader" />
                    </h1>
                </div>
                <div className="card-body">
                    <Form onSubmit={handleSubmit}>
                        <FormGroup floating>
                            <Input id="email" type="email" placeholder="Email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Label for="email">
                                <FormattedMessage id="email" />
                            </Label>
                        </FormGroup>

                        <FormGroup floating>
                            <Input id="password" type="password" placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Label for="password">
                                <FormattedMessage id="password" />
                            </Label>
                        </FormGroup>

                        <FormGroup floating>
                            <Input id="confirmPassword" type="password" placeholder="Confirm password"
                                value={confPassword}
                                onChange={(e) => setConfPassword(e.target.value)}
                            />
                            <Label for="confirmPassword">
                                <FormattedMessage id="confirmPassword" />
                            </Label>
                        </FormGroup>

                        <Button className="w-100" type="submit">
                            <FormattedMessage id="register" />
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Register;