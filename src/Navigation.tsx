import * as React from 'react';
import {
  Alignment,
  AnchorButton,
  Classes,
  Navbar,
  NavbarGroup,
  NavbarHeading,
  NavbarDivider
} from '@blueprintjs/core';

export interface NavigationProps {}

export class Navigation extends React.PureComponent<NavigationProps> {
  public render() {
    return (
      <Navbar className={Classes.DARK}>
        <NavbarGroup align={Alignment.LEFT}>
          <NavbarHeading>Blueprint Sandbox</NavbarHeading>
          <NavbarDivider />
          <AnchorButton
            href="http://blueprintjs.com/docs/v2/"
            text="Docs"
            target="_blank"
            rightIcon="share"
          />
          <AnchorButton
            href="http://github.com/palantir/blueprint"
            text="Github"
            target="_blank"
            rightIcon="code"
          />
        </NavbarGroup>
      </Navbar>
    );
  }
}
