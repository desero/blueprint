import * as React from 'react';
import { render } from 'react-dom';
import { CoreExample } from './CoreExample';

import 'normalize.css/normalize.css';
import './App.scss';

// import '@blueprintjs/icons/lib/css/blueprint-icons.css';
// import '@blueprintjs/core/lib/css/blueprint.css';

const App = () => (
  <div>
    <CoreExample />
  </div>
);

render(<App />, document.getElementById('root'));
