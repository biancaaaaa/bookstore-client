export class Step {
  constructor(public title: string,
              public icon: string,
              public active: boolean,
              public disabled: boolean,
              public completed: boolean,
              public description?: string) {}
}
