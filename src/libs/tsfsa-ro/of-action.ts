import { Action, ActionCreator } from 'typescript-fsa';
import { filter, map, Observable, pipe, UnaryFunction } from 'rxjs';
import { compose, equals, prop, any } from 'ramda';

const filterPredicate = <T>(actionCreator: ActionCreator<T>): ((action: Action<T>) => boolean) =>
  compose<[Action<T>], string, boolean>(equals(actionCreator.type), prop('type'));

const filterPredicateCollection =
  <T>(...actionCreators: ActionCreator<T>[]): ((action: Action<T>) => boolean) =>
  (action) =>
    any<ActionCreator<T>>((actionCreator) => filterPredicate(actionCreator)(action), actionCreators);

export function ofAction<T>(actionCreator: ActionCreator<T>): UnaryFunction<Observable<Action<T>>, Observable<T>> {
  return pipe(filter(filterPredicate(actionCreator)), map(prop('payload')));
}

export function ofActionWithMeta<T>(
  actionCreator: ActionCreator<T>,
): UnaryFunction<Observable<Action<T>>, Observable<Action<T>>> {
  return pipe(filter(filterPredicate(actionCreator)));
}

export function ofActions<T>(
  ...actionCreators: ActionCreator<T>[]
): UnaryFunction<Observable<Action<T>>, Observable<T>> {
  return pipe(filter(filterPredicateCollection<T>(...actionCreators)), map(prop('payload')));
}
