import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/service/authentication.service";
import {Step} from "./step";

@Component({
  selector: 'bs-checkout',
  templateUrl: './checkout.component.html',
  styles: []
})
export class CheckoutComponent implements OnInit {
  steps: Step[];

  constructor(protected authService: AuthService) { }

  ngOnInit() {
    this.steps = [
      new Step('Lieferung', 'truck', true, false, false, 'Lieferinformationen eingeben'),
      new Step('Bestellung bestätigen', 'info', false, true, false)
    ];
  }

  /**
   * Returns active step of checkout.
   *
   * @returns {string}
   */
  getActiveStep() : string {
    return this.steps.filter(step => step.active)[0].title;
  }

  /**
   * Sets active step of checkout.
   *
   * @param index
   * @param disableIndex
   */
  setActiveStep(index, disableIndex) {
    this.setActive(index);
    this.steps[index].disabled = false;
    this.steps[disableIndex].active = false;
    this.setCompleted(disableIndex);
  }

  /**
   * Navigates back to first step of checkout.
   *
   * @param index
   * @param disableIndex
   */
  setFirstStep(index, disableIndex) {
    this.setActive(index);
    this.setInActive(disableIndex);
    this.setInCompleted(index);
  }

  /**
   * Sets step to active.
   *
   * @param index
   */
  setActive(index) {
    this.steps[index].active = true;
  }

  /**
   * Sets step to completed.
   *
   * @param index
   */
  setCompleted(index) {
    this.steps[index].completed = true;
  }

  /**
   * Sets step to incompleted.
   *
   * @param index
   */
  setInCompleted(index) {
    this.steps[index].completed = false;
  }

  /**
   * Sets step inactive.
   *
   * @param index
   */
  setInActive(index) {
    this.steps[index].active = false;
  }
}
