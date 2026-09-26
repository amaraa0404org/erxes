import { IconHandStop } from '@tabler/icons-react';
import { IUIConfig } from 'erxes-ui';

export const CONFIG: IUIConfig = {
  name: 'hello',
  path: 'hello',
  icon: IconHandStop,
  i18n: true,
  modules: [
    {
      name: 'hello',
      icon: IconHandStop,
      path: 'hello',
    },
  ],
};
