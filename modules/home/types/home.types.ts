export type CategoryIdType<T> = T extends Array<{ id: infer ID }> ? ID : never;
