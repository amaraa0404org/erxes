import { useQuery } from '@apollo/client';
import { IconHandStop, IconRefresh } from '@tabler/icons-react';
import { Alert, Button, Empty, Spinner } from 'erxes-ui';

import { HELLO_PING, HelloPingQueryResult } from './graphql/queries';

export const HelloPage = () => {
  const { data, loading, error, refetch } =
    useQuery<HelloPingQueryResult>(HELLO_PING);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <Alert.Title>Failed to reach the hello plugin</Alert.Title>
          <Alert.Description>{error.message}</Alert.Description>
        </Alert>
      </div>
    );
  }

  if (!data?.helloPing) {
    return (
      <Empty className="h-full">
        <Empty.Header>
          <Empty.Media variant="icon">
            <IconHandStop />
          </Empty.Media>
          <Empty.Title>No response</Empty.Title>
          <Empty.Description>
            The hello plugin answered with an empty payload.
          </Empty.Description>
        </Empty.Header>
      </Empty>
    );
  }

  return (
    <div className="flex h-full flex-col gap-4 p-6">
      <div>
        <h1 className="text-lg font-semibold">Hello</h1>
        <p className="text-muted-foreground text-sm">
          Runtime plugin smoke test: this page calls the helloPing GraphQL query
          on hello_api through the gateway.
        </p>
      </div>
      <Alert>
        <Alert.Title>helloPing</Alert.Title>
        <Alert.Description>{data.helloPing}</Alert.Description>
      </Alert>
      <div>
        <Button variant="outline" onClick={() => refetch()}>
          <IconRefresh className="mr-2 size-4" />
          Ping again
        </Button>
      </div>
    </div>
  );
};
