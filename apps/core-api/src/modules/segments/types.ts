import { ISegment } from './db/definitions/segments';
import { SegmentNode } from './db/definitions/segmentNodes';

export interface ISegmentsEdit extends ISegment {
  _id: string;
  conditionSegments: ISegment[];
}

export interface IPreviewParams {
  contentType: string;
  conditions: SegmentNode;
  subOf?: string;
  config: Record<string, unknown>;
  conditionsConjunction?: 'and' | 'or';
}

export type IOptions = {
  returnAssociated?: { mainType: string; relType: string };
  returnFields?: string[];
  returnFullDoc?: boolean;
  returnSelector?: boolean;
  returnCount?: boolean;
  defaultMustSelector?: Record<string, unknown>[];
  page?: number;
  perPage?: number;
  sortField?: string;
  sortDirection?: number;
  scroll?: boolean;
};
