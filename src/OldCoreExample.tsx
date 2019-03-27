import * as React from 'react';
import { Button, Intent, Card, FormGroup, InputGroup } from '@blueprintjs/core';
import { Flex, Box } from 'reflexxbox';

export class CoreExample extends React.PureComponent {
  public render() {
    return (
      <Flex p={20} align="center" justify="center">
        <Box w={1 / 4}>
          <Card elevation={3}>
            <Box mb={20}>
              <h1 className="bp3-heading bp3-center">Login</h1>
            </Box>
            <Box mb={20}>
              <FormGroup
                label="E-mail address"
                labelFor="email-input"
              >
                <InputGroup
                  id="text-input"
                  placeholder="E-mail address"
                  large={true}
                />
              </FormGroup>
            </Box>
            <Box mb={20}>
              <FormGroup
                label="Password"
                labelFor="password-input"
              >
                <InputGroup
                  id="password-input"
                  large={true}
                  placeholder="Password"
                />
              </FormGroup>
              <Flex mt={10} justify="flex-end">
                <a href="">Forgot Password?</a>
              </Flex>
            </Box>
            <Button
              fill={true}
              intent={Intent.PRIMARY}
              large={true}
              text="Login"
            />
            <Flex py={10} justify="center"><span>or</span></Flex>
            <Button
              fill={true}
              large={true}
              text="Login with Google"
            />
          </Card>
        </Box>
      </Flex>
    );
  }
}
