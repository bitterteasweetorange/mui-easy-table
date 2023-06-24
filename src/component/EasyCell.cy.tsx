import { Button } from '@mui/material'
import { cy, it } from 'local-cypress'

it('label & helperText', () => {
  cy.mount(<Button>btn</Button>)
  cy.get('button').should('contain.text', 'btn')
})
