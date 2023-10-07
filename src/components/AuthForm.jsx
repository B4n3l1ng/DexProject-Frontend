/* eslint-disable react/prop-types */
import { Alert, Button, Center, Space, Input } from "@mantine/core";
import missingNo from "../assets/MissingNo.svg";

const AuthForm = ({
  email,
  setEmail,
  password,
  setPassword,
  name,
  setName,
  errorMessage,
  handleSubmit,
}) => {
  const errorIcon = (
    <img src={missingNo} alt="error" style={{ width: "10px" }} />
  );

  return (
    <>
      <Center>
        <form onSubmit={handleSubmit} style={{ width: "30vw" }}>
          <label>
            Email:
            <Input
              type="text"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              radius="lg"
            />
          </label>
          {name !== undefined && (
            <label>
              Name:
              <Input
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                radius="lg"
              />
            </label>
          )}

          <label>
            Password:
            <Input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              radius="lg"
            />
          </label>
          <Space h="md" />
          {errorMessage ? (
            <Alert
              variant="outline"
              color="red"
              radius="lg"
              title="Error while registering."
              icon={errorIcon}
            >
              {errorMessage}
            </Alert>
          ) : undefined}
          <Space h="md" />
          <Center>
            <Button
              type="submit"
              variant="filled"
              color="red"
              radius="lg"
              m="s"
            >
              SignUp
            </Button>
          </Center>
        </form>
      </Center>
    </>
  );
};

export default AuthForm;
