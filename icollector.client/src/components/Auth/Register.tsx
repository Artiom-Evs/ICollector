import { FormEvent, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";

function formatToI18nId(label: string): string {
    return label[0].toLowerCase() + label.slice(1);
}

function Register() {
    const auth = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confPassword, setConfPassword] = useState<string>("");
    const [errors, setErrors] = useState<string[]>([]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (password !== confPassword) {
            setErrors(["passwordsAreDifferent"]);
            return;
        }

        const registerResult = await auth.register(email, password);

        console.log(registerResult);

        if (registerResult.status === 200) {
            navigate("/login");
        }
        else if (registerResult.data?.errors != null) {
            const errorIds = Object.keys(registerResult.data.errors).map((e: string) => formatToI18nId(e));
            setErrors(errorIds);
        }
    }

    return (
        <div className="d-flex justify-content-center mt-5">
            <div className="card">
                <div className="card-header text-center">
                    <h1>
                        <FormattedMessage id="registrationHeader" />
                    </h1>
                </div>
                <div className="card-body">
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            {errors.map((e, i) => <span key={i}>
                                <FormattedMessage id={e} /><br/>
                            </span>)}
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

                        <FormGroup floating>
                            <Input id="confirmPassword" type="password" placeholder="Confirm password"
                                value={confPassword}
                                onChange={(e) => setConfPassword(e.target.value)}
                                required
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