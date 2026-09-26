import type {
  ApolloServerPlugin,
  BaseContext,
  GraphQLRequestListener,
} from '@apollo/server';
import { classifyError, IClassificationResult } from '../errorClassifier';

/**
 * Apollo Server plugin that handles expected errors
 * 
 * Features:
 * - Overrides HTTP status to 200 when all errors are EXPECTED business errors
 * - Adds error category metadata to GraphQL error extensions
 * - Allows frontend to distinguish business errors from system errors
 */
export const expectedErrorPlugin: ApolloServerPlugin = {
  async requestDidStart(): Promise<GraphQLRequestListener<BaseContext>> {
    // Store classifications from didEncounterErrors to use in willSendResponse
    const errorClassifications = new Map<string, IClassificationResult>();

    return {
      async didEncounterErrors(requestContext) {
        // Capture original GraphQL errors with their full context
        for (const error of requestContext.errors) {
          const originalError = error.originalError || error;
          const classification = classifyError(originalError);
          
          // Use error path as key to match in willSendResponse
          const pathKey = error.path 
            ? error.path.join('.') 
            : error.message;
          errorClassifications.set(pathKey, classification);
        }
      },

      async willSendResponse(requestContext) {
        const { response } = requestContext;
        
        // Check if response has errors
        if (response.body.kind !== 'single' || !response.body.singleResult.errors) {
          return;
        }

        const errors = response.body.singleResult.errors;
        if (!errors || errors.length === 0) {
          return;
        }

        // Classify each error using stored classifications from didEncounterErrors
        const classifications: IClassificationResult[] = errors.map(error => {
          const pathKey = error.path 
            ? error.path.join('.') 
            : error.message;
          
          // Use pre-computed classification from didEncounterErrors if available
          const stored = errorClassifications.get(pathKey);
          if (stored) {
            return stored;
          }
          
          // Fallback: classify from the formatted error message
          return classifyError(error.message);
        });

        // Enrich error extensions with category metadata
        errors.forEach((error, index) => {
          const classification = classifications[index];

          // `GraphQLFormattedError.extensions` is declared readonly; the
          // enrichment happens before serialization, so mutate it through a
          // structural alias rather than `any`.
          const mutableError = error as {
            extensions?: Record<string, unknown>;
          };

          if (!mutableError.extensions) {
            mutableError.extensions = {};
          }

          mutableError.extensions.category = classification.category;
          mutableError.extensions.isExpected = classification.isExpected;
          mutableError.extensions.statusCode = classification.statusCode;
        });

        // If ALL errors are expected, override HTTP status to 200
        const allExpected = classifications.every(c => c.category === 'EXPECTED');
        
        if (allExpected && response.http) {
          response.http.status = 200;
        }
      },
    };
  },
};
