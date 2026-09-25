import { gql } from '@apollo/client';

export const HELLO_PING = gql`
  query HelloPing {
    helloPing
  }
`;

export type HelloPingQueryResult = {
  helloPing: string;
};
