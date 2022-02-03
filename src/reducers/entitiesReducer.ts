interface State<T> {
  entities: T[];
  isFetching: boolean;
}

type Action<ID, T> =
  | {
      type: "fetch-pending";
    }
  | {
      type: "fetch-fulfilled";
      entities: T[];
    }
  | {
      type: "add-one";
      entity: T;
    }
  | {
      type: "remove-one";
      id: ID;
    };

export const createEntitiesReducer =
  <T, K extends keyof T>(
    id: K,
    compareIds: (a: T[K], b: T[K]) => boolean = (a, b) => a === b
  ) =>
  (state: State<T>, action: Action<T[K], T>): State<T> => {
    switch (action.type) {
      case "fetch-pending":
        return {
          ...state,
          isFetching: true,
        };
      case "fetch-fulfilled":
        return {
          ...state,
          isFetching: false,
          entities: [
            ...action.entities.filter(
              (a) => !state.entities.some((b) => compareIds(a[id], b[id]))
            ),
            ...state.entities,
          ],
        };
      case "add-one":
        return {
          ...state,
          entities: [
            ...state.entities,
            ...(state.entities.some((entity) =>
              compareIds(entity[id], action.entity[id])
            )
              ? []
              : [action.entity]),
          ],
        };
      case "remove-one":
        return {
          ...state,
          entities: state.entities.filter(
            (entity) => !compareIds(entity[id], action.id)
          ),
        };
      default:
        return state;
    }
  };
