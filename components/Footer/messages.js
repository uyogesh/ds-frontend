/*
 * Footer Messages
 *
 * This contains all the text for the Footer component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  licenseMessage: {
    id: 'ds.components.Footer.license.message',
    defaultMessage: '©DrivingSales®2017',
  },
  authorMessage: {
    id: 'ds.components.Footer.author.message',
    defaultMessage: `
      Made with love by {author}.
    `,
  },
});
