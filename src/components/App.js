import React from 'react'
import { Route, Switch } from 'react-router'

import Translations from 'components/Translations'
import Theme from 'components/Theme'
import { Container } from 'components/lib'
import HomePage from 'pages/home'

const App = () => (
  <Translations>
    <Theme>
      <div>
        <Container>
          <Switch>
            <Route path="/" exact component={HomePage} />
          </Switch>
        </Container>
      </div>
    </Theme>
  </Translations>
)

export default App
