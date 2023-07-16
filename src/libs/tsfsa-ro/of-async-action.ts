import { AsyncActionCreators, Meta } from 'typescript-fsa';
import { map, pipe } from 'rxjs';
import { ofActionWithMeta } from './of-action';

export function ofAsyncAction<Params, Result, Error = unknown>(
  asyncActionCreator: AsyncActionCreators<Params, Result, Error>,
) {
  return pipe(
    ofActionWithMeta(asyncActionCreator.started),
    map(({ payload, meta }) => {
      return {
        done: (result: Result, _meta?: Meta) => asyncActionCreator.done({ result, params: payload }, _meta ?? meta),
        failed: (error: Error, _meta?: Meta) => asyncActionCreator.failed({ error, params: payload }, _meta ?? meta),
        payload,
        meta,
      };
    }),
  );
}
