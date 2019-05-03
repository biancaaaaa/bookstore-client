export class Status {
  constructor(public id: number,
              public status_id: number,
              public changedAt: Date,
              public description?: string,
              public comment?: string) {}
}
