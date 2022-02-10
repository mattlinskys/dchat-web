interface State<T> {
  entities: T[];
  isFetching: boolean;
}

type Action<ID, T> =
  | {
      type: "reset";
    }
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
    }
  | {
      type: "upsert-one";
      entity: T;
    };

export const createEntitiesReducer =
  <T, K extends keyof T>(
    id: K,
    compareIds: (a: T[K], b: T[K]) => boolean = (a, b) => a === b
  ) =>
  (state: State<T>, action: Action<T[K], T>): State<T> => {
    switch (action.type) {
      case "reset":
        return {
          entities: [],
          isFetching: false,
        };
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
      case "upsert-one":
        const entityIndex = state.entities.findIndex((entity) =>
          compareIds(entity[id], action.entity[id])
        );
        if (entityIndex !== -1) {
          const entities = [...state.entities];
          entities[entityIndex] = {
            ...entities[entityIndex],
            ...action.entity,
          };
          return {
            ...state,
            entities,
          };
        } else {
          return {
            ...state,
            entities: [...state.entities, action.entity],
          };
        }
      default:
        return state;
    }
  };
