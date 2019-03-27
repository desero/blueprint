import * as React from 'react';
import { Button, Popover, Navbar, NavbarGroup, Alignment, Menu, MenuItem,
  MenuDivider, Position, Icon, Colors, Card, Intent, InputGroup, Classes } from '@blueprintjs/core';
import { Select, Omnibar } from '@blueprintjs/select';
import { IconName } from '@blueprintjs/icons';
import { Flex, Box } from 'reflexxbox';
import * as Films from './films';

const FilmSelect = Select.ofType<Films.IonFilm>();
const FilmOmnibar = Omnibar.ofType<Films.IonFilm>();

interface SelectExampleProps {
  height: number;
  large: boolean;
}

interface SelectExampleState {
  film: Films.IonFilm;
  isOpen: boolean;
  resetOnSelect: boolean;
}

interface ProjectIconProps {
  icon: IconName;
  color?: string;
  size: string;
}

class ProjectIcon extends React.PureComponent<ProjectIconProps, {}> {
  public static defaultProps = {
      size: 'normal'
  };

  public render() {
    const sizes = {
      large: {
        padding: '15px',
        width: '60px',
        iconSize: 30
      },
      normal: {
        padding: '10px',
        width: '40px',
        iconSize: 20
      },
    };
    return (
      <Box
        style={{
          padding: sizes[this.props.size].padding,
          backgroundColor: Colors.LIGHT_GRAY3,
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: '5px',
          width: sizes[this.props.size].width,
        }}
      >
        <Icon
          icon={this.props.icon}
          iconSize={sizes[this.props.size].iconSize}
          color={this.props.color}
        />
      </Box>
    );
  }
}

export class CoreExample extends React.PureComponent<{}, SelectExampleState> {
  constructor(props: SelectExampleProps) {
    super(props);

    this.state = {
      film: Films.TOP_100_FILMS[0],
      isOpen: false,
      resetOnSelect: true,
    };
  }

  public render() {
    const { film } = this.state;
    const { title, organisation, icon, color } = film;
    return (
      <Flex column={true}>
        <Navbar fixedToTop={true}>
          <NavbarGroup align={Alignment.LEFT}>
            <Navbar.Heading>Blueprint</Navbar.Heading>
            <Box visible={[false, true, true]} className="bp3-project-select">
              <FilmSelect
                {...Films.filmSelectProps}
                // initialContent={initialContent}
                noResults={<MenuItem disabled={true} text="No results." />}
                onItemSelect={this.handleValueChange}
                popoverProps={{ minimal: true, className: 'cucu bau cockie' }}
              >
                  <Button large={true}>
                    <Flex align="center">
                      {icon && <ProjectIcon icon={icon as IconName} color={color} />}
                      <span style={{marginRight: '5px'}}>
                        {film ? `${title}` : '(No selection)'}
                      </span>
                      <Icon icon="chevron-down" iconSize={16} color={Colors.GRAY3} />
                    </Flex>
                  </Button>
              </FilmSelect>
            </Box>
          </NavbarGroup>
          <NavbarGroup align={Alignment.RIGHT}>
            <Popover
              minimal={true}
              position={Position.BOTTOM_RIGHT}
              content={
                <Menu large={true}>
                  <MenuItem text="Child one" />
                  <MenuItem text="Child two" />
                  <MenuDivider />
                  <MenuItem text="Child three" />
                </Menu>}
            >
              <Button large={true} minimal={true}>
                <Flex align="center">
                  <Icon icon="user" style={{marginRight: '5px'}} iconSize={30} color={Colors.BLUE3} />
                  <Icon icon="chevron-down" iconSize={16} color={Colors.GRAY3} />
                </Flex>
              </Button>
            </Popover>
          </NavbarGroup>
        </Navbar>
        <Box px={[40, 80, 100]} py={40}>
          <Flex mb={40} justify="space-between" align="center">
            <Box>
              <Flex align="center">
                <Box mr={10}>
                  {icon && <ProjectIcon icon={icon as IconName} size="large" color={color} />}
                </Box>
                <Box>
                  <h1 className="project-title">
                    {film ? title : 'Untitled'}
                  </h1>
                  <span className={Classes.TEXT_MUTED}>
                    {film ? `${organisation}` : 'No organisation'}
                  </span>
                </Box>
              </Flex>
            </Box>
            <Flex align="center">
              <Box mr={[0, 20, 20]}>
                <Box visible={[false, false, false]}>
                  <InputGroup
                    round={true}
                    large={true}
                    leftIcon="search"
                    // onChange={this.handleFilterChange}
                    placeholder="Search site..."
                  />
                </Box>
                <Box visible={[true, false, false]}>
                  <Button icon="search" minimal={true} large={true} onClick={this.handleClick} />
                  <FilmOmnibar
                    {...Films.filmSelectProps}
                    {...this.state}
                    noResults={<MenuItem disabled={true} text="No results." />}
                    onItemSelect={this.handleItemSelect}
                    onClose={this.handleClose}
                  />
                </Box>
              </Box>
              <Box>
                <Box visible={[false, true, true]}>
                  <Button
                    fill={true}
                    intent={Intent.WARNING}
                    large={true}
                    icon="plus"
                    text="Add new project"
                  />
                </Box>
                <Box visible={[true, false, false]}>
                  <Button icon="add" minimal={true} large={true} />
                </Box>
              </Box>
            </Flex>
          </Flex>
          <Card elevation={3}>
            <table className="bp3-html-table">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Description</th>
                  <th>Technologies</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Blueprint</td>
                  <td>CSS framework and UI toolkit</td>
                  <td>Sass, TypeScript, React</td>
                </tr>
                <tr>
                  <td>TSLint</td>
                  <td>Static analysis linter for TypeScript</td>
                  <td>TypeScript</td>
                </tr>
                <tr>
                  <td>Plottable</td>
                  <td>Composable charting library built on top of D3</td>
                  <td>SVG, TypeScript, D3</td>
                </tr>
              </tbody>
            </table>
          </Card>
        </Box>
      </Flex>
    );
  }

  // private renderInputValue = (film: Films.IonFilm) => film.title;

  private handleItemSelect = () => this.setState({ isOpen: false });

  private handleClose = () => this.setState({ isOpen: false });

  private handleClick = () => this.setState({ isOpen: true });

  private handleValueChange = (film: Films.IonFilm) => this.setState({ film });
}
