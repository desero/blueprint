import * as React from 'react';
import { render } from 'react-dom';
import { Navigation } from './Navigation';
import { CoreExample } from './CoreExample';
import { SelectExample } from './SelectExample';

import './App.css';
import 'normalize.css/normalize.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/css/blueprint.css';

const App = () => (
  <div>
    <Navigation />
    <CoreExample />
    <SelectExample />
  </div>
);

render(<App />, document.getElementById('root'));
