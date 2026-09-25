import * as ReactDOM from 'react-dom/client';

import { init } from '@module-federation/enhanced/runtime';

import '@blocknote/shadcn/style.css';
import './styles.css';

import { App } from '@/app/components/App';
import { ClientConfigError } from '@/error-handler/components/ClientConfigError';
import { fetchFrontendPluginRemotes } from '@/plugins/utils/fetchFrontendPluginRemotes';
import { initSentry } from './sentry';

// Install browser error handlers as early as possible, before any rendering.
initSentry();

async function initFederation() {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
  );

  try {
    const remotes = await fetchFrontendPluginRemotes();

    init({
      name: 'core',
      remotes,
    });

    root.render(<App />);
  } catch (error: unknown) {
    console.error(
      'Failed to initialize frontend plugins:',
      error instanceof Error ? error.message : String(error),
    );

    root.render(
      <ClientConfigError
        error={
          error instanceof Error
            ? error
            : new Error('Failed to initialize frontend plugins')
        }
      />,
    );
  }
}

initFederation().catch((err) => {
  console.error('Failed to initialize module federation:', err);
});
