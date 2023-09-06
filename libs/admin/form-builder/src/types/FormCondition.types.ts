import {type AnyVal, type WithTarget} from './common.types';

export interface EqualMatcher {
  $eq: AnyVal;
}

export interface GreaterThanMatcher {
  $gt: number;
}

export interface GreaterThanOrEqualMatcher {
  $gte: number;
}

export interface InMatcher {
  $in: AnyVal[];
}

export interface LessThanMatcher {
  $lt: number;
}

export interface LessThanOrEqualMatcher {
  $lte: number;
}

export interface NotEqualMatcher {
  $ne: AnyVal;
}

export interface NotInMatcher {
  $nin: AnyVal[];
}

export type Matcher =
  | EqualMatcher
  | GreaterThanMatcher
  | GreaterThanOrEqualMatcher
  | InMatcher
  | LessThanMatcher
  | LessThanOrEqualMatcher
  | NotEqualMatcher
  | NotInMatcher;

export type SingleIfMatcher = Partial<WithTarget> & Partial<Matcher>;

export interface IfOrMatcher {
  $or: SingleIfMatcher[];
}

export interface IfAndMatcher {
  $and: SingleIfMatcher[];
}

export interface WithCondition {
  $if: (SingleIfMatcher | IfOrMatcher | IfAndMatcher)[];
}
